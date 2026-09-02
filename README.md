# Site — Dra. Beatriz Lucárdians

Site institucional da Dra. Beatriz Lucárdians, cirurgiã-dentista em Belo Horizonte. Next.js (App Router) + TypeScript + Tailwind CSS v4, exportado como site 100% estático para publicação no GitHub Pages.

## Executar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Build de produção (estático)

```bash
npm run build
```

Gera o site estático em `out/`. `npm run lint` roda o ESLint.

---

## Estrutura de arquivos

```
app/
  layout.tsx        # fontes, metadata (SEO/OG/ícones), <html lang="pt-BR">
  page.tsx           # composição das seções da landing page
  globals.css         # tokens de cor/tipografia (Tailwind v4 @theme)
  robots.ts            # /robots.txt (gerado estaticamente)
  sitemap.ts            # /sitemap.xml (gerado estaticamente)
components/
  Header.tsx           # navegação fixa + menu mobile
  Hero.tsx              # abertura, CTA, credenciais, indicador de scroll
  About.tsx              # seção "Sobre"
  Timeline.tsx            # "Formação e trajetória"
  Services.tsx              # "Atendimentos"
  Gallery.tsx                 # galeria masonry (abre o Lightbox)
  Lightbox.tsx                 # visualizador de fotos (teclado + touch)
  CtaBand.tsx                    # card de convite ao contato
  Contact.tsx                     # canais de contato
  Footer.tsx                       # rodapé
  Reveal.tsx                        # animação de entrada ao rolar a página
  Eyebrow.tsx                        # rótulo pequeno reutilizável das seções
lib/
  site.ts        # LATTES_URL, links de contato, itens de navegação
  content.ts       # formação e atendimentos (dados factuais do currículo/bio)
  gallery.ts          # imagens da galeria (com dimensões reais)
  base-path.ts           # prefixa assets com o basePath do GitHub Pages
public/
  images/            # fotos reais, redimensionadas para web
  logo/                # logo (fundo removido) + variações de ícone/favicon
scripts/
  process-images.mjs    # script usado uma vez para gerar public/images e public/logo
.github/workflows/
  deploy.yml               # publica out/ no GitHub Pages a cada push em main
```

## Tecnologias

- **Next.js 16** (App Router, `output: "export"` para HTML/CSS/JS 100% estáticos)
- **TypeScript**
- **Tailwind CSS v4** (tokens de design via `@theme` em `app/globals.css`)
- **next/font** (Fraunces + Manrope, self-hosted, sem chamadas externas em runtime)
- Sem bibliotecas de animação ou de galeria/lightbox — o scroll-reveal (`Reveal.tsx`) e o lightbox (`Lightbox.tsx`) são componentes próprios, pequenos e sem dependências, para manter o site leve.

---

## Decisões de design

**Problema identificado antes de começar:** a logo real da Dra. Beatriz (um mascote de "dentinho" colorido, fonte manuscrita) é lúdica — pensada para redes sociais — enquanto o briefing pedia um site elegante e editorial. Alinhado com você durante o projeto, o site final:

- Usa a **logo real** (com o fundo removido) em tamanho de destaque no cabeçalho e no rodapé — não uma logo genérica.
- Traz a **paleta da logo** (rosa, verde-sálvia, dourado, azul) só como *tons suaves* em elementos decorativos discretos (blobs de fundo no Hero, na seção Atendimentos e no card de contato) — nunca como cor sólida saturada competindo com o conteúdo.
- Usa a **silhueta do dente da logo** (sem o texto) como marca d'água bem sutil em duas seções, no lugar de um ícone genérico de odontologia.
- Reserva a cor de destaque própria do site — um terracota (`#A6493C`) derivado do vermelho da logo — para texto, links e botões, mantendo consistência tipográfica.
- Foi inspirado, a seu pedido, no site do Dr. André Rufino (drandrerufino.com.br): o cartão de foto com camada/sombra deslocada no Hero e no Sobre, a faixa de credenciais com ícones, o card de contato flutuante com marca d'água, e as animações de entrada ao rolar a página (`Reveal.tsx`, com respeito a "reduzir movimento" do sistema operacional).

**Tipografia:** Fraunces (serifada, editorial, com bastante personalidade) para títulos + Manrope (sans-serif humanista) para texto corrido.

**Paleta neutra base:** creme (`--color-cream`), branco quente (`--color-paper`) e tinta quase preta (`--color-ink`), com o terracota como único destaque de cor "sólida".

---

## Informações extraídas do currículo

Fontes: *Currículo Lattes* (CNPq) e *CV_Beatriz Lucárdians 2026.pdf*. Nada foi inventado — os dois documentos às vezes divergem entre si (grafias, datas, nomes de instituição); nesses casos, o site usa a versão mais bem documentada e o restante fica listado em "Informações a confirmar" abaixo.

