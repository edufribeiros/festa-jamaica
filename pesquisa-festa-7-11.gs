/* =========================================================================
   PESQUISA DE INTENÇÃO - FESTA DO JAMAICA, SÁBADO 7/11
   Halloween ou Dia das Crianças?

   O que a função criarPesquisa faz (em uma única execução):
     1. Cria o Google Forms com todas as perguntas.
     2. Cria a planilha de respostas e liga o formulário a ela.
     3. Monta a aba "Resumo" com as contagens automáticas: tema, valor,
        fantasia, pessoas, créditos da festa anterior, caixa estimado,
        atrações, voluntários e comentários.
     4. Agenda o fechamento automático do formulário (CONFIG.fechamento).
     5. Mostra no registro de execução os links e a mensagem pronta pro WhatsApp.

   Como usar:
     - Abra script.google.com > Novo projeto. Apague o conteúdo e cole este arquivo.
     - Salve (Ctrl+S) e dê um nome ao projeto, por exemplo "Pesquisa Festa 7/11".
     - Na barra de cima escolha a função "criarPesquisa" e clique em Executar.
     - Autorize o acesso (Formulários, Planilhas, Drive e acionadores).
     - Abra "Registro de execução": copie o link do formulário e a mensagem pronta.
     - Rode criarPesquisa SÓ UMA VEZ. O script bloqueia uma segunda execução
       para não criar formulário duplicado (veja o aviso que ele mostra).
     - No dia do resultado, rode "textoResultado" e copie a mensagem do registro.
   ========================================================================= */

var CONFIG = {
  tituloForm: 'Festa do Jamaica 7/11 - Halloween ou Dia das Crianças?',
  tituloPlanilha: 'Pesquisa Festa 7/11 - Respostas',
  dataFesta: 'sábado 7/11',
  horario: '18h às 23h30',
  local: 'salão A/B',
  prazo: 'domingo 18/10',
  dataResultado: 'segunda 19/10',
  prazoPix: 'sábado 31/10',

  // Festa anterior: quem pagou e não foi tem crédito nesta; o que sobrou entra no caixa.
  festaAnterior: 'Festa Agostina (23/08)',
  saldoAnterior: 422.70,

  // Valores por pessoa de 13 anos ou mais. Criança até 12 não paga.
  precoSemEspetinho: 40,
  precoComEspetinho: 50,
  // Usado só na aba Resumo, para simular a alternativa de cobrar meia de 6 a 12.
  precoMeia: 20,

  // Fechamento automático do formulário (hora de Brasília).
  fecharAutomaticamente: true,
  fechamento: '2026-10-19T00:00:00-03:00'
};

var OPCOES = {
  tema: [
    '🎃 Halloween',
    '🎈 Dia das Crianças',
    'Tanto faz, vou de qualquer jeito',
    'Não vou em nenhum dos dois' // precisa ser a última: quem marca pula a página 2
  ],
  valor: [
    'R$ ' + CONFIG.precoSemEspetinho + ' - salgadinhos, cachorro-quente, doces, bolo, cerveja e drinks',
    'R$ ' + CONFIG.precoComEspetinho + ' - tudo isso + espetinho na hora'
  ],
  fantasia: [
    'Sim, a família toda',
    'Só as crianças',
    'Talvez, se tiver concurso com prêmio',
    'Não, vou de roupa normal'
  ],
  atracoes: [
    'Concurso de fantasia',
    'Pintura de rosto',
    'Gincana e brincadeiras',
    'Bingo',
    'Playlist temática no som',
    'Nenhuma, comida e som já tá ótimo'
  ],
  ajudar: [
    'Pintura de rosto',
    'Gincana e brincadeiras',
    'Bingo',
    'Som e playlist',
    'Decoração',
    'Churrasco / espetinho',
    'Compras',
    'Não consigo desta vez'
  ]
};

/* ---------------------------------------------------------------------- */

