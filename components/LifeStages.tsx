"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { withBasePath } from "@/lib/base-path";
import { lifeStages } from "@/lib/content";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

export default function LifeStages() {
  const [selected, setSelected] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number) => {
    setSelected(i);
    // On narrow screens the timeline scrolls sideways: bring the chosen stage to the middle.
    const list = listRef.current;
    const tab = tabRefs.current[i];
    if (list && tab) {
      list.scrollTo({ left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2 });
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = lifeStages.length - 1;
    const next = {
      ArrowRight: selected === last ? 0 : selected + 1,
      ArrowDown: selected === last ? 0 : selected + 1,
      ArrowLeft: selected === 0 ? last : selected - 1,
      ArrowUp: selected === 0 ? last : selected - 1,
      Home: 0,
      End: last,
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select(next);
    tabRefs.current[next]?.focus({ preventScroll: true });
  };

  return (
    <section id="atendimentos" className="bg-sand py-section">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal className="text-center">
          <SectionLabel>Atendimentos</SectionLabel>
          <h2 className="pt-2 font-display text-title font-medium text-blue">Diferentes fases, um só propósito</h2>
          <p className="pt-2 font-display text-lg leading-snug text-ink-soft md:text-xl">
            um atendimento acolhedor e individualizado para cada paciente
          </p>
        </Reveal>

        <Reveal delay={120} className="pt-block">
          <div
            ref={listRef}
            role="tablist"
            aria-label="Fases da vida"
            onKeyDown={onKeyDown}
            className="relative -mx-6 flex snap-x snap-proximity overflow-x-auto scroll-smooth px-3 [scrollbar-width:thin] motion-reduce:scroll-auto md:-mx-10 md:px-7 lg:mx-0 lg:grid lg:grid-cols-7 lg:overflow-visible lg:px-0"
          >
            {lifeStages.map((stage, i) => {
              const active = i === selected;
              return (
                <button
                  key={stage.title}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`fase-${i}`}
                  aria-selected={active}
                  aria-controls={`fase-painel-${i}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => select(i)}
                  className="group flex w-36 shrink-0 snap-center flex-col items-center rounded-xl px-1 pb-3 focus-visible:!-outline-offset-2 lg:w-auto"
                >
                  {/* The rule runs behind the dots, from the first stage to the last. */}
                  <span className="relative flex h-9 w-[calc(100%+0.5rem)] items-center justify-center">
                    <span
                      className={`absolute top-1/2 h-[3px] -translate-y-1/2 bg-blue/45 ${i === 0 ? "left-1/2" : "left-0"} ${
                        i === lifeStages.length - 1 ? "right-1/2" : "right-0"
                      }`}
                      aria-hidden="true"
                    />
                    <span
                      className={`relative rounded-full border-[3px] border-blue transition-all duration-200 ${
                        active ? "h-6 w-6 bg-blue ring-4 ring-blue/25" : "h-4 w-4 bg-sand group-hover:bg-sky"
                      }`}
                      aria-hidden="true"
                    />
                  </span>
                  <span
                    className={`mt-1 font-sans text-sm leading-snug font-semibold tracking-[0.06em] text-balance uppercase transition-colors lg:text-xs ${
                      active ? "text-ink" : "text-ink-soft group-hover:text-ink"
                    }`}
                  >
                    {stage.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* All panels share one grid cell, so the section keeps the height of the longest text. */}
          <div className="mt-4 grid rounded-[2rem] bg-paper">
            {lifeStages.map((stage, i) => {
              const active = i === selected;
              return (
                <div
                  key={stage.title}
                  role="tabpanel"
                  id={`fase-painel-${i}`}
                  aria-labelledby={`fase-${i}`}
                  tabIndex={active ? 0 : -1}
                  className={`col-start-1 row-start-1 grid content-center items-center gap-4 rounded-[2rem] p-5 transition-[opacity,visibility] duration-300 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-10 md:px-10 md:py-6 ${
                    active ? "visible opacity-100" : "invisible opacity-0"
                  }`}
                >
                  <Image
                    src={withBasePath(stage.image.src)}
                    alt={stage.image.alt}
                    width={stage.image.width}
                    height={stage.image.height}
                    className="mx-auto h-44 w-full object-contain sm:h-56 md:h-72"
                  />
                  <div className="text-center md:text-left">
                    <h3 className="font-sans text-base font-semibold tracking-[0.16em] text-ink-soft uppercase md:text-lg">
                      {stage.title}
                    </h3>
                    {stage.subtitle && (
                      <p className="pt-2 font-display text-lg font-semibold text-ink-soft md:text-xl">
                        {stage.subtitle}
                      </p>
                    )}
                    <p className="pt-3 font-display text-[1.0625rem] leading-relaxed text-ink-soft md:text-xl">
                      {stage.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
