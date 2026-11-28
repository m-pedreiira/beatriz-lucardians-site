"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { GalleryItem } from "@/lib/gallery";

type LightboxProps = {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

function Arrow({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === "prev" ? "M15 5L8 12L15 19" : "M9 5L16 12L9 19"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const roundButton =
  "flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20 focus-visible:!outline-cream";

export default function Lightbox({ items, index, onClose, onIndexChange }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  const goPrev = () => onIndexChange((index - 1 + items.length) % items.length);
  const goNext = () => onIndexChange((index + 1) % items.length);

  // Lock the page behind the dialog and give focus back to the thumbnail on close.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      opener?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      // Inside the video player the arrows seek, so they don't change the item.
      const inVideo = e.target instanceof HTMLVideoElement;
      if (e.key === "ArrowLeft" && !inVideo) goPrev();
      if (e.key === "ArrowRight" && !inVideo) goNext();

      // Keep Tab inside the dialog.
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>("button, video")].filter(
          (el) => el.offsetParent !== null
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const outside = !dialogRef.current.contains(document.activeElement);
        if (e.shiftKey && (document.activeElement === first || outside)) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && (document.activeElement === last || outside)) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const item = items[index];
  const several = items.length > 1;

  // Rendered on <body> so no transformed ancestor can trap the fixed overlay.
  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Galeria ampliada"
      // Any click that isn't on the media or a button closes the dialog.
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col bg-ink/95 backdrop-blur-sm"
      onTouchStart={(e) => {
        touchStartX.current = e.target instanceof HTMLVideoElement ? null : e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (delta > 50) goPrev();
        if (delta < -50) goNext();
        touchStartX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-5 py-4 md:px-8">
        <span className="font-sans text-sm text-cream/80" aria-live="polite">
          {index + 1} / {items.length}
        </span>
        <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Fechar" className={roundButton}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M1 1L19 19M19 1L1 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center px-4 pb-4 md:px-20">
        {item.type === "video" ? (
          <video
            key={item.file}
            src={item.file}
            poster={item.poster}
            controls
            playsInline
            preload="metadata"
            aria-label={item.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full rounded-lg"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element -- natural size, whatever file is added
          <img
            key={item.file}
            src={item.file}
            alt={item.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full rounded-lg object-contain"
          />
        )}
      </div>

      {several && (
        <div className="flex justify-center gap-4 pb-5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Item anterior"
            className={roundButton}
          >
            <Arrow direction="prev" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Próximo item"
            className={roundButton}
          >
            <Arrow direction="next" />
          </button>
        </div>
      )}
    </div>,
    document.body
  );
}