- **Graduação em Odontologia** — UFMG, 2018–2023 (TCC sobre clareamento dentário e progenitores da polpa).
- **CRO/MG 69489** (consta apenas no CV moderno, não no Lattes).
- **Menção honrosa** — 2º lugar em desempenho acadêmico, FAO/UFMG, 2023.
- **Iniciação científica** (2020–2023) em fotobiomodulação e regeneração de tecidos dentários, com publicação em periódico internacional (*Lasers in Medical Science*, 2025) e apresentações em congressos (40º CIOSP, entre outros).
- **Internato na Estratégia de Saúde da Família** — Prefeitura de Confins/MG, 2023.
- **Cursos de aperfeiçoamento recentes**: Imersão em Terapia Pulpar em Dentes Decíduos e Urgências e Emergências Médicas na Odontologia (2025); Odontopediatria e Farmacologia aplicada (Portal Odonto Cursos, 2026); extensão em Saúde Coletiva e ESF (FACULESTE, em andamento).
- **Trabalho voluntário**: atendimento na Igreja Nossa Senhora do Carmo (2023) e na ONG Nariz de Palhaço (2022–2024) — mencionado apenas como contexto de formação, não exibido como uma seção própria no site.

O currículo completo (experiência em clínicas específicas, todas as publicações, cursos e datas) é bem mais extenso do que o exibido — o site mostra apenas o que constrói percepção de autoridade profissional, como pedido no briefing, sem virar um currículo.

## Como a bio foi usada

A bio fornecida não foi copiada — suas ideias centrais (cuidar de pessoas, leveza, ética, acolhimento, conexão) foram reescritas em tom mais profissional na seção "Sobre" e no Hero. A lista de procedimentos da bio (primeira consulta, avaliação e plano de tratamento, limpeza, clareamento, laserterapia, restaurações, extração de dentes, próteses, canal em dente de leite) foi usada, quase literalmente, como a lista oficial de "Atendimentos" — por ser a única fonte objetiva desses itens, confirmada pelo CV.

## Fotos escolhidas

Das 10 imagens em `fotosBeatriz`, 3 eram versões da logo e 1 era o padrão decorativo (não usados como fotos). Das 6 fotos reais:

| Foto | Uso |
|---|---|
| Retrato de jaleco (brasão UFMG) | Hero — autoridade profissional |
| Retrato de blusa rosa, fundo neutro | Seção Sobre — proximidade, humanização |
| Atendimento clínico com criança | Seção Atendimentos — prova real do cuidado com crianças |
| Retrato com jaleco estampado (bastidor) | Galeria |
| 2 retratos com o padrão da logo ao fundo | Galeria |

Todas as 6 fotos aparecem na galeria masonry (com lightbox); as três primeiras também aparecem em destaque em suas respectivas seções.

## Informações que ainda precisam ser confirmadas

1. **Link do Currículo Lattes** — deixado propositalmente vazio em `lib/site.ts` (`LATTES_URL = ""`). Quando disponível, basta colar a URL nessa constante; o link aparece automaticamente no rodapé e na seção de Contato, e fica oculto enquanto estiver vazio.
2. **Divergências entre Lattes e CV**: (a) grafia do sobrenome — "Lucárdians" (CV/logo) vs. "Lucardians" (Lattes); o site usa "Lucárdians", por ser a grafia da marca. (b) o curso "Odontologia para Pacientes com Necessidades Especiais" aparece com instituições diferentes nos dois documentos (UFRGS no Lattes, "LUMINA-FGRS" no CV) — não incluído no site por falta de certeza. (c) não é possível confirmar, só pelos documentos, se a pós-graduação/extensão em Saúde Coletiva (FACULESTE) já foi concluída — o site apresenta como "em andamento".
3. **Vínculos profissionais atuais**: o CV lista três clínicas (Bias Fortes, Odonto Clarear, Implante Sorriso), mas o próprio briefing pediu para não focar em clínicas/horários/convênios — por isso o site não cita nenhuma pelo nome, só "Belo Horizonte — MG" de forma genérica. Se quiser confirmar quais vínculos seguem ativos, isso pode ser adicionado com discrição ao rodapé ou à seção de Contato depois.
4. **Meta description / OG image / `NEXT_PUBLIC_SITE_URL`** usam um domínio placeholder (`https://example.com`) até haver domínio definitivo — ver seção "Domínio" abaixo.

---

## Publicar no GitHub Pages

### 1. Criar o repositório

No GitHub, crie um repositório (ex.: `beatriz-lucardians-site`) e conecte o projeto local:

```bash
git remote add origin https://github.com/<seu-usuario>/beatriz-lucardians-site.git
git branch -M main
git add .
git commit -m "Site da Dra. Beatriz Lucárdians"
git push -u origin main
```

