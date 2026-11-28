import {
  IconBabyCarriage,
  IconClipboardList,
  IconDental,
  IconDentalBroken,
  IconDentalOff,
  IconFirstAidKit,
  IconFocus2,
  IconPuzzle,
  IconShield,
  IconSnowflake,
  IconSparkles,
  IconStethoscope,
  IconSun,
  IconZzz,
  type Icon,
} from "@tabler/icons-react";

// Site copy, transcribed from the Figma file "site-beatriz".
// Wrap a passage in **double asterisks** to render it in bold (see RichText).

export type Credential = {
  icon: string;
  text: string;
  lattes?: boolean;
};

export const credentials: Credential[] = [
  {
    icon: "/design/about-icon-graduation.webp",
    text: "**Graduação em Odontologia** - UFMG (2018-2023) com menção honrosa por desempenho acadêmico",
  },
  {
    icon: "/design/about-icon-community.webp",
    text: "Pós-graduação em **Saúde Coletiva e Saúde da Família**",
  },
  {
    icon: "/design/about-icon-research.webp",
    text: "**Pesquisa** na área de **Clínica Odontológica**: **clareamento** dental, polpa dentária, **células-tronco** e fotobiomodulação.",
    lattes: true,
  },
  {
    icon: "/design/about-icon-inclusive.webp",
    text: "**Atendimento inclusivo** - Formação complementar para o atendimento de **Pacientes com Necessidades Especiais** (PNE), pacientes com **Trissomia do Cromossomo 21 (T21)** e pacientes com **Transtorno do Espectro Autista (TEA)**",
  },
];

export type LifeStage = {
  title: string;
  subtitle?: string;
  text: string;
  image: { src: string; width: number; height: number; alt: string };
};

export const lifeStages: LifeStage[] = [
  {
    title: "Gestação",
    text: "Pré-natal odontológico, orientações para a gestante e preparação para os primeiros cuidados com a saúde bucal do bebê.",
    image: { src: "/design/phase-pregnancy.webp", width: 1024, height: 687, alt: "Ilustração de uma gestante" },
  },
  {
    title: "Orientações para a família",
    text: "Orientações individualizadas para pais e responsáveis sobre higiene bucal, alimentação, nascimento dos dentes e hábitos que influenciam a saúde bucal em cada fase da infância, ajudando a tornar o cuidado parte da rotina da família.",
    image: { src: "/design/phase-family.webp", width: 773, height: 519, alt: "Ilustração de um casal com o bebê no colo" },
  },
  {
    title: "Bebês",
    text: "O acompanhamento desde os primeiros meses é importante para orientar a família, acompanhar o desenvolvimento oral e estabelecer hábitos saudáveis desde cedo. Um olhar individualizado para cada bebê, incluindo cuidados específicos para bebês com Trissomia 21, como a Placa Palatina de Memória (PPM), quando indicada.",
    image: { src: "/design/phase-babies.webp", width: 773, height: 578, alt: "Ilustração de um bebê sorrindo" },
  },
  {
    title: "Infância",
    subtitle: "Crescer com saúde e confiança",
    text: "A infância é uma fase de descobertas e desenvolvimento, em que os cuidados com a saúde bucal ajudam a construir hábitos que podem acompanhar a criança por toda a vida. O acompanhamento é voltado à prevenção, à atenção às mudanças da dentição e às necessidades de cada fase, sempre com acolhimento, respeito ao tempo da criança e participação da família.",
    image: { src: "/design/phase-childhood.webp", width: 706, height: 706, alt: "Ilustração de uma criança sorrindo" },
  },
  {
    title: "Adolescentes",
    text: "Uma fase de mudanças, descobertas e novos hábitos. O acompanhamento odontológico ajuda a cuidar da saúde bucal durante o desenvolvimento, incentivando a autonomia nos cuidados diários e respeitando as necessidades de cada adolescente.",
    image: { src: "/design/phase-teens.webp", width: 739, height: 496, alt: "Ilustração de uma adolescente sorrindo" },
  },
  {
    title: "Vida adulta",
    text: "Escuta atenta para compreender o que é importante para cada paciente, unindo saúde, estética e bem-estar em um cuidado individualizado. Afinal, cuidar do sorriso também é cuidar da autoestima, da confiança e da qualidade de vida.",
    image: { src: "/design/phase-adults.webp", width: 773, height: 519, alt: "Ilustração de uma mulher adulta sorrindo" },
  },
  {
    title: "Envelhecimento",
    text: "Atenção às mudanças da saúde bucal, manutenção dos dentes, avaliação de próteses e cuidados individualizados para preservar o conforto, a função e a qualidade de vida.",
    image: { src: "/design/phase-elderly.webp", width: 773, height: 516, alt: "Ilustração de uma senhora sorrindo" },
  },
];

