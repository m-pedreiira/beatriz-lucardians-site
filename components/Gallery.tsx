"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { withBasePath } from "@/lib/base-path";
import { galleryItems, type GalleryItem } from "@/lib/gallery";
import Eyebrow from "./Eyebrow";
import Lightbox from "./Lightbox";
import Reveal from "./Reveal";

const AUTOPLAY_MS = 4500;
const total = galleryItems.length;
const several = total > 1;

/** Signed distance from the centered item, wrapping around: …, -2, -1, 0, 1, 2, … */
function offsetFrom(i: number, index: number) {
  const forward = (i - index + total) % total;
  return forward > total / 2 ? forward - total : forward;
}

/**
 * Where each frame sits, by distance from the center. Horizontal shift is a fraction
 * of the center frame width (--w); the side photos turn slightly toward the center.
 */
function frameStyle(offset: number): React.CSSProperties {
  const distance = Math.min(Math.abs(offset), 3);
  const side = Math.sign(offset);
  const shift = [0, 0.86, 1.52, 2.05][distance];
  const scale = [1, 0.82, 0.68, 0.56][distance];
  const turn = [0, 22, 30, 34][distance];

  return {
    transform: `translateX(calc(var(--w) * ${side * shift})) scale(${scale}) rotateY(${-side * turn}deg)`,
    opacity: [1, 0.75, 0.4, 0][distance],
    zIndex: 10 - distance,
  };
}

function Slide({ item, active }: { item: GalleryItem; active: boolean }) {
  const image = item.type === "foto" ? item.file : item.poster;

  return (
    <>
      {image && (
        <Image
          src={image}
          alt={item.alt}
          fill
          draggable={false}
          sizes="(max-width: 768px) 80vw, 544px"
          style={{ objectPosition: item.position }}
          className="object-cover"
        />
      )}
      {item.type === "video" && (
        <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <span
            className={`flex items-center justify-center rounded-full bg-paper/90 text-accent shadow-md transition-all ${
              active ? "h-20 w-20" : "h-14 w-14"
            }`}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.5v13l11-6.5-11-6.5Z" />
            </svg>
          </span>
        </span>
      )}
    </>
  );
}

function ArrowButton({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Item anterior" : "Próximo item"}
      className={`absolute top-[calc(0.5rem+var(--w)*0.625-28px)] z-20 h-14 w-14 cursor-pointer rounded-full transition-transform hover:scale-110 ${
        direction === "prev"
          ? "left-2 md:left-[max(1rem,calc(50%-var(--w)*1.86-4.5rem))]"
          : "right-2 md:right-[max(1rem,calc(50%-var(--w)*1.86-4.5rem))]"
      }`}
    >
      {/* The artwork includes its drop shadow, so it is larger than the button. */}
      <Image
        src={withBasePath(`/design/gallery-${direction}.svg`)}
        alt=""
        width={76}
        height={76}
        className="absolute -top-1.5 -left-2.5 max-w-none"
      />
    </button>
  );
}

