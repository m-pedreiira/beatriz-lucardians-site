import Image from "next/image";
import { withBasePath } from "@/lib/base-path";
import { CONTACT, LATTES_URL, NAV_LINKS, SITE } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink py-16 text-cream/80">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <Image
              src={withBasePath("/logo/logo-badge.png")}
              alt="Beatriz Lucárdians Odontologia"
              width={1136}
              height={1199}
              className="h-14 w-auto opacity-95"
            />
            <div>
              <p className="font-serif-display text-lg text-cream">{SITE.name}</p>
              <p className="font-sans text-sm text-cream/60">{SITE.role}</p>
              <p className="mt-1 font-sans text-xs text-cream/45">{SITE.cro}</p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3 font-sans text-sm">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="text-cream/70 hover:text-cream">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3 font-sans text-sm">
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="text-cream/70 hover:text-cream">
              WhatsApp
            </a>
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="text-cream/70 hover:text-cream">
              Instagram
            </a>
            <a href={CONTACT.tiktok} target="_blank" rel="noopener noreferrer" className="text-cream/70 hover:text-cream">
              TikTok
            </a>
            {LATTES_URL && (
              <a href={LATTES_URL} target="_blank" rel="noopener noreferrer" className="text-cream/70 hover:text-cream">
                Currículo Lattes
              </a>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-cream/10 pt-8 font-sans text-xs text-cream/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {SITE.name}. Todos os direitos reservados.</p>
          <p>{SITE.location}</p>
        </div>
      </div>
    </footer>
  );
}
