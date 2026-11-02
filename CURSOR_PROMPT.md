# Prompt à coller dans Cursor (mode Agent)

Je te donne 4 fichiers déjà écrits pour une landing page « Black Friday » bilingue FR/EN. Ajoute-les à mon portfolio Next.js SANS rien casser.

Fichiers (dans le dossier `black-friday-kit/` que je t'ai joint) :
- `app/black-friday/page.tsx` (server component : metadata + chargement des polices next/font)
- `app/black-friday/BlackFridayClient.tsx` (client component, tout le contenu + logique)
- `app/black-friday/black-friday.css` (CSS scopé sous `.bfp`, n'affecte pas le reste du site)
- `public/ayoub-wahid.jpg` (ma photo)

## Étapes

1. Inspecte le projet d'abord : App Router (`app/`) ou Pages Router (`pages/`) ? dossier `src/` ou non ? TypeScript ? Tailwind ? alias `@/` ? Version de Next.
2. Copie les fichiers à l'emplacement correct :
   - App Router : `app/black-friday/…` (ou `src/app/black-friday/…` si le projet utilise `src/`).
   - Pages Router : crée `pages/black-friday.tsx` qui importe le composant, et garde le CSS importé depuis ce composant (le CSS global n'est autorisé que dans `_app` en Pages Router : si l'import est refusé, renomme le fichier en `black-friday.module.css` ou déplace l'import dans `_app.tsx`).
   - Si le projet est en JavaScript, convertis proprement en `.jsx` en retirant les types.
   - Photo : `public/ayoub-wahid.jpg`. Si une photo avec ce nom existe déjà, ne l'écrase pas, ajuste `CONFIG.photo`.
3. Layout : si mon `layout.tsx` racine affiche une navbar/footer globale qui fait doublon avec celle de la page, isole la route avec un route group, par exemple `app/(landing)/black-friday/…` avec son propre `layout.tsx` minimal, plutôt que de modifier le layout racine. Ne modifie jamais mes composants existants.
4. Polices : `page.tsx` utilise `Bricolage_Grotesque` et `Inter` via `next/font/google` avec les variables CSS `--font-bricolage` et `--font-inter`. Ne les change pas ; si mon projet a déjà ces polices, réutilise-les.
5. Complète le bloc `CONFIG` en haut de `BlackFridayClient.tsx` (demande-moi ce qui manque, ne l'invente pas) :
   - `instagram` (sans @), `whatsapp` (indicatif + numéro, sans +), `email`
   - `endpoint` : URL Formspree ou Web3Forms (le formulaire envoie un POST JSON). Vide = le formulaire affiche un message à copier.
   - `currency` : "€" ou "$", `price` : "249"
   - `portfolio` : l'URL de mon portfolio, `cutoff` : date de fin des commandes (13 nov 2026 par défaut)
6. Ajoute un lien discret vers `/black-friday` dans ma navigation existante (une seule ligne, sans refonte).
7. Vérifie : `npm run lint` puis `npm run build`. Corrige uniquement les erreurs liées à ces fichiers. Ouvre `/black-friday` en dev et contrôle : 
   - pas d'erreur d'hydratation dans la console,
   - le bouton FR/EN change toute la langue,
   - le compte à rebours tourne,
   - les deux formulaires affichent bien le message final,
   - mise en page correcte à 390 px de large (pas de scroll horizontal).
8. Règles : ne touche à aucun autre fichier que ceux ci-dessus et au lien de navigation. N'ajoute aucune dépendance. Ne supprime rien. À la fin, liste les fichiers créés/modifiés et ce que tu as dû adapter.