function criarPesquisa() {
  var props = PropertiesService.getScriptProperties();
  if (props.getProperty('FORM_ID')) {
    throw new Error(
      'A pesquisa já foi criada.\nFormulário: ' + props.getProperty('FORM_URL') +
      '\nPlanilha: ' + props.getProperty('SS_URL') +
      '\nPara criar outra do zero, apague as propriedades em Configurações do projeto > Propriedades do script.'
    );
  }

  var form = montarFormulario();
  var urlCurta;
  try {
    urlCurta = form.shortenFormUrl(form.getPublishedUrl());
  } catch (e) {
    urlCurta = form.getPublishedUrl();
  }

  var ss = montarPlanilha(form, urlCurta);
  agendarFechamento();

  props.setProperties({
    FORM_ID: form.getId(),
    FORM_URL: urlCurta,
    SS_ID: ss.getId(),
    SS_URL: ss.getUrl()
  });

  Logger.log(
    '✅ Pesquisa criada!\n\n' +
    'Link do formulário (mandar no grupo): ' + urlCurta + '\n' +
    'Editor do formulário: ' + form.getEditUrl() + '\n' +
    'Planilha de respostas: ' + ss.getUrl() + '\n\n' +
    '----- Mensagem pronta pro WhatsApp -----\n\n' + mensagemWhatsApp(urlCurta)
  );
}

/* ----------------------------- formulário ----------------------------- */

function montarFormulario() {
  var form = FormApp.create(CONFIG.tituloForm);
  form.setDescription(descricaoForm());
  form.setConfirmationMessage('Valeu! Resposta registrada. 🎉 O resultado sai ' + CONFIG.dataResultado + ' no grupo.');
  form.setCollectEmail(false);            // não exige conta Google
  form.setLimitOneResponsePerUser(false); // idem (limitar exigiria login)
  form.setAllowResponseEdits(false);
  form.setProgressBar(true);
  form.setShowLinkToRespondAgain(false);

  // ---- Página 1: quem responde + tema
  form.addSectionHeaderItem()
    .setTitle('1 · Seus dados')
    .setHelpText('Uma resposta por apartamento, por favor.');
  form.addTextItem()
    .setTitle('Apartamento')
    .setHelpText('Só o número. Ex.: 101')
    .setRequired(true);
  form.addTextItem()
    .setTitle('Nome do morador')
    .setRequired(true);

  form.addSectionHeaderItem()
    .setTitle('2 · O tema')
    .setHelpText('Nos dois temas tem pintura de rosto, gincana e bingo. ' +
                 'O que muda: decoração, playlist e, no Halloween, fantasia livre e concurso de fantasia.');
  var tema = form.addMultipleChoiceItem()
    .setTitle('Qual tema você prefere pra festa de 7/11?')
    .setRequired(true);

  // ---- Página 2: só para quem vai
  form.addPageBreakItem().setTitle('3 · Valor, fantasia e quantas pessoas');
  form.addMultipleChoiceItem()
    .setTitle('Qual opção de cardápio e valor?')
    .setHelpText('Valor por pessoa de 13 anos ou mais. Criança até 12 anos não paga nas duas opções.')
    .setChoiceValues(OPCOES.valor)
    .setRequired(true);
  form.addMultipleChoiceItem()
    .setTitle('Se for Halloween, vocês iriam fantasiados?')
    .setHelpText('Fantasia livre: terror, super-herói, princesa, o que quiser.')
    .setChoiceValues(OPCOES.fantasia)
    .setRequired(true);
  form.addTextItem()
    .setTitle('Quantas pessoas de 13 anos ou mais do seu apto iriam?')
    .setHelpText('Digite só o número. Conte todas, inclusive quem tem crédito da ' + CONFIG.festaAnterior + '.')
    .setValidation(validacaoNumero())
    .setRequired(true);
  form.addTextItem()
    .setTitle('Dessas, quantas pagaram a ' + CONFIG.festaAnterior + ' e não foram?')
    .setHelpText('Essas não pagam de novo. Deixe em branco ou 0 se nenhuma.')
    .setValidation(validacaoNumero());
  form.addTextItem()
    .setTitle('Quantas crianças de 6 a 12 anos?')
    .setHelpText('Digite só o número (0 se nenhuma).')
    .setValidation(validacaoNumero())
    .setRequired(true);
  form.addTextItem()
    .setTitle('Quantas crianças de 0 a 5 anos?')
    .setHelpText('Digite só o número (0 se nenhuma).')
    .setValidation(validacaoNumero())
    .setRequired(true);
  form.addCheckboxItem()
    .setTitle('Quais atrações valem a pena?')
    .setHelpText('Pode marcar várias.')
    .setChoiceValues(OPCOES.atracoes);

  // ---- Página 3: para todo mundo
  var pag3 = form.addPageBreakItem().setTitle('4 · Pra fechar');
  form.addCheckboxItem()
    .setTitle('Topa ajudar na organização?')
    .setHelpText('Opcional. Pode marcar várias.')
    .setChoiceValues(OPCOES.ajudar);
  form.addParagraphTextItem()
    .setTitle('Comentários ou sugestões')
    .setHelpText('Opcional. Se não vai, conta o motivo: ajuda a planejar a próxima.');

  // Quem marca a última opção do tema ("Não vou") pula direto para a página 3.
  tema.setChoices(OPCOES.tema.map(function (texto, i) {
    var ultima = i === OPCOES.tema.length - 1;
    return ultima
      ? tema.createChoice(texto, pag3)
      : tema.createChoice(texto, FormApp.PageNavigationType.CONTINUE);
  }));

  // Formulários novos podem nascer como rascunho; publica se o método existir.
  if (typeof form.setPublished === 'function') form.setPublished(true);

  return form;
}

