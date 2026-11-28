"use client";

import Image from "next/image";
import { useState } from "react";
import { withBasePath } from "@/lib/base-path";
import { procedures, type Dot, type Procedure } from "@/lib/content";
import { keepInPlace } from "@/lib/keep-in-place";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

const tints: Record<Dot, string> = {
  blush: "bg-blush",
  sage: "bg-sage",
  gold: "bg-gold",
  sky: "bg-sky",
};

function Card({
  procedure,
  id,
  open,
  onToggle,
  onHover,
}: {
  procedure: Procedure;
  id: string;
  open: boolean;
  onToggle: (card: HTMLElement) => void;
  onHover: (hovering: boolean) => void;
}) {
  const Icon = procedure.icon;
  const description = "px-1 pt-2 font-sans text-base leading-normal text-ink-soft md:text-[0.9375rem]";

  return (
    <li
      onPointerEnter={(e) => e.pointerType === "mouse" && onHover(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && onHover(false)}
      className={`relative grid w-full rounded-2xl border bg-paper p-4 transition-[border-color,box-shadow] duration-200 md:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-3rem)/4)] xl:w-[calc((100%-4rem)/5)] ${
        open ? "border-ink/25 shadow-[0_8px_24px_-12px_rgb(42_35_30/0.25)]" : "border-ink/10"
      }`}
    >
      {/* Invisible copy of the open card (title and text; the icon folds away). From md up it
          fixes the card height, so nothing around moves when a card opens. */}
      <div className="invisible col-start-1 row-start-1 hidden flex-col text-center md:flex" aria-hidden="true">
        <span className="font-display text-lg leading-snug">{procedure.title}</span>
        <span className={description}>{procedure.description}</span>
      </div>

      <div className="col-start-1 row-start-1 flex min-w-0 flex-col justify-center md:items-center md:text-center">
        <h3 className="w-full">
          {/* The ::after layer makes the whole card clickable. */}
          <button
            type="button"
            aria-expanded={open}
            aria-controls={id}
            onClick={(e) => onToggle(e.currentTarget.closest("li")!)}
            className="flex w-full items-center gap-4 text-left after:absolute after:inset-0 after:rounded-2xl focus-visible:!outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent md:flex-col md:gap-0 md:text-center"
          >
            <span
              className={`grid shrink-0 transition-[grid-template-rows,opacity] duration-300 ease-out ${
                open ? "md:grid-rows-[0fr] md:opacity-0" : "md:grid-rows-[1fr]"
              }`}
            >
              <span className="overflow-hidden md:px-1">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full md:mb-3 ${tints[procedure.dot]}`}
                >
                  <Icon size={26} stroke={1.25} className="text-ink" aria-hidden="true" />
                </span>
              </span>
            </span>
            <span className="min-w-0 flex-1 font-display text-lg leading-snug text-ink md:flex-none">
              {procedure.title}
            </span>
            <span className="shrink-0 text-xl leading-none text-ink-soft md:hidden" aria-hidden="true">
              {open ? "−" : "+"}
            </span>
          </button>
        </h3>
        <div
          id={id}
          className={`grid transition-[grid-template-rows,opacity,visibility] duration-300 ease-out ${
            open ? "visible grid-rows-[1fr] opacity-100" : "invisible grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <p className={description}>{procedure.description}</p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function Procedures() {
  // A click or tap keeps one card open; the mouse also opens the card under it.
  const [pinned, setPinned] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="procedimentos" className="relative overflow-hidden bg-gold-soft/33 py-section">
      <Image
        src={withBasePath("/logo/tooth-icon.png")}
        alt=""
        width={493}
        height={537}
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 -right-20 h-auto w-56 opacity-15 md:w-80"
      />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
        <Reveal className="mx-auto max-w-4xl text-center">
          <SectionLabel>Procedimentos e tratamentos</SectionLabel>
          <h2 className="pt-2 font-display text-title font-medium text-ink-soft">Cuidado em cada detalhe</h2>
          <p className="pt-3 font-sans text-base leading-relaxed text-ink-soft md:text-lg">
            Cada paciente é único. Por isso, cada cuidado é pensado de forma individualizada. Da prevenção ao
            tratamento, cada procedimento é conduzido com técnica, escuta e cuidado com o seu conforto.
          </p>
        </Reveal>

        <Reveal delay={120} className="pt-block">
          <ul className="flex flex-wrap justify-center gap-3 md:gap-4">
            {procedures.map((procedure, i) => (
              <Card
                key={procedure.title}
                id={`procedimento-${i}`}
                procedure={procedure}
                open={pinned === i || hovered === i}
                onHover={(hovering) => setHovered(hovering ? i : null)}
                onToggle={(card) => {
                  // On phones, closing the card above would push this one off screen.
                  keepInPlace(card);
                  setPinned(pinned === i ? null : i);
                }}
              />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
