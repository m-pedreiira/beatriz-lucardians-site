"use client";

import { useState } from "react";
import { faq, type Dot } from "@/lib/content";
import { keepInPlace } from "@/lib/keep-in-place";
import Reveal from "./Reveal";
import RichText from "./RichText";
import SectionLabel from "./SectionLabel";

const dotColors: Record<Dot, string> = {
  blush: "bg-blush",
  sage: "bg-sage",
  gold: "bg-gold",
  sky: "bg-sky",
};

export default function Faq() {
  // One answer at a time, opened and closed by click, tap, Enter or Space.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number, item: HTMLElement) => {
    keepInPlace(item);
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="perguntas" className="bg-gold-soft/33 py-section">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <Reveal>
          <SectionLabel as="h2">Perguntas frequentes</SectionLabel>
        </Reveal>

        <Reveal delay={120} className="pt-block">
          <ul className="flex flex-col">
            {faq.map((item, i) => {
              const open = openIndex === i;
              return (
                <li key={item.question} className="border-t border-ink/10 last:border-b">
                  <h3>
                    <button
                      type="button"
                      id={`pergunta-${i}`}
                      aria-expanded={open}
                      aria-controls={`resposta-${i}`}
                      onClick={(e) => toggle(i, e.currentTarget.closest("li")!)}
                      className="group flex w-full cursor-pointer items-center gap-4 px-3 py-4 text-left transition-colors hover:bg-paper/70 focus-visible:!-outline-offset-2"
                    >
                      <span className={`h-2 w-2 shrink-0 rounded-full ${dotColors[item.dot]}`} aria-hidden="true" />
                      <span className="min-w-0 flex-1 font-display text-lg leading-snug text-ink transition-colors group-hover:text-accent md:text-xl">
                        {item.question}
                      </span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                        className={`shrink-0 text-ink-soft transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                      >
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </h3>
                  <div
                    id={`resposta-${i}`}
                    role="region"
                    aria-labelledby={`pergunta-${i}`}
                    className={`grid transition-[grid-template-rows,opacity,visibility] duration-300 ease-out ${
                      open ? "visible grid-rows-[1fr] opacity-100" : "invisible grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col gap-4 px-3 pt-1 pb-5 pl-9 font-sans text-base leading-relaxed text-ink-soft">
                        {item.answer.map((block, b) => (
                          <div key={b}>
                            {block.map((line) => (
                              <p key={line}>
                                <RichText text={line} />
                              </p>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