function descricaoForm() {
  return [
    'Antes de bater o martelo, queremos ouvir vocês. A próxima festa será no ' +
      CONFIG.dataFesta + ', das ' + CONFIG.horario + ', no ' + CONFIG.local + '.',
    '',
    'O que já está pensado (vale pros dois temas):',
    '• Cardápio enxuto: salgadinhos, cachorro-quente, doces e bolo, com cerveja e drinks (refri e suco pra criançada)',
    '• Pintura de rosto, gincana e bingo',
    '• Playlist temática no som do salão',
    '',
    'O que muda com o tema:',
    '🎃 Halloween: decoração assustadora, fantasia livre e concurso de fantasia',
    '🎈 Dia das Crianças: decoração colorida, foco nas brincadeiras, sem fantasia',
    '',
    'A parte do bolso: R$ ' + CONFIG.precoSemEspetinho + ' por pessoa de 13 anos ou mais, criança até 12 não paga. ' +
      'Com espetinho na hora sobe pra R$ ' + CONFIG.precoComEspetinho + '.',
    '',
    'Quem pagou a ' + CONFIG.festaAnterior + ' e não pôde ir, vai nessa sem pagar: é só informar na pergunta de quantas pessoas. ' +
      'E sobraram ' + reais(CONFIG.saldoAnterior) + ' da Agostina, que já entram no caixa dessa festa.',
    '',
    'Leva 1 minuto. Responda até ' + CONFIG.prazo + '. Resultado ' + CONFIG.dataResultado + ' no grupo.'
  ].join('\n');
}

function validacaoNumero() {
  return FormApp.createTextValidation()
    .setHelpText('Digite só um número de 0 a 10.')
    .requireNumberBetween(0, 10)
    .build();
}

/* ------------------------------ planilha ------------------------------ */

function montarPlanilha(form, urlCurta) {
  var ss = SpreadsheetApp.create(CONFIG.tituloPlanilha);
  ss.setSpreadsheetLocale('pt_BR');
  ss.setSpreadsheetTimeZone('America/Sao_Paulo');
  var resumo = ss.getSheets()[0].setName('Resumo');

  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  var respostas = aguardarAbaRespostas(ss.getId());
  if (respostas) {
    respostas.setName('Respostas');
  } else {
    Logger.log('⚠️ Não achei a aba vinculada ao formulário. Renomeie a aba "Respostas ao formulário 1" para "Respostas" na planilha.');
  }

  montarResumo(resumo, form, urlCurta);

  ss.setActiveSheet(resumo);
  ss.moveActiveSheet(1);
  return ss;
}

