import { withBasePath } from "./base-path";

/*
 * GALERIA — para adicionar uma foto ou um vídeo:
 *
 * 1. Copie o arquivo para a pasta public/galeria/ (nome sem espaços nem acentos).
 * 2. Acrescente um item à lista `media`, abaixo. A ordem da lista é a ordem no site.
 *
 *    Foto:
 *      { type: "foto", file: "/galeria/consultorio.jpg", alt: "Descrição da foto" },
 *
 *    Vídeo (MP4; a capa é uma imagem mostrada antes de tocar):
 *      { type: "video", file: "/galeria/atendimento.mp4", poster: "/galeria/atendimento.jpg",
 *        alt: "Descrição do vídeo" },
 *
 * `position` (opcional) ajusta o enquadramento da miniatura, ex.: "center top".
 * Mais detalhes no README.
 */

type BaseItem = {
  /** Path inside public/, starting with "/". */
  file: string;
  /** Description read by screen readers. */
  alt: string;
  position?: string;
};

export type GalleryItem =
  | (BaseItem & { type: "foto" })
  | (BaseItem & { type: "video"; poster?: string });

const media: GalleryItem[] = [
  {
    type: "foto",
    file: "/design/gallery-1.jpg",
    alt: "Dra. Beatriz Lucárdians brincando com uma criança no consultório",
  },
  {
    type: "foto",
    file: "/images/clinical.jpg",
    alt: "Dra. Beatriz Lucárdians ensinando higiene bucal com um boneco",
  },
  {
    type: "foto",
    file: "/design/gallery-3.jpg",
    alt: "Dra. Beatriz Lucárdians atendendo uma criança na cadeira odontológica",
  },
  {
    type: "foto",
    file: "/images/candid.jpg",
    alt: "Dra. Beatriz Lucárdians em seu consultório odontológico",
    position: "center 30%",
  },
  {
    type: "foto",
    file: "/images/portrait-pattern-tight.jpg",
    alt: "Retrato próximo da Dra. Beatriz Lucárdians",
  },
  {
    type: "foto",
    file: "/images/portrait-pattern.jpg",
    alt: "Retrato da Dra. Beatriz Lucárdians",
  },
];

export const galleryItems: GalleryItem[] = media.map((item) => ({
  ...item,
  file: withBasePath(item.file),
  ...(item.type === "video" && item.poster ? { poster: withBasePath(item.poster) } : {}),
}));
