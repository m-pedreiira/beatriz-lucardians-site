import Image from "next/image";
import { withBasePath } from "@/lib/base-path";
import { CONTACT } from "@/lib/site";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

export default function CtaBand() {
  return (
    <section className="bg-cream px-6 py-20 md:px-10 md:py-28">
      <Reveal className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-8 py-16 text-center sm:px-16 md:py-20">
          <Image
            src={withBasePath("/logo/tooth-icon.png")}
            alt=""
            width={493}
            height={537}
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -left-12 h-72 w-auto opacity-[0.07] brightness-200 grayscale md:h-96"
          />
          <div className="relative flex flex-col items-center">
            <Eyebrow tone="cream">Vamos conversar</Eyebrow>
            <h2 className="max-w-2xl font-serif-display text-3xl leading-tight text-cream md:text-[2.75rem]">
              Quer saber mais sobre o atendimento?
            </h2>
            <p className="mt-5 max-w-xl font-sans text-lg leading-relaxed text-cream/70">
              Fale comigo para saber sobre disponibilidade, valores e como funciona a sua
              primeira consulta. Escolha o canal que for mais conveniente para você.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-cream px-7 py-3.5 font-sans text-[0.95rem] text-ink transition-colors hover:bg-accent hover:text-cream"
              >
                Chamar no WhatsApp
              </a>
              <a
                href="#contato"
                className="font-sans text-[0.95rem] text-cream/85 underline decoration-cream/30 underline-offset-8 transition-colors hover:decoration-cream"
              >
                Ver outros canais
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
