# Boxquell website

The website of [Boxquell](https://github.com/Boxquell/boxquell): the start page, a catalogue with a page for everything that can be installed, questions and answers, and the legal notice and privacy policy in German and English. A React app built with Vite; every page is rendered to HTML at build time.

```sh
npm ci
npm run dev         # http://localhost:5173, drawn in the browser
npm run build       # type check, then every page as its own HTML file in dist/
npm run preview     # serves dist/ the way the server will, on http://127.0.0.1:4180
npm run catalogue   # renews the catalogue data from the recipe repositories next to this one
```

## What is where

- `src/site.ts`: the project's links, the install commands and the owner's address for the legal pages. The domain in canonical links, the sitemap and the privacy policy comes from `VITE_SITE_DOMAIN` (default `boxquell.app`).
- `src/routes.tsx`: every page with its title, description and structured data (JSON-LD). `src/pages`: the start page, the catalogue with a page per agent, language, tool and system, the questions and answers, and the legal pages (`/impressum`, `/datenschutz`, `/en/legal-notice`, `/en/privacy`).
- `src/faq.ts`: the questions and answers; they also go out as `FAQPage` data and into `llms.txt`.
- `src/data/catalogue.json` and `public/icons`: written by `scripts/catalogue.mjs` from the recipe repositories (`boxquell-agents`, `-languages`, `-tools`, `-os`). Committed, so a build needs nothing but this repository. Run `npm run catalogue` after recipes change.
- `scripts/prerender.mjs`: renders each page on the build machine and writes `sitemap.xml`, `robots.txt` and `llms.txt` (a summary of the site for AI assistants).
- `public/shots`: screenshots of the app, converted from `docs/screenshots` of the main repository.

## Serving it

Every page is a file of its own (`/faq` is `faq.html`), and the browser takes over from there without loading pages anew; the `Caddyfile` maps the addresses and answers unknown ones with `404.html`. `docker buildx build -t boxquell-www .` builds an image that serves the site on port 80, meant to sit behind a proxy that handles TLS.

The privacy policy says that nothing is loaded from other servers and nothing is stored in the browser. Keep it that way, or change the policy: fonts are bundled, there are no cookies, no analytics and no embedded content.
