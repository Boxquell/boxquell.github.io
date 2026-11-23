import { SITE } from "../site";
import { GitHubMark, Link } from "./Link";

export function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-row">
        <Link to="/" className="brand">
          <img src="/icon.svg" width="28" height="28" alt="" />
          <span>Boxquell</span>
        </Link>
        <nav aria-label="Sections">
          <Link to="/#how">How it works</Link>
          <Link to="/#features">Features</Link>
          <Link to="/#tour">Tour</Link>
          <Link to="/#catalogue">Catalogue</Link>
          <a href={SITE.wiki}>Wiki</a>
        </nav>
        <div className="nav-actions">
          <a className="button ghost" href={SITE.repo} aria-label="Boxquell on GitHub">
            <GitHubMark /> <span>GitHub</span>
          </a>
          <Link to="/#install" className="button primary">
            Install
          </Link>
        </div>
      </div>
    </header>
  );
}
