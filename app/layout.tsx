import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { withBasePath } from "@/lib/base-path";
import { SITE } from "@/lib/site";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

// Update once a custom domain is registered — see README "Domínio" section.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE.title,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "dentista Belo Horizonte",
    "cirurgiã-dentista BH",
    "odontopediatria Belo Horizonte",
    "clareamento dental BH",
    "Dra. Beatriz Lucárdians",
  ],
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    locale: "pt_BR",
    type: "website",
    images: [
      { url: withBasePath("/images/portrait-coat.jpg"), width: 854, height: 1280, alt: SITE.name },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: [withBasePath("/images/portrait-coat.jpg")],
  },
  icons: {
    icon: [
      { url: withBasePath("/logo/icon-32.png"), sizes: "32x32", type: "image/png" },
      { url: withBasePath("/logo/icon-512.png"), sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: withBasePath("/logo/icon-180.png"), sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${fraunces.variable} ${manrope.variable} antialiased`}>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-2 focus:text-cream"
        >
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
