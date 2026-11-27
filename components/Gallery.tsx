"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { withBasePath } from "@/lib/base-path";
import { galleryImages, GALLERY_START } from "@/lib/gallery";
import Eyebrow from "./Eyebrow";
import Lightbox from "./Lightbox";
import Reveal from "./Reveal";

const AUTOPLAY_MS = 4500;
const total = galleryImages.length;

/** Signed distance from the centered photo, wrapping around: …, -2, -1, 0, 1, 2, … */
function offsetFrom(i: number, index: number) {
  const forward = (i - index + total) % total;
  return forward > total / 2 ? forward - total : forward;
}

/** Frame geometry per distance, as fractions of the center frame width (--w). */
function frameStyle(offset: number): React.CSSProperties {
  const distance = Math.abs(offset);
  const width = distance === 0 ? 1 : 0.84;
  const height = distance === 0 ? 1.32 : 1.12;
  const shift = [0, 0.976, 1.872, 2.77][distance] ?? 2.77;

  return {
    width: `calc(var(--w) * ${width})`,
    height: `calc(var(--w) * ${height})`,
    left: `calc(50% + var(--w) * ${Math.sign(offset) * shift - width / 2})`,
    top: `calc(20px + var(--w) * ${(1.32 - height) / 2})`,
    opacity: [1, 0.55, 0.25][distance] ?? 0,
  };
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Foto anterior" : "Próxima foto"}
      className={`absolute top-[calc(20px+var(--w)*0.66-28px)] z-20 h-14 w-14 rounded-full transition-transform hover:scale-105 ${
        direction === "prev" ? "left-3 md:left-10" : "right-3 md:right-10"
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
  const [index, setIndex] = useState(GALLERY_START);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goNext = useCallback(() => setIndex((i) => (i + 1) % total), []);
  const goPrev = useCallback(() => setIndex((i) => (i - 1 + total) % total), []);

  // Manual interaction pauses autoplay briefly so it doesn't fight the user.
  const pauseThenResume = useCallback(() => {
    setPaused(true);
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => setPaused(false), AUTOPLAY_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    };
  }, []);

  useEffect(() => {
    if (paused || lightboxOpen) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const id = setInterval(goNext, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, lightboxOpen, goNext]);

  return (
    <section id="galeria" className="bg-cream pt-20 pb-20 md:pb-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <Eyebrow className="!mb-0 text-sm text-accent">Galeria</Eyebrow>
          <h2 className="pt-4 font-display text-4xl leading-tight text-ink-soft md:text-5xl">
            Um pouco do dia a dia de cuidado
          </h2>
        </Reveal>
      </div>

      <Reveal delay={120} className="pt-10 md:pt-12">
        <div
          role="region"
          aria-roledescription="carrossel"
          aria-label="Galeria de fotos"
          className="relative h-[calc(var(--w)*1.32+100px)] overflow-hidden [--w:min(500px,72vw)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
            setPaused(true);
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current !== null) {
              const delta = e.changedTouches[0].clientX - touchStartX.current;
              if (delta > 40) goPrev();
              else if (delta < -40) goNext();
            }
            touchStartX.current = null;
            pauseThenResume();
          }}
        >
          {galleryImages.map((image, i) => {
            const offset = offsetFrom(i, index);
            const centered = offset === 0;

            return (
              <button
                key={image.src}
                type="button"
                onClick={() => {
                  if (centered) {
                    setLightboxOpen(true);
                  } else {
                    setIndex(i);
                    pauseThenResume();
                  }
                }}
                aria-hidden={!centered}
                tabIndex={centered ? 0 : -1}
                aria-label={`Ampliar foto: ${image.alt}`}
                style={frameStyle(offset)}
                className={`absolute overflow-hidden transition-all duration-500 ease-out motion-reduce:transition-none ${
                  centered
                    ? "z-10 rounded-3xl shadow-[0_2px_8px_rgb(0_0_0/0.06),0_12px_40px_-8px_rgb(0_0_0/0.15)]"
                    : "rounded-[1.25rem]"
                } ${Math.abs(offset) > 2 ? "pointer-events-none" : ""}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  style={image.crop}
                  className={image.crop ? "absolute max-w-none object-cover" : "h-full w-full object-cover"}
                />
              </button>
            );
          })}

          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-[19%] bg-linear-to-r from-cream via-cream/80 via-50% to-cream/0 md:block"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-[19%] bg-linear-to-l from-cream via-cream/80 via-50% to-cream/0 md:block"
            aria-hidden="true"
          />

          <ArrowButton
            direction="prev"
            onClick={() => {
              goPrev();
              pauseThenResume();
            }}
          />
          <ArrowButton
            direction="next"
            onClick={() => {
              goNext();
              pauseThenResume();
            }}
          />

          <div className="absolute inset-x-0 bottom-9 flex justify-center gap-2.5">
            {galleryImages.map((image, i) => (
              <button
                key={image.src}
                type="button"
                onClick={() => {
                  setIndex(i);
                  pauseThenResume();
                }}
                aria-label={`Ir para foto ${i + 1} de ${total}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-7 bg-accent" : "w-2 bg-ink/18 hover:bg-ink/40"
                }`}
              />
            ))}
          </div>
        </div>
      </Reveal>

      {lightboxOpen && (
        <Lightbox
          images={galleryImages}
          index={index}
          onClose={() => setLightboxOpen(false)}
          onIndexChange={setIndex}
        />
      )}
    </section>
  );
}
