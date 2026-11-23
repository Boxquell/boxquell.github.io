import { useEffect } from "react";
import { usePath } from "./router";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Imprint, Privacy } from "./pages/Legal";
import { NotFound } from "./pages/NotFound";

const PAGES: Record<string, { title: string; lang: "de" | "en"; page: () => React.ReactNode }> = {
  "/": { title: "Boxquell: a microVM for every coding agent", lang: "en", page: () => <Home /> },
  "/impressum": { title: "Impressum · Boxquell", lang: "de", page: () => <Imprint lang="de" /> },
  "/datenschutz": { title: "Datenschutzerklärung · Boxquell", lang: "de", page: () => <Privacy lang="de" /> },
  "/en/legal-notice": { title: "Legal notice · Boxquell", lang: "en", page: () => <Imprint lang="en" /> },
  "/en/privacy": { title: "Privacy policy · Boxquell", lang: "en", page: () => <Privacy lang="en" /> },
};

export function App() {
  const path = usePath();
  const entry = PAGES[path];
  useEffect(() => {
    document.title = entry?.title ?? "Page not found · Boxquell";
    document.documentElement.lang = entry?.lang ?? "en";
  }, [entry]);
  return (
    <>
      <a className="skip" href="#main">
        Skip to the content
      </a>
      <Nav />
      <main id="main">{entry ? entry.page() : <NotFound />}</main>
      <Footer />
    </>
  );
}
