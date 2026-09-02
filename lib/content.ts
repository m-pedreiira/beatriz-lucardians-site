// Factual content sourced from Dra. Beatriz's Currículo Lattes and personal CV.
// Nothing here is invented — see project README for source notes.

export type TimelineItem = {
  year: string;
  title: string;
  place?: string;
  description?: string;
};

export const education: TimelineItem[] = [
  {
    year: "2018 — 2023",
    title: "Graduação em Odontologia",
    place: "Universidade Federal de Minas Gerais (UFMG)",
    description:
      "TCC sobre o efeito do clareamento dentário em progenitores da polpa dentária, com orientação da Profa. Ivana Márcia Alves Diniz.",
  },
  {
    year: "2020 — 2023",
    title: "Iniciação científica",
    place: "Faculdade de Odontologia — UFMG",
    description:
      "Pesquisa em fotobiomodulação e regeneração de tecidos dentários, com apresentações em encontros científicos e congressos.",
  },
  {
    year: "2023",
    title: "Menção honrosa — 2º lugar em desempenho acadêmico",
    place: "Faculdade de Odontologia — UFMG",
  },
  {
    year: "2023",
    title: "Internato na Estratégia de Saúde da Família",
    place: "Prefeitura de Confins — MG",
    description: "Atendimento clínico geral, infantil e ações coletivas em saúde.",
  },
  {
    year: "2025",
    title: "Imersão em Terapia Pulpar em Dentes Decíduos",
    place: "Faculdade de Odontologia — UFMG",
  },
  {
    year: "2025",
    title: "Urgências e Emergências Médicas na Odontologia",
    place: "URGEM",
  },
  {
    year: "2025",
    title: "Publicação científica internacional",
    place: '"Oral Mucosa Cues for Regeneration Using Photobiomodulation" — Lasers in Medical Science',
  },
  {
    year: "2026",
    title: "Formação complementar em Odontopediatria e Farmacologia aplicada",
    place: "Portal Odonto Cursos",
  },
  {
    year: "em andamento",
    title: "Extensão em Saúde Coletiva e Estratégia de Saúde da Família",
    place: "FACULESTE",
  },
];

export type ServiceItem = {
  title: string;
  description: string;
};

export const services: ServiceItem[] = [
  {
    title: "Primeira consulta",
    description: "Acolhimento, escuta e avaliação inicial para conhecer sua história e suas necessidades.",
  },
  {
    title: "Avaliação e plano de tratamento",
    description: "Diagnóstico cuidadoso e um plano claro, construído junto com você.",
  },
  {
    title: "Limpeza",
    description: "Profilaxia e orientação de higiene bucal para toda a família.",
  },
  {
    title: "Clareamento dental",
    description: "Procedimentos de clareamento com segurança e acompanhamento próximo.",
  },
  {
    title: "Laserterapia",
    description: "Aplicação de laser de baixa potência como suporte terapêutico.",
  },
  {
    title: "Restaurações",
    description: "Restaurações diretas e indiretas, devolvendo função e estética.",
  },
  {
    title: "Extração de dentes",
    description: "Exodontias realizadas com técnica e cuidado com o conforto do paciente.",
  },
  {
    title: "Próteses",
    description: "Reabilitação protética pensada para cada caso.",
  },
  {
    title: "Canal em dente de leite",
    description: "Tratamento endodôntico em dentição decídua, com atenção especial às crianças.",
  },
];
