"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { galleryImages } from "@/lib/gallery";
import Eyebrow from "./Eyebrow";
import Lightbox from "./Lightbox";
import Reveal from "./Reveal";

const AUTOPLAY_MS = 4500;

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((i: number) => {
    const total = galleryImages.length;
    setIndex(((i % total) + total) % total);
  }, []);

  const goNext = useCallback(() => setIndex((i) => (i + 1) % galleryImages.length), []);
  const goPrev = useCallback(
    () => setIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length),
    []
  );

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
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % galleryImages.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, lightboxOpen]);

  return (
    <section id="galeria" className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal className="mb-14 max-w-xl md:mb-16">
          <Eyebrow>Galeria</Eyebrow>
          <h2 className="font-serif-display text-4xl leading-tight text-ink md:text-5xl">
            Um pouco do dia a dia de cuidado.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div
            role="region"
            aria-roledescription="carrossel"
            aria-label="Galeria de fotos"
            className="relative mx-auto max-w-sm sm:max-w-md md:max-w-lg"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
              setPaused(true);
            }}
            onTouchEnd={(e) => {
              if (touchStartX.current !== null) {
                const delta = e.changedTouches[0].clientX - touchStartX.current;
                if (delta > 40) {
                  goPrev();
                  pauseThenResume();
                } else if (delta < -40) {
                  goNext();
                  pauseThenResume();
                }
              }
              touchStartX.current = null;
              setPaused(false);
            }}
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-paper">
              {galleryImages.map((image, i) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  aria-hidden={i !== index}
                  tabIndex={i === index ? 0 : -1}
                  aria-label={`Ampliar foto: ${image.alt}`}
                  className={`absolute inset-0 transition-opacity duration-200 ease-out ${
                    i === index ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 90vw, 512px"
                    priority={i === 0}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                goPrev();
                pauseThenResume();
              }}
              aria-label="Foto anterior"
              className="absolute top-1/2 -left-3 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-ink shadow-md transition-colors hover:bg-accent hover:text-cream sm:-left-5"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => {
                goNext();
                pauseThenResume();
              }}
              aria-label="Próxima foto"
              className="absolute top-1/2 -right-3 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-ink shadow-md transition-colors hover:bg-accent hover:text-cream sm:-right-5"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="mt-6 flex justify-center gap-2">
              {galleryImages.map((image, i) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => {
                    goTo(i);
                    pauseThenResume();
                  }}
                  aria-label={`Ir para foto ${i + 1} de ${galleryImages.length}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-accent" : "w-1.5 bg-ink/20 hover:bg-ink/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>

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
