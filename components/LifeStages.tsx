"use client";

import { IconHandClick } from "@tabler/icons-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { withBasePath } from "@/lib/base-path";
import { lifeStages } from "@/lib/content";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

// Stage shown when the page loads and whenever "Atendimentos" is chosen in a menu.
const START = Math.max(0, lifeStages.findIndex((stage) => stage.title === "Infância"));

export default function LifeStages() {
  const [selected, setSelected] = useState(START);
  const listRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // On narrow screens the timeline scrolls sideways: bring a stage to the middle
  // (moves only the timeline, never the page).
  const center = useCallback((i: number, behavior?: ScrollBehavior) => {
    const list = listRef.current;
    const tab = tabRefs.current[i];
    if (list && tab) {
      list.scrollTo({ left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2, behavior });
    }
  }, []);

  const select = (i: number) => {
    setSelected(i);
    center(i);
  };

  useEffect(() => {
    center(START, "instant");

    const onClick = (e: MouseEvent) => {
      if (!(e.target as Element).closest('a[href="#atendimentos"]')) return;
      setSelected(START);
      center(START, "instant");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [center]);

  const step = (delta: number) => select((selected + delta + lifeStages.length) % lifeStages.length);

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

        <Reveal delay={120} className="pt-2">
          <p className="flex items-center justify-center gap-2 pb-1 font-sans text-sm font-semibold text-blue">
            <IconHandClick size={20} stroke={1.5} aria-hidden="true" />
            Clique em uma fase para conhecer
          </p>
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
                  className="group flex w-36 shrink-0 cursor-pointer snap-center flex-col items-center rounded-xl px-1 pb-3 focus-visible:!-outline-offset-2 lg:w-auto"
                >
                  {/* The rule runs behind the dots, from the first stage to the last. */}
                  <span className="relative flex h-[4.75rem] w-[calc(100%+0.5rem)] items-center justify-center">
                    <span
                      className={`absolute top-1/2 h-[3px] -translate-y-1/2 bg-blue/45 ${i === 0 ? "left-1/2" : "left-0"} ${
                        i === lifeStages.length - 1 ? "right-1/2" : "right-0"
                      }`}
                      aria-hidden="true"
                    />
                    {/* A small portrait of each stage shows there is something to choose. */}
                    <span
                      className={`relative overflow-hidden rounded-full border-[3px] border-blue bg-paper transition-all duration-200 ${
                        active
                          ? "h-[4.25rem] w-[4.25rem] ring-4 ring-blue/30"
                          : "h-14 w-14 shadow-[0_4px_10px_-4px_rgb(42_35_30/0.35)] group-hover:scale-110 group-hover:ring-4 group-hover:ring-blue/15"
                      }`}
                    >
                      <Image
                        src={withBasePath(stage.image.src.replace("phase-", "thumb-"))}
                        alt=""
                        width={192}
                        height={192}
                        className="h-full w-full"
                      />
                    </span>
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
          <div className="relative mt-2 grid rounded-[2rem] bg-paper">
            {([-1, 1] as const).map((delta) => (
              <button
                key={delta}
                type="button"
                onClick={() => step(delta)}
                aria-label={delta < 0 ? "Fase anterior" : "Próxima fase"}
                className={`absolute top-24 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-blue/40 bg-paper text-blue shadow-md transition-colors hover:bg-blue hover:text-paper md:top-1/2 ${
                  delta < 0 ? "left-2 md:-left-5" : "right-2 md:-right-5"
                }`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d={delta < 0 ? "M15 5L8 12L15 19" : "M9 5L16 12L9 19"}
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ))}
            {lifeStages.map((stage, i) => {
              const active = i === selected;
              return (
                <div
                  key={stage.title}
                  role="tabpanel"
                  id={`fase-painel-${i}`}
                  aria-labelledby={`fase-${i}`}
                  tabIndex={active ? 0 : -1}
                  className={`col-start-1 row-start-1 grid content-center items-center gap-4 rounded-[2rem] p-5 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-10 md:px-14 md:py-[clamp(1rem,2.5svh,1.5rem)] ${
                    // Only the incoming panel fades, so two texts never show on top of each other.
                    active ? "visible opacity-100 transition-opacity duration-300" : "invisible opacity-0"
                  }`}
                >
                  <Image
                    src={withBasePath(stage.image.src)}
                    alt={stage.image.alt}
                    width={stage.image.width}
                    height={stage.image.height}
                    className="mx-auto h-44 w-full object-contain sm:h-56 md:h-[clamp(11rem,34svh,18rem)]"
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
                    <p className="pt-3 font-display text-[1.0625rem] leading-relaxed text-ink-soft md:text-[clamp(1.0625rem,2.5svh,1.25rem)]">
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
