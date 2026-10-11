# Pesquisa de intenção - Festa de 7/11 (Halloween ou Dia das Crianças)

Condomínio Edifício Jamaica · sábado 7/11/2026 · salão A/B · 18h às 23h30

---

## 1. Análise

### Tema: Halloween x Dia das Crianças

- **A data favorece o Halloween.** 7/11 cai uma semana depois do Halloween (31/10, que em 2026 também é sábado) e quase quatro semanas depois do Dia das Crianças (12/10). "Halloween atrasado" soa natural; "Dia das Crianças" em novembro soa deslocado.
- **Decoração sai mais barata depois do 31/10.** Lojas liquidam itens de Halloween de 1 a 3/11. Isso só funciona se a decisão já estiver tomada até lá.
- **A programação infantil é a mesma nos dois temas.** Pintura de rosto, cineminha e gincana cabem igualmente nos dois. Na prática a enquete decide só decoração, playlist e fantasia. Vale deixar isso claro na mensagem para ninguém achar que "Halloween" exclui as crianças.
- **Resistência ao Halloween existe em condomínio.** Algumas famílias evitam o tema por motivo religioso. A enquete capta isso sem confronto: quem não curte vota em "Dia das Crianças" ou "Não vou". Se o Halloween vencer com minoria relevante no outro lado, vale anunciar "fantasia livre (terror, super-herói, princesa, o que quiser)" para incluir todo mundo.
- **Horário.** 18h às 23h30 combina com Halloween (precisa escurecer). Se Dia das Crianças vencer, vale considerar 16h às 21h. Em qualquer caso, concentre a parte infantil no início: cineminha por volta das 19h, gincana às 20h, concurso de fantasia às 21h, depois a noite fica mais adulta.

### Preço: o ponto de maior risco

- **R$ 40 com criança grátis é um corte grande em relação a agosto.** Em agosto uma família de 2 adultos + 1 criança de 6 a 12 pagava R$ 125. Com a nova proposta pagaria R$ 80, 36% menos. Só fecha se a festa custar bem menos que a de agosto. Use o custo real da Festa Agostina como régua antes de publicar o valor.
- **Criança grátis atrai família, mas desloca o custo para o adulto.** Criança come salgadinho, cachorro-quente, doce, bolo e refrigerante. Alternativa intermediária: manter a meia de 6 a 12 anos como em agosto (R$ 20) e grátis só até 5.
- **O espetinho custa mais que R$ 10 por adulto.** Com 3 espetinhos por adulto (R$ 6 a 8 cada, preço de mercado), mais 1 por criança, mais churrasqueiro contratado (R$ 250 a 350) e carvão, a conta fica entre R$ 25 e 35 por adulto. Peça um orçamento real antes de postar a enquete. Se confirmar, a opção com espetinho deveria ser R$ 55 a 60, ou limitar a 2 espetinhos por pessoa.
- **Estimativa de custo (minha, para 40 adultos + 20 crianças, confira com os números de agosto):**

| Item | Estimativa |
|---|---|
| Salgadinhos (7 por pessoa) | R$ 400 a 500 |
| Cachorro-quente (90 unidades) | R$ 350 a 450 |
| Doces e bolo | R$ 400 a 550 |
| Cerveja (3 a 4 latas por adulto) | R$ 500 a 750 |
| Drinks (insumos) | R$ 250 a 350 |
| Refri, suco, água, gelo, descartáveis | R$ 300 a 400 |
| Decoração, prêmios, pipoca, kit de pintura | R$ 400 a 600 |
| **Total sem espetinho** | **R$ 2.600 a 3.600** |
| Receita a R$ 40 × 40 adultos | R$ 1.600 |
| Receita a R$ 50 × 40 adultos | R$ 2.000 |
| Espetinho + churrasqueiro (extra) | R$ 1.100 a 1.600 |

