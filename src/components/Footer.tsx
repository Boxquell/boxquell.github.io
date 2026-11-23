import { Heart } from "lucide-react";
import { SITE } from "../site";
import { Link } from "./Link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <Link to="/" className="brand">
            <img src="/icon.svg" width="28" height="28" alt="" />
            <span>Boxquell</span>
          </Link>
          <p className="muted">A microVM for every coding agent. Open source under MIT or Apache-2.0.</p>
        </div>
        <div>
          <h4>Project</h4>
          <a href={SITE.repo}>Source on GitHub</a>
          <a href={SITE.releases}>Releases</a>
          <a href={SITE.wiki}>Wiki</a>
          <a href={`${SITE.repo}/issues`}>Report a problem</a>
        </div>
        <div>
          <h4>Legal</h4>
          <Link to="/impressum">Impressum</Link>
          <Link to="/datenschutz">Datenschutz</Link>
          <Link to="/en/legal-notice">Legal notice</Link>
          <Link to="/en/privacy">Privacy policy</Link>
        </div>
      </div>
      <div className="wrap footer-note muted">
        <span>
          Made with <Heart size={14} className="heart" aria-label="love" /> in the EU
        </span>
        <span>This site sets no cookies, counts no visits and loads nothing from other servers.</span>
      </div>
    </footer>
  );
}
