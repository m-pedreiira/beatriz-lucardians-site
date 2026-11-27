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
