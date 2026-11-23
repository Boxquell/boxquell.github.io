import { Link } from "../components/Link";

export function NotFound() {
  return (
    <section className="wrap legal">
      <h1>Page not found</h1>
      <p>There is nothing at this address.</p>
      <p>
        <Link to="/" className="button primary">
          To the start page
        </Link>
      </p>
    </section>
  );
}