export type Dot = "blush" | "sage" | "gold" | "sky";

export type Procedure = {
  title: string;
  description: string;
  /** Soft color behind the icon. */
  dot: Dot;
  /** Thin line icon from @tabler/icons-react. */
  icon: Icon;
};

export const procedures: Procedure[] = [
  {
    title: "Primeira consulta",
    description: "Acolhimento, escuta e avaliação inicial para conhecer sua história e suas necessidades.",
    dot: "blush",
    icon: IconStethoscope,
  },
  {
    title: "Avaliação e plano de tratamento",
    description: "Diagnóstico cuidadoso e um plano claro, construído junto com você.",
    dot: "sage",
    icon: IconClipboardList,
  },
  {
    title: "Limpeza",
    description: "Profilaxia e orientação de higiene bucal para toda a família.",
    dot: "gold",
    icon: IconSparkles,
  },
  {
    title: "Urgências odontopediátricas",
    description: "Traumatismos dentários, dor de dente, abscessos, infecções, estomatites, mão-pé-boca, entre outras urgências.",
    dot: "sky",
    icon: IconFirstAidKit,
  },
  {
    title: "Extração de dentes",
    description: "Exodontias realizadas com técnica e cuidado com o conforto e segurança do paciente.",
    dot: "sky",
    icon: IconDentalOff,
  },
  {
    title: "Canal em dente de leite",
    description: "Tratamento endodôntico em dentes decíduos, com técnicas atualizadas e seguras.",
    dot: "sky",
    icon: IconDental,
  },
  {
    title: "Atendimentos sob sedação",
    description: "Parceria com equipe médica anestesista para sedações medicamentosas e também com profissionais capacitados para sedação consciente com óxido nitroso.",
    dot: "sky",
    icon: IconZzz,
  },
  {
    title: "Clareamento dental",
    description: "Procedimentos de clareamento com ciência, segurança e conforto.",
    dot: "sky",
    icon: IconSun,
  },
  {
    title: "Restaurações",
    description: "Restaurações diretas e indiretas, devolvendo função e estética.",
    dot: "sky",
    icon: IconDentalBroken,
  },
  {
    title: "Próteses",
    description: "Reabilitações protéticas pensadas para cada caso: coroa, peça, roach, dentaduras e outras soluções.",
    dot: "sky",
    icon: IconPuzzle,
  },
  {
    title: "Laserterapia",
    description: "Aplicação de laser de baixa potência como suporte terapêutico.",
    dot: "sky",
    icon: IconFocus2,
  },
  {
    title: "Placa de bruxismo",
    description: "Placa de bruxismo individualizada, sob medida e ajustada como parte do tratamento do bruxismo.",
    dot: "blush",
    icon: IconShield,
  },
  {
    title: "Tratamento para sensibilidade dentinária",
    description: "Avaliação e controle da causa, controle da sensibilidade e aplicação de agentes dessensibilizantes.",
    dot: "blush",
    icon: IconSnowflake,
  },
  {
    title: "Placa palatina de memória para bebês com T21",
    description: "Dispositivo intraoral para bebês com Trissomia 21, utilizado como parte da estimulação orofacial, auxiliando na postura da língua e no selamento labial.",
    dot: "blush",
    icon: IconBabyCarriage,
  },
];

