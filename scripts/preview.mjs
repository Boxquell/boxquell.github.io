// Serves dist/ the way the Caddyfile does: /page is page.html, anything unknown is 404.html.
import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const dist = resolve(dirname(fileURLToPath(import.meta.url)), "../dist");
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".webp": "image/webp", ".woff2": "font/woff2", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8", ".json": "application/json" };
const port = Number(process.env.PORT ?? 4180);

createServer((request, response) => {
  const path = normalize(decodeURIComponent(new URL(request.url, "http://x").pathname)).replace(/\/+$/, "") || "/";
  const tries = path === "/" ? ["index.html"] : [path, `${path}.html`];
  const file = tries.map((name) => join(dist, name)).find((name) => name.startsWith(dist) && existsSync(name) && statSync(name).isFile());
  const send = file ?? join(dist, "404.html");
  response.writeHead(file ? 200 : 404, { "Content-Type": TYPES[extname(send)] ?? "application/octet-stream" });
  response.end(readFileSync(send));
}).listen(port, "127.0.0.1", () => console.log(`http://127.0.0.1:${port}/`));
