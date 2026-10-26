import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confidentialité | Ayoub Wahid",
  description: "Données collectées pour répondre à une demande d’aperçu de page Black Friday.",
  alternates: { canonical: "/confidentialite" },
};

export default function Confidentialite() {
  return (
    <main className="legal-doc" lang="fr">
      <style>{`
        .legal-doc { max-width: 720px; margin: 0 auto; padding: 48px 16px 80px; background: #FBF8F2; color: #0E1A2B; min-height: 100dvh; font: 18px/1.6 system-ui, sans-serif; }
        .legal-doc h1 { font-size: clamp(32px, 6vw, 48px); line-height: 1.1; text-wrap: balance; margin: 0 0 28px; }
        .legal-doc h2 { font-size: 22px; margin: 28px 0 8px; }
        .legal-doc p, .legal-doc li { margin: 0 0 12px; }
        .legal-doc a { color: #0E1A2B; }
        .legal-doc .todo { font-weight: 700; }
      `}</style>
      <h1>Confidentialité</h1>
      <p>Éditeur : Ayoub Wahid, entrepreneur individuel (auto-entrepreneur, Maroc). Contact : <a href="mailto:contact@wahidayoub.com">contact@wahidayoub.com</a></p>
      <p className="todo">[numéro d&apos;enregistrement à compléter]</p>
      <h2>Données collectées</h2>
      <p>Prénom, lien de la boutique, date de promotion et moyen de contact (WhatsApp, e-mail ou Instagram).</p>
      <h2>Finalité</h2>
      <p>Ces informations servent uniquement à répondre à la demande d’aperçu.</p>
      <h2>Ce qui n’est pas fait</h2>
      <p>Pas de revente. Pas de newsletter.</p>
      <h2>Durée</h2>
      <p>Les données sont conservées 12 mois.</p>
      <h2>Tes droits</h2>
      <p>Tu peux demander l’accès ou la suppression de tes données par e-mail à <a href="mailto:contact@wahidayoub.com">contact@wahidayoub.com</a>.</p>
      <p><a href="/black-friday">Retour à la page Black Friday</a></p>
    </main>
  );
}