function aguardarAbaRespostas(idPlanilha) {
  for (var tentativa = 0; tentativa < 20; tentativa++) {
    var abas = SpreadsheetApp.openById(idPlanilha).getSheets();
    for (var i = 0; i < abas.length; i++) {
      if (abas[i].getFormUrl()) return abas[i];
    }
    Utilities.sleep(1000);
  }
  return null;
}

// Colunas da aba Respostas, na ordem das perguntas do formulário:
// A carimbo · B apto · C nome · D tema · E valor · F fantasia · G adultos
// H crédito da festa anterior · I crianças 6-12 · J crianças 0-5
// K atrações · L ajudar · M comentários
function montarResumo(aba, form, urlCurta) {
  var R = 'Respostas!';
  var linhas = [];
  var secoes = [];
  var moeda = [];

  function add(rotulo, valor) { linhas.push([rotulo, valor === undefined ? '' : valor]); return linhas.length; }
  function secao(titulo) { add('', ''); secoes.push(add(titulo, '')); }
  function soma(col) { return '=SUM(ARRAYFORMULA(IFERROR(VALUE(' + R + col + '2:' + col + '), 0)))'; }
  function contaIgual(col, texto) { return '=COUNTIF(' + R + col + '2:' + col + ', "' + escapaCountif(texto) + '")'; }
  function contaContem(col, texto) { return '=COUNTIF(' + R + col + '2:' + col + ', "*' + escapaCountif(texto) + '*")'; }

  secoes.push(add('PESQUISA FESTA 7/11 - RESUMO', ''));
  add('Link do formulário (mandar no grupo)', urlCurta);
  add('Editor do formulário', form.getEditUrl());
  add('', '');
  add('Respostas recebidas', '=COUNTA(' + R + 'A2:A)');
  add('Apartamentos distintos', '=IFERROR(ROWS(UNIQUE(FILTER(' + R + 'B2:B, ' + R + 'B2:B<>""))), 0)');
  add('Apartamentos com mais de uma resposta',
      '=IFERROR(TEXTJOIN(", ", TRUE, UNIQUE(FILTER(' + R + 'B2:B, ' + R + 'B2:B<>"", COUNTIF(' + R + 'B2:B, ' + R + 'B2:B)>1))), "nenhum")');

  secao('TEMA');
  OPCOES.tema.forEach(function (o) { add(o, contaIgual('D', o)); });

  secao('VALOR');
  OPCOES.valor.forEach(function (o) { add(o, contaIgual('E', o)); });

  secao('FANTASIA (se Halloween)');
  OPCOES.fantasia.forEach(function (o) { add(o, contaIgual('F', o)); });

  secao('PESSOAS');
  var lAdultos = add('Adultos (13 anos ou mais)', soma('G'));
  var lCredito = add('Com crédito da ' + CONFIG.festaAnterior + ' (não pagam)', soma('H'));
  var lPagantes = add('Adultos pagantes', '=B' + lAdultos + '-B' + lCredito);
  var l612 = add('Crianças de 6 a 12', soma('I'));
  var l05 = add('Crianças de 0 a 5', soma('J'));
  add('Total de pessoas', '=B' + lAdultos + '+B' + l612 + '+B' + l05);
  add('Quem declarou crédito (apto: quantos)',
      '=IFERROR(TEXTJOIN(", ", TRUE, FILTER(' + R + 'B2:B & ": " & ' + R + 'H2:H, IFERROR(VALUE(' + R + 'H2:H), 0)>0)), "ninguém")');

  secao('CAIXA');
  var lSaldo = add('Saldo da ' + CONFIG.festaAnterior, CONFIG.saldoAnterior);
  moeda.push(lSaldo);
  moeda.push(add('Créditos a cobrir (crédito × R$ ' + CONFIG.precoSemEspetinho + ')', '=B' + lCredito + '*' + CONFIG.precoSemEspetinho));
  var lRec40 = add('Contribuições a R$ ' + CONFIG.precoSemEspetinho + ' (pagantes)', '=B' + lPagantes + '*' + CONFIG.precoSemEspetinho);
  moeda.push(lRec40);
  var lRec50 = add('Contribuições a R$ ' + CONFIG.precoComEspetinho + ' (pagantes)', '=B' + lPagantes + '*' + CONFIG.precoComEspetinho);
  moeda.push(lRec50);
  moeda.push(add('Caixa a R$ ' + CONFIG.precoSemEspetinho + ' (contribuições + saldo)', '=B' + lRec40 + '+B' + lSaldo));
  moeda.push(add('Caixa a R$ ' + CONFIG.precoComEspetinho + ' (contribuições + saldo)', '=B' + lRec50 + '+B' + lSaldo));
  moeda.push(add('A mais se cobrar meia de R$ ' + CONFIG.precoMeia + ' (6 a 12)', '=B' + l612 + '*' + CONFIG.precoMeia));

  secao('ATRAÇÕES (votos)');
  OPCOES.atracoes.forEach(function (o) { add(o, contaContem('K', o)); });

  secao('QUEM TOPA AJUDAR');
  OPCOES.ajudar.slice(0, -1).forEach(function (o) {
    add(o, '=IFERROR(TEXTJOIN(", ", TRUE, FILTER(' + R + 'C2:C & " (apto " & ' + R + 'B2:B & ")", ' +
           'ISNUMBER(SEARCH("' + o + '", ' + R + 'L2:L)))), "ninguém ainda")');
  });

  secao('COMENTÁRIOS');
  add('Apto - nome: comentário',
      '=IFERROR(TEXTJOIN(CHAR(10), TRUE, FILTER(' + R + 'B2:B & " - " & ' + R + 'C2:C & ": " & ' + R + 'M2:M, ' + R + 'M2:M<>"")), "nenhum")');

  // Escreve rótulos e fórmulas
  for (var i = 0; i < linhas.length; i++) {
    aba.getRange(i + 1, 1).setValue(linhas[i][0]);
    var v = linhas[i][1];
    if (typeof v === 'string' && v.charAt(0) === '=') {
      aba.getRange(i + 1, 2).setFormula(v);
    } else {
      aba.getRange(i + 1, 2).setValue(v);
    }
  }

  // Aparência
  aba.setColumnWidth(1, 330);
  aba.setColumnWidth(2, 480);
  aba.getRange(1, 1, linhas.length, 2).setVerticalAlignment('top').setWrap(true);
  secoes.forEach(function (l) { aba.getRange(l, 1, 1, 2).setFontWeight('bold').setBackground('#fef0d4'); });
  aba.getRange(1, 1).setFontSize(14);
  moeda.forEach(function (l) { aba.getRange(l, 2).setNumberFormat('"R$ "#,##0.00'); });
}

