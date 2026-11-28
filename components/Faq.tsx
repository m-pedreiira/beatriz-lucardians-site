"use client";

import { useState } from "react";
import { faq, type Dot } from "@/lib/content";
import Reveal from "./Reveal";
import RichText from "./RichText";
import SectionLabel from "./SectionLabel";

const dotColors: Record<Dot, string> = {
  blush: "bg-blush",
  sage: "bg-sage",
  gold: "bg-gold",
  sky: "bg-sky",
};

// If an opened answer runs past the bottom of the screen, scrolls down just enough to
// show it, never pushing its question under the header. The page never scrolls back up.
function revealAnswer(item: HTMLElement) {
  const { top, bottom } = item.getBoundingClientRect();
  const header = document.querySelector("header > div")?.clientHeight ?? 0;
  const distance = Math.min(bottom - window.innerHeight + 16, top - header - 8);
  if (distance <= 0) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollBy({ top: distance, behavior: reduced ? "instant" : "smooth" });
}

export default function Faq() {
  // Answers stay open until clicked again, so opening one never moves the questions above.
  const [openItems, setOpenItems] = useState<ReadonlySet<number>>(new Set());

  const toggle = (index: number) => {
    setOpenItems((current) => {
      const next = new Set(current);
      if (!next.delete(index)) next.add(index);
      return next;
    });
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
              const open = openItems.has(i);
              return (
                <li key={item.question} className="border-t border-ink/10 last:border-b">
                  <h3>
                    <button
                      type="button"
                      id={`pergunta-${i}`}
                      aria-expanded={open}
                      aria-controls={`resposta-${i}`}
                      onClick={() => toggle(i)}
                      className="group flex w-full cursor-pointer items-center gap-4 px-3 py-4 text-left transition-colors hover:bg-ink/4 focus-visible:!-outline-offset-2"
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
                    onTransitionEnd={(e) => {
                      const grew = e.target === e.currentTarget && e.propertyName === "grid-template-rows";
                      if (open && grew) revealAnswer(e.currentTarget.closest("li")!);
                    }}
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
