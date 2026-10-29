# Chave na mão

Aplicativo para acompanhar a vistoria de entrega de um apartamento pelo navegador, com interface adaptada para celular.

## Funcionalidades

- Checklist inicial com 62 itens, organizado por ambiente e etapa da entrega.
- Situações: OK, Problema, Não se aplica e Não testado.
- Anotações e até 8 fotos por item, com opções de câmera e galeria e ampliação ao tocar.
- Fotos reduzidas para JPEG com até 1400 px no maior lado.
- Inclusão, edição e exclusão de ambientes e itens personalizados (até 80 ambientes e 200 itens por ambiente).
- Vistorias antigas acima desses limites continuam legíveis; novas inclusões ficam bloqueadas até reduzir a quantidade.
- Rolagem automática opcional para o próximo item ao escolher uma situação no celular.
- Lista de problemas, testes não realizados e itens ainda sem registro.
- Relatório em HTML com fotos e impressão para salvar em PDF pelo navegador, com cabeçalho do ambiente repetido nas continuações.
- Numeração de páginas em navegadores que suportam caixas de margem CSS, como versões recentes de Chrome e Edge.
- Exportação e restauração de uma cópia dos dados em JSON.
- Botão para começar uma nova vistoria, com confirmação e opção de baixar uma cópia antes de limpar.

## Executar localmente

O projeto usa HTML, CSS e JavaScript, sem dependências de compilação. Com Python 3 instalado, execute na pasta do projeto:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Abra <http://localhost:8000> no navegador.

## Arquivos

- `index.html`: estrutura e navegação.
- `app.js`: checklist, armazenamento, fotos e exportações.
- `style.css`: aparência, layout responsivo e estilos de impressão.
- `icon.svg`: ícone do aplicativo.

## Hospedar no GitHub Pages

Nas configurações do repositório, abra **Pages**, escolha **Deploy from a branch** e selecione a branch `main` com a pasta `/ (root)`. Salve e aguarde a publicação. O projeto não precisa de etapa de build.

## Armazenamento e cópias

Os registros e fotos ficam no navegador e aparelho utilizados, preferencialmente em IndexedDB, com alternativa em localStorage. Não há servidor de dados nem sincronização entre aparelhos. Limpar os dados do navegador pode apagar a vistoria. Exporte o relatório e a cópia JSON para guardar os registros.

O salvamento detecta versões desatualizadas entre abas e bloqueia a substituição do registro. Em caso de conflito, baixe as alterações desta aba antes de recarregar os dados salvos. A alternativa localStorage usa Web Locks; se o navegador não oferecer esse recurso, o app mantém as alterações em memória e orienta a exportar.

Dados incompatíveis não são substituídos automaticamente: o app permite baixar o original para recuperação. Dados existentes no localStorage continuam acessíveis mesmo se o IndexedDB estiver disponível. Se houver cópias diferentes nos dois armazenamentos, a cópia alternativa pode ser baixada separadamente.

Ao acessar o aplicativo em outro endereço, o navegador usa um armazenamento separado. Para levar uma vistoria de uma hospedagem para outra, baixe a cópia JSON no endereço original e restaure-a na aba **Relatório** do novo endereço.

O CSS utiliza Google Fonts quando há conexão disponível e fontes alternativas do sistema caso o carregamento falhe. O aplicativo não oferece garantia de funcionamento offline.

## Sobre o guia

Ferramenta de registro pessoal, sem vínculo com a construtora ou com o programa Minha Casa, Minha Vida. Não substitui avaliação técnica, laudo profissional ou o termo da construtora. Compare as observações com o contrato e o memorial descritivo.

## Fotos no celular

Em **Anotar ou adicionar foto**, use **Tirar foto** para solicitar a câmera traseira ou **Escolher da galeria** para selecionar arquivos existentes. Depois toque em **Salvar registro**. O aplicativo não envia as fotos a um servidor.

A abertura da câmera usa o seletor nativo do navegador (`capture="environment"`). O comportamento depende do aparelho: em computadores ou navegadores sem suporte, pode abrir o seletor de arquivos. Formatos que o navegador não consegue decodificar, inclusive alguns arquivos HEIC, devem ser convertidos para JPG, PNG ou WebP. O limite é de 30 MB por foto de entrada e 8 fotos por item.

## Testes

Os testes de regressão usam Node.js e Playwright apenas no desenvolvimento; o aplicativo continua sem dependências de execução ou compilação. Com Playwright e um navegador compatível instalados, execute:

```sh
node --test tests/browser.cjs
```

Por padrão os testes usam o Edge instalado. A variável `TEST_BROWSER_CHANNEL` permite escolher outro canal (por exemplo, `chrome`), ou `chromium` para o navegador gerenciado pelo Playwright. Os testes criam perfis isolados e não acessam suas vistorias reais.
