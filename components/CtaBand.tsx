import Image from "next/image";
import { withBasePath } from "@/lib/base-path";
import { CONTACT } from "@/lib/site";
import Reveal from "./Reveal";

export default function CtaBand() {
  return (
    <section className="bg-cream px-6 pt-section md:px-10">
      <Reveal className="relative mx-auto max-w-[1024px]">
        <div className="flex flex-col items-center rounded-[2rem] bg-sage px-6 py-8 text-center sm:px-16 [@media(max-height:700px)]:py-5">
          <p className="flex items-center gap-4 font-sans text-sm leading-7 tracking-[0.2em] text-ink-soft uppercase md:gap-4 md:text-lg">
            <span className="h-0.5 w-8 shrink-0 bg-ink-soft md:w-12" aria-hidden="true" />
            Vamos conversar
          </p>
          <h2 className="max-w-2xl pt-2 font-display text-title text-cream">
            Quer saber mais sobre o atendimento?
          </h2>
          <p className="max-w-[640px] pt-3 font-sans text-base leading-relaxed text-ink-soft md:text-lg">
            Fale comigo para saber sobre disponibilidade, valores e como funciona a sua primeira consulta.
            Escolha o canal que for mais conveniente para você.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-5 [@media(max-height:700px)]:pt-3">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-cream px-8 py-3.5 font-sans text-lg text-mint transition-colors hover:bg-paper"
            >
              Chamar no WhatsApp
            </a>
            <a
              href="#canais"
              className="font-sans text-lg text-cream/85 underline transition-colors hover:text-cream md:text-xl"
            >
              Ver outros canais
            </a>
          </div>
        </div>
        <Image
          src={withBasePath("/design/cta-tooth.webp")}
          alt=""
          width={496}
          height={527}
          aria-hidden="true"
          className="pointer-events-none relative mx-auto -mt-6 h-auto w-24 min-[87.5rem]:absolute min-[87.5rem]:-bottom-6 min-[87.5rem]:-left-[150px] min-[87.5rem]:mt-0 min-[87.5rem]:w-[250px]"
        />
      </Reveal>
    </section>
  );
}
