"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { withBasePath } from "@/lib/base-path";
import { CONTACT, NAV_LINKS } from "@/lib/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "bg-cream/95 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 md:px-10">
        <Link href="#top" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src={withBasePath("/logo/logo-lockup.png")}
            alt="Beatriz Lucárdians Odontologia"
            width={1230}
            height={726}
            priority
            className="h-14 w-auto md:h-16"
          />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-[0.94rem] tracking-wide text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-ink px-5 py-2.5 text-[0.9rem] text-cream transition-colors hover:bg-accent"
          >
            Fale no WhatsApp
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`block h-px w-6 bg-ink transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-6 bg-ink transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      <div
        className={`grid overflow-hidden bg-cream transition-[grid-template-rows] duration-300 ease-out md:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <nav className="flex flex-col gap-1 px-6 pb-8 pt-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 font-serif-display text-xl text-ink"
              >
                {link.label}
              </a>
            ))}
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-6 rounded-full bg-ink px-5 py-3.5 text-center text-cream"
            >
              Fale no WhatsApp
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
