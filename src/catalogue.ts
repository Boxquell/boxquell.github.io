import data from "./data/catalogue.json";

export type Recipe = (typeof data.recipes)[number];
export type System = (typeof data.systems)[number];

export const RECIPES: Recipe[] = data.recipes;
export const SYSTEMS: System[] = data.systems;

/** The four shelves of the catalogue, in the order they are shown. */
export const SHELVES = [
  { slug: "agents", kind: "agent", label: "Agents", one: "agent", text: "Coding agents that work inside a sandbox." },
  { slug: "languages", kind: "language", label: "Languages", one: "language", text: "Compilers and runtimes, most with a choice of version." },
  { slug: "tools", kind: "tool", label: "Tools", one: "tool", text: "Command-line tools, databases, package managers and editors." },
  { slug: "systems", kind: "system", label: "Systems", one: "system", text: "The Linux system a sandbox runs." },
] as const;

export type Shelf = (typeof SHELVES)[number];

export const shelfOf = (recipe: Recipe): Shelf => SHELVES.find((shelf) => shelf.kind === recipe.kind) ?? SHELVES[2];
export const recipePath = (recipe: Recipe) => `/catalogue/${shelfOf(recipe).slug}/${recipe.id}`;
export const systemPath = (system: System) => `/catalogue/systems/${system.id}`;
export const recipesOf = (kind: string) => RECIPES.filter((recipe) => recipe.kind === kind);

/** The recipe a `requires` entry such as `node>=22` names. */
export function required(entry: string): Recipe | undefined {
  const id = entry.split(/[@>=]/)[0];
  return RECIPES.find((recipe) => recipe.id === id);
}

export const COUNTS = {
  agents: recipesOf("agent").length,
  languages: recipesOf("language").length,
  tools: recipesOf("tool").length,
  systems: SYSTEMS.length,
};

/** `inline code` in recipe descriptions, as plain text. */
export const plain = (text: string) => text.replace(/`/g, "");