export type FaqItem = {
  question: string;
  /** Each block is a group of lines; blocks are separated by a blank line. */
  answer: string[][];
  dot: Dot;
};

export const faq: FaqItem[] = [
  {
    question: "Onde você atende?",
    dot: "blush",
    answer: [
      [
        "Atualmente atendo em clínicas e consultórios parceiros em **Belo Horizonte**, na região da **Pampulha, Centro, Santa Efigênia, Savassi e Lourdes**. Ao entrar em contato comigo, você pode consultar endereços, dias e horários disponíveis para o atendimento que procura.",
      ],
    ],
  },
  {
    question: "A partir de qual idade preciso levar meu filho ao dentista?",
    dot: "sage",
    answer: [
      [
        "Desde os primeiros dentinhos - ou até antes mesmo deles chegarem. O acompanhamento odontológico pode e deve começar, idealmente, ainda no **primeiro ano de vida.** Quanto antes a criança tiver contato com o dentista, mais fácil é acompanhar seu desenvolvimento e orientar a família sobre prevenção e cuidados. Se seu filho(a) já é maiorzinho e ainda não foi ao dentista, não se preocupe: **ainda é tempo** de trazê-lo!",
      ],
    ],
  },
  {
    question: "Meu filho não colabora durante a consulta. E agora?",
    dot: "sky",
    answer: [
      [
        "Isso é mais comum do que parece e está tudo bem! Cada criança tem seu próprio tempo, e nem sempre a colaboração acontece logo no primeiro encontro. O objetivo não é forçar a criança a realizar um procedimento, mas construir, aos poucos, uma **relação de confiança** com o dentista.",
        "Durante o atendimento, busco conhecer a criança, conversar, explicar o que vamos fazer de uma forma que ela consiga compreender e **respeitar** seus limites. Dependendo da **idade**, do **comportamento** e da **necessidade do atendimento**, podemos adaptar a consulta e construir esse vínculo gradualmente.",
        "Mais importante do que “fazer tudo” em uma única consulta é que a criança se sinta segura e tenha experiências que contribuam para uma **relação positiva com o dentista.**",
        "Em casos em que o tratamento é necessário e não pode ser realizado de forma convencional, também conto com a **parceria de médicos habilitados** para realizar **sedação**, sempre avaliando individualmente a indicação e a segurança de cada caso.",
      ],
    ],
  },
  {
    question: "Você atende gestantes?",
    dot: "sky",
    answer: [
      [
        "Sim! Tenho um carinho especial pelo atendimento às gestantes, porque é um momento muito importante para cuidar da saúde bucal, e o **pré-natal odontológico** faz parte desse cuidado. Durante a gestação, a mulher passa por diversas **mudanças que podem refletir também na saúde bucal**, tornando o acompanhamento odontológico ainda mais importante.",
      ],
      [
        "Além de cuidar da saúde e do bem-estar da mãe, o pré-natal odontológico é uma oportunidade para **orientar sobre os cuidados com a saúde bucal do bebê** desde antes do nascimento. É nesse momento que começamos a **construir hábitos, conhecimentos** e uma relação positiva com a saúde bucal que podem **acompanhar toda a família.**",
      ],
      [
        "O atendimento é individualizado e adaptado à fase da gestação, sempre proporcionando **segurança, conforto e tranquilidade para a mãe.**",
      ],
    ],
  },
  {
    question: "Sua consulta é particular ou você aceita convênios?",
    dot: "sky",
    answer: [
      [
        "Atendo tanto de forma particular quanto por alguns convênios, **de acordo com o local de atendimento.**",
        "No atendimento particular, tenho **mais tempo e liberdade** para oferecer uma **experiência mais personalizada**, com uma **avaliação detalhada** e **orientações individualizadas** para cada paciente.",
        "Nos atendimentos por convênio, também busco oferecer um cuidado acolhedor e atencioso, respeitando as necessidades de cada paciente dentro da dinâmica do atendimento.",
        "Entre em contato para saber quais locais atendem pelo seu convênio e consultar a disponibilidade de horários.",
      ],
    ],
  },
];
