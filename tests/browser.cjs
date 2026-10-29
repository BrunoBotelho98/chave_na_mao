const {test, before, after} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const http = require('node:http');
const {chromium} = require('playwright');

const root = path.resolve(__dirname, '..');
let browser, server, url;
before(async () => {
  server = http.createServer((req, res) => {
    const file = {'/':'index.html', '/app.js':'app.js', '/style.css':'style.css', '/icon.svg':'icon.svg'}[req.url];
    if (!file) return res.writeHead(404).end();
    res.setHeader('Content-Type', file.endsWith('.js') ? 'application/javascript' : file.endsWith('.css') ? 'text/css' : file.endsWith('.svg') ? 'image/svg+xml' : 'text/html');
    res.end(fs.readFileSync(path.join(root, file)));
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  url = `http://127.0.0.1:${server.address().port}`;
  const channel = process.env.TEST_BROWSER_CHANNEL || 'msedge';
  browser = await chromium.launch({headless:true, ...(channel === 'chromium' ? {} : {channel})});
});
after(async () => { await browser?.close(); await new Promise(resolve => server?.close(resolve)); });

async function setup(t, init) {
  const context = await browser.newContext({viewport:{width:390,height:844}});
  t.after(() => context.close());
  await context.route('https://**/*', route => route.abort());
  if (init) await context.addInitScript(init);
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  page.on('dialog', dialog => dialog.accept());
  t.after(() => assert.deepEqual(errors, [], 'Nenhum erro JavaScript inesperado'));
  await page.goto(url);
  await page.waitForSelector('.hero');
  return {context, page};
}
async function route(page, hash) {
  await page.evaluate(hash => { location.hash = hash; }, hash);
  await page.waitForFunction(hash => view === hash.split('/')[0], hash);
}
async function saved(page) { assert.equal(await page.evaluate(() => saveQueue), true); }
async function samplePhoto(page) {
  const data = await page.evaluate(() => {
    const canvas = document.createElement('canvas'); canvas.width=1600; canvas.height=1200;
    const ctx=canvas.getContext('2d');ctx.fillStyle='#dce4d5';ctx.fillRect(0,0,1600,1200);
    ctx.strokeStyle='#842c22';ctx.lineWidth=15;ctx.beginPath();ctx.moveTo(300,200);ctx.lineTo(700,900);ctx.stroke();
    ctx.fillStyle='#213d39';ctx.font='70px Arial';ctx.fillText('Evidência de teste',100,110);
    return canvas.toDataURL('image/png').split(',')[1];
  });
  return {name:'evidencia.png',mimeType:'image/png',buffer:Buffer.from(data,'base64')};
}
async function upload(page, selector, files) {
  await page.locator(selector).setInputFiles(files);
  await page.waitForFunction(() => !document.querySelector('[data-action="save-detail"]').disabled);
}

test('câmera, galeria, limite, ampliação e persistência das evidências', async t => {
  const {page} = await setup(t);
  await route(page, 'checklist/preparo');
  await page.locator('#auto-advance').uncheck(); await saved(page);
  await page.locator('#item-i1 [data-status="issue"]').click(); await saved(page);
  await page.locator('#item-i1 [data-action="item-detail"]').click();
  assert.equal(await page.locator('#camera-input').getAttribute('capture'), 'environment');
  assert.equal(await page.locator('#photo-input').getAttribute('capture'), null);
  await page.locator('#item-note').fill('Trinca <observada> & fotografada');
  const photo = await samplePhoto(page);
  await upload(page, '#camera-input', photo);
  await upload(page, '#photo-input', Array(8).fill(photo));
  assert.equal(await page.locator('.photo-wrap').count(), 8);
  assert.match(await page.locator('#photo-message').textContent(), /Limite de 8/);
  await page.locator('.photo-wrap .photo-thumb').first().click();
  assert.equal(await page.locator('#photo-viewer').evaluate(d => d.open), true);
  await page.locator('[data-action="close-photo"]').click();
  assert.equal(await page.locator('#modal').evaluate(d => d.open), true);
  await page.locator('[data-action="save-detail"]').click(); await saved(page);
  await page.reload(); await page.waitForSelector('#item-i1');
  assert.deepEqual(await page.evaluate(() => ({status:allItems()[0].status,note:allItems()[0].note,photos:allItems()[0].photos.length,advance:state.settings.autoAdvance})),
    {status:'issue',note:'Trinca <observada> & fotografada',photos:8,advance:false});
  assert.equal(await page.evaluate(async () => { const image=new Image();image.src=allItems()[0].photos[0].src;await image.decode();return Math.max(image.width,image.height); }), 1400);
});

test('falha na restauração mantém a vistoria e não anuncia sucesso', async t => {
  const {page} = await setup(t);
  await page.evaluate(async () => {state.property.name='Vistoria original';await persist();});
  const backup = await page.evaluate(() => {const data=fresh();data.property.name='Outra vistoria';return JSON.stringify(data);});
  await route(page, 'relatorio');
  await page.locator('#restore').setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(backup)});
  await page.evaluate(() => {storageMode='none';});
  await page.locator('[data-action="confirm-restore"]').click();
  await page.waitForFunction(() => !document.querySelector('[data-action="confirm-restore"]').disabled);
  assert.equal(await page.evaluate(() => state.property.name), 'Vistoria original');
  assert.match(await page.locator('#toast').textContent(), /anterior foi mantida/);
  assert.equal(await page.locator('#modal').evaluate(d => d.open), true);
});

