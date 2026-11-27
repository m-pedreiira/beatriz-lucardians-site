import Image from "next/image";
import { withBasePath } from "@/lib/base-path";
import { procedureColumns } from "@/lib/content";
import DotItem from "./DotItem";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

export default function Procedures() {
  return (
    <section id="procedimentos" className="relative overflow-hidden bg-gold-soft/33 pt-12 pb-24 md:pb-36">
      <Image
        src={withBasePath("/logo/tooth-icon.png")}
        alt=""
        width={493}
        height={537}
        aria-hidden="true"
        className="pointer-events-none absolute top-12 -right-20 h-auto w-[18rem] opacity-15 md:w-[31rem]"
      />

      <div className="relative mx-auto max-w-[1157px] px-6 md:px-10">
        <Reveal className="text-center">
          <SectionLabel>Procedimentos e tratamentos</SectionLabel>
          <h2 className="pt-4 font-display text-4xl leading-tight font-medium text-ink-soft md:text-5xl">
            Cuidado em cada detalhe
          </h2>
          <p className="pt-6 font-sans text-lg leading-[1.33] text-ink-soft md:text-[1.375rem]">
            Cada paciente é único. Por isso, cada cuidado é pensado de forma individualizada. Da prevenção ao
            tratamento, cada procedimento é conduzido com técnica, escuta e cuidado com o seu conforto.
          </p>
        </Reveal>

        <div className="grid pt-10 md:grid-cols-2 md:gap-x-16">
          {procedureColumns.map((column, i) => (
            <ul key={i} className="flex flex-col">
              {column.map((procedure) => (
                <DotItem key={procedure.title} dot={procedure.dot} title={procedure.title}>
                  <p>{procedure.description}</p>
                </DotItem>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
