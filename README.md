# Boxquell website

The website of [Boxquell](https://github.com/Boxquell/boxquell): one page about the project, plus the legal notice and the privacy policy in German and English. A React app built with Vite.

```sh
npm ci
npm run dev        # http://localhost:5173
npm run build      # type check, then the site in dist/
```

## What is where

- `src/site.ts`: the project's links, the install commands, the catalogue numbers and the owner's address for the legal pages. The domain shown in the privacy policy comes from `VITE_SITE_DOMAIN` (default `boxquell.app`).
- `src/pages/Home.tsx`: the page itself. `src/pages/Legal.tsx`: `/impressum`, `/datenschutz`, `/en/legal-notice`, `/en/privacy`.
- `public/shots`: screenshots of the app, converted from `docs/screenshots` of the main repository.

## Serving it

The site is a single page, so the server has to answer every address with `index.html`; the `Caddyfile` does that. `docker buildx build -t boxquell-www .` builds an image that serves the site on port 80, meant to sit behind a proxy that handles TLS.

The privacy policy says that nothing is loaded from other servers and nothing is stored in the browser. Keep it that way, or change the policy: fonts are bundled, there are no cookies, no analytics and no embedded content.
