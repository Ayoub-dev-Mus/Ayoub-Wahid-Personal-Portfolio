import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales | Ayoub Wahid",
  description: "Éditeur, contact et hébergeur de la page Black Friday d’Ayoub Wahid.",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegales() {
  return (
    <main className="legal-doc" lang="fr">
      <style>{`
        .legal-doc { max-width: 720px; margin: 0 auto; padding: 48px 16px 80px; background: #FBF8F2; color: #0E1A2B; min-height: 100dvh; font: 18px/1.6 system-ui, sans-serif; }
        .legal-doc h1 { font-size: clamp(32px, 6vw, 48px); line-height: 1.1; text-wrap: balance; margin: 0 0 28px; }
        .legal-doc h2 { font-size: 22px; margin: 28px 0 8px; }
        .legal-doc p { margin: 0 0 12px; }
        .legal-doc a { color: #0E1A2B; }
        .legal-doc .todo { font-weight: 700; }
      `}</style>
      <h1>Mentions légales</h1>
      <h2>Éditeur</h2>
      <p>Ayoub Wahid, entrepreneur individuel (auto-entrepreneur, Maroc).</p>
      <p>Contact : <a href="mailto:contact@wahidayoub.com">contact@wahidayoub.com</a></p>
      <p className="todo">[numéro d&apos;enregistrement à compléter]</p>
      <h2>Hébergeur</h2>
      <p>Vercel Inc.</p>
      <p><a href="/black-friday">Retour à la page Black Friday</a></p>
    </main>
  );
}
