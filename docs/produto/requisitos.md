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

- A abertura (hero) mantém a altura no desktop; a moldura da foto fica menor.
- As demais seções ficam mais baixas, com os espaçamentos centralizados em variáveis de CSS.

## R3 — Menu

- Itens, nesta ordem: Sobre, Atendimentos, Galeria, Procedimentos, Perguntas frequentes, Contatos.
- Menu sanduíche em telas menores. Ao clicar, o título da seção fica visível abaixo do menu fixo.

## R4 — Linha do tempo interativa (Atendimentos)

- Uma fase em destaque por vez, escolhida por clique, toque ou teclado.
- As 7 fases e seus textos atuais, sem reescrever. Texto de no mínimo 16 px no celular.

## R5 — Galeria

- Fica antes de Procedimentos.
- Fotos e vídeos juntos, em grade, a partir de uma lista de dados, com carregamento sob demanda.
- Imagem abre ampliada; fecha por botão, Esc ou clique fora. Vídeo com controles, sem tocar sozinho com som.

## R6 — Procedimentos em cards

- Cada card mostra ícone e título; a descrição completa aparece ao passar o mouse ou por clique, toque, Enter ou Espaço.
- Ícones de traço fino, de uma única biblioteca. O card aberto não cobre vizinhos nem corta texto.

## R7 — Perguntas frequentes

- Só as perguntas aparecem de início; uma resposta aberta por vez.
- Abre e fecha somente por clique, toque, Enter ou Espaço (passar o mouse não abre).

## R8 — Foto do hero

- Sem ampliação por IA, filtros ou edição de aparência.
- Servida em vários tamanhos e formatos modernos a partir de um arquivo original.
