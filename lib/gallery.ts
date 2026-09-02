import { withBasePath } from "./base-path";

export type GalleryImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export const galleryImages: GalleryImage[] = [
  {
    src: withBasePath("/images/portrait-coat.jpg"),
    width: 854,
    height: 1280,
    alt: "Dra. Beatriz Lucárdians sorrindo, vestindo jaleco com o brasão da Odontologia UFMG",
  },
  {
    src: withBasePath("/images/clinical.jpg"),
    width: 541,
    height: 756,
    alt: "Dra. Beatriz Lucárdians atendendo uma criança em consulta odontológica",
  },
  {
    src: withBasePath("/images/portrait-pink.jpg"),
    width: 854,
    height: 1280,
    alt: "Retrato da Dra. Beatriz Lucárdians",
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
