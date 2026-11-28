# Requisitos

Este arquivo começou em 2026-11-26. As funcionalidades que o site já tinha antes disso ainda não estão descritas aqui.

## R1 — Mensagem pronta no WhatsApp

**Situação:** implementado (2026-11-26)

Ao clicar em qualquer link de WhatsApp do site, a conversa abre com esta mensagem já escrita:

> Olá, Dra. Beatriz! Vim pelo seu site e gostaria de saber mais sobre a consulta.

**Critérios de aceite**

- Vale para todos os links de WhatsApp: cabeçalho, menu do celular, abertura, chamada para contato, cartão de contato e rodapé.
- A mensagem não é enviada sozinha: a pessoa pode editar e precisa tocar em enviar.
- O texto fica em um único lugar (`lib/site.ts`).

## Requisitos gerais (valem para R2 a R8)

- Identidade visual, textos, links e funcionalidades existentes preservados.
- Funciona em celular, tablet e desktop, sem sobreposição e sem texto pequeno demais.
- Todo efeito ao passar o mouse tem equivalente por toque e teclado, com elementos semânticos e foco visível.
- Animações curtas, respeitando "reduzir movimento".
- Nenhuma foto, vídeo ou imagem de banco é adicionada: os arquivos vêm do dono do projeto.

## R2 — Layout mais compacto

- A abertura (hero) cabe inteira na primeira tela do computador, com a foto sem corte: textos e foto se ajustam à altura da janela.
- As demais seções ficam mais baixas, com os espaçamentos centralizados em variáveis de CSS.

## R3 — Menu

- Itens, nesta ordem: Sobre, Atendimentos, Galeria, Procedimentos, Perguntas frequentes, Contatos.
- Menu sanduíche em telas menores. Ao clicar, o título da seção fica visível logo abaixo do menu fixo.
- Em telas de computador a partir de 730 px de altura, cada seção cabe inteira na tela depois do clique, exceto Sobre e Procedimentos, que continuam para baixo. As demais seções preenchem a tela, sem mostrar o começo da seguinte, exceto Perguntas frequentes, que deixa aparecer o topo do cartão de contato.

## R4 — Linha do tempo interativa (Atendimentos)

- Uma fase em destaque por vez, escolhida por clique, toque ou teclado.
- Começa em "Infância" ao abrir o site e sempre que "Atendimentos" é escolhido no menu.
- Fica claro que dá para clicar: cada ponto da linha mostra uma miniatura da fase, há setas para a fase anterior e a próxima, e a frase "Clique em uma fase para conhecer" aparece acima da linha.
- As 7 fases e seus textos atuais, sem reescrever. Texto de no mínimo 16 px no celular.

## R5 — Galeria

- Fica antes de Procedimentos.
- Carrossel com a foto do centro em destaque e as vizinhas ao lado, com fotos e vídeos a partir de uma lista de dados e carregamento sob demanda.
- Passa sozinho, mesmo com o mouse em cima, com botão de pausar. Espera durante o uso por teclado e com a foto ampliada, e não passa quando há "reduzir movimento".
- Navegação por setas, pontos, arrasto (mouse ou dedo) e teclado.
- Imagem abre ampliada; fecha por botão, Esc ou clique fora. Vídeo com controles, sem tocar sozinho com som.

## R6 — Procedimentos em cards

- Cada card mostra ícone e título; a descrição completa aparece ao passar o mouse ou por clique, toque, Enter ou Espaço.
- Ícones de traço fino, de uma única biblioteca. O card aberto não cobre vizinhos nem corta texto.

## R7 — Perguntas frequentes

- Só as perguntas aparecem de início. Várias respostas podem ficar abertas; cada uma fecha quando clicada de novo.
- Abre e fecha somente por clique, toque, Enter ou Espaço (passar o mouse não abre).
- A tela nunca rola para cima sozinha: a pergunta clicada abre para baixo. A tela só desce, o mínimo necessário, se a resposta passar do fim.

## R8 — Foto do hero

- Sem ampliação por IA, filtros ou edição de aparência.
- Servida em vários tamanhos e formatos modernos a partir de um arquivo original.
