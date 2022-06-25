---
layout: post
title: Como pesquisar planilha pelo nome da aba no Google Sheets
date: 2022-06-25 12:38:00 -0300
tags: google-sheets planilha produtividade
---

Imagine a situação em que você tem uma planilha que possui um monte de abas. Isso ocorre com frequência comigo, pois uso planilhas para fazer levantamento de dados ou mesmo para separar temas para estudo. Era sempre um trabalho manual de rolagem para encontrar a aba específica que queria acessar. Atualmente, o Google Sheets não tem uma forma para pesquisar rapidamente uma aba por nome e abrí-la. Embora seja possível usar o atalho de teclado `CRTL + H` para buscar textos no conteúdo de outras planilhas, esse atalho não pesquisa nos nomes de abas. Mas é possível adicionar essa funcionalidade no Google Sheets usando o **Google Apps**.

O procedimento descrito aqui instalará a funcionalidade apenas no arquivo aberto, caso queira a funcionalidade em outros arquivos, é necessário aplicá-lo nos outros arquivos também. Abaixo segue o procedimento:

Abra sua planilha que tem muitas abas:

<img style="width:100%" src="/imagens/gsheets1.png" >

Acesse no menu `Extensões > Apps Scripts`:

<img style="width:100%" src="/imagens/gsheets2.png" >

Uma tela para edição de código aparecerá:

<img style="width:100%" src="/imagens/gsheets3.png" >

Copie o código abaixo, cole nessa tela e clique no botão `salvar`:

````js
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Minhas Ferramentas')
    .addItem('Buscar planilha por nome', 'menuBuscarPlanilha')
    .addToUi();
}

function menuBuscarPlanilha() {
  var ui = SpreadsheetApp.getUi();
  var result = ui.prompt(
    'Buscar Planilha',
    'Insira o nome ou parte do nome da planilha:',
     ui.ButtonSet.OK_CANCEL
    );

  var button = result.getSelectedButton();
  var text = result.getResponseText();
  if (button == ui.Button.OK) {
    var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
    for(let i=0; i<sheets.length; i++){
      let sheet = sheets[i];
      let abaCorrenteTemTextoBuscado = sheet.getName().toLowerCase().includes(text.toLowerCase());
      if (abaCorrenteTemTextoBuscado) {
        sheet.activate();
        return;
      }
    }
  }
}
````

<img style="width:100%" src="/imagens/gsheets4.png" >

Acesse novamente a planilha e verá que um novo menu apareceu, contendo a funcionalidade codificada. O novo menu pode demorar um pouco para carregar.

<img style="width:100%" src="/imagens/gsheets5.png" >

Clique no menu `Minhas Ferramentas > Buscar planilha por nome` para acessar a nova funcionalidade. Será necessário dar permissão para execução do script, apenas na primeira execução. Clique em `continuar`:

<img style="width:100%" src="/imagens/gsheets6.png" >

Na próxima tela clique no botão `permitir`:

<img style="width:100%" src="/imagens/gsheets7.png" >

Será necessário acessar novamente o menu para rodar a funcionalidade após ter dado a autorização de execução. Ao clicar novamente em `Buscar planilha por nome`, a tela abaixo será mostrada para que seja inserido o nome da aba que se deseja abrir, note que não é necessário incluir o nome completo da aba, apenas parte do nome é suficiente para encontrá-la. Aperte `TAB` e depois `ENTER` para pesquisar ou então clique no botão `OK`:

<img style="width:100%" src="/imagens/gsheets8.png" >

A planilha da aba que contém o texto digitado deve abrir:

<img style="width:100%" src="/imagens/gsheets9.png" >

Seria ótimo se pudéssemos atribuir um atalho de teclado para acessar essa funcionalidade, mas até o momento não descobri se isso é possível.

Finalmente, não será mais necessário procurar manualmente as abas das suas planilhas. 