test('recupera localStorage mesmo quando IndexedDB está disponível', async t => {
  const {page} = await setup(t);
  await page.evaluate(() => {const data=fresh();data.property.name='Recuperada';localStorage.setItem('chave-na-mao',JSON.stringify(data));});
  await page.reload();await page.waitForSelector('.hero');
  assert.deepEqual(await page.evaluate(() => ({name:state.property.name,mode:storageMode})), {name:'Recuperada',mode:'local'});
  assert.equal(await page.evaluate(async () => {state.property.unit='204';return persist();}), true);
});

test('gravações concorrentes em IndexedDB e localStorage não apagam respostas', async t => {
  for (const fallback of [false,true]) {
    const {page,context} = await setup(t, fallback ? () => Object.defineProperty(window,'indexedDB',{get(){throw Error('indisponível');}}) : undefined);
    const other = await context.newPage();await other.goto(url);await other.waitForSelector('.hero');
    const results = await Promise.all([
      page.evaluate(async () => {allItems()[0].status='issue';return persist();}),
      other.evaluate(async () => {allItems()[1].status='ok';return persist();})
    ]);
    assert.equal(results.filter(Boolean).length, 1);
    const last = await context.newPage();await last.goto(url);await last.waitForSelector('.hero');
    assert.equal(await last.evaluate(() => allItems().filter(i=>i.status!=='pending').length), 1);
    assert.equal(await (results[0] ? other : page).evaluate(() => writeBlocked), true);
  }
});

test('dados incompatíveis ficam protegidos e podem ser substituídos por restauração explícita', async t => {
  const {page} = await setup(t);
  await page.evaluate(async () => {
    await new Promise((resolve,reject)=>{const tx=db.transaction('data','readwrite');tx.objectStore('data').put({version:99,important:'preservar'},'inspection');tx.oncomplete=resolve;tx.onerror=reject;});
  });
  await page.reload();await page.waitForSelector('.hero');
  assert.equal(await page.evaluate(() => writeBlocked), true);
  assert.match(await page.evaluate(() => recoveryCopies[0].text), /preservar/);
  assert.equal(await page.evaluate(() => persist()), false);
  await route(page, 'relatorio');
  const backup=await page.evaluate(() => JSON.stringify(fresh()));
  await page.locator('#restore').setInputFiles({name:'valida.json',mimeType:'application/json',buffer:Buffer.from(backup)});
  await page.locator('[data-action="confirm-restore"]').click();await saved(page);
  assert.equal(await page.evaluate(() => writeBlocked), false);
});

