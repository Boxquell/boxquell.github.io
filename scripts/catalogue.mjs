// Reads the recipe repositories and writes what the site shows of them:
// src/data/catalogue.json and the icons in public/icons. Run it when recipes change:
//   node scripts/catalogue.mjs            (repositories next to this one)
//   RECIPES_DIR=/path node scripts/catalogue.mjs
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "smol-toml";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const base = process.env.RECIPES_DIR ?? resolve(root, "..");
const KINDS = { agents: "agent", languages: "language", tools: "tool" };

const list = (value) => (Array.isArray(value) ? value.map(String) : []);
// Readable on its colour: dark glyph on light marks, white on the rest.
function ink(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex ?? "");
  if (!m) return "#ffffff";
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.45 ? "#0b0f15" : "#ffffff";
}

rmSync(join(root, "public/icons"), { recursive: true, force: true });
function icon(repo, file) {
  const from = join(base, `boxquell-${repo}`, "icons", file ?? "");
  if (!file || !existsSync(from)) return null;
  mkdirSync(join(root, "public/icons", repo), { recursive: true });
  copyFileSync(from, join(root, "public/icons", repo, file));
  return `/icons/${repo}/${file}`;
}

const recipes = [];
for (const [repo, kind] of Object.entries(KINDS)) {
  const dir = join(base, `boxquell-${repo}`, "recipes");
  for (const file of readdirSync(dir).filter((f) => f.endsWith(".toml")).sort()) {
    const t = parse(readFileSync(join(dir, file), "utf8"));
    const category = t.category === "ide" ? "tool" : (t.category ?? kind);
    recipes.push({
      id: file.replace(/\.toml$/, ""),
      repo,
      kind: category,
      ide: t.category === "ide",
      name: String(t.name),
      description: String(t.description ?? ""),
      icon: icon(repo, t.icon),
      color: t.icon_color ?? "#3b4558",
      ink: ink(t.icon_color ?? "#3b4558"),
      versions: list(t.versions),
      os: list(t.os).length ? list(t.os) : ["debian"],
      requires: list(t.requires),
      allow: list(t.allow),
      installAllow: list(t.install_allow),
      ports: (t.ports ?? []).map(Number),
      command: t.command ? String(t.command) : null,
      removable: Boolean(t.uninstall),
      settings: (t.config ?? []).map((c) => ({ env: String(c.env), label: String(c.label ?? c.env), help: String(c.help ?? "") })),
      credentials: (t.credential ?? []).map((c) => ({ label: String(c.label ?? c.name), help: String(c.help ?? ""), hosts: list(c.hosts) })),
      actions: (t.action ?? []).map((a) => ({ label: String(a.label ?? ""), help: String(a.help ?? "") })),
    });
  }
}

const systems = [];
const osDir = join(base, "boxquell-os", "os");
for (const file of readdirSync(osDir).filter((f) => f.endsWith(".toml")).sort()) {
  const t = parse(readFileSync(join(osDir, file), "utf8"));
  systems.push({
    id: file.replace(/\.toml$/, ""),
    name: String(t.name),
    group: String(t.group ?? file.replace(/\.toml$/, "")),
    version: String(t.version ?? ""),
    family: String(t.family ?? ""),
    description: String(t.description ?? ""),
    icon: icon("os", t.icon),
    color: t.icon_color ?? "#3b4558",
    ink: ink(t.icon_color ?? "#3b4558"),
    packageHosts: list(t.package_hosts),
  });
}

writeFileSync(join(root, "src/data/catalogue.json"), JSON.stringify({ recipes, systems }, null, 1) + "\n");
const count = (kind) => recipes.filter((r) => r.kind === kind).length;
console.log(`${count("agent")} agents, ${count("language")} languages, ${count("tool")} tools, ${systems.length} systems`);
