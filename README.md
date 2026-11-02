# Ayoub Wahid — portfolio

Next.js site. Install and run with pnpm.

```bash
pnpm install
pnpm dev
```

## Contact form

The form posts to `POST /contact/send`, which sends the message through [Resend](https://resend.com). Set these in `.env.local` locally and in the Vercel project for production:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key |
| `CONTACT_TO_EMAIL` | Address that receives enquiries |
| `CONTACT_FROM_EMAIL` | Sender address verified in Resend |
| `SITE_URL` | Optional canonical origin, such as `https://example.com` |
| `TELEGRAM_BOT_TOKEN` | Optional. Bot token that sends you a Telegram alert |
| `TELEGRAM_CHAT_ID` | Optional. Your chat id, from a message to the bot |

Until the three Resend variables are set, the form returns a clear setup error and does not pretend the message was sent.

Public links (email, LinkedIn, GitHub, calendar, Upwork) and package prices live in `lib/site.ts`. Leave a value empty to hide that link.

## Template shop

The template shop uses PayPal Checkout and serves paid downloads from outside `public/`.
Add each archive to `private/templates/` using these exact names:

| Template | Archive |
| --- | --- |
| Atelier | `atelier.zip` |
| Goods | `goods.zip` |
| Metrics | `metrics.zip` |
| Studio | `studio.zip` |

Each listing is currently priced at $29 USD in `content/templates.ts`. Add the fresh PayPal API client ID and secret as server-side environment variables (`PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET`), set `PAYPAL_MODE` to `sandbox` while testing, and configure `SITE_URL` to the canonical HTTPS origin. Switch to `live` only after a successful sandbox purchase and download test; production checkout refuses sandbox credentials. Never add PayPal secrets to source control or expose them through `NEXT_PUBLIC_` variables.

Checkout stays disabled for each listing until its ZIP file and PayPal settings are in place. The published license is one end product per purchase, with no redistribution or resale. Refund requests are reviewed case by case. Rotate any credentials that were ever pasted into chat and add fresh values only through your deployment environment settings.
