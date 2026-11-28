"use client";

import Image from "next/image";
import { useState } from "react";
import { galleryItems, type GalleryItem } from "@/lib/gallery";
import Eyebrow from "./Eyebrow";
import Lightbox from "./Lightbox";
import Reveal from "./Reveal";

function Thumbnail({ item }: { item: GalleryItem }) {
  const image = item.type === "foto" ? item.file : item.poster;

  return (
    <>
      {image && (
        <Image
          src={image}
          alt={item.alt}
          fill
          sizes="(max-width: 768px) 50vw, 270px"
          style={{ objectPosition: item.position }}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
        />
      )}
      {item.type === "video" && (
        <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-paper/90 text-accent shadow-md">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.5v13l11-6.5-11-6.5Z" />
            </svg>
          </span>
        </span>
      )}
    </>
  );
}

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="galeria" className="bg-cream py-section">
      <div className="mx-auto max-w-[56rem] px-6 md:px-10">
        <Reveal>
          <Eyebrow className="!mb-0 text-sm text-accent">Galeria</Eyebrow>
          <h2 className="pt-2 font-display text-title text-ink-soft">Um pouco do dia a dia de cuidado</h2>
        </Reveal>

        <Reveal delay={120} className="pt-block">
          {/* Flex instead of grid so an incomplete last row (or very few items) stays centered. */}
          <ul className="flex flex-wrap justify-center gap-3 md:gap-4">
            {galleryItems.map((item, i) => (
              <li key={item.file} className="w-[calc(50%-0.375rem)] md:w-[calc((100%-2rem)/3)]">
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  aria-haspopup="dialog"
                  aria-label={`${item.type === "video" ? "Assistir vídeo" : "Ampliar foto"}: ${item.alt}`}
                  className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-sage-soft"
                >
                  <Thumbnail item={item} />
                </button>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {openIndex !== null && (
        <Lightbox
          items={galleryItems}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onIndexChange={setOpenIndex}
        />
      )}
    </section>
  );
}