export default function Gallery() {
  const [index, setIndex] = useState(Math.min(1, total - 1));
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [playing, setPlaying] = useState(true);
  const [keyboardOn, setKeyboardOn] = useState(false);
  const dragStart = useRef<number | null>(null);
  const dragged = useRef(false);
  const slideRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const step = useCallback((delta: number) => setIndex((i) => (i + delta + total) % total), []);

  // Rotates on its own, even with the mouse over it. It waits while a photo is open or
  // someone is browsing with the keyboard, and stops with the pause button.
  useEffect(() => {
    if (!several || !playing || keyboardOn || openIndex !== null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => step(1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, playing, keyboardOn, openIndex, step]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const next = (index + (e.key === "ArrowLeft" ? -1 : 1) + total) % total;
    setIndex(next);
    // Keep the keyboard on the centered photo.
    if ((e.target as HTMLElement).dataset.slide) slideRefs.current[next]?.focus({ preventScroll: true });
  };

  return (
    <section id="galeria" className="overflow-hidden bg-cream py-section">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal className="text-center">
          <Eyebrow className="!mb-0 justify-center text-sm text-accent">Galeria</Eyebrow>
          <h2 className="pt-2 font-display text-title text-ink-soft">Um pouco do dia a dia de cuidado</h2>
        </Reveal>
      </div>

      <Reveal delay={120} className="pt-2">
        {/* --w is the center photo width; it shrinks on short screens so everything fits. */}
        <div
          role="region"
          aria-roledescription="carrossel"
          aria-label="Galeria de fotos e vídeos"
          onKeyDown={onKeyDown}
          onFocus={(e) => e.target.matches(":focus-visible") && setKeyboardOn(true)}
          onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setKeyboardOn(false)}
          className="relative [--w:clamp(15rem,calc((100svh-15.5rem)/1.25),min(34rem,80vw))]"
        >
          <div
            className="relative h-[calc(var(--w)*1.25+1.25rem)] touch-pan-y select-none [perspective:1600px]"
            onPointerDown={(e) => {
              dragStart.current = e.clientX;
              dragged.current = false;
            }}
            onPointerUp={(e) => {
              if (dragStart.current === null) return;
              const delta = e.clientX - dragStart.current;
              dragStart.current = null;
              if (Math.abs(delta) > 40) {
                dragged.current = true;
                step(delta > 0 ? -1 : 1);
              }
            }}
            onPointerCancel={() => {
              dragStart.current = null;
            }}
          >
            {galleryItems.map((item, i) => {
              const offset = offsetFrom(i, index);
              const active = offset === 0;
              const hidden = Math.abs(offset) > 2;

              return (
                <button
                  key={item.file}
                  ref={(el) => {
                    slideRefs.current[i] = el;
                  }}
                  type="button"
                  data-slide="true"
                  onClick={() => {
                    // The click that ends a drag only moves the carousel.
                    if (dragged.current) {
                      dragged.current = false;
                      return;
                    }
                    if (active) setOpenIndex(i);
                    else setIndex(i);
                  }}
                  aria-hidden={!active}
                  tabIndex={active ? 0 : -1}
                  aria-haspopup={active ? "dialog" : undefined}
                  aria-label={`${item.type === "video" ? "Assistir vídeo" : "Ampliar foto"}: ${item.alt}`}
                  style={frameStyle(offset)}
                  className={`absolute top-2 left-[calc(50%-var(--w)/2)] h-[calc(var(--w)*1.25)] w-(--w) cursor-pointer overflow-hidden rounded-[1.75rem] bg-sage-soft focus-visible:!outline-offset-4 ${
                    hidden
                      ? "pointer-events-none invisible"
                      : "transition-[transform,opacity,box-shadow] duration-500 ease-out motion-reduce:transition-none"
                  } ${active ? "shadow-[0_18px_40px_-14px_rgb(42_35_30/0.35)]" : ""}`}
                >
                  <Slide item={item} active={active} />
                </button>
              );
            })}
          </div>

          {several && (
            <>
              <ArrowButton direction="prev" onClick={() => step(-1)} />
              <ArrowButton direction="next" onClick={() => step(1)} />

              <div className="flex items-center justify-center gap-1">
                {galleryItems.map((item, i) => (
                  <button
                    key={item.file}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Ir para o item ${i + 1} de ${total}`}
                    aria-current={i === index}
                    className="group flex h-8 cursor-pointer items-center px-1"
                  >
                    <span
                      className={`block h-2 rounded-full transition-all ${
                        i === index ? "w-7 bg-accent" : "w-2 bg-ink/18 group-hover:bg-ink/40"
                      }`}
                    />
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setPlaying((p) => !p)}
                  aria-label={playing ? "Pausar a rotação" : "Retomar a rotação"}
                  className="ml-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-ink/5 motion-reduce:hidden"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={playing ? "M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" : "M8 5.5v13l11-6.5-11-6.5Z"} />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      </Reveal>

      {openIndex !== null && (
        <Lightbox
          items={galleryItems}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onIndexChange={(i) => {
            setOpenIndex(i);
            // The carousel follows, so closing returns to the same photo.
            setIndex(i);
          }}
        />
      )}
    </section>
  );
}
