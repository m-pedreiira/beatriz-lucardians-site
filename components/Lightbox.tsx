"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { GalleryImage } from "@/lib/gallery";

type LightboxProps = {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export default function Lightbox({ images, index, onClose, onIndexChange }: LightboxProps) {
  const touchStartX = useRef<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const goPrev = () => onIndexChange((index - 1 + images.length) % images.length);
  const goNext = () => onIndexChange((index + 1) % images.length);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const image = images[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Visualização ampliada da foto"
      className="fixed inset-0 z-[100] flex flex-col bg-ink/97 backdrop-blur-sm"
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (delta > 50) goPrev();
        if (delta < -50) goNext();
        touchStartX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-5 py-4 md:px-8 md:py-6">
        <span className="font-sans text-sm text-cream/70">
          {index + 1} / {images.length}
        </span>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="flex h-10 w-10 items-center justify-center rounded-full text-cream/90 transition-colors hover:bg-cream/10"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M1 1L19 19M19 1L1 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center px-4 pb-6 md:px-16"
        onClick={onClose}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Foto anterior"
          className="absolute left-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-cream/90 transition-colors hover:bg-cream/10 sm:flex md:left-6"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div
          className="relative max-h-[78vh] max-w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="max-h-[78vh] w-auto rounded-lg object-contain"
            priority
          />
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Próxima foto"
          className="absolute right-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-cream/90 transition-colors hover:bg-cream/10 sm:flex md:right-6"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="flex justify-center gap-4 pb-6 sm:hidden">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Foto anterior"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Próxima foto"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