test('IDs únicos, compatibilidade com cópias antigas e limites de criação', async t => {
  const {page} = await setup(t);
  const result=await page.evaluate(() => {
    const data=fresh();data.rooms[1].id=data.rooms[0].id;data.rooms[1].items[0].id=data.rooms[0].items[0].id;
    data.rooms[0].items=Array.from({length:201},(_,n)=>({...data.rooms[0].items[0],id:'custom-'+n}));
    const restored=validate(data);
    return {rooms:new Set(restored.rooms.map(r=>r.id)).size,items:new Set(restored.rooms.flatMap(r=>r.items).map(i=>i.id)).size,total:restored.rooms.flatMap(r=>r.items).length,custom:restored.rooms[0].items[0].custom};
  });
  assert.equal(result.rooms,10);assert.equal(result.items,result.total);assert.equal(result.custom,true);
  await page.evaluate(() => {state.rooms[0].items=Array.from({length:200},(_,n)=>({...state.rooms[0].items[0],id:'item-'+n}));});
  await route(page,'checklist/preparo');await page.locator('[data-action="add-item"]').click();
  assert.match(await page.locator('#toast').textContent(),/200 itens/);
  await page.evaluate(() => {state.rooms=Array.from({length:80},(_,n)=>({...state.rooms[0],id:'room-'+n}));render();});
  await page.locator('.check-heading [data-action="add-room"]').click();
  assert.match(await page.locator('#toast').textContent(),/80 ambientes/);
});

test('JSON ilegível no localStorage é preservado e admite recuperação explícita', async t => {
  const {page}=await setup(t,()=>Object.defineProperty(window,'indexedDB',{get(){throw Error('indisponível');}}));
  await page.evaluate(()=>localStorage.setItem('chave-na-mao','{"registro":"incompleto"'));
  await page.reload();await page.waitForSelector('.hero');
  assert.equal(await page.evaluate(()=>writeBlocked),true);
  assert.equal(await page.evaluate(()=>recoveryCopies[0].text),'{"registro":"incompleto"');
  await route(page,'relatorio');const backup=await page.evaluate(()=>JSON.stringify(fresh()));
  await page.locator('#restore').setInputFiles({name:'valida.json',mimeType:'application/json',buffer:Buffer.from(backup)});
  await page.locator('[data-action="confirm-restore"]').click();await saved(page);
  assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('chave-na-mao')).version),1);
});

test('falha ao iniciar nova vistoria preserva registros e sucesso limpa apenas após salvar', async t => {
  const {page}=await setup(t);
  await page.evaluate(async()=>{state.property.name='Preservar';await persist();storageMode='none';});
  await page.locator('[data-action="new-inspection"]').click();await page.locator('[data-action="confirm-new-inspection"]').click();
  await page.waitForFunction(()=>!document.querySelector('[data-action="confirm-new-inspection"]').disabled);
  assert.equal(await page.evaluate(()=>state.property.name),'Preservar');
  await page.evaluate(()=>{storageMode='idb';});await page.locator('[data-action="confirm-new-inspection"]').click();await saved(page);
  assert.equal(await page.evaluate(()=>state.property.name),'');
  await page.reload();await page.waitForSelector('.hero');
  assert.equal(await page.evaluate(()=>allItems().length),62);
});

test('editar e excluir ambientes e itens personalizados preserva respostas ao renomear', async t => {
  const {page} = await setup(t);
  await page.locator('[data-action="add-room"]').click();await page.locator('#room-form [name="name"]').fill('Quarto extra');
  await page.locator('#room-form button').last().click();await page.waitForSelector('[data-action="edit-room"]');
  await page.locator('[data-action="edit-room"]').click();await page.locator('#edit-room-form [name="name"]').fill('Escritório');await page.locator('#edit-room-form button').last().click();await saved(page);
  assert.equal(await page.locator('.check-heading h2').textContent(),'Escritório');
  await page.locator('[data-action="add-item"]').click();await page.locator('#new-item-form [name="title"]').fill('Ar-condicionado');await page.locator('#new-item-form button').last().click();await saved(page);
  const id=await page.evaluate(() => state.rooms.at(-1).items.at(-1).id);
  await page.locator(`#item-${id} [data-status="ok"]`).click();await saved(page);
  await page.locator(`#item-${id} [data-action="edit-item"]`).click();await page.locator('#edit-item-form [name="title"]').fill('Ponto do ar-condicionado');await page.locator('#edit-item-form button').last().click();await saved(page);
  assert.equal(await page.evaluate(id => findItem(id).item.status,id),'ok');
  await page.locator(`#item-${id} [data-action="edit-item"]`).click();await page.locator('[data-action="delete-item"]').click();await page.locator('[data-action="confirm-delete"]').click();await saved(page);
  assert.equal(await page.evaluate(id => !!findItem(id),id),false);
  await page.locator('[data-action="edit-room"]').click();await page.locator('[data-action="delete-room"]').click();await page.locator('[data-action="confirm-delete"]').click();await saved(page);
  assert.equal(await page.evaluate(() => state.rooms.length),10);
});

