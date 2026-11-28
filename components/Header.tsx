"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { withBasePath } from "@/lib/base-path";
import { CONTACT, NAV_LINKS } from "@/lib/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    // The menu button disappears on wide screens, so the menu must not stay open there.
    const wide = window.matchMedia("(min-width: 80rem)");
    const onResize = () => wide.matches && setOpen(false);

    window.addEventListener("keydown", onKeyDown);
    wide.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      wide.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "bg-cream/95 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-(--header-height) max-w-[1440px] items-center justify-between gap-4 px-5 xl:px-6 min-[87.5rem]:pr-[25px] min-[87.5rem]:pl-12">
        <Link
          href="#top"
          className="block w-[270px] min-w-0 shrink overflow-hidden sm:w-[340px] xl:w-[340px] min-[87.5rem]:w-[430px]"
          onClick={() => setOpen(false)}
        >
          {/* The logo artwork only fills the left ~74% of its frame; the rest is clipped. */}
          <Image
            src={withBasePath("/design/logo-header.svg")}
            alt="Beatriz Lucárdians Odontologia — CRO MG 69489"
            width={829}
            height={68}
            priority
            className="h-auto w-[135.9%] max-w-none"
          />
        </Link>

        <nav aria-label="Principal" className="hidden shrink-0 items-center gap-5 xl:flex min-[87.5rem]:gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-[0.94rem] whitespace-nowrap text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-mint px-5 py-2.5 font-display text-[0.9rem] leading-[1.35rem] whitespace-nowrap text-cream transition-[filter] hover:brightness-90"
          >
            Fale no WhatsApp
          </a>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-1.5 xl:hidden"
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
        id="menu-mobile"
        className={`grid bg-cream transition-[grid-template-rows,visibility] duration-300 ease-out xl:hidden ${
          open ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <nav
            aria-label="Menu"
            className="flex max-h-[calc(100dvh-var(--header-height))] flex-col overflow-y-auto px-6 pt-1 pb-6"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3 font-display text-xl text-ink"
              >
                {link.label}
              </a>
            ))}
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-5 shrink-0 rounded-full bg-mint px-5 py-3.5 text-center font-display text-cream"
            >
              Fale no WhatsApp
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
