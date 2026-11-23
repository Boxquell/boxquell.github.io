import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { RECIPES, SYSTEMS, recipePath, recipesOf, required, shelfOf, systemPath, type Recipe, type System } from "../catalogue";
import { Command, Rich } from "../components/Code";
import { Link } from "../components/Link";
import { Mark } from "../components/Mark";
import { SITE } from "../site";

const OS_NAMES: Record<string, string> = { debian: "Debian", ubuntu: "Ubuntu", alpine: "Alpine", arch: "Arch Linux", alma: "AlmaLinux" };

function Hosts({ hosts }: { hosts: string[] }) {
  return (
    <ul className="hosts">
      {hosts.map((host) => (
        <li key={host}>{host === "@packages" ? "the system's package servers" : host}</li>
      ))}
    </ul>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="block">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

/** One recipe of the catalogue: what it is, how to get it and what it does to a sandbox. */
export function RecipePage({ recipe }: { recipe: Recipe }) {
  const shelf = shelfOf(recipe);
  const needs = recipe.requires.map((entry) => ({ entry, recipe: required(entry) }));
  const usedBy = RECIPES.filter((other) => other.requires.some((entry) => required(entry)?.id === recipe.id));
  const others = recipesOf(recipe.kind)
    .filter((other) => other.id !== recipe.id)
    .slice(0, 6);
  const versioned = recipe.versions.length > 0;
  return (
    <article className="wrap page detail">
      <nav className="crumbs" aria-label="You are here">
        <Link to="/">Boxquell</Link>
        <Link to="/catalogue">Catalogue</Link>
        <Link to={`/catalogue/${shelf.slug}`}>{shelf.label}</Link>
        <span>{recipe.name}</span>
      </nav>
      <header className="detail-head">
        <Mark icon={recipe.icon} color={recipe.color} ink={recipe.ink} name={recipe.name} size={72} />
        <div>
          <p className="eyebrow">{recipe.ide ? "Editor" : shelf.one}</p>
          <h1>{recipe.name}</h1>
          <p className="lead left">
            <Rich text={recipe.description} />
          </p>
        </div>
      </header>

      <div className="detail-grid">
        <div>
          <Block title={`Install ${recipe.name} in a sandbox`}>
            <p>
              In the app, open a sandbox and pick {recipe.name} under <b>Software › Catalogue</b>. Or from a terminal, for a sandbox named <code>mybox</code>:
            </p>
            <Command command={`boxquell add mybox ${recipe.id}`} />
            {versioned && (
              <>
                <p>
                  Version {recipe.versions[0]} is installed unless you name another: {recipe.versions.slice(1).join(", ") || "there is only this one"}.
                </p>
                {recipe.versions[1] && <Command command={`boxquell add mybox ${recipe.id}@${recipe.versions[1]}`} />}
              </>
            )}
            {recipe.command && (
              <>
                <p>Then start it in the sandbox:</p>
                <Command command={`boxquell run mybox ${recipe.id}`} />
              </>
            )}
          </Block>

          <Block title="What it opens on the network">
            {recipe.allow.length ? (
              <>
                <p>A sandbox is closed until a destination is allowed. With {recipe.name} installed, these are open, and each can be switched off under Network › Rules:</p>
                <Hosts hosts={recipe.allow} />
              </>
            ) : (
              <p>{recipe.name} opens nothing by itself. The sandbox reaches only what you allow.</p>
            )}
            {recipe.installAllow.length > 0 && (
              <>
                <p>Only while it is being installed, these are open as well:</p>
                <Hosts hosts={recipe.installAllow} />
              </>
            )}
          </Block>

          {recipe.credentials.length > 0 && (
            <Block title="Credentials">
              <p>The values stay on your computer. The sandbox holds a placeholder, and the real value is put into requests on their way out.</p>
              <dl className="settings">
                {recipe.credentials.map((credential) => (
                  <div key={credential.label}>
                    <dt>{credential.label}</dt>
                    <dd>{credential.help}</dd>
                  </div>
                ))}
              </dl>
            </Block>
          )}

          {recipe.settings.length > 0 && (
            <Block title="Settings">
              <p>Set under Software › Configuration of the sandbox, without editing files:</p>
              <dl className="settings">
                {recipe.settings.map((setting) => (
                  <div key={setting.env}>
                    <dt>
                      {setting.label} <code>{setting.env}</code>
                    </dt>
                    <dd>{setting.help}</dd>
                  </div>
                ))}
              </dl>
            </Block>
          )}
        </div>

        <aside className="facts">
          <dl>
            {versioned && (
              <div>
                <dt>Versions</dt>
                <dd>{recipe.versions.join(", ")}</dd>
              </div>
            )}
            <div>
              <dt>Works on</dt>
              <dd>{recipe.os.map((os) => OS_NAMES[os] ?? os).join(", ")}</dd>
            </div>
            {needs.length > 0 && (
              <div>
                <dt>Installed with it</dt>
                <dd>
                  {needs.map(({ entry, recipe: needed }, i) => (
                    <span key={entry}>
                      {i > 0 && ", "}
                      {needed ? <Link to={recipePath(needed)}>{needed.name}</Link> : entry}
                    </span>
                  ))}
                </dd>
              </div>
            )}
            {usedBy.length > 0 && (
              <div>
                <dt>Needed by</dt>
                <dd>
                  {usedBy.map((other, i) => (
                    <span key={other.id}>
                      {i > 0 && ", "}
                      <Link to={recipePath(other)}>{other.name}</Link>
                    </span>
                  ))}
                </dd>
              </div>
            )}
            {recipe.ports.length > 0 && (
              <div>
                <dt>Ports</dt>
                <dd>{recipe.ports.join(", ")}, reachable on 127.0.0.1 of your computer</dd>
              </div>
            )}
            <div>
              <dt>Removal</dt>
              <dd>{recipe.removable ? "Can be taken out again with one click" : "Stays until the sandbox is reset"}</dd>
            </div>
            <div>
              <dt>Recipe</dt>
              <dd>
                <a href={`${SITE.org}/boxquell-${recipe.repo}/blob/main/recipes/${recipe.id}.toml`}>{recipe.repo}:{recipe.id}</a>
              </dd>
            </div>
          </dl>
          <Link to="/#install" className="button primary">
            Install Boxquell <ArrowRight size={15} aria-hidden />
          </Link>
        </aside>
      </div>

      <Block title={`More ${shelf.label.toLowerCase()}`}>
        <div className="cards">
          {others.map((other) => (
            <Link key={other.id} to={recipePath(other)} className="card">
              <Mark icon={other.icon} color={other.color} ink={other.ink} name={other.name} />
              <span className="card-text">
                <b>{other.name}</b>
                <span>
                  <Rich text={other.description} />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Block>
    </article>
  );
}

/** One Linux system a sandbox can run. */
export function SystemPage({ system }: { system: System }) {
  const siblings = SYSTEMS.filter((other) => other.group === system.group && other.id !== system.id);
  const works = RECIPES.filter((recipe) => recipe.os.includes(system.family || system.group)).length;
  return (
    <article className="wrap page detail">
      <nav className="crumbs" aria-label="You are here">
        <Link to="/">Boxquell</Link>
        <Link to="/catalogue">Catalogue</Link>
        <Link to="/catalogue/systems">Systems</Link>
        <span>{system.name}</span>
      </nav>
      <header className="detail-head">
        <Mark icon={system.icon} color={system.color} ink={system.ink} name={system.name} size={72} />
        <div>
          <p className="eyebrow">system</p>
          <h1>{system.name}</h1>
          <p className="lead left">
            <Rich text={system.description} />
          </p>
        </div>
      </header>
      <div className="detail-grid">
        <div>
          <Block title={`A sandbox with ${system.name}`}>
            <p>
              In the app, choose {system.name} in the first step of <b>New sandbox</b>. Or from a terminal:
            </p>
            <Command command={`boxquell new mybox --os ${system.id} --workspace .`} />
            <p>The system is downloaded the first time it is used, or built on your computer when there is no ready-made image for it.</p>
          </Block>
          <Block title="What it opens on the network">
            {system.packageHosts.length ? (
              <>
                <p>So that software can be installed and updated, the system's package servers are open. They can be switched off under Network › Rules:</p>
                <Hosts hosts={system.packageHosts} />
              </>
            ) : (
              <p>Nothing by itself.</p>
            )}
          </Block>
        </div>
        <aside className="facts">
          <dl>
            {system.version && (
              <div>
                <dt>Version</dt>
                <dd>{system.version}</dd>
              </div>
            )}
            {siblings.length > 0 && (
              <div>
                <dt>Other versions</dt>
                <dd>
                  {siblings.map((other, i) => (
                    <span key={other.id}>
                      {i > 0 && ", "}
                      <Link to={systemPath(other)}>{other.name}</Link>
                    </span>
                  ))}
                </dd>
              </div>
            )}
            <div>
              <dt>Catalogue</dt>
              <dd>
                {works} of {RECIPES.length} recipes are written for it
              </dd>
            </div>
            <div>
              <dt>Definition</dt>
              <dd>
                <a href={`${SITE.org}/boxquell-os/blob/main/os/${system.id}.toml`}>os:{system.id}</a>
              </dd>
            </div>
          </dl>
          <Link to="/#install" className="button primary">
            Install Boxquell <ArrowRight size={15} aria-hidden />
          </Link>
        </aside>
      </div>
    </article>
  );
}
