import Image from "next/image";
import { withBasePath } from "@/lib/base-path";
import { credentials } from "@/lib/content";
import { LATTES_URL } from "@/lib/site";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";
import RichText from "./RichText";

export default function About() {
  return (
    <section id="sobre" className="bg-paper py-section">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid items-center gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-10 lg:gap-14">
          <Reveal className="order-2 md:order-1">
            <div className="relative mx-auto aspect-[538/755] w-full max-w-[17rem] md:max-w-[23rem]">
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

          <div className="order-1 md:order-2">
            <Reveal>
              <Eyebrow className="!mb-0 text-sm font-bold !tracking-[0.18em] text-coral">Sobre</Eyebrow>
              <h2 className="pt-2 font-display text-title font-medium text-ink-soft">Muito prazer, Beatriz.</h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="flex flex-col gap-3.5 pt-4 font-sans text-base leading-relaxed text-ink-soft lg:text-[1.0625rem]">
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
                <p>
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

        <Reveal className="pt-block">
          <ul
            id="formacao"
            aria-label="Formação"
            className="grid gap-x-10 gap-y-4 border-t border-line pt-block lg:grid-cols-2"
          >
            {credentials.map((item) => (
              <li key={item.icon} className="flex items-center gap-4">
                <Image src={withBasePath(item.icon)} alt="" width={40} height={40} className="shrink-0" />
                <p className="min-w-0 font-sans text-base leading-normal text-ink-soft">
                  <RichText text={item.text} />
                  {item.lattes && LATTES_URL && (
                    <a
                      href={LATTES_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-3 inline-flex items-start gap-1 whitespace-nowrap text-blue hover:underline"
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
