const ICONS={key:'<circle cx="8" cy="8" r="5"/><path d="m12 12 9 9m-4-4-3 3m0-6-3 3"/>',home:'<path d="m3 10 9-7 9 7v10H3z"/><path d="M9 20v-7h6v7"/>',house:'<path d="m2 10 10-8 10 8M5 8v14h14V8M9 22v-8h6v8M8 9h2m4 0h2"/>',list:'<rect x="5" y="4" width="15" height="18" rx="2"/><path d="M9 2h7v4H9zm0 9 1 1 2-2m2 2h3m-8 5 1 1 2-2m2 2h3"/>',flag:'<path d="M5 22V3m0 1c5-5 9 5 15 0v11c-6 5-10-5-15 0"/>',file:'<path d="M14 2H5v20h14V7zM14 2v6h5M8 12h8m-8 4h8"/>',help:'<circle cx="12" cy="12" r="9"/><path d="M9 8a3 3 0 0 1 6 1c0 2-3 2-3 5m0 3h.01"/>',arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',check:'<path d="m5 12 4 4L20 5"/>',circle:'<circle cx="12" cy="12" r="9"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',alert:'<path d="m12 3 10 18H2zM12 9v5m0 3h.01"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>',camera:'<path d="M3 7h4l2-3h6l2 3h4v14H3z"/><circle cx="12" cy="13" r="4"/>',note:'<path d="M20 11v10H3V4h10m-4 9 1 4 4-1 8-8-5-5z"/>',download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',print:'<path d="M6 8V2h12v6M6 17H3V8h18v9h-3M6 14h12v8H6zm11-3h.01"/>',sofa:'<path d="M5 11V6h14v5M2 10h4v7h12v-7h4v10H2zm2 10v2m16-2v2"/>',bed:'<path d="M3 20V6m0 9h18v5m0-5V9H3m3 0V6h6v3m-9 9h18"/>',kitchen:'<path d="M3 3h18v18H3zm0 9h18M7 6h3v3H7zm8 0h2m-6 10v2m3-2v2"/>',bath:'<path d="M3 12h18v3a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5zm2 0V5a3 3 0 0 1 6 0M6 20v2m12-2v2"/>',wash:'<rect x="3" y="2" width="18" height="20" rx="2"/><circle cx="12" cy="14" r="5"/><path d="M6 6h.01M10 6h6m-8 8c3-3 5 3 8 0"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 1v2m0 18v2M1 12h2m18 0h2M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/>',bag:'<path d="M4 7h16v15H4zm4 0V4h8v3"/>',plus:'<path d="M12 4v16M4 12h16"/>',shield:'<path d="M12 2 3 6v7c0 5 9 9 9 9s9-4 9-9V6zM8 12l3 3 5-6"/>',bulb:'<path d="M8 17c0-3-3-4-3-8a7 7 0 0 1 14 0c0 4-3 5-3 8zm0 3h8m-6 3h4"/>'};
const icon=n=>`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n]||ICONS.home}</svg>`;
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const LABEL={ok:'OK',issue:'Problema',na:'Não se aplica',untested:'Não testado',pending:'Sem registro'};
const KIT=['Documento e agendamento','Contrato e memorial descritivo','Celular carregado e carregador','Trena e lanterna','Bolinha para observar o caimento','Papel e caneta'];
const COMMON=[['Paredes e teto','Observe manchas, umidade, trincas, bolhas e falhas na pintura. Use a lanterna de lado para enxergar melhor.'],['Piso e rodapés','Procure peças quebradas, riscos, rejunte ausente e rodapés soltos. Observe desníveis e compare o acabamento com o memorial.'],['Portas e fechaduras','Abra e feche por completo. Teste maçanetas, chaves, trincos e batentes. Veja se a porta raspa no piso.'],['Janelas e vidros','Abra e feche as folhas. Confira travas, vidros, vedações e possíveis riscos. Não se incline para fora.'],['Tomadas e interruptores','Com energia liberada e autorização, teste tomadas com carregador e os interruptores com lâmpadas instaladas. Não abra tomadas ou quadros.'],['Acabamento previsto','Compare materiais, pontos elétricos e detalhes deste ambiente com a planta e o memorial descritivo.']];
function fresh(){let k=0;const room=(id,name,ico,items)=>({id,name,icon:ico,items:items.map(([title,tip])=>({id:'i'+ ++k,title,tip,status:'pending',note:'',photos:[]}))});return {version:1,property:{name:'',unit:'',address:'',builder:'',inspector:'',date:new Date().toLocaleDateString('en-CA'),protocol:'',notes:''},kit:{},settings:{autoAdvance:true},rooms:[
room('preparo','Antes de começar','bag',[
['Identificação do apartamento','Confira número da unidade, bloco, vaga e endereço. Registre a data e quem acompanha a vistoria pela construtora.'],['Contrato, planta e memorial','Tenha uma cópia acessível. Use o memorial para conferir os materiais e o que está previsto para entrega.'],['Água e energia disponíveis','Peça a liberação para os testes. Se não estiverem disponíveis, registre como “Não testado” nos itens afetados.'],['Registro inicial','Fotografe a entrada e uma visão geral de cada ambiente. Registre o estado da unidade antes de começar.']]),
room('geral','Entrada e instalações','key',[
['Porta de entrada e chaves','Teste todas as chaves e a fechadura. Confira olho mágico, batente, maçaneta e acabamento.'],['Quadro elétrico','Confira visualmente tampa, identificação dos circuitos e acesso. Peça demonstração ao responsável; não remova proteções nem toque em fios.'],['Interfone e campainha','Peça ajuda à portaria ou ao responsável para testar chamada, áudio e abertura, quando instalados.'],['Sinais de umidade e trincas','Observe cantos, encontro de paredes e teto e entorno das janelas. Fotografe com uma referência de tamanho.'],['Gás e pontos previstos','Confira apenas visualmente os pontos e a documentação prevista. Peça teste ao profissional habilitado; não abra válvulas nem use chama.']]),
room('sala','Sala de estar','sofa',COMMON),
room('quarto1','Quarto 1','bed',COMMON),
room('quarto2','Quarto 2','bed',COMMON),
room('cozinha','Cozinha','kitchen',[...COMMON,
['Torneira, cuba e sifão','Com água liberada, abra a torneira e observe pressão, escoamento e vazamentos nas conexões e sob a cuba.'],['Bancada e revestimento','Confira trincas, lascas, fixação, rejuntes e vedação junto à parede.'],['Ralos e escoamento','Se autorizado, use pouca água para observar o escoamento. Não alague o piso. Confira grelhas e odores.']]),
room('banheiro','Banheiro','bath',[...COMMON,
['Torneiras, registros e vazamentos','Abra e feche os pontos com autorização. Observe vazamentos nas conexões e vedação dos registros.'],['Vaso sanitário e descarga','Teste a descarga; observe vazamentos, fixação, louça trincada e se a água para de correr após encher.'],['Ralo e caimento do piso','Com autorização, use pouca água na área molhada e observe se segue para o ralo. Registre água empoçada.'],['Ponto de chuveiro e ventilação','Confira visualmente os pontos previstos e a janela ou ventilação. Não instale chuveiro nem toque na fiação.']]),
room('servico','Área de serviço','wash',[...COMMON.filter((_,i)=>i!==2),
['Tanque, torneira e sifão','Teste água e escoamento quando liberados. Confira fixação do tanque e vazamentos nas conexões.'],['Pontos da máquina de lavar','Confira entrada de água, saída de esgoto e tomada conforme a planta. Peça orientação sobre o uso.'],['Ralo e escoamento','Com autorização e pouca água, observe caimento e escoamento. Confira a tampa do ralo.']]),
room('varanda','Varanda / sacada','sun',[
['Piso, ralo e acabamento','Confira trincas, revestimento e escoamento, se houver ralo. Marque “Não se aplica” se a unidade não tem varanda.'],['Guarda-corpo','Observe visualmente fixações aparentes, corrosão, vidros e acabamento. Não suba, se incline nem force a estrutura.'],['Porta e vedação','Teste abertura, fechamento e trava. Observe frestas e vedação na transição para o ambiente interno.']]),
room('entrega','Conferência final','file',[
['Pendências no termo da construtora','Revise os problemas e testes não realizados. Peça que constem no termo de vistoria e guarde uma cópia.'],['Prazo e canal de atendimento','Solicite por escrito protocolo, contato para acompanhamento e prazo informado para correção de cada pendência.'],['Manuais, garantias e chaves','Confira o manual do proprietário, orientações de manutenção, garantias e quantidade de chaves e controles previstos.'],['Vaga e áreas vinculadas','Confira identificação e localização da vaga ou depósito previstos no contrato. Registre divergências.'],['Cópia do seu registro','Exporte o relatório e uma cópia dos dados com as fotos. Guarde junto dos documentos e do termo da construtora.']])],createdAt:new Date().toISOString(),updatedAt:null};}
let state,db,storageMode='idb',view='inicio',roomId='preparo',filter='all',issueFilter='issue',saveQueue=Promise.resolve(),toastTimer,baseRevision=null,writeBlocked=false,unsaved=false,pendingSaves=0,recoveryCopies=[],blockReason='';
const LIMITS={rooms:80,items:200,photos:8};
const revisionOf=data=>data ? (data.revision||JSON.stringify(data)) : null;
function localRevisionOf(text){try{return revisionOf(JSON.parse(text||'null'));}catch{return 'raw:'+text;}}
const $=s=>document.querySelector(s), allItems=()=>state.rooms.flatMap(r=>r.items), counts=items=>({total:items.length,done:items.filter(i=>i.status!=='pending').length,ok:items.filter(i=>i.status==='ok').length,issue:items.filter(i=>i.status==='issue').length,untested:items.filter(i=>i.status==='untested').length,na:items.filter(i=>i.status==='na').length,pending:items.filter(i=>i.status==='pending').length}), pct=c=>Math.round(c.done/c.total*100)||0;
function hydrateIcons(root=document){root.querySelectorAll('[data-icon]').forEach(e=>e.innerHTML=icon(e.dataset.icon));}
function toast(t){$('#toast').textContent=t;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),4000);}
function storageLabel(t,error=false){$('#save-state').innerHTML='<i></i>'+esc(t);$('#save-state').classList.toggle('error',error);}
// Read failures and invalid records must never silently replace an existing inspection.
async function openStorage(){
 let idbData,localData,localText;
 try{
  db=await new Promise((resolve,reject)=>{const req=indexedDB.open('chave-na-mao',1);req.onupgradeneeded=()=>req.result.createObjectStore('data');req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);req.onblocked=()=>reject(Error('Armazenamento ocupado em outra aba.'));});
  db.onversionchange=()=>{db.close();blockWrites('O armazenamento mudou em outra aba. Recarregue para continuar.');};
  idbData=await new Promise((resolve,reject)=>{const req=db.transaction('data').objectStore('data').get('inspection');req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});
 }catch{db=null;}
 try{localText=localStorage.getItem('chave-na-mao');if(localText)localData=JSON.parse(localText);}catch{if(localText)recoveryCopies.push({name:'armazenamento-alternativo',text:localText});}
 storageMode=db?'idb':'local';
 const data=idbData??localData;
 if(idbData==null&&localData!=null)storageMode='local';
 if(idbData!=null&&localText&&JSON.stringify(idbData)!==JSON.stringify(localData)&&!recoveryCopies.length)recoveryCopies.push({name:'armazenamento-alternativo',text:localText});
 baseRevision=data!=null?revisionOf(data):(storageMode==='local'?localRevisionOf(localText):null);
 if(data!=null){
  try{state=validate(data);storageLabel('Salvo neste aparelho');if(storageMode==='local')toast('Vistoria recuperada do armazenamento alternativo.');}
  catch{state=fresh();recoveryCopies.unshift({name:'registro-original',text:JSON.stringify(data,null,2)});writeBlocked=true;blockReason='recovery';storageLabel('Dados precisam de recuperação',true);}
 }else{
  state=fresh();
  if(recoveryCopies.length){writeBlocked=true;blockReason='recovery';storageLabel('Dados precisam de recuperação',true);}
  else if(!db){try{const key='chave-na-mao-test';localStorage.setItem(key,'1');localStorage.removeItem(key);storageLabel('Pronto para começar');}catch{storageMode='none';storageLabel('Exporte para guardar',true);}}
  else storageLabel('Pronto para começar');
 }
}
function blockWrites(message){writeBlocked=true;blockReason='conflict';storageLabel('Conflito · baixe uma cópia',true);toast(message);if(state)render();}
function storageNotice(){return `${writeBlocked?`<section class="notice storage-notice" role="alert"><div><b>Seus dados precisam de atenção.</b><p>Esta aba não vai substituir o registro salvo. Baixe suas alterações antes de recarregar. Se houver dados incompatíveis, guarde o original para recuperação.</p><div class="actions"><button class="btn secondary" data-action="backup">Baixar alterações desta aba</button><button class="btn secondary" data-action="reload-data">Recarregar dados salvos</button></div></div></section>`:''}${recoveryCopies.length?`<section class="notice storage-notice"><div><b>Há dados anteriores disponíveis para recuperação.</b><p>Baixe o arquivo original. Você pode restaurar uma cópia válida na aba Relatório.</p><button class="btn secondary" data-action="recovery-download">Baixar dados anteriores</button></div></section>`:''}`;}
function persist(){
 state.updatedAt=new Date().toISOString();unsaved=true;pendingSaves++;storageLabel('Salvando…');
 const target=state,snapshot=structuredClone(state);snapshot.revision=crypto.randomUUID();
 const task=saveQueue.catch(()=>{}).then(async()=>{
  try{
   if(writeBlocked)throw Error('blocked');
   if(storageMode==='idb')await new Promise((resolve,reject)=>{
    const tx=db.transaction('data','readwrite'),store=tx.objectStore('data'),req=store.get('inspection');let conflict=false;
    req.onsuccess=()=>{if(revisionOf(req.result)!==baseRevision){conflict=true;tx.abort();return;}store.put(snapshot,'inspection');};
    tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(Error(conflict?'conflict':'storage'));
   });
   else if(storageMode==='local'){
    // Web Locks serializes the compare/write pair across tabs.
    if(!navigator.locks)throw Error('locks');
    await navigator.locks.request('chave-na-mao-save',()=>{
     const current=localStorage.getItem('chave-na-mao');
     if(localRevisionOf(current)!==baseRevision)throw Error('conflict');
     localStorage.setItem('chave-na-mao',JSON.stringify(snapshot));
    });
   }else throw Error('storage');
   baseRevision=snapshot.revision;target.revision=snapshot.revision;syncChannel?.postMessage({revision:baseRevision,mode:storageMode});
   return true;
  }catch(err){
   if(err.message==='blocked'){storageLabel(blockReason==='recovery'?'Dados precisam de recuperação':'Conflito · baixe uma cópia',true);toast('A gravação está bloqueada para preservar seus dados. Baixe uma cópia antes de continuar.');}
   else if(err.message==='conflict')blockWrites('Outra aba alterou a vistoria. Baixe suas alterações antes de recarregar.');
   else{storageLabel('Falha ao salvar · exporte',true);toast(err.message==='locks'?'Este navegador não permite salvar com proteção entre abas. Exporte os dados ou use um navegador atualizado.':'Não foi possível salvar no aparelho. Baixe uma cópia dos dados para guardar seu registro.');}
   return false;
  }finally{pendingSaves--;}
 });
 saveQueue=task.then(ok=>{if(ok&&!pendingSaves){unsaved=false;storageLabel('Salvo neste aparelho');}return ok;});
 return saveQueue;
}
function findItem(id){for(const r of state.rooms){const item=r.items.find(i=>i.id===id);if(item)return {item,room:r};}}
function navigate(){view=location.hash.slice(1).split('/')[0]||'inicio';if(!['inicio','checklist','pendencias','relatorio'].includes(view))view='inicio';const target=location.hash.split('/')[1];if(target&&state.rooms.some(r=>r.id===target))roomId=target;render();window.scrollTo(0,0);}
function render(){const labels={inicio:'Visão geral',checklist:'Checklist',pendencias:'Pendências',relatorio:'Relatório'};document.querySelectorAll('[data-nav]').forEach(a=>a.classList.toggle('active',a.dataset.nav===view));$('#breadcrumb').textContent=labels[view];const c=counts(allItems());$('#nav-total').textContent=c.total;$('#nav-issues').textContent=c.issue;$('#app').innerHTML=storageNotice()+({inicio:home,checklist:checklist,pendencias:issues,relatorio:reportView}[view])();hydrateIcons($('#app'));}
function heading(eyebrow,title,subtitle,extra=''){return `<div class="eyebrow page-eyebrow">${eyebrow}</div><div class="page-head"><div><h1>${title}</h1><p>${subtitle}</p></div>${extra}</div>`;}
function roomCard(r){const c=counts(r.items);return `<a class="room-card" href="#checklist/${r.id}"><div class="room-top"><div class="room-symbol">${icon(r.icon)}</div><span>${c.done} de ${c.total}</span></div><h3>${esc(r.name)}</h3><p>${c.done===c.total?'Todos os itens registrados':c.issue?c.issue+' problema(s) registrado(s)':'Um olhar em cada detalhe'}</p><div class="bar"><span style="width:${pct(c)}%"></span></div><span class="room-arrow">${icon('arrow')}</span></a>`;}
function building(){return `<svg viewBox="0 0 340 280" xmlns="http://www.w3.org/2000/svg" aria-label="Ilustração de um apartamento com uma chave" role="img"><ellipse cx="180" cy="245" rx="132" ry="13" fill="#d6ddc9"/><path d="M89 75 194 36l78 34v173H89z" fill="#cdd7bc"/><path d="m89 75 104 22 79-27-78-34z" fill="#e8ebdc"/><path d="m193 97 79-27v173l-79 6z" fill="#a6b695"/><path d="M89 75v165l104 9V97z" fill="#e9e6cc"/><path d="m80 75 113 24 86-30-86-39z" fill="#f6f1dd"/><path d="m80 75 113 24v7L80 82zm113 24 86-30v7l-86 30z" fill="#b8c5a5"/><g fill="#6c826b"><path d="m105 100 23 5v28l-23-4zm42 9 26 6v29l-26-4zm-42 43 23 4v29l-23-3zm42 8 26 4v29l-26-3zm64-50 17-6v27l-17 5zm33-11 15-5v27l-15 5zm-33 55 17-5v27l-17 4zm33-10 15-4v27l-15 4z"/></g><g stroke="#c8d2b7" stroke-width="2"><path d="m116 102 0 29m44-19v30m-55-25 23 4m19 7 26 5m-57 22v28m44-21v30m51-68 17-6m-8-10v27m24-16 15-5m-8-10v27"/></g><path d="m121 242 1-39 34 3v40" fill="#a77852"/><path d="m126 242 1-33 24 2v33" fill="#c3976b"/><circle cx="145" cy="226" r="1.5" fill="#f5d2a0"/><path d="M62 242h18l-3-30H66z" fill="#b97950"/><path d="M71 215v-37m0 26c-21-1-25-15-14-20 8-3 14 9 14 9m0 4c20 0 24-17 14-19-9-2-14 10-14 10m0 1c-9-3-15-23-5-26 10-2 14 20 5 26" fill="#8b9f76" stroke="#7a916c" stroke-width="1.5"/><g transform="translate(251 169) rotate(28)"><circle r="24" fill="#e3b777"/><circle r="13" fill="#e9eddd"/><path d="M-6 22h13v61H-6zm12 47h16v10H6zm0-18h11v9H6z" fill="#e3b777"/><path d="M-2 27v51" stroke="#f7d8a2" stroke-width="2"/></g><path d="M251 173c-17-23-17-48-3-48 19 0 15 36 10 39" fill="none" stroke="#f5f1db" stroke-width="4"/><g fill="#fcfaf0"><path d="m52 94 3 8 8 3-8 3-3 8-3-8-8-3 8-3z"/><path d="m281 116 2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/></g></svg>`;}
function newInspectionPanel(){return `<section class="subtle-panel new-inspection"><h3>Vai começar outra vistoria?</h3><p>Limpe os registros deste aparelho para começar do zero. Baixe o relatório ou uma cópia dos dados antes de continuar.</p><div class="actions" style="margin-top:15px"><button class="btn secondary" data-action="new-inspection">${icon('plus')}Começar nova vistoria</button></div></section>`;}
function home(){const c=counts(allItems()),started=c.done>0;const next=state.rooms.find(r=>r.items.some(i=>i.status==='pending'))||state.rooms[0];return `${heading('UM NOVO COMEÇO','Minha vistoria','Cada detalhe conferido. Mais tranquilidade para você.',`<span class="pill">${icon('home')} ENTREGA DO APARTAMENTO</span>`)}<section class="hero"><div class="hero-copy"><div class="eyebrow">BEM-VINDO AO SEU PRÓXIMO PASSO</div><h1>Seu novo lar,<br>com tudo em ordem.</h1><p>Um guia simples para conferir seu apartamento, registrar detalhes e receber suas chaves com mais segurança.</p><a class="btn primary" href="#checklist/${next.id}">${started?'Continuar vistoria':'Começar minha vistoria'} ${icon('arrow')}</a></div><div class="hero-art">${building()}<div class="art-tag">${icon('key')} Sua conquista merece cuidado.</div></div></section><div class="stats"><div class="stat"><span class="stat-icon">${icon('list')}</span><div><strong>${c.done}<small>/ ${c.total}</small></strong><p>Itens registrados</p></div></div><div class="stat"><span class="stat-icon">${icon('flag')}</span><div><strong>${c.issue.toString().padStart(2,'0')}</strong><p>Problemas encontrados</p></div></div><div class="stat"><span class="stat-icon">${icon('home')}</span><div><strong>${state.rooms.filter(r=>r.items.every(i=>i.status!=='pending')).length}<small>/ ${state.rooms.length}</small></strong><p>Etapas percorridas</p></div></div></div><div class="columns"><section><div class="section-title"><h2>Um ambiente de cada vez</h2><a class="small-link" href="#checklist">Ver checklist ${icon('arrow')}</a></div><div class="room-grid">${state.rooms.map(roomCard).join('')}</div><button class="text-btn" style="margin-top:18px" data-action="add-room">${icon('plus')} Adicionar outro ambiente</button></section><aside class="right-col"><section class="tip-card"><div class="tip-kicker">${icon('bulb')} DICA PARA SUA VISTORIA</div><h3>Não tenha pressa.<br>Este momento é seu.</h3><p>Comece pela entrada e siga ambiente por ambiente. Encontrou algo? Fotografe de perto e de longe, e anote onde fica.</p></section><section class="kit"><h3>Antes de sair de casa</h3><p>Uma ajudinha para preparar a mochila.</p>${KIT.map((s,i)=>`<label><input type="checkbox" data-kit="${i}" ${state.kit[i]?'checked':''}>${s}</label>`).join('')}<div class="kit-footer">${icon('shield')} Seus registros ficam neste navegador. Baixe uma cópia para guardar em outro lugar.</div></section></aside></div><div class="property-strip"><div><b>${esc(state.property.name||'Vamos identificar seu apartamento?')}</b><small>${esc(state.property.unit||'Preencha os dados que vão aparecer no relatório.')}</small></div><button class="btn secondary" data-action="property">${icon('note')} ${state.property.name?'Editar dados':'Preencher dados'}</button></div>${newInspectionPanel()}`;}
function checkItem(item,n,room,category=false){return `<article class="check-card ${item.status==='issue'?'has-issue':''}" id="item-${item.id}">${category?`<div class="category">${esc(room.name)}</div>`:''}<div class="item-heading"><div class="item-number">${String(n+1).padStart(2,'0')}</div><div><h3>${esc(item.title)}</h3><p>${esc(item.tip)}</p></div></div><div class="status-options" aria-label="Situação de ${esc(item.title)}">${['ok','issue','na','untested'].map(s=>`<button class="status-option ${item.status===s?'chosen':''}" aria-pressed="${item.status===s}" data-action="status" data-id="${item.id}" data-status="${s}">${icon({ok:'check',issue:'flag',na:'close',untested:'clock'}[s])}${LABEL[s]}</button>`).join('')}</div><div class="item-foot"><button data-action="item-detail" data-id="${item.id}">${icon('camera')} ${item.photos.length?item.photos.length+' foto(s) · ':''}${item.note?'Editar anotação':'Anotar ou adicionar foto'}</button><span class="status-label">${item.status==='pending'?'A conferir':LABEL[item.status]}${item.status!=='pending'?` <button data-action="clear-status" data-id="${item.id}" aria-label="Limpar situação" title="Limpar situação">↶</button>`:''}</span></div>${item.custom?`<button class="text-btn item-edit" data-action="edit-item" data-id="${item.id}">Editar item personalizado</button>`:''}${item.note?`<p class="item-note">${esc(item.note)}</p>`:''}${item.photos.length?`<div class="thumbs">${item.photos.map((p,j)=>`<button class="photo-thumb" data-action="view-photo" data-id="${item.id}" data-index="${j}" aria-label="Ampliar foto ${j+1}"><img src="${p.src}" alt="${esc(p.caption||'Foto de '+item.title)}" loading="lazy"></button>`).join('')}</div>`:''}</article>`;}
function checklist(){const r=state.rooms.find(r=>r.id===roomId)||state.rooms[0],c=counts(r.items);roomId=r.id;const items=r.items.filter(i=>filter==='all'||i.status===filter);return `${heading('PASSO A PASSO','Seu checklist de entrega','Confira, teste e registre. Você pode parar e continuar depois.',`<button class="btn secondary" data-action="property">${icon('note')} Dados do imóvel</button>`)}<div class="check-layout"><aside class="room-list">${state.rooms.map(r=>{const x=counts(r.items);return `<button class="${r.id===roomId?'selected':''}" data-action="room" data-id="${r.id}">${icon(r.icon)}${esc(r.name)}<small>${x.done}/${x.total}</small></button>`;}).join('')}<button data-action="add-room">${icon('plus')}Novo ambiente</button></aside><section class="check-main"><select class="room-select" id="room-select" aria-label="Escolha a etapa">${state.rooms.map((r,i)=>`<option value="${r.id}" ${r.id===roomId?'selected':''}>${String(i+1).padStart(2,'0')} · ${esc(r.name)}</option>`).join('')}</select><div class="check-heading"><div><h2>${esc(r.name)}</h2><p>Observe com calma e registre o resultado de cada item.</p></div><div class="actions"><button class="btn secondary" data-action="add-room">Novo ambiente</button>${r.custom?`<button class="btn secondary" data-action="edit-room" data-id="${r.id}">Editar ambiente</button>`:''}<span class="pill">${c.done}/${c.total}</span></div></div><div class="progress-row"><div class="bar"><span style="width:${pct(c)}%"></span></div><span>${pct(c)}%</span></div><div class="filters">${[['all','Todos'],['pending','A conferir'],['issue','Problemas'],['untested','Não testados']].map(([v,t])=>`<button class="filter ${filter===v?'active':''}" data-action="filter" data-value="${v}">${t}</button>`).join('')}</div><label class="advance-toggle"><input type="checkbox" id="auto-advance" ${state.settings.autoAdvance?'checked':''}>Avançar automaticamente no celular</label>${items.length?items.map(i=>checkItem(i,r.items.indexOf(i),r)).join(''):'<div class="empty">'+icon('check')+'<h3>Nenhum item neste filtro</h3><p>Escolha “Todos” para visualizar esta etapa completa.</p></div>'}<div class="room-actions"><button class="btn secondary" data-action="add-item">${icon('plus')}Adicionar item</button><button class="btn primary" data-action="next-room">${state.rooms.indexOf(r)===state.rooms.length-1?'Revisar pendências':'Próxima etapa'}${icon('arrow')}</button></div><div class="notice">${icon('help')}Sem água, energia ou condições para testar? Marque “Não testado” e anote o motivo. Use “Não se aplica” para o que não existe na sua unidade.</div>${state.rooms.indexOf(r)===state.rooms.length-1?newInspectionPanel():''}</section></div>`;}
function issues(){const c=counts(allItems()),selected=allItems().filter(i=>i.status===issueFilter);return `${heading('O QUE PRECISA DE ATENÇÃO','Minhas pendências','Reúna os registros e confira tudo com o responsável pela entrega.')}<div class="filters">${[['issue',`Problemas (${c.issue})`],['untested',`Não testados (${c.untested})`],['pending',`A conferir (${c.pending})`]].map(([v,t])=>`<button class="filter ${issueFilter===v?'active':''}" data-action="issue-filter" data-value="${v}">${t}</button>`).join('')}</div>${selected.length?selected.map((i,n)=>checkItem(i,n,findItem(i.id).room,true)).join(''):`<div class="empty">${icon(issueFilter==='issue'?'shield':'check')}<h3>${issueFilter==='issue'?'Nenhum problema registrado por enquanto':'Nenhum item nesta situação'}</h3><p>${c.pending?'Continue o checklist para conferir os próximos itens.':'Todos os itens já têm um registro.'}</p><a href="#checklist" class="btn primary">Voltar ao checklist ${icon('arrow')}</a></div>`}<div class="notice">${icon('file')}Peça que os problemas e os testes não realizados constem no termo da construtora. Anote o protocolo e guarde uma cópia.</div><a href="#relatorio" class="btn primary">Preparar meu relatório ${icon('arrow')}</a>`;}
function reportBody(){
 const p=state.property,c=counts(allItems());const date=p.date?new Date(p.date+'T12:00:00'):null;
 const fields=[['Empreendimento',p.name],['Unidade / bloco',p.unit],['Endereço',p.address],['Construtora',p.builder],['Vistoria realizada por',p.inspector],['Data da vistoria',date&&!isNaN(date)?date.toLocaleDateString('pt-BR'):''],['Protocolo / responsável',p.protocol]];
 return `<div class="report-paper"><div class="report-top"><div><div class="report-tag">CHAVE NA MÃO · REGISTRO PESSOAL</div><h2>Vistoria de entrega do apartamento</h2><small>Gerado em ${new Date().toLocaleString('pt-BR')}</small></div><span>${icon('key')}</span></div><div class="report-meta">${fields.map(([k,v])=>`<div><span>${k}</span>${esc(v||'Não informado')}</div>`).join('')}</div><div class="report-stats"><span>${c.ok} OK</span><span>${c.issue} problema(s)</span><span>${c.untested} não testado(s)</span><span>${c.na} não se aplica</span><span>${c.pending} sem registro</span></div><p class="report-summary">${c.done} de ${c.total} itens com situação registrada (${pct(c)}%). ${c.pending||c.untested?'Há itens sem verificação concluída.':'Todos os itens possuem situação registrada; confira as pendências abaixo.'}</p>${p.notes?`<section class="report-notes"><h3>Observações gerais</h3><p>${esc(p.notes)}</p></section>`:''}${state.rooms.map(r=>`<table class="report-room"><thead><tr><th scope="col"><h3>${esc(r.name)}</h3></th></tr></thead><tbody>${r.items.map(i=>`<tr><td class="report-item"><div class="report-item-head"><b>${esc(i.title)}</b><span>${i.status==='issue'?'⚑ ':''}${LABEL[i.status]}</span></div>${i.note?`<p>${esc(i.note)}</p>`:''}<div class="report-photos">${i.photos.map((photo,j)=>`<figure><img src="${photo.src}" alt="${esc(photo.caption||i.title)}"><figcaption>Foto ${j+1} · ${esc(i.title)}</figcaption></figure>`).join('')}</div></td></tr>`).join('')}</tbody></table>`).join('')}<div class="report-end">Registro pessoal de observações visuais e testes simples, sem vínculo com a construtora ou com o programa Minha Casa, Minha Vida. Não substitui avaliação técnica, laudo profissional ou o termo de vistoria da construtora. Confira o contrato e o memorial descritivo. Problemas não observados ou não testados podem existir. Guarde também os protocolos e documentos fornecidos pela construtora.</div></div>`;
}
function reportView(){const c=counts(allItems());return `${heading('PARA GUARDAR COM VOCÊ','Meu relatório','Seu registro completo, com situações, anotações e fotos.',`<button class="btn secondary" data-action="property">${icon('note')}Editar dados</button>`)}<div class="actions report-toolbar"><button class="btn primary" data-action="print">${icon('print')}Imprimir / salvar PDF</button><button class="btn secondary" data-action="download-report">${icon('download')}Baixar relatório HTML com fotos</button></div>${c.pending||c.untested?`<div class="notice">${icon('alert')}${c.pending} item(ns) sem registro e ${c.untested} não testado(s). Você pode exportar agora; essas situações ficam identificadas no relatório.</div>`:''}${reportBody()}<div class="subtle-panel"><h3>Guarde uma cópia dos seus dados</h3><p>O salvamento é neste navegador e aparelho. Limpar os dados do navegador apaga o registro. Baixe uma cópia para restaurar a vistoria, incluindo as fotos.</p><div class="actions" style="margin-top:15px"><button class="btn secondary" data-action="backup">${icon('download')}Baixar cópia dos dados</button><label class="btn secondary file-label">Restaurar cópia<input id="restore" type="file" accept=".json,application/json"></label></div></div>${newInspectionPanel()}`;}
function showModal(title,subtitle,content,actions=''){const el=$('#modal');photoSession++;$('#modal-content').innerHTML=`<div class="modal-head"><div><h2>${esc(title)}</h2>${subtitle?`<p>${esc(subtitle)}</p>`:''}</div><button class="close-btn" data-action="close" aria-label="Fechar">${icon('close')}</button></div>${content}${actions?`<div class="modal-actions">${actions}</div>`:''}`;hydrateIcons(el);if(!el.open)el.showModal();}
function propertyModal(){const p=state.property;const fields=[['name','Empreendimento','Ex.: Residencial Jardim'],['unit','Unidade / bloco','Ex.: Apto 204 · Bloco B'],['address','Endereço','Rua, número, cidade'],['builder','Construtora','Nome da construtora'],['inspector','Seu nome','Quem está realizando a vistoria'],['date','Data da vistoria',''],['protocol','Protocolo / responsável','Nome, contato ou protocolo']];showModal('Dados da vistoria','Essas informações aparecem no seu relatório.',`<form id="property-form"><div class="form-grid">${fields.map(([k,l,ph])=>`<label class="field ${k==='address'||k==='protocol'?'full':''}">${l}<input name="${k}" type="${k==='date'?'date':'text'}" value="${esc(p[k])}" placeholder="${ph}" maxlength="250"></label>`).join('')}<label class="field full">Observações gerais<textarea name="notes" maxlength="15000" placeholder="Ex.: água não liberada; prazo informado pela construtora…">${esc(p.notes)}</textarea></label></div><div class="modal-actions"><button type="button" class="btn secondary" data-action="close">Cancelar</button><button class="btn primary" type="submit">Salvar informações ${icon('check')}</button></div></form>`);}
let editingPhotos=[],editingId=null,photoSession=0;
function detailModal(id){const {item,room}=findItem(id);editingId=id;editingPhotos=structuredClone(item.photos);showModal(item.title,room.name,`<label class="field">O que você observou?<textarea id="item-note" maxlength="15000" placeholder="Descreva o problema, a localização e o que foi combinado com o responsável.">${esc(item.note)}</textarea></label><p class="muted" style="font-size:11px;margin:15px 0 8px">Fotografe o detalhe e uma visão mais ampla para localizar o ponto. Até 8 fotos por item.</p><div id="photo-list" class="photo-list"></div><div class="photo-sources"><label class="photo-upload">${icon('camera')}Tirar foto<input type="file" id="camera-input" accept="image/*" capture="environment"></label><label class="photo-upload">${icon('plus')}Escolher da galeria<input type="file" id="photo-input" accept="image/*" multiple></label></div><p class="camera-help muted">No celular, “Tirar foto” solicita a câmera traseira. A disponibilidade depende do aparelho e navegador.</p><div id="photo-message" role="status" class="muted" style="font-size:11px;margin-top:10px"></div>`,`<button class="btn secondary" data-action="close">Cancelar</button><button class="btn primary" data-action="save-detail">Salvar registro ${icon('check')}</button>`);renderPhotos();}
function renderPhotos(){const list=$('#photo-list');if(!list)return;list.innerHTML=editingPhotos.map((p,i)=>`<div class="photo-wrap"><button class="photo-thumb" data-action="view-photo" data-source="editing" data-index="${i}" aria-label="Ampliar foto ${i+1}"><img src="${p.src}" alt="Foto ${i+1}"></button><button class="remove-photo" data-action="remove-photo" data-index="${i}" aria-label="Remover foto ${i+1}">${icon('close')}</button></div>`).join('');}
function viewPhoto(button){
 const photos=button.dataset.source==='editing'?editingPhotos:findItem(button.dataset.id)?.item.photos;
 const photo=photos?.[Number(button.dataset.index)];if(!photo)return;
 const viewer=$('#photo-viewer');viewer.innerHTML=`<div class="modal-head"><h2>Foto da vistoria</h2><button class="close-btn" data-action="close-photo" aria-label="Fechar foto">${icon('close')}</button></div><img class="full-photo" src="${photo.src}" alt="${esc(photo.caption||'Foto da vistoria')}"><p>${esc(photo.caption||'')}</p>`;viewer.showModal();
}
async function addPhotos(input){
 const session=photoSession,photos=editingPhotos,save=$('[data-action="save-detail"]');
 if(!save||save.disabled)return;
 const inputs=[...document.querySelectorAll('.photo-sources input')];save.disabled=true;inputs.forEach(i=>i.disabled=true);
 const message=$('#photo-message');message.textContent='Preparando fotos…';const failures=[];
 try{
  for(const file of input.files){
   if(photos.length>=LIMITS.photos){failures.push('Limite de 8 fotos por item.');break;}
   try{const photo=await compress(file);if(session!==photoSession||!$('#modal').open)return;photos.push(photo);}catch(err){failures.push(err.message);}
  }
  if(session!==photoSession||!$('#modal').open)return;
  renderPhotos();message.textContent=failures.length?failures.join(' '):'Fotos prontas. Toque em “Salvar registro” para guardar.';
 }finally{save.disabled=false;inputs.forEach(i=>i.disabled=false);input.value='';}
}
function editRoomModal(id){
 const room=state.rooms.find(r=>r.id===id);if(!room?.custom)return;
 showModal('Editar ambiente','As respostas e fotos serão preservadas ao renomear.',`<form id="edit-room-form" data-id="${room.id}"><label class="field">Nome do ambiente<input name="name" required maxlength="70" value="${esc(room.name)}"></label><div class="modal-actions"><button type="button" class="btn secondary danger" data-action="delete-room" data-id="${room.id}">Excluir ambiente</button><button class="btn primary">Salvar nome</button></div></form>`);
}
function editItemModal(id){
 const found=findItem(id);if(!found?.item.custom)return;const {item}=found;
 showModal('Editar item personalizado','As respostas, anotações e fotos serão preservadas.',`<form id="edit-item-form" data-id="${item.id}"><label class="field">O que conferir?<input name="title" required maxlength="200" value="${esc(item.title)}"></label><label class="field">Orientação<textarea name="tip" maxlength="2000">${esc(item.tip)}</textarea></label><div class="modal-actions"><button type="button" class="btn secondary danger" data-action="delete-item" data-id="${item.id}">Excluir item</button><button class="btn primary">Salvar item</button></div></form>`);
}
async function compress(file){if(file.size>30*1024*1024)throw Error('A foto ultrapassa 30 MB. Escolha uma imagem menor.');const url=URL.createObjectURL(file);try{const img=await new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=()=>reject(Error('Não foi possível abrir esta imagem. Use JPG, PNG ou WebP.'));i.src=url;});const scale=Math.min(1,1400/Math.max(img.width,img.height));const canvas=document.createElement('canvas');canvas.width=Math.round(img.width*scale);canvas.height=Math.round(img.height*scale);const ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);return {src:canvas.toDataURL('image/jpeg',.78),caption:file.name};}finally{URL.revokeObjectURL(url);}}
function download(content,type,name){const blob=new Blob([content],{type});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);}
function fileName(suffix){return 'vistoria-'+(state.property.unit||'apartamento').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9-]/g,'-').toLowerCase()+'-'+(state.property.date||'registro')+suffix;}
async function downloadReport(){
 const css=[...document.styleSheets].map(sheet=>{try{return [...sheet.cssRules].filter(rule=>rule.type!==CSSRule.IMPORT_RULE).map(rule=>rule.cssText).join('\n');}catch{return '';}}).join('\n');
 download(`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Relatório de vistoria</title><style>${css}body{padding:25px;font-family:Arial,sans-serif}.report-paper{margin:auto}.export-actions{margin:0 auto 20px;max-width:850px;display:flex;gap:10px;flex-wrap:wrap}@media print{body{padding:0}.export-actions{display:none}}</style></head><body><div class="export-actions"><button class="btn primary" onclick="Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))).then(()=>window.print())">Imprimir / salvar PDF</button></div>${reportBody()}</body></html>`,'text/html;charset=utf-8',fileName('.html'));
 toast('Relatório HTML preparado, incluindo as fotos.');
}
function validate(data){
 if(!data||data.version!==1||!Array.isArray(data.rooms)||!data.rooms.length||!data.property||typeof data.property!=='object')throw Error('Arquivo inválido');
 const s=fresh(),roomIds=new Set(),itemIds=new Set();
 const standardRooms=new Map(s.rooms.map(room=>[room.id,room]));
 const textValue=(v,n=15000)=>typeof v==='string'?v.slice(0,n):'';
 const safeId=(id,used,prefix)=>{let result=typeof id==='string'&&/^[a-zA-Z0-9-]{1,100}$/.test(id)?id:prefix+crypto.randomUUID();if(used.has(result))result=prefix+crypto.randomUUID();used.add(result);return result;};
 for(const k of Object.keys(s.property))s.property[k]=textValue(data.property[k]);
 s.settings={autoAdvance:data.settings?.autoAdvance!==false};s.revision=textValue(data.revision,100)||null;s.kit={};
 for(let j=0;j<KIT.length;j++)s.kit[j]=!!data.kit?.[j];
 // Older inspections above the creation limits remain readable and exportable.
 s.rooms=data.rooms.map(r=>{
  if(!r||!Array.isArray(r.items)||!r.items.length)throw Error('Etapa inválida');
  const custom=r.custom===true||String(r.id).startsWith('custom-')||!standardRooms.has(r.id);
  return {id:safeId(r.id,roomIds,'room-'),name:textValue(r.name,100)||'Ambiente',icon:Object.hasOwn(ICONS,r.icon)?r.icon:'home',custom,items:r.items.map(i=>{
   if(!i||typeof i.title!=='string')throw Error('Item inválido');
   const photos=i.photos??[];
   if(!Array.isArray(photos)||photos.length>LIMITS.photos||photos.some(p=>!p||typeof p.src!=='string'||!/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(p.src)))throw Error('Fotos inválidas na cópia. O arquivo original foi preservado.');
   return {id:safeId(i.id,itemIds,'item-'),custom:i.custom===true||String(i.id).startsWith('custom-')||custom||!standardRooms.get(r.id)?.items.some(original=>original.title===i.title&&original.tip===i.tip),title:textValue(i.title,250),tip:textValue(i.tip,2000),status:['ok','issue','na','untested','pending'].includes(i.status)?i.status:'pending',note:textValue(i.note),photos:photos.map(p=>({src:p.src,caption:textValue(p.caption,250)}))};
  })};
 });
 s.createdAt=textValue(data.createdAt);s.updatedAt=textValue(data.updatedAt);return s;
}
document.addEventListener('click',async e=>{const b=e.target instanceof Element?e.target.closest('[data-action]'):null;if(!b||!state)return;const action=b.dataset.action;try{if(action==='close'){$('#modal').close();return;}if(action==='help'){showModal('Sua companhia na vistoria','Um guia de apoio para conferir seu apartamento.',`<ol class="help-steps"><li><b>Prepare-se:</b> leve documentos, o memorial descritivo e os itens da mochila.</li><li><b>Siga as etapas:</b> em cada item, leia a orientação e registre OK, Problema, Não se aplica ou Não testado.</li><li><b>Registre os detalhes:</b> anote a localização e adicione fotos. Você pode editar os registros depois.</li><li><b>Revise e guarde:</b> confira as pendências com o responsável e exporte o relatório. Na opção de impressão do celular, escolha salvar como PDF, quando disponível.</li></ol><div class="notice">${icon('shield')}Este é um registro pessoal. Para riscos, trincas importantes ou dúvidas técnicas, peça avaliação de profissional habilitado. Não toque em fios, teste gás por conta própria nem force guarda-corpos.</div><p class="muted" style="font-size:12px">Os dados ficam apenas neste navegador, sem sincronização entre aparelhos. Baixe uma cópia na aba Relatório. Para acesso rápido, adicione o link aos favoritos ou à tela inicial pelo menu do navegador.</p>`,`<button class="btn primary" data-action="close">Entendi, vamos lá ${icon('arrow')}</button>`);return;}
if(action==='new-inspection'){
 showModal('Começar uma nova vistoria?','Os registros atuais deste aparelho serão apagados.',`<p class="muted">Isso limpa os dados do imóvel, todas as respostas, anotações, fotos, a preparação da mochila e os ambientes ou itens adicionados. A nova vistoria começa com o checklist padrão.</p><p class="muted">Os relatórios e cópias que você já baixou continuam guardados. Se quiser preservar esta vistoria, baixe uma cópia agora.</p><button class="btn secondary" data-action="backup">${icon('download')}Baixar cópia antes de limpar</button>`,`<button class="btn secondary" data-action="close">Cancelar</button><button class="btn warm" data-action="confirm-new-inspection">Limpar e começar</button>`);
 return;
}
if(action==='confirm-new-inspection'){
 b.disabled=true;
 const previous=state,wasBlocked=writeBlocked;state=fresh();if(blockReason==='recovery')writeBlocked=false;
 if(!await persist()){state=previous;writeBlocked=wasBlocked||writeBlocked;render();b.disabled=false;toast('Não foi possível limpar os dados salvos. A vistoria atual foi mantida.');return;}
 blockReason='';roomId=state.rooms[0].id;filter='all';issueFilter='issue';editingId=null;editingPhotos=[];window.pendingRestore=null;
 $('#modal').close();$('#modal-content').replaceChildren();
 view='inicio';location.hash='inicio';render();window.scrollTo(0,0);$('#app').focus({preventScroll:true});toast('Nova vistoria pronta. Todos os registros anteriores foram limpos.');
 return;
}
if(action==='view-photo'){viewPhoto(b);return;}
if(action==='close-photo'){$('#photo-viewer').close();return;}
if(action==='edit-room'){editRoomModal(b.dataset.id);return;}
if(action==='edit-item'){editItemModal(b.dataset.id);return;}
if(action==='recovery-download'){for(const copy of recoveryCopies)download(copy.text,'application/json','vistoria-'+copy.name+'.json');return;}
if(action==='reload-data'){showModal('Recarregar os dados salvos?','As alterações desta aba que não foram salvas serão descartadas.',`<button class="btn secondary" data-action="backup">Baixar alterações antes de recarregar</button>`,`<button class="btn secondary" data-action="close">Cancelar</button><button class="btn primary" data-action="confirm-reload">Descartar e recarregar</button>`);return;}
if(action==='confirm-reload'){unsaved=false;location.reload();return;}
if(action==='delete-room'||action==='delete-item'){
 const isRoom=action==='delete-room',found=isRoom?state.rooms.find(r=>r.id===b.dataset.id):findItem(b.dataset.id)?.item;
 if(!found?.custom)return;
 if(!isRoom&&findItem(found.id).room.items.length===1){toast('O ambiente precisa ter pelo menos um item.');return;}
 showModal(isRoom?'Excluir ambiente?':'Excluir item?',isRoom?found.name:found.title,`<p>As respostas, anotações e fotos ${isRoom?'deste ambiente':'deste item'} serão excluídas. Baixe uma cópia se quiser guardá-las.</p><button class="btn secondary" data-action="backup">Baixar cópia dos dados</button>`,`<button class="btn secondary" data-action="close">Cancelar</button><button class="btn warm" data-action="confirm-delete" data-kind="${isRoom?'room':'item'}" data-id="${found.id}">Excluir definitivamente</button>`);return;
}
if(action==='confirm-delete'){
 const previous=structuredClone(state);b.disabled=true;
 if(b.dataset.kind==='room'){const room=state.rooms.find(r=>r.id===b.dataset.id);if(!room?.custom||state.rooms.length===1)return;state.rooms=state.rooms.filter(r=>r!==room);}
 else{const found=findItem(b.dataset.id);if(!found?.item.custom||found.room.items.length===1)return;found.room.items=found.room.items.filter(i=>i!==found.item);}
 if(!await persist()){state=previous;render();b.disabled=false;return;}
 if(!state.rooms.some(r=>r.id===roomId))roomId=state.rooms[0].id;
 $('#modal').close();render();toast('Exclusão salva neste aparelho.');return;
}
if(action==='property'){propertyModal();return;}
if(action==='room'){filter='all';roomId=b.dataset.id;location.hash='checklist/'+roomId;render();return;}
if(action==='filter'){filter=b.dataset.value;render();return;}
if(action==='issue-filter'){issueFilter=b.dataset.value;render();return;}
if(action==='status'||action==='clear-status'){
 const found=findItem(b.dataset.id);if(!found)return;
 const shouldAdvance=action==='status'&&state.settings.autoAdvance&&window.matchMedia('(max-width: 850px)').matches;
 const cards=shouldAdvance?[...document.querySelectorAll('#app .check-card')]:[];
 const currentIndex=cards.findIndex(card=>card.id==='item-'+b.dataset.id);
 const followingIds=currentIndex<0?[]:cards.slice(currentIndex+1).map(card=>card.id);
 found.item.status=action==='clear-status'?'pending':b.dataset.status;persist();render();
 if(shouldAdvance)requestAnimationFrame(()=>{
  const next=followingIds.map(id=>document.getElementById(id)).find(Boolean);
  const target=next||document.querySelector('.room-actions [data-action="next-room"]')||document.querySelector('#app .empty');
  if(target){
   if(next)target.setAttribute('tabindex','-1');
   target.focus({preventScroll:true});
   target.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:next?'start':'center'});
  }
 });
 return;
}
if(action==='item-detail'){detailModal(b.dataset.id);return;}
if(action==='remove-photo'){editingPhotos.splice(Number(b.dataset.index),1);renderPhotos();return;}
if(action==='save-detail'){const found=findItem(editingId);if(!found||b.disabled)return;b.disabled=true;found.item.note=$('#item-note').value;found.item.photos=structuredClone(editingPhotos);if(!await persist()){b.disabled=false;$('#photo-message').textContent='Registro ainda não salvo. Baixe uma cópia dos dados para guardar suas alterações.';return;}$('#modal').close();render();return;}
if(action==='next-room'){const index=state.rooms.findIndex(r=>r.id===roomId);filter='all';location.hash=index===state.rooms.length-1?'pendencias':'checklist/'+state.rooms[index+1].id;return;}
if(action==='add-room'){if(state.rooms.length>=LIMITS.rooms){toast('Limite de 80 ambientes atingido.');return;}showModal('Adicionar ambiente','Para outro quarto, banheiro ou espaço do apartamento.',`<form id="room-form"><label class="field">Nome do ambiente<input name="name" required maxlength="70" placeholder="Ex.: Quarto 3"></label><div class="modal-actions"><button type="button" class="btn secondary" data-action="close">Cancelar</button><button class="btn primary">Adicionar ambiente</button></div></form>`);return;}
if(action==='add-item'){if(state.rooms.find(r=>r.id===roomId).items.length>=LIMITS.items){toast('Limite de 200 itens por ambiente atingido.');return;}showModal('Adicionar item','Inclua algo específico do seu apartamento.',`<form id="new-item-form"><label class="field">O que conferir?<input name="title" required maxlength="200" placeholder="Ex.: Ponto de ar-condicionado"></label><label class="field" style="margin-top:15px">Orientação ou referência<textarea name="tip" maxlength="2000" placeholder="O que está previsto no memorial ou o que você quer observar."></textarea></label><div class="modal-actions"><button type="button" class="btn secondary" data-action="close">Cancelar</button><button class="btn primary">Adicionar item</button></div></form>`);return;}
if(action==='print'){await Promise.all([...document.querySelectorAll('.report-paper img')].map(i=>i.decode().catch(()=>{})));window.print();return;}
if(action==='download-report'){b.disabled=true;try{await downloadReport();}finally{b.disabled=false;}return;}
if(action==='backup'){download(JSON.stringify(state,null,2),'application/json',fileName('-dados.json'));toast('Cópia preparada, incluindo as fotos.');return;}
if(action==='confirm-restore'){
 if(!window.pendingRestore||b.disabled)return;b.disabled=true;
 const previous=state,wasBlocked=writeBlocked;
 if(blockReason==='recovery')writeBlocked=false;
 state=window.pendingRestore;
 if(!await persist()){state=previous;writeBlocked=wasBlocked||writeBlocked;render();b.disabled=false;toast('Não foi possível salvar a restauração. A vistoria anterior foi mantida.');return;}
 window.pendingRestore=null;blockReason='';roomId=state.rooms[0].id;filter='all';issueFilter='issue';$('#modal').close();render();toast('Cópia restaurada neste aparelho.');return;
}
}catch(err){toast('Não foi possível concluir. '+(err.message||'Tente novamente.'));}});
document.addEventListener('submit',async e=>{
 const form=e.target;if(!['property-form','room-form','new-item-form','edit-room-form','edit-item-form'].includes(form.id))return;e.preventDefault();
 const submit=form.querySelector('button:not([type="button"])');if(submit.disabled)return;submit.disabled=true;
 const d=Object.fromEntries(new FormData(form)),previous=structuredClone(state);let nextRoom=null;
 try{
  if(form.id==='property-form')Object.assign(state.property,d);
  if(form.id==='room-form'){
   if(!d.name.trim())throw Error('Preencha o nome do ambiente.');if(state.rooms.length>=LIMITS.rooms)throw Error('Limite de 80 ambientes atingido.');
   nextRoom='custom-'+crypto.randomUUID();state.rooms.push({id:nextRoom,name:d.name.trim(),icon:'home',custom:true,items:COMMON.map(([title,tip])=>({id:'custom-'+crypto.randomUUID(),custom:true,title,tip,status:'pending',note:'',photos:[]}))});
  }
  if(form.id==='new-item-form'){
   const room=state.rooms.find(r=>r.id===roomId);if(!d.title.trim())throw Error('Preencha o título.');if(room.items.length>=LIMITS.items)throw Error('Limite de 200 itens por ambiente atingido.');
   room.items.push({id:'custom-'+crypto.randomUUID(),custom:true,title:d.title.trim(),tip:d.tip.trim(),status:'pending',note:'',photos:[]});
  }
  if(form.id==='edit-room-form'){const room=state.rooms.find(r=>r.id===form.dataset.id);if(!room?.custom||!d.name.trim())throw Error('Nome inválido.');room.name=d.name.trim();}
  if(form.id==='edit-item-form'){const item=findItem(form.dataset.id)?.item;if(!item?.custom||!d.title.trim())throw Error('Título inválido.');item.title=d.title.trim();item.tip=d.tip.trim();}
  if(!await persist()){state=previous;render();return;}
  $('#modal').close();filter='all';if(nextRoom){roomId=nextRoom;location.hash='checklist/'+nextRoom;}render();toast('Informações salvas neste aparelho.');
 }catch(err){state=previous;render();toast(err.message);}finally{submit.disabled=false;}
});
document.addEventListener('change',async e=>{
 const t=e.target;
 if(t.matches('[data-kit]')){state.kit[t.dataset.kit]=t.checked;persist();}
 if(t.id==='auto-advance'){state.settings.autoAdvance=t.checked;persist();}
 if(t.id==='room-select'){filter='all';location.hash='checklist/'+t.value;}
 if(t.id==='photo-input'||t.id==='camera-input')await addPhotos(t);
 if(t.id==='restore'&&t.files[0]){
  try{const f=t.files[0];if(f.size>100*1024*1024)throw Error('Arquivo muito grande (máximo 100 MB).');const restored=validate(JSON.parse(await f.text()));window.pendingRestore=restored;
   showModal('Restaurar esta cópia?','A vistoria atual neste aparelho será substituída.',`<p class="muted">Cópia: <b>${esc(restored.property.name||'Apartamento')}</b> · ${restored.rooms.length} etapas. Baixe uma cópia dos dados atuais antes de continuar.</p><button class="btn secondary" data-action="backup">Baixar cópia atual</button>`,`<button class="btn secondary" data-action="close">Cancelar</button><button class="btn primary" data-action="confirm-restore">Restaurar cópia</button>`);
  }catch(err){toast('Não foi possível restaurar: '+err.message);}t.value='';
 }
});
$('#modal').addEventListener('close',()=>photoSession++);
const syncChannel=typeof BroadcastChannel==='function'?new BroadcastChannel('chave-na-mao-updates'):null;
if(syncChannel)syncChannel.onmessage=e=>{if(state&&e.data?.mode===storageMode&&e.data.revision!==baseRevision)blockWrites('A vistoria foi alterada em outra aba. Baixe suas alterações antes de recarregar.');};
window.addEventListener('storage',e=>{if(state&&storageMode==='local'&&e.key==='chave-na-mao')blockWrites('Os dados foram alterados em outra aba. Baixe suas alterações antes de recarregar.');});
window.addEventListener('hashchange',navigate);
window.addEventListener('beforeunload',e=>{if(unsaved||pendingSaves){e.preventDefault();e.returnValue='';}});
(async()=>{hydrateIcons();await openStorage();roomId=state.rooms[0].id;navigate();})();
