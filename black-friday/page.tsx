import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import BlackFridayClient from "./BlackFridayClient";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
