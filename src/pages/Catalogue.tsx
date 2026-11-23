import { useState } from "react";
import { Search } from "lucide-react";
import { COUNTS, RECIPES, SHELVES, SYSTEMS, plain, recipePath, recipesOf, systemPath, type Shelf } from "../catalogue";
import { Rich } from "../components/Code";
import { Link } from "../components/Link";
import { Mark } from "../components/Mark";

type Entry = { path: string; name: string; description: string; icon: string | null; color: string; ink: string; note: string; words: string };

function entries(shelf: Shelf): Entry[] {
  if (shelf.kind === "system") {
    return SYSTEMS.map((system) => ({ path: systemPath(system), name: system.name, description: system.description, icon: system.icon, color: system.color, ink: system.ink, note: system.family, words: `${system.name} ${system.description} ${system.id}` }));
  }
  return recipesOf(shelf.kind).map((recipe) => ({
    path: recipePath(recipe),
    name: recipe.name,
    description: recipe.description,
    icon: recipe.icon,
    color: recipe.color,
    ink: recipe.ink,
    note: recipe.versions.length ? `${recipe.versions.length} versions` : "",
    words: `${recipe.name} ${recipe.description} ${recipe.id} ${recipe.command ?? ""}`,
  }));
}

/** The whole catalogue, or one of its shelves. */
export function Catalogue({ shelf }: { shelf?: Shelf["slug"] }) {
  const [query, setQuery] = useState("");
  const shown = SHELVES.filter((item) => !shelf || item.slug === shelf);
  const needle = query.trim().toLowerCase();
  const one = shown.length === 1 ? shown[0] : null;
  return (
    <section className="wrap page">
      <nav className="crumbs" aria-label="You are here">
        <Link to="/">Boxquell</Link>
        {one ? <Link to="/catalogue">Catalogue</Link> : null}
        <span>{one ? one.label : "Catalogue"}</span>
      </nav>
      <h1>{one ? one.label : "The catalogue"}</h1>
      <p className="lead left">
        {one
          ? `${one.text} ${COUNTS[one.slug]} of them, each installed with a click or one command.`
          : `Everything Boxquell installs into a sandbox: ${COUNTS.agents} agents, ${COUNTS.languages} languages, ${COUNTS.tools} tools and ${COUNTS.systems} Linux systems. Each entry says what it needs from the network, so a sandbox opens exactly that and no more.`}
      </p>
      <div className="catalogue-bar">
        <div className="shelf-tabs">
          <Link to="/catalogue" className={!shelf ? "active" : ""}>
            All <span>{RECIPES.length + SYSTEMS.length}</span>
          </Link>
          {SHELVES.map((item) => (
            <Link key={item.slug} to={`/catalogue/${item.slug}`} className={shelf === item.slug ? "active" : ""}>
              {item.label} <span>{COUNTS[item.slug]}</span>
            </Link>
          ))}
        </div>
        <label className="search">
          <Search size={16} aria-hidden />
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the catalogue" aria-label="Search the catalogue" />
        </label>
      </div>
      {shown.map((item) => {
        const list = entries(item).filter((entry) => !needle || entry.words.toLowerCase().includes(needle));
        if (!list.length) return null;
        return (
          <div key={item.slug} className="shelf-block">
            {!one && (
              <h2>
                <Link to={`/catalogue/${item.slug}`}>{item.label}</Link> <span className="muted">{list.length}</span>
              </h2>
            )}
            <div className="cards">
              {list.map((entry) => (
                <Link key={entry.path} to={entry.path} className="card">
                  <Mark icon={entry.icon} color={entry.color} ink={entry.ink} name={entry.name} />
                  <span className="card-text">
                    <b>{entry.name}</b>
                    <span title={plain(entry.description)}>
                      <Rich text={entry.description} />
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
      {needle && shown.every((item) => !entries(item).some((entry) => entry.words.toLowerCase().includes(needle))) && (
        <p className="muted empty">
          Nothing in the catalogue matches "{query}". Software that is missing can be added as a <a href="https://github.com/Boxquell/boxquell/blob/main/docs/recipes.md">recipe of your own</a>.
        </p>
      )}
    </section>
  );
}
