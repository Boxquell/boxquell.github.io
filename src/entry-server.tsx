import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { App } from "./App";
import { COUNTS, RECIPES, SHELVES, SYSTEMS, plain, recipePath, recipesOf, systemPath } from "./catalogue";
import { FAQ } from "./faq";
import { PAGES } from "./routes";
import { SITE } from "./site";

export { PAGES, SITE };

/** The content of a page as HTML. `path` may be one that does not exist: that is the "not found" page. */
export function render(path: string): string {
  return renderToString(
    <StrictMode>
      <App path={path} />
    </StrictMode>,
  );
}

/** A plain-text summary of the site for language models (llms.txt). */
export function llms(): string {
  const link = (name: string, path: string, note: string) => `- [${name}](${SITE.url}${path}): ${note}`;
  return [
    "# Boxquell",
    "",
    `> ${SITE.description}`,
    "",
    "Boxquell is a desktop app, web interface, command line and MCP server for running coding agents in microVMs (libkrun or QEMU). It is open source (MIT or Apache-2.0), needs no account and runs entirely on the user's computer. It is in early development and tested on Linux (x86_64, KVM); macOS and Windows builds exist but are untested.",
    "",
    "## Key facts",
    "",
    "- Each sandbox is a microVM with its own kernel; it sees only the project folder given to it.",
    "- The network is closed by default. Rules allow names, wildcards, addresses or networks: for good, for a limited time, or for reading only.",
    "- Every DNS lookup and connection attempt is logged with destination, verdict, rule, bytes and duration.",
    "- API keys stay on the host; the sandbox holds a placeholder that is replaced in requests to the hosts a key belongs to.",
    "- Review mode lets an agent work on a copy of the project; changes are taken over file by file.",
    `- The catalogue installs ${COUNTS.agents} agents, ${COUNTS.languages} languages and ${COUNTS.tools} tools, on ${COUNTS.systems} Linux systems.`,
    "- Install: `curl -fsSL https://github.com/Boxquell/boxquell/releases/latest/download/install.sh | sh` or `brew install boxquell/tap/boxquell`.",
    "",
    "## Pages",
    "",
    link("Start page", "/", "what Boxquell does and how to install it"),
    link("Questions and answers", "/faq", "short answers to common questions"),
    link("Catalogue", "/catalogue", "everything that can be installed into a sandbox"),
    link("Source code", "", "").replace(`(${SITE.url})`, `(${SITE.repo})`).replace(/: $/, ": the repository on GitHub, with the full README"),
    link("Wiki", "", "").replace(`(${SITE.url})`, `(${SITE.wiki})`).replace(/: $/, ": the manual"),
    "",
    "## Questions and answers",
    "",
    ...FAQ.flatMap(({ q, a }) => [`### ${q}`, "", plain(a), ""]),
    ...SHELVES.filter((shelf) => shelf.kind !== "system").flatMap((shelf) => [`## ${shelf.label}`, "", ...recipesOf(shelf.kind).map((recipe) => link(recipe.name, recipePath(recipe), plain(recipe.description))), ""]),
    "## Systems",
    "",
    ...SYSTEMS.map((system) => link(system.name, systemPath(system), plain(system.description))),
    "",
  ].join("\n");
}

export const total = RECIPES.length + SYSTEMS.length;
