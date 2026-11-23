import { Rich } from "../components/Code";
import { Link } from "../components/Link";
import { FAQ } from "../faq";
import { SITE } from "../site";

export function Faq() {
  return (
    <section className="wrap page faq">
      <nav className="crumbs" aria-label="You are here">
        <Link to="/">Boxquell</Link>
        <span>Questions and answers</span>
      </nav>
      <h1>Questions and answers</h1>
      <p className="lead left">
        Short answers to what people ask first. The details are in the <a href={SITE.wiki}>wiki</a>.
      </p>
      <div className="faq-list">
        {FAQ.map(({ q, a }, i) => (
          <details key={q} open={i < 3}>
            <summary>{q}</summary>
            <p>
              <Rich text={a} />
            </p>
          </details>
        ))}
      </div>
      <p className="muted">
        Something missing? <a href={`${SITE.repo}/issues`}>Ask on GitHub</a>.
      </p>
    </section>
  );
}
