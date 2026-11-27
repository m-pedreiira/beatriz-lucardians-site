import Image from "next/image";
import { withBasePath } from "@/lib/base-path";
import { lifeStages, type LifeStage } from "@/lib/content";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

function Stage({ stage }: { stage: LifeStage }) {
  const imageLeft = stage.side === "left";

  return (
    <article>
      <div className={`flex items-center gap-4 md:gap-7 ${imageLeft ? "flex-row" : "flex-row-reverse"}`}>
        <h3 className="font-sans text-xl font-semibold tracking-[0.18em] text-ink-soft uppercase md:text-3xl xl:text-[2.5rem] xl:leading-[3.6rem]">
          {stage.title}
        </h3>
        <span className="h-0.5 min-w-6 flex-1 bg-ink-soft" aria-hidden="true" />
      </div>

      <div
        className={`mt-6 grid items-center gap-6 md:gap-8 ${
          imageLeft ? "md:grid-cols-[2fr_3fr]" : "md:grid-cols-[3fr_2fr]"
        }`}
      >
        <Image
          src={withBasePath(stage.image.src)}
          alt={stage.image.alt}
          width={stage.image.width}
          height={stage.image.height}
          className={`mx-auto h-auto max-h-[400px] w-full max-w-md object-contain md:max-w-none ${
            imageLeft ? "" : "md:order-2"
          }`}
        />
        <div
          className={`font-display text-lg leading-relaxed text-ink-soft [text-shadow:0_4px_4px_rgb(0_0_0/0.25)] md:text-2xl md:leading-snug xl:text-[2.5rem] xl:leading-[2.5rem] ${
            stage.textAlign === "left" ? "text-center md:text-left" : "text-center"
          }`}
        >
          {stage.subtitle && <p className="pb-6 font-semibold md:pb-10">{stage.subtitle}</p>}
          <p>{stage.text}</p>
        </div>
      </div>
    </article>
  );
}

export default function LifeStages() {
  return (
    <section id="atendimentos" className="bg-sand pt-9 pb-20 opacity-80">
      <div className="mx-auto max-w-[1440px]">
        <Reveal className="px-6 text-center">
          <SectionLabel>Atendimentos</SectionLabel>
          <h2 className="pt-6 font-display text-4xl leading-tight font-medium text-blue md:text-5xl lg:text-[4.375rem] lg:leading-[1.1]">
            Diferentes fases, um só propósito
          </h2>
          <p className="pt-3 font-display text-xl leading-snug text-ink-soft [text-shadow:0_4px_4px_rgb(0_0_0/0.25)] md:text-[2rem]">
            um atendimento acolhedor e individualizado para cada paciente
          </p>
        </Reveal>

        <div className="relative mt-14 md:mt-24">
          {/* Vertical timeline rule that ties the life stages together. */}
          <span
            className="absolute top-[-2.25rem] bottom-[-5rem] left-3 w-[3px] bg-blue md:left-8 md:w-[5px] xl:left-[5.5rem]"
            aria-hidden="true"
          />
          <div className="flex flex-col gap-14 pr-5 pl-8 md:gap-20 md:pr-10 md:pl-20 xl:pr-16 xl:pl-36">
            {lifeStages.map((stage) => (
              <Reveal key={stage.title}>
                <Stage stage={stage} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