test('processamento de foto cancelado não interfere em outra evidência', async t => {
  const {page}=await setup(t);await route(page,'checklist/preparo');
  await page.evaluate(() => {compress=async file=>{await new Promise(r=>setTimeout(r,300));return {src:'data:image/jpeg;base64,/9j/2Q==',caption:file.name};};detailModal('i1');});
  await page.locator('#camera-input').setInputFiles({name:'cancelada.png',mimeType:'image/png',buffer:Buffer.from('teste')});
  await page.locator('#modal [data-action="close"]').first().click();await page.evaluate(() => detailModal('i2'));await page.waitForTimeout(500);
  assert.equal(await page.locator('.photo-wrap').count(),0);assert.equal(await page.locator('#photo-message').textContent(),'');
});

test('HTML exportado preserva cores, fotos e impressão independente', async t => {
  const {page,context}=await setup(t);await route(page,'relatorio');
  const downloadPromise=page.waitForEvent('download');await page.locator('[data-action="download-report"]').click();
  const download=await downloadPromise;const stream=await download.createReadStream();const chunks=[];for await(const chunk of stream)chunks.push(chunk);
  const exported=await context.newPage();await exported.setContent(Buffer.concat(chunks).toString());
  assert.equal(await exported.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--green')),'#213d39');
  assert.equal(await exported.locator('.report-item').count(),62);
  assert.equal(await exported.evaluate(() => [...document.styleSheets[0].cssRules].some(rule=>rule.type===CSSRule.IMPORT_RULE)),false);
});

test('layouts com textos longos e PDF com várias fotos e anotações extensas', async t => {
  const {page}=await setup(t);
  await page.evaluate(() => {state.property.name='W'.repeat(250);allItems()[0].note='Evidência '.repeat(1400);});
  for(const width of [320,360,390,650,768,850,1024,1440]){
    await page.setViewportSize({width,height:844});
    for(const hash of ['inicio','checklist','pendencias','relatorio']){
      await route(page,hash);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth<=innerWidth),true,`${width}px em ${hash}`);
    }
  }
  const photo=await samplePhoto(page);
  await route(page,'checklist/preparo');await page.locator('#item-i1 [data-action="item-detail"]').click();await upload(page,'#photo-input',Array(8).fill(photo));await page.locator('[data-action="save-detail"]').click();await saved(page);
  await route(page,'relatorio');await page.emulateMedia({media:'print'});
  assert.equal(await page.locator('.page-eyebrow').isVisible(),false);
  assert.equal(await page.locator('.report-room thead').first().evaluate(el=>getComputedStyle(el).display),'table-header-group');
  const out=process.env.TEST_OUTPUT||path.join(os.tmpdir(),'chave-na-mao-tests');fs.mkdirSync(out,{recursive:true});
  const pdf=await page.pdf({path:path.join(out,'relatorio-teste.pdf'),format:'A4',printBackground:true,preferCSSPageSize:true});
  assert.equal(pdf.subarray(0,4).toString(),'%PDF');
  await page.emulateMedia({media:'screen'});await page.setViewportSize({width:390,height:844});
  await route(page,'checklist/preparo');await page.locator('#item-i1 [data-action="item-detail"]').click();
  await page.screenshot({path:path.join(out,'evidencia-celular.png')});
});
