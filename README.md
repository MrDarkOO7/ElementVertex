# Element Vertex website

Marketing site for Element Vertex. Built with Next.js (App Router), React 19 and CSS Modules. No UI framework and no animation library: motion is CSS only.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build && npm start   # production build
```

Requires Node 20+.

## Project structure

```
src/
  app/                 Routes and metadata
    layout.jsx         Fonts, SEO defaults, header/footer
    page.jsx           Homepage: just a list of sections
    api/contact/       Contact form endpoint (emails via Resend)
    sitemap.js, robots.js, icon.svg, opengraph-image.jsx
    globals.css        Design tokens, reset, shared utilities
  components/
    ui/                Generic building blocks (Button, Section, SectionHeader, Container)
    layout/            Header, Footer, Logo
    sections/          One folder-level component per homepage section (+ its .module.css)
    providers/         InterestProvider: links the quiz/services to the contact form
  content/             All copy and settings as plain data (edit text here)
    site.js            Name, email, booking link, nav
    services.js        The six services
    copy.js            Problems, process, comparison, values, founders, FAQ
  lib/contact.js       Contact form validation (server side)
```

**Rule of thumb:** change wording in `src/content/`, change layout in the section component, change colours or spacing in the tokens at the top of `src/app/globals.css`.

## Brand tokens

| Token | Value |
|---|---|
| `--onyx` | `#01010D` |
| `--indigo` | `#6331FB` |
| `--mint` | `#88F9C0` |

Each `<Section tone="dark | light | indigo">` sets a colour context (`--fg`, `--accent`, `--surface`, ...) so inner components work on any background. Contrast notes: use mint or white for small text on dark; never mint text on light; indigo is for fills and large text on dark.

## Things to fill in

- **Logo:** `src/components/layout/Logo.jsx` contains a placeholder redraw. Replace the SVG paths with the official logo and it updates everywhere. Also update `src/app/icon.svg`.
- **Booking link:** set `bookingUrl` in `src/content/site.js` (Calendly / Cal.com). Until then, "Book a free call" scrolls to the contact form.
- **Founder photos:** add images to `public/team/` and set `photo: "/team/name.jpg"` on each founder in `src/content/copy.js`.

## Contact form

The form posts to `/api/contact`, which validates input, ignores bots (honeypot) and emails the team with [Resend](https://resend.com).

1. Create a Resend account and an API key.
2. Verify `elementvertex.com` in Resend so mail can be sent from `hello@elementvertex.com`.
3. Add the variables from `.env.example` to Vercel (Project > Settings > Environment Variables).

Locally, with no key set, submissions are printed to the terminal. In production without a key the endpoint returns an error rather than silently dropping messages.

## Deploying to Vercel

1. Push the repo to GitHub and import it in Vercel (framework is detected automatically).
2. Add the environment variables above.
3. Project > Settings > Domains > add `elementvertex.com`, then create the DNS records Vercel shows in GoDaddy.