### 2. Configurar o GitHub Pages

No repositório: **Settings → Pages → Build and deployment → Source: "GitHub Actions"**.

O workflow em `.github/workflows/deploy.yml` já está pronto: a cada push em `main`, ele builda o site (com o `basePath` ajustado automaticamente para `/nome-do-repositorio`) e publica em `https://<seu-usuario>.github.io/beatriz-lucardians-site/`.

### 3. Publicar

Basta dar `git push` para `main` — o deploy acontece sozinho. Acompanhe em **Actions** no GitHub.

### 4. Atualizar o site

Edite os arquivos, rode `npm run build` localmente para conferir, e dê `git push`. O workflow builda e publica a nova versão automaticamente.

### 5. Conectar um domínio próprio (quando tiver um)

1. Compre o domínio (ver comparação abaixo).
2. No repositório: **Settings → Pages → Custom domain**, digite o domínio (ex.: `beatrizlucardians.com.br`) e salve — isso cria um arquivo `CNAME` em `out/` automaticamente a cada deploy (o GitHub gerencia esse arquivo).
3. No provedor DNS do domínio, aponte:
   - Um registro **CNAME** de `www` para `<seu-usuario>.github.io`, **ou**
   - Registros **A** da raiz do domínio para os IPs do GitHub Pages (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`).
4. **Remova a env `BASE_PATH`** do `.github/workflows/deploy.yml` (ou deixe-a vazia) — com domínio próprio o site é servido da raiz (`/`), não de `/beatriz-lucardians-site/`.
5. Atualize `NEXT_PUBLIC_SITE_URL` no workflow para a URL final (ex.: `https://beatrizlucardians.com.br`), para que SEO, sitemap e Open Graph fiquem corretos.
6. Marque "Enforce HTTPS" em Settings → Pages assim que o certificado for emitido (leva alguns minutos a horas).

---

## Domínio: comparação

*(Consultado em setembro/2026; confirme os preços atuais antes de comprar — promoções de primeiro ano mudam com frequência.)*

| Registrador | `.com.br` registro/renovação | `.com` registro/renovação | Observações |
|---|---|---|---|
| **Registro.br** | ~R$ 40/ano (preço oficial, fixo) | não vende `.com` | Único registrador **oficial** de `.com.br` — qualquer outra empresa que venda `.com.br` compra do Registro.br e revende com margem. Preço mais previsível do mercado para `.com.br`, DNS próprio simples e confiável. |
| **Cloudflare Registrar** | **não disponível** — Cloudflare não é credenciado para `.br` | ~US$ 10/ano, "at-cost" (sem margem), registro e renovação no mesmo preço | Ótimo para `.com`/`.org` internacionais, mas não é opção para `.com.br`. Exige usar os nameservers da Cloudflare. |
| **Hostinger** | ~R$ 49–59/ano | preço promocional no 1º ano, renovação mais alta depois | Interface simples, suporte em português, mas é revenda (não é o registrador oficial de `.com.br`) — confira sempre o preço de renovação. |
| **Namecheap** | não registra `.com.br` diretamente (foco internacional) | ~US$ 7–10 no 1º ano, ~US$ 14/ano na renovação | Boa opção só se decidir por um `.com` em vez de `.com.br`. |
| **GoDaddy** | disponível via revenda, preço variável | preço de entrada baixo, renovação historicamente uma das mais caras do mercado | Menos previsível na renovação; evite prender o domínio a promoções de 1º ano. |

### Recomendação

Para este projeto — uma profissional de saúde atendendo em Belo Horizonte, com identidade "Beatriz Lucárdians" — o mais natural é um **`.com.br`**, registrado **diretamente no Registro.br**: é o registrador oficial (sem intermediário cobrando margem), tem o preço mais estável do mercado (~R$ 40/ano, igual no registro e na renovação) e passa mais credibilidade local do que um `.com`. Sugestões de domínio a verificar disponibilidade: `beatrizlucardians.com.br` ou `drabeatrizlucardians.com.br`.

Se preferir um domínio internacional (`.com`) no lugar — por exemplo, para reforçar a marca nas redes sociais — a Cloudflare Registrar é a opção mais transparente (preço "at-cost", sem surpresa na renovação), mas nesse caso o site perde a sinalização "site brasileiro" que o `.com.br` dá.

---

## O que ainda falta para lançar

- [ ] Confirmar as informações listadas em "Informações que ainda precisam ser confirmadas".
- [ ] Preencher `LATTES_URL` em `lib/site.ts` quando o link estiver disponível.
- [ ] Registrar o domínio e seguir "Conectar um domínio próprio" acima.
- [ ] Revisar o texto final com a Dra. Beatriz antes da divulgação.
