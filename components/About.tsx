import Image from "next/image";
import { withBasePath } from "@/lib/base-path";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="sobre" className="bg-paper py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-[0.85fr_1.15fr] md:gap-16 md:px-10">
        <Reveal className="relative">
          <div className="relative mx-auto max-w-sm md:max-w-none">
            <div
              className="absolute -top-4 -left-4 aspect-[2/3] w-full rounded-[2rem] bg-sage md:-top-6 md:-left-6"
              aria-hidden="true"
            />
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[2rem] bg-cream">
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

        <div className="flex flex-col justify-center">
          <Reveal>
            <Eyebrow>Sobre</Eyebrow>
            <h2 className="font-serif-display text-4xl leading-tight text-ink md:text-5xl">
              Muito prazer, Beatriz.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-7 flex flex-col gap-5 font-sans text-lg leading-relaxed text-ink-soft">
              <p>
                Formada em Odontologia pela UFMG em 2023, depois de anos dedicados à pesquisa
                científica e ao atendimento clínico, encontrei no cuidado com as pessoas o
                verdadeiro propósito da minha profissão. Cada consulta é, para mim, uma
                oportunidade de construir confiança — devagar, com respeito e atenção genuína a
                quem está sentado na cadeira.
              </p>
              <p>
                Atendo crianças e adultos, sempre com a mesma intenção: tornar a experiência
                odontológica leve, humana e segura. Explico cada etapa, respeito o tempo de cada
                paciente e trato a saúde bucal como parte de um cuidado maior — o de se sentir
                bem consigo mesmo.
              </p>
              <p>
                Hoje, meus atendimentos são particulares, preparados com atenção aos detalhes
                para você e sua família. Se você quiser saber mais sobre como funciona o cuidado
                comigo, é só entrar em contato — terei o maior prazer em conversar.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