function escapaCountif(texto) {
  return texto.replace(/[~*?]/g, function (c) { return '~' + c; });
}

function reais(n) {
  var inteiro = Math.floor(n);
  var centavos = Math.round((n - inteiro) * 100);
  if (centavos === 100) { inteiro += 1; centavos = 0; }
  return 'R$ ' + String(inteiro).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + (centavos < 10 ? '0' : '') + centavos;
}

/* --------------------------- fechamento auto -------------------------- */

function agendarFechamento() {
  if (!CONFIG.fecharAutomaticamente) return;
  var quando = new Date(CONFIG.fechamento);
  if (isNaN(quando.getTime()) || quando.getTime() <= Date.now()) {
    Logger.log('⚠️ Data de fechamento inválida ou já passada. Não agendei o fechamento automático.');
    return;
  }
  ScriptApp.newTrigger('fecharPesquisa').timeBased().at(quando).create();
}

// Chamada pelo acionador na data de CONFIG.fechamento. Pode rodar na mão também.
function fecharPesquisa() {
  var id = PropertiesService.getScriptProperties().getProperty('FORM_ID');
  if (!id) return;
  var form = FormApp.openById(id);
  form.setCustomClosedFormMessage('A pesquisa encerrou ' + CONFIG.prazo + '. Obrigado! O resultado sai no grupo.');
  form.setAcceptingResponses(false);
}

// Reabre o formulário, se precisar estender o prazo.
function reabrirPesquisa() {
  var id = PropertiesService.getScriptProperties().getProperty('FORM_ID');
  if (id) FormApp.openById(id).setAcceptingResponses(true);
}

