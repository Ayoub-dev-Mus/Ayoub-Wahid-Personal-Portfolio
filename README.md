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
