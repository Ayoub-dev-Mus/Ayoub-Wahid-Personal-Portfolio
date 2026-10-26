import type { Metadata } from "next";
import localFont from "next/font/local";
import BlackFridayClient from "./BlackFridayClient";

const bricolage = localFont({
  src: "./fonts/bricolage-grotesque-latin.woff2",
  weight: "500 800",
  variable: "--font-bricolage",
  display: "swap",
});
const inter = localFont({
  src: "./fonts/inter-latin.woff2",
  weight: "400 700",
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Page Black Friday en 3 jours · Ayoub Wahid",
  description:
    "Votre page Black Friday prête en 3 jours. Aperçu visuel gratuit avant tout paiement. Pour boutiques en ligne.",
  openGraph: {
    title: "Votre page Black Friday, prête en 3 jours",
    description: "Aperçu gratuit sous 24 h, sans engagement.",
    images: ["/ayoub-wahid.jpg"],
  },
};

export default function Page() {
  return (
    <div className={`${bricolage.variable} ${inter.variable}`}>
      <BlackFridayClient />
    </div>
  );
}
