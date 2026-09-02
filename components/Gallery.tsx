"use client";

import Image from "next/image";
import { useState } from "react";
import { galleryImages } from "@/lib/gallery";
import Eyebrow from "./Eyebrow";
import Lightbox from "./Lightbox";
import Reveal from "./Reveal";

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="galeria" className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal className="mb-14 max-w-xl md:mb-16">
          <Eyebrow>Galeria</Eyebrow>
          <h2 className="font-serif-display text-4xl leading-tight text-ink md:text-5xl">
            Um pouco do dia a dia de cuidado.
          </h2>
        </Reveal>

        <div className="columns-2 gap-4 md:columns-3 md:gap-6 [column-fill:balance]">
          {galleryImages.map((image, index) => (
            <Reveal
              key={image.src}
              delay={Math.min(index, 5) * 70}
              className="mb-4 block w-full break-inside-avoid md:mb-6"
            >
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="block w-full overflow-hidden rounded-2xl bg-paper"
                style={{ aspectRatio: `${image.width} / ${image.height}` }}
                aria-label={`Ampliar foto: ${image.alt}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <Lightbox
          images={galleryImages}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onIndexChange={setActiveIndex}
        />
      )}
    </section>
  );
}
