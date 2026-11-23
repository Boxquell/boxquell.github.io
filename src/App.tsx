import { useEffect } from "react";
import { usePath } from "./router";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { NotFound } from "./pages/NotFound";
import { PAGES } from "./routes";
import { SITE } from "./site";

export function App({ path: initial }: { path: string }) {
  const path = usePath(initial);
  const page = PAGES[path];
  // The server writes these into the page; after a click on a link they follow here.
  useEffect(() => {
    document.title = page?.title ?? "Page not found · Boxquell";
    document.documentElement.lang = page?.lang ?? "en";
    document.querySelector('meta[name="description"]')?.setAttribute("content", page?.description ?? "");
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", SITE.url + (path === "/" ? "/" : path));
  }, [page, path]);
  return (
    <>
      <a className="skip" href="#main">
        Skip to the content
      </a>
      <Nav path={path} />
      <main id="main" key={path}>
        {page ? page.render() : <NotFound />}
      </main>
      <Footer />
    </>
  );
}
