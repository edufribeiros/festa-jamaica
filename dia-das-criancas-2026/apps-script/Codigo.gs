/**
 * Recebe as inscrições do portal do Dia das Crianças (dia-das-criancas-2026/index.html)
 * e grava uma linha por envio na aba "Inscrições" da planilha onde este script está.
 *
 * Mesmas colunas da planilha da Festa Agostina, mais "Crédito Agostina" e "Identificador Pix".
 * Como publicar: veja dia-das-criancas-2026/LEIA-ME.md.
 */

// Precisa ser exatamente igual ao CONFIG.token do index.html.
var TOKEN = 'Jamaica-Dia-das-Criancas-2026';

// Valor por pessoa de 13 anos ou mais. Crianças até 12 não pagam.
var PRECO_13 = 50;

var ABA = 'Inscrições';
var COLUNAS = [
  'Data/Hora', 'Apto', 'Nome', '13+ anos', '6-12 anos', '0-5 anos', 'Crédito Agostina',
  'Total pessoas', 'Valor (R$)', 'Identificador Pix', 'Reenvio?', 'Status conciliação', 'Observação', 'ID'
];
var COL_APTO = 2, COL_ID = 14;

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var d = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (d.token !== TOKEN) return resposta({ ok: false, erro: 'token' });

    var apto = texto(d.apto, 40);
    var nome = texto(d.nome, 120);
    var id = texto(d.id, 60);
    if (!apto || !nome || !id) return resposta({ ok: false, erro: 'dados' });

    var c13 = inteiro(d.c13), c6 = inteiro(d.c6), c0 = inteiro(d.c0);
    var cred = Math.min(inteiro(d.cred), c13);
    if (c13 + c6 + c0 < 1) return resposta({ ok: false, erro: 'pessoas' });

    // O valor que vale é o calculado aqui; se a página mandou outro, fica anotado para conferência.
    var valor = (c13 - cred) * PRECO_13;
    var obs = [];
    if (Number(d.valor) !== valor) obs.push('Página informou R$ ' + d.valor);
    if (cred) obs.push('Conferir crédito na lista da Agostina');

    lock.waitLock(20000);
    var aba = abaInscricoes();
    var ultima = aba.getLastRow();

    if (ultima > 1) {
      // Mesmo envio repetido (internet caiu e o morador tocou de novo): não duplica.
      var ids = aba.getRange(2, COL_ID, ultima - 1, 1).getValues();
      for (var i = 0; i < ids.length; i++) if (String(ids[i][0]) === id) return resposta({ ok: true, repetido: true });
    }

    var reenvio = '';
    if (ultima > 1) {
      var aptos = aba.getRange(2, COL_APTO, ultima - 1, 1).getValues();
      var chave = soDigitos(apto);
      for (var j = 0; j < aptos.length; j++) if (chave && soDigitos(aptos[j][0]) === chave) { reenvio = 'Sim'; break; }
    }

    aba.appendRow([
      new Date(), apto, nome, c13, c6, c0, cred,
      c13 + c6 + c0, valor, texto(d.pix, 25), reenvio, valor > 0 ? 'Pendente' : 'Nada a pagar', obs.join(' · '), id
    ]);
    return resposta({ ok: true });
  } catch (err) {
    return resposta({ ok: false, erro: String(err && err.message || err) });
  } finally {
    try { lock.releaseLock(); } catch (e2) {}
  }
}

// Abrir o endereço /exec no navegador mostra {"ok":true}: serve para testar a publicação.
function doGet() {
  return resposta({ ok: true, festa: 'Dia das Crianças 2026' });
}

// Rode esta função pelo editor (botão Executar) para testar sem o portal.
// Ela grava uma linha "TESTE" na aba Inscrições e mostra o resultado no Registro de execução.
function testar() {
  var r = doPost({ postData: { contents: JSON.stringify({
    token: TOKEN, id: 'teste-' + Date.now(), apto: '999', nome: 'TESTE — pode apagar', c13: 1, valor: PRECO_13
  }) } });
  Logger.log(r.getContent());
}

function abaInscricoes() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  if (!planilha) throw new Error('script-fora-da-planilha: crie o script pela planilha, em Extensões > Apps Script');
  var aba = planilha.getSheetByName(ABA);
  if (!aba) aba = planilha.insertSheet(ABA);
  if (aba.getLastRow() === 0) {
    aba.appendRow(COLUNAS);
    aba.setFrozenRows(1);
    aba.getRange(1, 1, 1, COLUNAS.length).setFontWeight('bold');
  }
  return aba;
}

function resposta(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
function texto(v, max) { return String(v == null ? '' : v).trim().slice(0, max); }
function inteiro(v) { var n = parseInt(v, 10); return isNaN(n) || n < 0 ? 0 : Math.min(n, 30); }
function soDigitos(v) { return String(v).replace(/\D/g, ''); }
