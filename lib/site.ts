// Central configuration for links and identity used across the site.
export const LATTES_URL = "http://lattes.cnpq.br/6703549166851467";

export const SITE = {
  name: "Dra. Beatriz Lucárdians",
  role: "Cirurgiã-Dentista",
  cro: "CRO/MG 69489",
  location: "Belo Horizonte — MG",
  title: "Dra. Beatriz Lucárdians — Cirurgiã-Dentista em Belo Horizonte",
  description:
    "Odontologia com cuidado, ética e conexão. Dra. Beatriz Lucárdians é cirurgiã-dentista formada pela UFMG, com atendimento humanizado para toda a família em Belo Horizonte.",
};

// Text already typed in the chat when someone opens WhatsApp from the site.
const WHATSAPP_MESSAGE = "Olá, Dra. Beatriz! Vim pelo seu site e gostaria de saber mais sobre a consulta.";

export const CONTACT = {
  whatsapp: `https://wa.me/5531984259900?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
  whatsappDisplay: "(31) 98425-9900",
  instagram: "https://www.instagram.com/drabeatrizlucardians/",
  instagramDisplay: "@drabeatrizlucardians",
  tiktok: "https://www.tiktok.com/@drabialucardians",
  tiktokDisplay: "@drabialucardians",
};

export const NAV_LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#atendimentos", label: "Atendimentos" },
  { href: "#galeria", label: "Galeria" },
  { href: "#procedimentos", label: "Procedimentos" },
  { href: "#perguntas", label: "Perguntas frequentes" },
  { href: "#contato", label: "Contatos" },
];
