import { withBasePath } from "./base-path";

export type GalleryImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Zoom/offset applied inside the carousel frame (the lightbox shows the full photo). */
  crop?: { width: string; height: string; left: string; top: string };
};

export const galleryImages: GalleryImage[] = [
  {
    src: withBasePath("/design/gallery-1.jpg"),
    width: 900,
    height: 1600,
    alt: "Dra. Beatriz Lucárdians brincando com uma criança no consultório",
  },
  {
    src: withBasePath("/images/clinical.jpg"),
    width: 541,
    height: 756,
    alt: "Dra. Beatriz Lucárdians ensinando higiene bucal com um boneco",
  },
  {
    src: withBasePath("/design/gallery-3.jpg"),
    width: 1200,
    height: 1600,
    alt: "Dra. Beatriz Lucárdians atendendo uma criança na cadeira odontológica",
    crop: { width: "145.87%", height: "145.87%", left: "-37.19%", top: "-11.18%" },
  },
  {
    src: withBasePath("/images/candid.jpg"),
    width: 720,
    height: 1280,
    alt: "Dra. Beatriz Lucárdians em seu consultório odontológico",
  },
  {
    src: withBasePath("/images/portrait-pattern-tight.jpg"),
    width: 1024,
    height: 1280,
    alt: "Retrato próximo da Dra. Beatriz Lucárdians",
  },
  {
    src: withBasePath("/images/portrait-pattern.jpg"),
    width: 1024,
    height: 1280,
    alt: "Retrato da Dra. Beatriz Lucárdians",
  },
];

/** Photo shown in the center when the page loads. */
export const GALLERY_START = 1;
