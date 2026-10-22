import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/content/site";
import { getOrigin } from "@/lib/origin";

const display = localFont({ src: "../public/fonts/anton-latin.woff2", weight: "400", variable: "--font-display", display: "swap" });
const sans = localFont({ src: "../public/fonts/inter-latin.woff2", weight: "100 900", variable: "--font-sans", display: "swap" });
const mono = localFont({ src: "../public/fonts/jetbrains-mono-latin.woff2", weight: "100 800", variable: "--font-mono", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const origin = await getOrigin();
  const title = `${site.name} — Shopify Expert & Full-Stack / AI Developer, Casablanca`;
  return {
    ...(origin ? { metadataBase: new URL(origin) } : {}),
    title,
    description: site.description,
    keywords: ["Shopify expert", "Shopify developer", "AI developer", "full-stack developer", "Casablanca", "Morocco", "freelance"],
    authors: [{ name: site.name }],
    openGraph: { title, description: site.description, type: "website", siteName: site.name, locale: "en_US" },
    twitter: { card: "summary_large_image", title, description: site.description },
    alternates: origin ? { canonical: "/" } : undefined,
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4EFE6" },
    { media: "(prefers-color-scheme: dark)", color: "#141414" },
  ],
};

const themeScript = `try{var t=localStorage.getItem('aw-theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
