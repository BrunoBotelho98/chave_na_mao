# Chave na mão

Aplicativo para acompanhar a vistoria de entrega de um apartamento pelo navegador, com interface adaptada para celular.

## Funcionalidades

- Checklist inicial com 62 itens, organizado por ambiente e etapa da entrega.
- Situações: OK, Problema, Não se aplica e Não testado.
- Anotações e fotos por item.
- Inclusão de ambientes e itens personalizados.
- Rolagem automática para o próximo item ao escolher uma situação no celular.
- Lista de problemas, testes não realizados e itens ainda sem registro.
- Relatório em HTML com fotos e impressão para salvar em PDF pelo navegador.
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

Ao acessar o aplicativo em outro endereço, o navegador usa um armazenamento separado. Para levar uma vistoria de uma hospedagem para outra, baixe a cópia JSON no endereço original e restaure-a na aba **Relatório** do novo endereço.

O CSS utiliza Google Fonts quando há conexão disponível e fontes alternativas do sistema caso o carregamento falhe. O aplicativo não oferece garantia de funcionamento offline.

## Sobre o guia

Ferramenta de registro pessoal, sem vínculo com a construtora ou com o programa Minha Casa, Minha Vida. Não substitui avaliação técnica, laudo profissional ou o termo da construtora. Compare as observações com o contrato e o memorial descritivo.
