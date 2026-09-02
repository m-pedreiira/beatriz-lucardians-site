import Image from "next/image";
import { withBasePath } from "@/lib/base-path";
import { services } from "@/lib/content";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

const dotColors = ["bg-blush", "bg-sage", "bg-gold", "bg-sky"];

export default function Services() {
  return (
    <section id="atendimentos" className="relative overflow-hidden bg-gold-soft py-24 md:py-32">
      <Image
        src={withBasePath("/logo/tooth-icon.png")}
        alt=""
        width={493}
        height={537}
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -right-16 h-[26rem] w-auto opacity-[0.12] grayscale sm:opacity-[0.15] md:-right-24 md:h-[34rem]"
      />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid gap-14 md:grid-cols-[1fr_1fr] md:gap-16">
          <div>
            <Reveal>
              <Eyebrow>Atendimentos</Eyebrow>
              <h2 className="font-serif-display text-4xl leading-tight text-ink md:text-5xl">
                Cuidado odontológico para toda a família.
              </h2>
              <p className="mt-6 max-w-md font-sans text-lg leading-relaxed text-ink-soft">
                Da primeira consulta às etapas mais delicadas do tratamento, cada procedimento é
                conduzido com técnica, escuta e cuidado com o seu conforto.
              </p>
            </Reveal>

            <Reveal delay={150}>
              <div className="relative mt-10 hidden aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] bg-paper md:block">
                <Image
                  src={withBasePath("/images/clinical.jpg")}
                  alt="Dra. Beatriz Lucárdians atendendo uma criança em consulta"
                  width={541}
                  height={756}
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
          </div>

          <ul className="flex flex-col">
            {services.map((service, i) => (
              <li
                key={service.title}
                className={`border-t border-ink/10 ${i === services.length - 1 ? "border-b" : ""}`}
              >
                <Reveal delay={Math.min(i, 6) * 45}>
                  <div className="flex gap-4 py-6">
                    <span
                      className={`mt-2.5 h-2 w-2 shrink-0 rounded-full ${dotColors[i % dotColors.length]}`}
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-serif-display text-xl text-ink md:text-[1.4rem]">
                        {service.title}
                      </h3>
                      <p className="mt-2 font-sans leading-relaxed text-ink-soft">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
