import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
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

const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";
const pixelOk = /^[0-9]{5,20}$/.test(pixelId);

export const metadata: Metadata = {
  title: "Page Black Friday en 3 jours | Ayoub Wahid",
  description:
    "Votre page Black Friday prête en 3 jours. Aperçu visuel gratuit avant tout paiement. Pour boutiques en ligne.",
  keywords: "page Black Friday, boutique en ligne, aperçu gratuit, landing page, Ayoub Wahid",
  alternates: { canonical: "/black-friday" },
  openGraph: {
    title: "Votre page Black Friday, prête en 3 jours",
    description: "Aperçu gratuit sous 24 h, sans engagement.",
    url: "https://wahidayoub.com/black-friday",
    images: ["/ayoub-wahid.jpg"],
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Votre page Black Friday, prête en 3 jours",
    description: "Aperçu gratuit sous 24 h, sans engagement.",
    images: ["/ayoub-wahid.jpg"],
  },
};

export default function Page() {
  return (
    <div className={`${bricolage.variable} ${inter.variable}`}>
      <BlackFridayClient />
      {pixelOk && (
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init','${pixelId}');
          fbq('track','PageView');
        `}</Script>
      )}
    </div>
  );
}
