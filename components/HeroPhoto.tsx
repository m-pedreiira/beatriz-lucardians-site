import { withBasePath } from "@/lib/base-path";
import photo from "@/lib/hero-photo.json";

// Framing inside the 4:5 frame, as percentages of the frame. Adjust these if a
// new original is framed differently. To show the photo without extra zoom, use
// { width: "100%", height: "100%", left: "0%", top: "0%" } with object-cover.
const FRAMING = { width: "150.09%", height: "180%", left: "-5.7%", top: "-49%" };

// The image is drawn at 150% of the frame, which is up to 420px wide on desktop
// and up to 272px on phones.
const SIZES = "(min-width: 768px) 630px, min(408px, calc(150vw - 96px))";

const srcSet = (ext: string) =>
  photo.widths.map((w) => `${withBasePath(`/images/hero/hero-${w}.${ext}`)} ${w}w`).join(", ");

/** Hero portrait in modern formats and several sizes (see scripts/hero-photo.mjs). */
export default function HeroPhoto() {
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet("avif")} sizes={SIZES} />
      <source type="image/webp" srcSet={srcSet("webp")} sizes={SIZES} />
      <img
        src={withBasePath(`/images/hero/hero-${photo.widths.at(-1)}.jpg`)}
        srcSet={srcSet("jpg")}
        sizes={SIZES}
        alt="Dra. Beatriz Lucárdians, cirurgiã-dentista, sorrindo de jaleco"
        width={photo.width}
        height={photo.height}
        fetchPriority="high"
        decoding="async"
        style={FRAMING}
        className="absolute max-w-none object-cover"
      />
    </picture>
  );
}
