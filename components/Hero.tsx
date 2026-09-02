import Image from "next/image";
import { withBasePath } from "@/lib/base-path";
import { CONTACT, SITE } from "@/lib/site";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

const credentials = [
  {
    label: "UFMG",
    detail: "Graduação em Odontologia, 2023",
    icon: (
      <path
        d="M2 7l9-4 9 4-9 4-9-4Zm4 2.2V14c0 1.4 2.6 3 5 3s5-1.6 5-3V9.2M18 8v6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    label: SITE.cro,
    detail: "Registro profissional ativo",
    icon: (
      <path
        d="M12 2.5l7 3v5.2c0 4.6-3 8.3-7 9.8-4-1.5-7-5.2-7-9.8V5.5l7-3Zm-3.3 9.3 2.2 2.2 4.4-4.4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    label: "Pesquisa científica",
    detail: "Iniciação científica e publicações",
    icon: (
      <path
        d="M9 2h6M10 2v5.2L4.8 17a2 2 0 0 0 1.8 3h10.8a2 2 0 0 0 1.8-3L14 7.2V2M7.5 14h9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-cream pt-32 pb-20 md:pt-40 md:pb-28">
      <div
        className="pointer-events-none absolute -top-24 -left-32 h-80 w-80 rounded-full bg-blush-soft blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-40 -right-24 h-72 w-72 rounded-full bg-sky-soft blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-[1.05fr_0.95fr] md:gap-10 md:px-10">
        <div className="order-2 md:order-1">
          <Reveal>
            <Eyebrow>Cirurgiã-dentista · Belo Horizonte</Eyebrow>
            <h1 className="font-serif-display text-[2.6rem] leading-[1.08] text-ink sm:text-6xl md:text-[3.6rem]">
              Odontologia que cuida de pessoas — com leveza, ética e conexão.
            </h1>
            <p className="mt-6 max-w-md font-sans text-lg leading-relaxed text-ink-soft">
              Sou a Dra. Beatriz Lucárdians. Acredito em uma Odontologia próxima, atenciosa e
              construída em confiança — para você e sua família, em cada etapa do cuidado.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-ink px-7 py-3.5 font-sans text-[0.95rem] text-cream transition-colors hover:bg-accent"
              >
                Agendar pelo WhatsApp
              </a>
              <a
                href="#sobre"
                className="font-sans text-[0.95rem] text-ink underline decoration-line underline-offset-8 transition-colors hover:decoration-accent"
              >
                Conheça a Dra. Beatriz
              </a>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <dl className="mt-12 grid max-w-lg grid-cols-1 gap-5 border-t border-line pt-8 sm:grid-cols-3 sm:gap-4">
              {credentials.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mt-0.5 shrink-0 text-accent"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </svg>
                  <div>
                    <dt className="font-sans text-sm font-medium text-ink">{item.label}</dt>
                    <dd className="font-sans text-[0.8rem] text-ink-soft">{item.detail}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="order-1 md:order-2">
          <Reveal delay={150}>
            <div className="relative mx-auto max-w-md md:max-w-none">
              <div
                className="absolute -right-4 -bottom-4 aspect-[4/5] w-full rounded-[2rem] bg-accent/85 md:-right-6 md:-bottom-6"
                aria-hidden="true"
              />
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-paper">
                <Image
                  src={withBasePath("/images/portrait-coat.jpg")}
                  alt="Dra. Beatriz Lucárdians, cirurgiã-dentista, sorrindo de jaleco"
                  width={854}
                  height={1280}
                  priority
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <a
        href="#sobre"
        aria-label="Rolar para a seção Sobre"
        className="relative mx-auto mt-16 hidden w-fit animate-bounce text-ink-faint transition-colors hover:text-accent motion-reduce:animate-none md:flex"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