- **Alavancas se a conta não fechar:** meia para 6 a 12 anos; cerveja e drinks "cada um traz o seu" com a festa cobrindo só refri, água e gelo; condomínio cobrindo decoração e som; pintura de rosto feita por morador voluntário com kit (R$ 60 a 100) em vez de profissional (R$ 300 a 500).

### Fantasia e atrações

- **Concurso de fantasia só vale se pelo menos um terço disser que vai fantasiado.** Por isso a enquete pergunta isso diretamente. Categorias simples: criança, adulto e família. Prêmio barato (cesta de chocolate, vale-pizza).
- **Cineminha precisa de um canto escuro e uma TV ou projetor.** Confirme se o salão tem TV. Filme curto (até 90 min), começando às 19h para as crianças menores não perderem.
- **Gincana e pintura dependem de voluntário.** A mensagem já pede quem topa ajudar.

### Como a pesquisa está montada

- **Opção principal: Google Forms ligado a uma planilha**, criado pelo script `pesquisa-festa-7-11.gs` (seção 2). Dá o dado por apartamento, soma adultos e crianças sozinho e tem aba Resumo pronta. É o mesmo caminho da página de contribuição de agosto, que já gravava em planilha.
- **Plano B: enquetes nativas do WhatsApp** (seção 3). Menos atrito, mais respostas, mas sem contagem por apartamento.
- **Ordem das perguntas:** dados, tema, valor, fantasia, quantidades, atrações, voluntários, comentário. As três primeiras decidem a festa; as quantidades dimensionam a compra; o resto prioriza esforço.
- **Quem marca "Não vou" pula a parte de valor e quantidades** e cai direto no comentário, onde pode dizer o motivo.
- **Contagem por apartamento.** O formulário pede o número do apto e a aba Resumo aponta apartamentos que responderam mais de uma vez.
- **Prazo de uma semana** com lembrete no meio. O formulário fecha sozinho na virada de 18 para 19/10.
- **Fixar a mensagem com o link** no grupo (admin: segurar a mensagem › Fixar › 30 dias).

### Cronograma sugerido

| Data | Ação |
|---|---|
| 12 ou 13/10 (seg/ter) | Pegar orçamento do espetinho, ajustar `precoComEspetinho` no script se precisar, rodar `criarPesquisa` e postar o link à noite (20h) |
| 15/10 (qui) | Lembrete |
| 18/10 (dom) | Último dia; o formulário fecha sozinho à meia-noite |
| 19/10 (seg) | Rodar `textoResultado`, anunciar no grupo e abrir contribuição pelo Pix (adaptar a página index.html) |
| 31/10 (sáb) | Prazo da contribuição, uma semana antes, como em agosto |
| 1 a 3/11 | Comprar decoração de Halloween em liquidação (se vencer) |
| 5 e 6/11 | Compras de comida e bebida |
| 7/11 (sáb) | Festa |

---

## 2. Google Forms com planilha (opção principal)

Arquivo: `pesquisa-festa-7-11.gs`. Uma execução cria o formulário, a planilha vinculada, a aba Resumo e agenda o fechamento automático.

### Passo a passo