/* ------------------------------ mensagens ----------------------------- */

function mensagemWhatsApp(link) {
  return [
    '🎉 *Festa do Jamaica - ' + CONFIG.dataFesta + ', ' + CONFIG.local + ', ' + CONFIG.horario + '*',
    '',
    'Galera, antes de bater o martelo queremos ouvir vocês: *Halloween ou Dia das Crianças?*',
    '',
    'Montamos uma pesquisa rapidinha (1 minuto) com tema, valor, fantasia e quantas pessoas do seu apto iriam. É ela que vai definir a festa e as compras.',
    '',
    '👉 ' + link,
    '',
    'Duas notícias boas: quem pagou a ' + CONFIG.festaAnterior + ' e não pôde ir, vai nessa *sem pagar* (é só informar na pesquisa). ' +
      'E sobraram *' + reais(CONFIG.saldoAnterior) + '* da Agostina, que já entram no caixa dessa.',
    '',
    'Uma resposta por apartamento, até *' + CONFIG.prazo + '*. Resultado ' + CONFIG.dataResultado + ' aqui no grupo e aí abrimos a contribuição no Pix.',
    '',
    'Quem topa ajudar (pintura de rosto, gincana, bingo, som, decoração) marca lá na pesquisa! 🙌'
  ].join('\n');
}

// Rode no dia do resultado: monta o texto para o grupo a partir das respostas.
function textoResultado() {
  var props = PropertiesService.getScriptProperties();
  var ss = SpreadsheetApp.openById(props.getProperty('SS_ID'));
  var aba = ss.getSheetByName('Respostas');
  if (!aba) throw new Error('Aba "Respostas" não encontrada na planilha.');

  // Índices das colunas (0 = A): 1 apto · 2 nome · 3 tema · 4 valor · 5 fantasia
  // 6 adultos · 7 crédito · 8 crianças 6-12 · 9 crianças 0-5
  var dados = aba.getDataRange().getValues().slice(1).filter(function (l) { return String(l[1]).trim() !== ''; });
  function conta(col, valor) { return dados.filter(function (l) { return String(l[col]) === valor; }).length; }
  function soma(col) { return dados.reduce(function (t, l) { return t + (Number(l[col]) || 0); }, 0); }
  function ranking(opcoes, col) {
    return opcoes.map(function (o) { return { nome: o, votos: conta(col, o) }; })
                 .sort(function (a, b) { return b.votos - a.votos; });
  }

  var tema = ranking(OPCOES.tema.slice(0, 2), 3);
  var valor = ranking(OPCOES.valor, 4);
  var aptos = {};
  dados.forEach(function (l) { aptos[String(l[1]).trim().toLowerCase()] = true; });
  var fantasiados = conta(5, OPCOES.fantasia[0]) + conta(5, OPCOES.fantasia[1]);
  var adultos = soma(6);
  var credito = soma(7);
  var criancas = soma(8) + soma(9);

  var msg = [
    '📊 *Resultado da pesquisa da festa de 7/11*',
    '',
    'Tema: ' + tema[0].nome + ' venceu com ' + tema[0].votos + ' votos contra ' + tema[1].votos +
      ' (' + conta(3, OPCOES.tema[2]) + ' tanto faz).',
    'Valor: ' + valor[0].nome.split(' - ')[0] + ' por pessoa de 13 anos ou mais (' + valor[0].votos + ' x ' + valor[1].votos + '). Criança até 12 não paga.',
    'Contagem até agora: ' + adultos + ' adultos (' + credito + ' com crédito da Agostina) e ' + criancas + ' crianças, de ' + Object.keys(aptos).length + ' apartamentos.',
    'Fantasia: ' + fantasiados + ' famílias disseram que vão fantasiadas.',
    'Caixa: os ' + reais(CONFIG.saldoAnterior) + ' que sobraram da Agostina já estão na conta da festa.',
    '',
    'Contribuição pelo Pix até *' + CONFIG.prazoPix + '* pelo link: [link]',
    'Quanto antes confirmar, melhor pra gente comprar na medida. Bora! 🎉'
  ].join('\n');

  Logger.log(msg);
  return msg;
}
