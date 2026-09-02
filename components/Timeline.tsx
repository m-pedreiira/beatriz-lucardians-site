import { education } from "@/lib/content";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

export default function Timeline() {
  return (
    <section id="formacao" className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal className="mb-14 max-w-xl md:mb-20">
          <Eyebrow>Formação e trajetória</Eyebrow>
          <h2 className="font-serif-display text-4xl leading-tight text-ink md:text-5xl">
            Estudo contínuo, a serviço do cuidado.
          </h2>
          <p className="mt-6 font-sans text-lg leading-relaxed text-ink-soft">
            Uma trajetória construída entre a universidade, a pesquisa científica e a prática
            clínica — sempre voltada a oferecer um atendimento atual, seguro e humano.
          </p>
        </Reveal>

        <ol className="flex flex-col">
          {education.map((item, i) => (
            <li
              key={`${item.year}-${item.title}`}
              className={`border-t border-line ${i === education.length - 1 ? "border-b" : ""}`}
            >
              <Reveal delay={Math.min(i, 5) * 60}>
                <div className="grid grid-cols-1 gap-2 py-7 md:grid-cols-[10rem_1fr] md:gap-8 md:py-8">
                  <span className="font-sans text-sm tracking-wide text-ink-faint uppercase">
                    {item.year}
                  </span>
                  <div>
                    <h3 className="font-serif-display text-xl text-ink md:text-2xl">
                      {item.title}
                    </h3>
                    {item.place && (
                      <p className="mt-1.5 font-sans text-[0.95rem] text-accent">{item.place}</p>
                    )}
                    {item.description && (
                      <p className="mt-2 max-w-2xl font-sans leading-relaxed text-ink-soft">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
