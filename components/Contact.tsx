import { CONTACT } from "@/lib/site";
import Reveal from "./Reveal";

const channels = [
  {
    label: "WhatsApp",
    value: CONTACT.whatsappDisplay,
    href: CONTACT.whatsapp,
    color: "bg-sage",
    description: "Agendamentos, dúvidas e informações — respondo por aqui.",
  },
  {
    label: "Instagram",
    value: CONTACT.instagramDisplay,
    href: CONTACT.instagram,
    color: "bg-gold",
    description: "Bastidores do consultório e conteúdo sobre saúde bucal.",
  },
  {
    label: "TikTok",
    value: CONTACT.tiktokDisplay,
    href: CONTACT.tiktok,
    color: "bg-sky",
    description: "Odontologia explicada de um jeito leve e acessível.",
  },
];

export default function Contact() {
  return (
    <section id="canais" className="bg-cream px-6 pt-block pb-section md:px-10">
      <h2 className="sr-only">Contato</h2>
      <Reveal className="mx-auto max-w-[1072px]">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {channels.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex min-w-0 flex-col justify-between gap-4 px-6 py-6 text-ink transition-[filter] hover:brightness-95 ${channel.color}`}
            >
              <div>
                <h3 className="font-display text-2xl leading-8">{channel.label}</h3>
                <p className="pt-2 font-sans text-sm leading-[1.625]">{channel.description}</p>
              </div>
              <span className="font-sans text-[0.95rem] break-words underline">{channel.value}</span>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
