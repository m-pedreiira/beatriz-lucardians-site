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
  { type: "foto", file: "/galeria/foto-02.jpg", alt: "Dra. Beatriz Lucárdians sorrindo com uma criança de óculos vermelhos" },
  { type: "foto", file: "/galeria/foto-08.jpg", alt: "Abraço de uma criança na Dra. Beatriz Lucárdians" },
  { type: "foto", file: "/design/gallery-3.jpg", alt: "Dra. Beatriz Lucárdians atendendo uma criança na cadeira odontológica" },
  {
    type: "video",
    file: "/galeria/video-03.mp4",
    poster: "/galeria/video-03-capa.jpg",
    alt: "Explicação em consulta com uma criança, usando imagens na tela",
  },
  { type: "foto", file: "/galeria/foto-06.jpg", alt: "Dra. Beatriz Lucárdians com um bebê no colo", position: "center 35%" },
  { type: "foto", file: "/images/clinical.jpg", alt: "Dra. Beatriz Lucárdians ensinando higiene bucal com um boneco" },
  { type: "foto", file: "/galeria/foto-13.jpg", alt: "Criança com um certificado ao lado da Dra. Beatriz Lucárdians", position: "center 60%" },
  {
    type: "video",
    file: "/galeria/video-01.mp4",
    poster: "/galeria/video-01-capa.jpg",
    alt: "Atendimento de uma criança na cadeira odontológica",
  },
  { type: "foto", file: "/galeria/foto-03.jpg", alt: "Dra. Beatriz Lucárdians com uma criança no consultório colorido" },
  { type: "foto", file: "/design/gallery-1.jpg", alt: "Dra. Beatriz Lucárdians brincando com uma criança no consultório" },
  { type: "foto", file: "/galeria/foto-10.jpg", alt: "Dra. Beatriz Lucárdians com uma criança no colo, segurando um balão", position: "center 55%" },
  {
    type: "video",
    file: "/galeria/video-04.mp4",
    poster: "/galeria/video-04-capa.jpg",
    alt: "Modelo de gesso com um aparelho odontológico",
  },
  { type: "foto", file: "/galeria/foto-14.jpg", alt: "Explicação do tratamento durante uma consulta", position: "center 65%" },
  { type: "foto", file: "/galeria/foto-05.jpg", alt: "Atendimento de uma criança que segura uma lousa digital" },
  { type: "foto", file: "/galeria/foto-12.jpg", alt: "Modelo de boca e escova usados para ensinar higiene bucal" },
  {
    type: "video",
    file: "/galeria/video-02.mp4",
    poster: "/galeria/video-02-capa.jpg",
    alt: "Bastidores: limpeza dos materiais no consultório",
  },
  { type: "foto", file: "/galeria/foto-15.jpg", alt: "Bebê com óculos de proteção na cadeira do dentista" },
  { type: "foto", file: "/galeria/foto-11.jpg", alt: "Exame de uma criança com óculos de proteção" },
  { type: "foto", file: "/galeria/foto-04.jpg", alt: "Criança desenhando em uma lousa digital na cadeira do dentista" },
  {
    type: "video",
    file: "/galeria/video-06.mp4",
    poster: "/galeria/video-06-capa.jpg",
    alt: "Detalhe dos dentes durante um atendimento",
  },
  { type: "foto", file: "/galeria/foto-07.jpg", alt: "Dra. Beatriz Lucárdians atendendo uma criança na cadeira odontológica" },
  { type: "foto", file: "/galeria/foto-01.jpg", alt: "Atendimento com uma criança e um boneco no consultório" },
  {
    type: "video",
    file: "/galeria/video-05.mp4",
    poster: "/galeria/video-05-capa.jpg",
    alt: "Passeio pelo ambiente do consultório",
  },
  { type: "foto", file: "/galeria/foto-09.jpg", alt: "Atendimento infantil com um boneco ao lado da cadeira" },
  { type: "foto", file: "/galeria/foto-16.jpg", alt: "Criança de óculos vermelhos sendo examinada ao lado de um boneco" },
  { type: "foto", file: "/galeria/foto-17.jpg", alt: "Dra. Beatriz Lucárdians em uma foto no espelho do consultório" },
  { type: "foto", file: "/images/candid.jpg", alt: "Dra. Beatriz Lucárdians em seu consultório odontológico", position: "center 30%" },
  { type: "foto", file: "/images/portrait-pattern-tight.jpg", alt: "Retrato próximo da Dra. Beatriz Lucárdians" },
];

export const galleryItems: GalleryItem[] = media.map((item) => ({
  ...item,
  file: withBasePath(item.file),
  ...(item.type === "video" && item.poster ? { poster: withBasePath(item.poster) } : {}),
}));
