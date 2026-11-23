import { ArrowRight, Boxes, Cpu, FileDiff, KeyRound, ScrollText, ShieldCheck } from "lucide-react";
import { Gateway } from "../components/Gateway";
import { Install } from "../components/Install";
import { GitHubMark, Link } from "../components/Link";
import { Reveal } from "../components/Reveal";
import { Rich } from "../components/Code";
import { FAQ } from "../faq";
import { Tour } from "../components/Tour";
import { SHELVES, SYSTEMS, recipePath, recipesOf, systemPath } from "../catalogue";
import { SITE } from "../site";

const FEATURES = [
  { icon: Cpu, title: "A real VM boundary", text: "Each sandbox is a microVM with its own kernel, not a container sharing yours. It sees your project folder and nothing else of your files." },
  { icon: ShieldCheck, title: "Network closed by default", text: "A sandbox reaches only what you allow: names, wildcards, addresses or networks. For good, for an hour, or for reading only." },
  { icon: KeyRound, title: "Keys stay on your computer", text: "The sandbox holds a placeholder. The real key is put into a request on its way out, and only towards the hosts it belongs to." },
  { icon: ScrollText, title: "A log of everything", text: "Every name lookup and connection attempt is recorded with destination, verdict, rule, bytes and duration." },
  { icon: FileDiff, title: "Review before it counts", text: "Let the agent work on a copy of your project, read its changes file by file and take over what you want." },
  { icon: Boxes, title: "One place for all of them", text: "A desktop app, a web interface with a terminal, a command line and an MCP server manage any number of sandboxes." },
];

const EXTRAS = ["Snapshots and templates", "Tasks in the background", "Speed and data limits", "Token usage with a cost estimate", "A project file in your repository", "SSH keys through an agent, never copied", "Emergency stop for every sandbox", "Light and dark"];

