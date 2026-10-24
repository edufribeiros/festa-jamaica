# Dia das Crianças 2026 — portal de inscrição

Portal: `https://edufribeiros.github.io/festa-jamaica/dia-das-criancas-2026/`

O portal da Festa Agostina continua no `index.html` da raiz, intocado. Cada festa ganha a sua pasta,
para reaproveitar no ano seguinte: copie a pasta, troque o nome, ajuste o bloco `CONFIG` e publique
um Apps Script novo.

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | Página do morador: dados, quem vai, Pix com o valor já preenchido, confirmação |
| `qrcode.js` | Biblioteca que desenha o QR do Pix na tela (qrcode-generator, Kazuhiko Arase, licença MIT) |
| `apps-script/Codigo.gs` | Recebe as inscrições e grava na planilha |
| `impressos/cartaz-dia-das-criancas.pdf` | Cartaz do grupo e do mural. Um QR só: o da inscrição |
| `impressos/cartao-pix-livro.pdf` | Folha para o livro de inscrição presencial. Um QR só: o do Pix (sem valor; o morador digita) |
| `impressos/*.html` | Fonte dos dois PDFs, para editar no ano que vem (abrir no Chrome → Imprimir → Salvar como PDF) |

## Publicar a planilha de inscrições (uma vez)

1. Crie uma planilha nova no Google Drive, por exemplo *Dia das Crianças 2026 — Inscrições*.
   Use uma planilha nova, não a da Agostina, para as duas festas não se misturarem.
2. Na planilha: **Extensões → Apps Script**. Apague o que estiver lá e cole o conteúdo de `apps-script/Codigo.gs`. Salve.
3. **Implantar → Nova implantação → Tipo: App da Web**.
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
4. Autorize com a conta do condomínio e copie o endereço que termina em `/exec`.
5. Teste: abra esse endereço no navegador. Tem que aparecer `{"ok":true,...}`.
6. No `index.html`, cole o endereço em `CONFIG.endpoint` e publique no GitHub.

Enquanto `endpoint` estiver vazio, o portal funciona do mesmo jeito, mas a confirmação vai pelo WhatsApp da administração.

A aba **Inscrições** é criada sozinha no primeiro envio, com as colunas:
Data/Hora · Apto · Nome · 13+ anos · 6-12 anos · 0-5 anos · Crédito Agostina · Total pessoas ·
Valor (R$) · Identificador Pix · Reenvio? · Status conciliação · Observação · ID

- **Valor** é calculado pelo script (R$ 50 × pessoas de 13+ sem crédito), não pela página.
- **Identificador Pix** (`CRIANCASAPT418`) vai dentro do código Pix. Muitos bancos mostram esse
  identificador no extrato de quem recebe, o que ajuda a conciliar.
- **Reenvio?** = "Sim" quando o mesmo apartamento já tinha se inscrito: confira se é correção ou família diferente.
- **Status conciliação** começa como "Pendente" e é atualizado à mão ao bater com o extrato.

## O Pix

O código Copia e Cola e o QR da tela são gerados pela própria página, já com o valor da inscrição.
Usam exatamente os mesmos dados do QR da Agostina (decodificado e conferido):

- Chave: `ed.jamaica@outlook.com`
- Recebedor: `CONDOMINIO DO EDIFICIO JA` · Cidade: `RIO DE JANEIRO`

Se a chave Pix do condomínio mudar, troque `chavePix` no `CONFIG` e no cartão impresso do livro.

## Regra dos QR Codes (o que deu confusão na Agostina)

Dois QR Codes pretos e brancos são indistinguíveis para o morador. Por isso:

- **Material impresso nunca tem os dois juntos.** O cartaz tem **um** QR: o da inscrição (abre com a câmera).
  O cartão do livro tem **um** QR: o do Pix (abre pelo app do banco).
- **Cada QR tem cor e nome fixos.** Azul + "INSCRIÇÃO · aponte a câmera" = link.
  Verde-água + "PAGAMENTO PIX · abra o app do banco" = pagamento.
- **No celular, o Pix é Copia e Cola.** Quem abre o portal no celular não consegue escanear a própria tela;
  por isso o QR de pagamento do portal fica recolhido, só para quem está no computador.
