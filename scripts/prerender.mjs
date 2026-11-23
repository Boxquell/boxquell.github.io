// Turns the built app into one HTML file per page, with its own title, description
// and structured data, plus sitemap.xml, robots.txt and llms.txt. Run by `npm run build`.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const { PAGES, SITE, render, llms } = await import(pathToFileURL(join(root, "dist-ssr/entry-server.js")).href);

const template = readFileSync(join(dist, "index.html"), "utf8");
const esc = (text) => String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
// "<" never ends a script early.
const json = (data) => JSON.stringify(data).replace(/</g, "\\u003c");

function head(path, page) {
  const url = SITE.url + (path === "/" ? "/" : path);
  const title = page?.title ?? "Page not found · Boxquell";
  const description = page?.description ?? "";
  const lines = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    page && !page.hidden ? `<meta name="robots" content="index, follow, max-image-preview:large" />` : `<meta name="robots" content="noindex" />`,
    `<meta property="og:site_name" content="Boxquell" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${SITE.url}/shots/home-dark.webp" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    ...(page?.data ?? []).map((data) => `<script type="application/ld+json">${json(data)}</script>`),
  ];
  return lines.join("\n    ");
}

function write(file, path, page) {
  const html = template
    .replace('<html lang="en">', `<html lang="${page?.lang ?? "en"}">`)
    .replace("<!--head-->", head(path, page))
    .replace("<!--app-->", render(path));
  mkdirSync(dirname(join(dist, file)), { recursive: true });
  writeFileSync(join(dist, file), html);
}

const paths = Object.keys(PAGES).sort();
for (const path of paths) write(path === "/" ? "index.html" : `${path.slice(1)}.html`, path, PAGES[path]);
write("404.html", "/404", null);

const today = new Date().toISOString().slice(0, 10);
const listed = paths.filter((path) => !PAGES[path].hidden);
const priority = (path) => (path === "/" ? "1.0" : path.split("/").length <= 2 ? "0.8" : path.split("/").length === 3 ? "0.7" : "0.6");
writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${listed
    .map((path) => `  <url><loc>${SITE.url}${path === "/" ? "/" : path}</loc><lastmod>${today}</lastmod><priority>${priority(path)}</priority></url>`)
    .join("\n")}\n</urlset>\n`,
);
writeFileSync(join(dist, "robots.txt"), `# Everyone may read everything, search engines and AI assistants alike.\nUser-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`);
writeFileSync(join(dist, "llms.txt"), llms());
rmSync(join(root, "dist-ssr"), { recursive: true, force: true });
console.log(`${paths.length} pages, sitemap.xml, robots.txt, llms.txt`);
