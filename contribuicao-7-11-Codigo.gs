/* =========================================================================
   BACKEND DA PÁGINA DE CONTRIBUIÇÃO - FESTA DE 7/11
   Recebe as confirmações da página contribuicao-7-11.html e grava na planilha.

   Como publicar:
     1. Crie uma planilha nova no Google Drive (ex.: "Festa 7/11 - Contribuições").
     2. Nela, menu Extensões > Apps Script. Apague o conteúdo e cole este arquivo.
     3. Confira que TOKEN é igual ao CONFIG.token da página.
     4. Implantar > Nova implantação > tipo "App da Web":
          Executar como: Eu · Quem pode acessar: Qualquer pessoa
     5. Copie a URL que termina em /exec e cole em CONFIG.endpoint da página.
     6. Para testar, abra a URL /exec no navegador: deve responder {"ok":true,...}.
   Se mudar o código depois, faça "Gerenciar implantações > editar > Nova versão",
   senão a URL continua rodando a versão antiga.
   ========================================================================= */

var TOKEN = 'Jamaica-Festa-7-11-2026';
var NOME_ABA = 'Contribuições';
var CABECALHO = ['Quando', 'Id', 'Apartamento', 'Nome', 'Adultos 13+', 'Crédito Agostina', 'Crianças 6-12', 'Crianças 0-5', 'Valor (R$)', 'Pago?', 'Crédito conferido?', 'Observação'];

function doGet() {
  return responder({ ok: true, servico: 'contribuicao-festa-7-11', hora: new Date().toISOString() });
}

function doPost(e) {
  var dados;
  try {
    dados = JSON.parse((e && e.postData && e.postData.contents) || '{}');
  } catch (err) {
    return responder({ ok: false, erro: 'json' });
  }
  if (!dados || dados.token !== TOKEN) return responder({ ok: false, erro: 'token' });

  var apto = String(dados.apto || '').trim();
  var nome = String(dados.nome || '').trim();
  if (!apto || !nome) return responder({ ok: false, erro: 'dados' });

  var linha = [
    new Date(),
    String(dados.id || ''),
    apto,
    nome,
    numero(dados.c13),
    numero(dados.credito),
    numero(dados.c6),
    numero(dados.c0),
    numero(dados.valor),
    '',   // Pago? (a administração marca ao conferir o extrato)
    '',   // Crédito conferido? (contra a lista da Festa Agostina)
    ''    // Observação
  ];

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var aba = abaContribuicoes();
    var existente = linhaDoId(aba, linha[1]);
    if (existente) {
      // Mesmo envio repetido (tentativa de novo após falha de rede): atualiza em vez de duplicar.
      aba.getRange(existente, 1, 1, 9).setValues([linha.slice(0, 9)]);
    } else {
      aba.appendRow(linha);
    }
  } finally {
    lock.releaseLock();
  }
  return responder({ ok: true });
}

function abaContribuicoes() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var aba = ss.getSheetByName(NOME_ABA);
  if (!aba) {
    aba = ss.insertSheet(NOME_ABA);
    aba.appendRow(CABECALHO);
    aba.getRange(1, 1, 1, CABECALHO.length).setFontWeight('bold').setBackground('#fef0d4');
    aba.setFrozenRows(1);
    aba.getRange('A:A').setNumberFormat('dd/mm/yyyy hh:mm');
    aba.getRange('I:I').setNumberFormat('"R$ "#,##0.00');
    aba.setColumnWidth(4, 220);
  }
  return aba;
}

function linhaDoId(aba, id) {
  if (!id) return 0;
  var ultima = aba.getLastRow();
  if (ultima < 2) return 0;
  var ids = aba.getRange(2, 2, ultima - 1, 1).getValues();
  for (var i = 0; i < ids.length; i++) {
    if (String(ids[i][0]) === id) return i + 2;
  }
  return 0;
}

function numero(v) {
  var n = Number(v);
  return isNaN(n) ? 0 : n;
}

function responder(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Rode na mão para conferir os totais no registro de execução.
function totais() {
  var aba = abaContribuicoes();
  var ultima = aba.getLastRow();
  if (ultima < 2) { Logger.log('Sem confirmações ainda.'); return; }
  var linhas = aba.getRange(2, 1, ultima - 1, CABECALHO.length).getValues();
  var t = { aptos: {}, c13: 0, credito: 0, c6: 0, c0: 0, valor: 0, pagos: 0 };
  linhas.forEach(function (l) {
    t.aptos[String(l[2]).trim().toLowerCase()] = true;
    t.c13 += numero(l[4]); t.credito += numero(l[5]); t.c6 += numero(l[6]); t.c0 += numero(l[7]); t.valor += numero(l[8]);
    if (String(l[9]).trim()) t.pagos += numero(l[8]);
  });
  Logger.log(
    'Apartamentos: ' + Object.keys(t.aptos).length + '\n' +
    'Adultos 13+: ' + t.c13 + ' (' + t.credito + ' com crédito da Agostina)\n' +
    'Crianças: ' + (t.c6 + t.c0) + ' (6-12: ' + t.c6 + ', 0-5: ' + t.c0 + ')\n' +
    'Valor confirmado: R$ ' + t.valor.toFixed(2) + ' · marcado como pago: R$ ' + t.pagos.toFixed(2)
  );
}