export function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="wrap hero-inner">
          <a className="pill" href={SITE.releases}>
            <span className="dot live" /> Open source · early development <ArrowRight size={14} aria-hidden />
          </a>
          <h1>
            Give every coding agent
            <br />
            <span className="grad">its own microVM.</span>
          </h1>
          <p className="lead">
            The network is closed until you open it. Every attempt is logged. Your API keys never enter the sandbox.
            <br />
            No account, no cloud service: it all runs on your computer.
          </p>
          <div id="install" className="hero-install">
            <Install />
            <p className="muted small">
              Installs the <code>boxquell</code> command and the desktop app for your user. Or <a href={SITE.releases}>download a release</a> · <a href={`${SITE.repo}#build-from-source-linux`}>build from source</a>
            </p>
          </div>
          <div className="window hero-shot">
            <div className="window-bar" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <picture>
              <source media="(prefers-color-scheme: light)" srcSet="/shots/home-light.webp" />
              <img src="/shots/home-dark.webp" width="1360" height="880" alt="The start page of Boxquell: three sandboxes as cards with their state, agents and load" />
            </picture>
          </div>
        </div>
      </section>

      <section id="how" className="wrap section split">
        <div>
          <p className="eyebrow">How it works</p>
          <h2>Nothing leaves without a rule</h2>
          <p>
            A sandbox has a single network device, and its other end is a network stack inside Boxquell on your computer. There is no route around it: names that are not allowed do not resolve, connections that match no rule are
            refused, and both end up in the log.
          </p>
          <ul className="ticks">
            <li>Installed software brings the destinations it needs, and you can switch each of them off.</li>
            <li>A blocked attempt shows up as a notification with a button to allow it.</li>
            <li>Private networks and your own computer are closed unless you name them.</li>
          </ul>
        </div>
        <Gateway />
      </section>

      <section id="features" className="wrap section">
        <Reveal>
          <p className="eyebrow">Features</p>
          <h2>Built so you can leave an agent alone</h2>
          <div className="features stagger">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="feature">
                <span className="feature-icon">
                  <feature.icon size={20} aria-hidden />
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            ))}
          </div>
          <ul className="extras">
            {EXTRAS.map((extra) => (
              <li key={extra}>{extra}</li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="wrap section split keys">
        <div className="keycard" aria-hidden="true">
          <div className="keycard-side">
            <span className="keycard-label">Inside the sandbox</span>
            <code>ANTHROPIC_API_KEY=</code>
            <code className="fake">placeholder</code>
          </div>
          <div className="keycard-arrow">
            <KeyRound size={18} />
          </div>
          <div className="keycard-side real">
            <span className="keycard-label">On its way to api.anthropic.com</span>
            <code>x-api-key:</code>
            <code className="true">sk-ant-••••••••</code>
          </div>
        </div>
        <div>
          <p className="eyebrow">Keys</p>
          <h2>An agent cannot leak what it never had</h2>
          <p>
            Keys are stored on your computer and tied to the hosts they are meant for. Inside the sandbox there is only a placeholder; Boxquell replaces it in requests to those hosts and nowhere else. That also works for a helper
            command that fetches a short-lived token, as used with company sign-in.
          </p>
        </div>
      </section>

      <section id="tour" className="wrap section">
        <Reveal>
          <p className="eyebrow">Tour</p>
          <h2>A look around</h2>
          <Tour />
        </Reveal>
      </section>

      <section id="catalogue" className="wrap section">
        <Reveal>
          <p className="eyebrow">Catalogue</p>
          <h2>Installed with a click</h2>
          <div className="catalogue">
            {SHELVES.map((shelf) => (
              <Shelf key={shelf.slug} shelf={shelf} />
            ))}
          </div>
          <p>
            <Link to="/catalogue" className="button ghost">
              Browse the whole catalogue <ArrowRight size={15} aria-hidden />
            </Link>
          </p>
          <p className="muted small">The names belong to their owners; Boxquell installs their software from the official sources and is not affiliated with them.</p>
        </Reveal>
      </section>

      <section className="wrap section split">
        <div>
          <p className="eyebrow">Command line</p>
          <h2>A working sandbox in a few commands</h2>
          <p>Everything the app does is a command as well, and an MCP server lets an assistant on your computer manage sandboxes for you.</p>
          <p>
            <a className="button ghost" href={SITE.wiki}>
              Read the wiki <ArrowRight size={15} aria-hidden />
            </a>
          </p>
        </div>
        <pre className="terminal" aria-label="Example commands">
          <code>
            <span className="c"># check what your computer needs</span>
            {"\n"}
            <span className="p">$</span> boxquell doctor{"\n\n"}
            <span className="c"># a sandbox for this folder, with an agent and a language</span>
            {"\n"}
            <span className="p">$</span> boxquell new mybox --workspace .{"\n"}
            <span className="p">$</span> boxquell add mybox claude node{"\n\n"}
            <span className="c"># open what it needs, then start working</span>
            {"\n"}
            <span className="p">$</span> boxquell allow mybox github.com{"\n"}
            <span className="p">$</span> boxquell run mybox claude
          </code>
        </pre>
      </section>

      <section className="wrap section faq">
        <Reveal>
          <p className="eyebrow">Questions</p>
          <h2>Asked first</h2>
          <div className="faq-list">
            {FAQ.slice(0, 5).map(({ q, a }) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>
                  <Rich text={a} />
                </p>
              </details>
            ))}
          </div>
          <p>
            <Link to="/faq" className="button ghost">
              All questions and answers <ArrowRight size={15} aria-hidden />
            </Link>
          </p>
        </Reveal>
      </section>

      <section className="wrap section">
        <div className="cta">
          <h2>Try it on a project you care about</h2>
          <p>
            Boxquell is in early development. It is built and tested on Linux (x86_64 with KVM); the macOS and Windows builds exist, but nobody has run a sandbox on them yet. Expect rough edges, and tell us about them.
          </p>
          <div className="cta-actions">
            <a className="button primary large" href="/#install">
              Install Boxquell
            </a>
            <a className="button ghost large" href={SITE.repo}>
              <GitHubMark /> Star it on GitHub
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Shelf({ shelf }: { shelf: (typeof SHELVES)[number] }) {
  const all = shelf.kind === "system" ? SYSTEMS.map((system) => ({ path: systemPath(system), name: system.name })) : recipesOf(shelf.kind).map((recipe) => ({ path: recipePath(recipe), name: recipe.name }));
  const shown = all.slice(0, 14);
  return (
    <div className="shelf">
      <p className="shelf-count">
        <b>{all.length}</b> {shelf.kind === "system" ? "Linux systems" : shelf.label.toLowerCase()}
      </p>
      <ul>
        {shown.map((entry) => (
          <li key={entry.path}>
            <Link to={entry.path}>{entry.name}</Link>
          </li>
        ))}
        {all.length > shown.length && (
          <li className="more">
            <Link to={`/catalogue/${shelf.slug}`}>and {all.length - shown.length} more</Link>
          </li>
        )}
      </ul>
    </div>
  );
}
