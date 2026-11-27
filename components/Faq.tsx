import { faq } from "@/lib/content";
import DotItem from "./DotItem";
import Reveal from "./Reveal";
import RichText from "./RichText";
import SectionLabel from "./SectionLabel";

export default function Faq() {
  return (
    <section id="perguntas" className="bg-gold-soft/33 pt-12 pb-20 md:pb-28">
      <div className="mx-auto max-w-[1238px] px-6 md:px-10">
        <Reveal>
          <SectionLabel as="h2">Perguntas frequentes</SectionLabel>
        </Reveal>

        <ul className="flex flex-col pt-10">
          {faq.map((item) => (
            <DotItem key={item.question} dot={item.dot} title={item.question}>
              <div className="flex flex-col gap-[1.6rem]">
                {item.answer.map((block, i) => (
                  <div key={i}>
                    {block.map((line) => (
                      <p key={line}>
                        <RichText text={line} />
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </DotItem>
          ))}
        </ul>
      </div>
    </section>
  );
}
