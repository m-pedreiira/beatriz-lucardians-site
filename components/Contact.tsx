import { CONTACT, LATTES_URL, SITE } from "@/lib/site";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

const channels = [
  {
    label: "WhatsApp",
    value: CONTACT.whatsappDisplay,
    href: CONTACT.whatsapp,
    primary: true,
    description: "Agendamentos, dúvidas e informações — respondo por aqui.",
  },
  {
    label: "Instagram",
    value: CONTACT.instagramDisplay,
    href: CONTACT.instagram,
    description: "Bastidores do consultório e conteúdo sobre saúde bucal.",
  },
  {
    label: "TikTok",
    value: CONTACT.tiktokDisplay,
    href: CONTACT.tiktok,
    description: "Odontologia explicada de um jeito leve e acessível.",
  },
];

export default function Contact() {
  return (
    <section id="contato" className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal className="mb-14 max-w-xl md:mb-16">
          <Eyebrow>Contato</Eyebrow>
          <h2 className="font-serif-display text-4xl leading-tight text-ink md:text-5xl">
            Vamos conversar.
          </h2>
          <p className="mt-6 font-sans text-lg leading-relaxed text-ink-soft">
            Atendo em {SITE.location}. Entre em contato para saber sobre local de atendimento,
            horários disponíveis e convênios.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col justify-between gap-8 px-7 py-9 transition-colors ${
                  channel.primary ? "bg-accent text-cream" : "bg-cream text-ink hover:bg-accent-soft"
                }`}
              >
                <div>
                  <h3 className="font-serif-display text-2xl">{channel.label}</h3>
                  <p
                    className={`mt-2 font-sans text-sm leading-relaxed ${
                      channel.primary ? "text-cream/80" : "text-ink-soft"
                    }`}
                  >
                    {channel.description}
                  </p>
                </div>
                <span className="font-sans text-[0.95rem] underline underline-offset-4">
                  {channel.value}
                </span>
              </a>
            ))}
          </div>
        </Reveal>

        {LATTES_URL && (
          <a
            href={LATTES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block font-sans text-[0.95rem] text-ink-soft underline decoration-line underline-offset-4 hover:text-ink"
          >
            Currículo Lattes
          </a>
        )}
      </div>
    </section>
  );
}
