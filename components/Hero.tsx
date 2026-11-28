import Image from "next/image";
import { withBasePath } from "@/lib/base-path";
import { CONTACT, SITE } from "@/lib/site";
import Eyebrow from "./Eyebrow";
import HeroPhoto from "./HeroPhoto";
import Reveal from "./Reveal";

const highlights = [
  { label: "UFMG", detail: "Graduação em Odontologia", icon: "/design/hero-icon-ufmg.svg", pad: true },
  { label: SITE.cro, detail: "Registro profissional ativo", icon: "/design/hero-icon-cro.svg", pad: true },
  { label: "Odontologia inclusiva", detail: "Cuidado para todos", icon: "/design/hero-icon-inclusive.webp", pad: false },
];

export default function Hero() {
  // On computers everything fits the first screen: sizes marked "svh" follow the window height.
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-cream pt-[calc(var(--header-height)+1rem)] pb-6 md:pt-40 lg:flex lg:min-h-[min(100svh,56rem)] lg:flex-col lg:pt-(--header-height) lg:pb-3"
    >
      <div
        className="pointer-events-none absolute -top-24 -left-32 h-80 w-80 rounded-full bg-blush-soft blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-40 -right-24 h-72 w-72 rounded-full bg-sky-soft blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-6 md:grid-cols-[542fr_490fr] md:px-10 lg:my-auto lg:py-3">
        <div className="order-2 md:order-1">
          <Reveal>
            <Eyebrow className="!mb-0 text-sm font-bold !tracking-[0.2em] text-coral" ruleClassName="bg-coral">
              Cirurgiã-dentista · Belo Horizonte
            </Eyebrow>
            <h1 className="pt-4 font-display text-[2.5rem] leading-[1.08] font-medium text-ink-soft sm:text-5xl lg:text-[clamp(2.25rem,min(6.2svh,4.4vw),3.6rem)]">
              Atendimento odontológico para toda a família
            </h1>
            <p className="max-w-md pt-6 font-sans text-lg leading-[1.625] text-ink-soft lg:pt-[clamp(0.75rem,2.5svh,1.5rem)] lg:text-[clamp(1rem,2.2svh,1.125rem)]">
              Cuidar de um sorriso é também cuidar de quem existe por trás dele. Independente da fase da vida,
              cada atendimento é acolhedor e individualizado, pensado para tornar a experiência no dentista
              mais leve, sempre respeitando as necessidades e o tempo de cada paciente.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex flex-wrap items-center gap-4 pt-9 lg:pt-[clamp(1.25rem,3.5svh,2.25rem)]">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-mint px-7 py-3.5 font-sans text-[0.95rem] font-bold text-cream transition-[filter] hover:brightness-90"
              >
                Conversar no WhatsApp
              </a>
              <a
                href="#sobre"
                className="font-sans text-[0.98rem] font-bold text-ink underline transition-colors hover:text-accent"
              >
                Conheça a Dra. Beatriz
              </a>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <div className="pt-12 lg:pt-[clamp(1.25rem,4.5svh,3rem)]">
              <dl className="grid max-w-lg grid-cols-1 gap-4 border-t border-line pt-8 pb-1.5 sm:grid-cols-3 lg:pt-[clamp(1rem,3svh,2rem)]">
                {highlights.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <Image
                      src={withBasePath(item.icon)}
                      alt=""
                      width={22}
                      height={22}
                      className={`shrink-0 ${item.pad ? "mt-0.5" : ""}`}
                    />
                    <div className="min-w-0">
                      <dt className="font-sans text-sm font-medium text-ink">{item.label}</dt>
                      <dd className="font-sans text-[0.8rem] leading-[1.2rem] text-ink-soft">{item.detail}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

        <div className="order-1 md:order-2">
          <Reveal delay={150}>
            <div className="relative mx-auto max-w-[18rem] pr-4 pb-4 md:max-w-[min(420px,88%)] md:pr-0 md:pb-0 lg:max-w-[min(420px,88%,calc((100svh-13rem)*0.8))]">
              <div
                className="absolute top-4 right-0 bottom-0 left-4 rounded-[2rem] bg-honey/85 md:top-[1.125rem] md:-right-[1.125rem] md:-bottom-[1.125rem] md:left-[1.125rem]"
                aria-hidden="true"
              />
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-paper">
                <HeroPhoto />
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <a
        href="#sobre"
        aria-label="Rolar para a seção Sobre"
        className="relative mx-auto mt-16 hidden w-fit animate-nudge motion-reduce:animate-none md:flex lg:mt-0"
      >
        <Image src={withBasePath("/design/chevron-down.svg")} alt="" width={26} height={26} />
      </a>
    </section>
  );
}
