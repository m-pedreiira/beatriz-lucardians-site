import Image from "next/image";
import { withBasePath } from "@/lib/base-path";
import { CONTACT } from "@/lib/site";
import Reveal from "./Reveal";

export default function CtaBand() {
  return (
    <section className="bg-cream px-6 pt-20 pb-6 md:px-10">
      <Reveal className="relative mx-auto max-w-[1024px]">
        <div className="flex min-h-[501px] flex-col items-center rounded-[2.5rem] bg-sage px-6 pt-8 pb-14 text-center sm:px-16">
          <p className="flex items-center gap-4 font-sans text-base leading-[2.6rem] tracking-[0.2em] text-ink-soft uppercase md:gap-8 md:text-[1.85rem]">
            <span className="h-0.5 w-8 shrink-0 bg-ink-soft md:w-[4.2rem]" aria-hidden="true" />
            Vamos conversar
          </p>
          <h2 className="max-w-2xl pt-2 font-display text-3xl leading-tight text-cream md:text-[2.75rem] md:leading-[3.4375rem]">
            Quer saber mais sobre o atendimento?
          </h2>
          <p className="max-w-[740px] pt-6 font-sans text-lg leading-[1.625] text-ink-soft md:text-[1.45rem]">
            Fale comigo para saber sobre disponibilidade, valores e como funciona a sua primeira consulta.
            Escolha o canal que for mais conveniente para você.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-9">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-cream px-8 py-4 font-sans text-lg text-mint transition-colors hover:bg-paper md:px-[2.7rem] md:py-[1.35rem] md:text-[1.47rem]"
            >
              Chamar no WhatsApp
            </a>
            <a
              href="#contato"
              className="font-sans text-xl text-cream/85 underline transition-colors hover:text-cream md:text-[2.1rem]"
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
          className="pointer-events-none relative mx-auto -mt-8 h-auto w-36 min-[87.5rem]:absolute min-[87.5rem]:-bottom-[67px] min-[87.5rem]:-left-[179px] min-[87.5rem]:mt-0 min-[87.5rem]:w-[337px]"
        />
      </Reveal>
    </section>
  );
}