1. Abra [script.google.com](https://script.google.com) › **Novo projeto**. Apague o conteúdo e cole o arquivo `pesquisa-festa-7-11.gs` inteiro.
2. Salve (Ctrl+S) e dê um nome ao projeto, por exemplo "Pesquisa Festa 7/11".
3. Se o orçamento do espetinho mudar o valor, ajuste `precoComEspetinho` no bloco `CONFIG` antes de rodar.
4. Na barra de cima, escolha a função **criarPesquisa** e clique em **Executar**. Autorize o acesso (Formulários, Planilhas, Drive e acionadores).
5. Abra **Registro de execução**. Lá estão o link curto do formulário (forms.gle), o link do editor, o link da planilha e a mensagem pronta para o WhatsApp.
6. Opcional: abra o editor do formulário e troque o tema visual (paleta › cores de Halloween ou coloridas). Não mude a ordem das perguntas.
7. Poste a mensagem no grupo e fixe.
8. Acompanhe pela aba **Resumo** da planilha. Na segunda 19/10, rode **textoResultado** e copie o texto do registro.

Rode `criarPesquisa` só uma vez. Se rodar de novo, o script avisa e mostra os links já criados. Para recomeçar do zero, apague as propriedades em Configurações do projeto › Propriedades do script.

### O que o formulário pergunta

| Página | Pergunta | Tipo |
|---|---|---|
| 1 | Apartamento | texto, obrigatório |
| 1 | Nome do morador | texto, obrigatório |
| 1 | Qual tema você prefere? | escolha única (Halloween, Dia das Crianças, Tanto faz, Não vou) |
| 2 | Cardápio e valor | escolha única (R$ 40 sem espetinho, R$ 50 com) |
| 2 | Se for Halloween, iriam fantasiados? | escolha única |
| 2 | Pessoas de 13+ do apto | número de 0 a 10 |
| 2 | Crianças de 6 a 12 | número de 0 a 10 |
| 2 | Crianças de 0 a 5 | número de 0 a 10 |
| 2 | Atrações que valem a pena | múltipla escolha |
| 3 | Topa ajudar? | múltipla escolha, opcional |
| 3 | Comentários | parágrafo, opcional |

Quem marca "Não vou" na página 1 pula a página 2. Crianças ficam separadas em 6 a 12 e 0 a 5 para simular a alternativa de cobrar meia.

### Aba Resumo

Fórmulas automáticas, atualizam a cada resposta:

- respostas recebidas, apartamentos distintos e apartamentos repetidos
- votos por tema, por valor e por fantasia
- total de adultos, crianças de 6 a 12, de 0 a 5 e total de pessoas
- receita estimada a R$ 40, a R$ 50 e a R$ 50 com meia de R$ 20 para 6 a 12
- votos por atração
- nome e apartamento de quem topa ajudar, por área
- lista de comentários

As fórmulas dependem da ordem das colunas da aba Respostas. Se você acrescentar perguntas no formulário depois, faça isso no fim.

### Mensagem para o grupo (o script também gera no registro, já com o link)

```
🎉 *Festa do Jamaica - sábado 7/11, salão A/B, 18h às 23h30*

Galera, antes de bater o martelo queremos ouvir vocês: *Halloween ou Dia das Crianças?*

Montamos uma pesquisa rapidinha (1 minuto) com tema, valor, fantasia e quantas pessoas do seu apto iriam. É ela que vai definir a festa e as compras.

👉 [link do formulário]

Uma resposta por apartamento, até *domingo 18/10*. Resultado segunda 19/10 aqui no grupo e aí abrimos a contribuição no Pix.

Quem topa ajudar (pintura de rosto, gincana, som, decoração) marca lá na pesquisa! 🙌
```

### Lembrete (quinta 15/10)

```
Lembrete: a pesquisa da festa de 7/11 fecha domingo (18/10)! Quem ainda não respondeu, é 1 minuto 👆 [link do formulário]
Principalmente a parte de quantas pessoas vão, é ela que define as compras. 🙏
```

### Resultado (segunda 19/10)

Rode `textoResultado` no Apps Script. Ele monta o texto com tema vencedor, valor, contagem de adultos e crianças, número de apartamentos e famílias fantasiadas. Só falta colar o link do Pix.

---

## 3. Plano B: enquetes nativas do WhatsApp (sem planilha)

Use só se o link do Forms tiver pouca adesão ou se preferir não pedir cadastro. Enquete nativa conta sozinha, mas não dá o número por apartamento.

### Mensagem 1 - contexto (postar primeiro e fixar)

```
🎉 *Festa do Jamaica - sábado 7/11, salão A/B, 18h às 23h30*

Galera, antes de bater o martelo queremos ouvir vocês. A próxima festa será no sábado 7/11 e a pergunta principal é: *Halloween ou Dia das Crianças?*

O que já está pensado (vale pros dois temas):
• Sábado 7/11, das 18h às 23h30, no salão A/B
• Cardápio enxuto: salgadinhos, cachorro-quente, doces e bolo, com cerveja e drinks (refri e suco pra criançada)
• Pintura de rosto, cineminha e gincana pras crianças
• Playlist temática no som do salão

O que muda com o tema:
🎃 *Halloween:* decoração assustadora, fantasia livre (terror, super-herói, princesa, o que quiser) e concurso de fantasia
🎈 *Dia das Crianças:* decoração colorida, foco nas brincadeiras, sem fantasia

E a parte do bolso:
• R$ 40 por pessoa de 13 anos ou mais
• Criança até 12 anos não paga
• Opcional: espetinho na hora, com churrasqueiro contratado. Aí sobe pra R$ 50

Respondam as enquetes aqui embaixo até *domingo 18/10*. Nas duas enquetes de "quantas pessoas", responde só uma pessoa por apartamento, tá? 🙏

Resultado sai na segunda 19/10 e aí abrimos a contribuição no Pix.

Quem topa ajudar (pintura de rosto, gincana, som, decoração) me chama no privado! 🙌
```

### Enquete 1 - Tema
Criar enquete › desligar "Permitir várias respostas"

```
Qual tema você prefere pra festa de 7/11?
```
Opções:
```
🎃 Halloween
🎈 Dia das Crianças
Tanto faz, vou de qualquer jeito
Não vou em nenhum dos dois
```

### Enquete 2 - Preço e cardápio
Desligar "Permitir várias respostas"

```
Qual opção de cardápio e valor? (criança até 12 não paga nas duas)
```
Opções:
```
R$ 40 - salgadinhos, cachorro-quente, doces, bolo, cerveja e drinks
R$ 50 - tudo isso + espetinho na hora com churrasqueiro
```

### Enquete 3 - Fantasia
Desligar "Permitir várias respostas"

```
Se for Halloween, vocês iriam fantasiados?
```
Opções:
```
Sim, a família toda
Só as crianças
Talvez, se tiver concurso com prêmio
Não, vou de roupa normal
```

### Enquete 4 - Adultos
Desligar "Permitir várias respostas"

```
Quantas pessoas de 13 anos ou mais do seu apto iriam? (1 resposta por apto)
```
Opções:
```
1
2
3
4 ou mais
Nenhuma, não vamos
```

### Enquete 5 - Crianças
Desligar "Permitir várias respostas"

```
E quantas crianças de 0 a 12 anos do seu apto? (1 resposta por apto)
```
Opções:
```
Nenhuma
1
2
3 ou mais
```

### Enquete 6 - Atrações
Deixar "Permitir várias respostas" LIGADO

```
Quais atrações valem a pena? (pode marcar várias)
```
Opções:
```
Concurso de fantasia
Pintura de rosto
Cineminha pras crianças
Gincana e brincadeiras
Playlist temática no som
Nenhuma, comida e som já tá ótimo
```

### Mensagem 2 - lembrete (quinta 15/10)

```
Lembrete: as enquetes da festa de 7/11 fecham domingo (18/10)! Quem ainda não votou, é rapidinho 👆 Principalmente as de "quantas pessoas vão", são elas que definem as compras. 🙏
```

### Mensagem 3 - resultado (modelo para segunda 19/10)

```
📊 *Resultado das enquetes da festa de 7/11*

Tema: [🎃 Halloween / 🎈 Dia das Crianças] venceu com [X] votos contra [Y].
Valor: R$ [40/50] por pessoa de 13 anos ou mais. Criança até 12 não paga.
Contagem até agora: [N] adultos e [N] crianças de [N] apartamentos.
[Fantasia liberada e concurso confirmado! / Sem concurso de fantasia desta vez.]

Contribuição pelo Pix até *sábado 31/10* pelo link: [link]
Quanto antes confirmar, melhor pra gente comprar na medida. Bora! 🎉
```
