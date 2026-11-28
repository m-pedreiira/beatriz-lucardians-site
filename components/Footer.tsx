import Image from "next/image";
import { withBasePath } from "@/lib/base-path";
import { CONTACT, NAV_LINKS, SITE } from "@/lib/site";

const socials = [
  { label: "WhatsApp", href: CONTACT.whatsapp },
  { label: "Instagram", href: CONTACT.instagram },
  { label: "TikTok", href: CONTACT.tiktok },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-blue text-cream/70">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-7 py-8 lg:flex-row lg:items-start lg:justify-between lg:pr-[72px]">
        <div className="flex items-start gap-6 xl:gap-10">
          <Image
            src={withBasePath("/logo/logo-badge.png")}
            alt="Beatriz Lucárdians Odontologia"
            width={1136}
            height={1199}
            className="h-auto w-[70px] opacity-95"
          />
          <div>
            <p className="font-display text-[1.65rem] leading-[1.55] text-cream">{SITE.name}</p>
            <p className="font-sans text-xl leading-[1.43] text-cream/60">{SITE.role}</p>
            <p className="pt-1.5 font-sans text-[1.1rem] leading-[1.33] text-cream/45">{SITE.cro}</p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-9 gap-y-3 font-sans text-base">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-cream">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-2 font-sans text-base">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cream"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-7 py-4 font-sans text-cream/45 sm:flex-row sm:items-baseline sm:gap-6">
          <p className="text-[1.15rem]">{SITE.location}</p>
          <p className="text-xs">
            © {year} {SITE.name}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
