import Image from "next/image";
import { withBasePath } from "@/lib/base-path";
import { credentials } from "@/lib/content";
import { LATTES_URL } from "@/lib/site";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";
import RichText from "./RichText";

export default function About() {
  return (
    <section id="sobre" className="bg-paper py-20 md:pb-24">
      <div className="mx-auto max-w-[1335px] px-6">
        <div className="grid gap-12 lg:grid-cols-[538fr_714fr] lg:gap-9">
          <Reveal className="order-2 lg:order-1 lg:pt-16">
            <div className="relative mx-auto aspect-[538/755] w-full max-w-[538px]">
              <div
                className="absolute top-0 left-0 h-[98.7%] w-[92.75%] rounded-[2rem] bg-sage"
                aria-hidden="true"
              />
              <div className="absolute top-[5.83%] right-0 bottom-0 left-[5.76%] overflow-hidden rounded-[2rem] bg-cream">
                <Image
                  src={withBasePath("/images/portrait-pink.jpg")}
                  alt="Dra. Beatriz Lucárdians sorrindo"
                  width={854}
                  height={1280}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <Eyebrow className="!mb-0 text-base font-bold !tracking-[0.18em] text-coral">Sobre</Eyebrow>
              <h2 className="pt-4 font-display text-4xl leading-tight font-medium text-ink-soft md:text-[3.1rem]">
                Muito prazer, Beatriz.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="flex flex-col gap-[1.9rem] pt-5 font-sans text-lg leading-[1.625] text-ink-soft xl:text-[1.16rem]">
                <p>
                  Sou cirurgiã-dentista, formada pela Universidade Federal de Minas Gerais (UFMG), e encontrei
                  na odontologia uma forma de unir conhecimento, cuidado e, principalmente, conexão com as
                  pessoas.
                </p>
                <p>
                  Ao longo da minha formação, tive experiências em diferentes áreas da odontologia, mas foi no
                  contato próximo com os pacientes que descobri o que realmente quero levar para a minha
                  prática: uma odontologia mais humana, respeitosa, leve e individualizada.
                </p>
                <p className="lg:mt-5">
                  Tenho um carinho especial pelo atendimento infantil e por acompanhar as crianças desde os
                  primeiros contatos com o dentista, ajudando a construir uma relação positiva com a saúde
                  bucal. Ao mesmo tempo, acredito que o cuidado deve acompanhar o paciente em todas as fases
                  da vida — por isso, meu atendimento é voltado para toda a família.
                </p>
                <p>
                  Gosto de conhecer cada paciente além da queixa que o trouxe ao consultório, entender sua
                  rotina, seus receios e suas necessidades para, então, construir juntos um cuidado que faça
                  sentido.
                </p>
                <p>É assim que acredito na odontologia: com conhecimento, escuta e cuidado em cada detalhe.</p>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal className="pt-12">
          <ul id="formacao" aria-label="Formação" className="flex flex-col gap-5">
            {credentials.map((item) => (
              <li key={item.icon} className="flex items-center gap-[1.2rem]">
                <Image src={withBasePath(item.icon)} alt="" width={47} height={47} className="shrink-0" />
                <p className="max-w-[1040px] font-sans text-base leading-[1.5] text-ink-soft md:text-lg">
                  <RichText text={item.text} />
                  {item.lattes && LATTES_URL && (
                    <a
                      href={LATTES_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-4 inline-flex items-start gap-1 whitespace-nowrap text-blue hover:underline"
                    >
                      Lattes
                      <Image src={withBasePath("/design/link-arrow.svg")} alt="" width={11.5} height={11.5} />
                    </a>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
