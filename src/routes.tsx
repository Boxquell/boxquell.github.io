import type { ReactNode } from "react";
import { COUNTS, RECIPES, SHELVES, SYSTEMS, plain, recipePath, shelfOf, systemPath } from "./catalogue";
import { FAQ } from "./faq";
import { Catalogue } from "./pages/Catalogue";
import { Faq } from "./pages/Faq";
import { Home } from "./pages/Home";
import { Imprint, Privacy } from "./pages/Legal";
import { RecipePage, SystemPage } from "./pages/Detail";
import { SITE } from "./site";

export type Page = {
  title: string;
  description: string;
  lang: "de" | "en";
  /** Structured data for search engines, one object per script tag. */
  data: object[];
  /** Left out of the sitemap and of search results. */
  hidden?: boolean;
  render: () => ReactNode;
};

const crumbs = (trail: [string, string][]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: SITE.url + path })),
});

const software = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Boxquell",
  description: SITE.description,
  url: SITE.url,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Linux, macOS, Windows",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  license: "https://github.com/Boxquell/boxquell#license",
  codeRepository: SITE.repo,
  image: `${SITE.url}/shots/home-dark.webp`,
  author: { "@type": "Person", name: "Tobias Vorwachs" },
  featureList: ["microVM per coding agent", "Network closed by default", "Log of every connection attempt", "API keys stay on the host", "Review mode with a diff viewer", "Token usage with a cost estimate"],
};

function pages(): Record<string, Page> {
  const all: Record<string, Page> = {
    "/": {
      title: "Boxquell: a microVM for every coding agent",
      description: SITE.description,
      lang: "en",
      data: [software, { "@context": "https://schema.org", "@type": "WebSite", name: "Boxquell", url: SITE.url }],
      render: () => <Home />,
    },
    "/faq": {
      title: "Questions and answers · Boxquell",
      description: "What Boxquell is, how it differs from containers, which agents and systems it supports, how keys stay out of the sandbox and what it costs.",
      lang: "en",
      data: [
        { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: plain(a) } })) },
        crumbs([["Boxquell", "/"], ["Questions and answers", "/faq"]]),
      ],
      render: () => <Faq />,
    },
    "/catalogue": {
      title: `Catalogue: ${COUNTS.agents} agents, ${COUNTS.languages} languages, ${COUNTS.tools} tools · Boxquell`,
      description: `Everything Boxquell installs into a sandbox with a click: ${COUNTS.agents} coding agents, ${COUNTS.languages} languages, ${COUNTS.tools} tools and ${COUNTS.systems} Linux systems, each with the network destinations it needs.`,
      lang: "en",
      data: [crumbs([["Boxquell", "/"], ["Catalogue", "/catalogue"]])],
      render: () => <Catalogue />,
    },
    "/impressum": { title: "Impressum · Boxquell", description: "Impressum von Boxquell: Anbieterkennzeichnung gemäß § 5 DDG.", lang: "de", data: [], render: () => <Imprint lang="de" /> },
    "/datenschutz": { title: "Datenschutzerklärung · Boxquell", description: "Datenschutzerklärung von Boxquell: keine Cookies, kein Tracking, keine Inhalte von Dritten.", lang: "de", data: [], render: () => <Privacy lang="de" /> },
    "/en/legal-notice": { title: "Legal notice · Boxquell", description: "Legal notice for the Boxquell website: provider information pursuant to § 5 DDG.", lang: "en", data: [], render: () => <Imprint lang="en" /> },
    "/en/privacy": { title: "Privacy policy · Boxquell", description: "Privacy policy of the Boxquell website: no cookies, no tracking, no third-party content.", lang: "en", data: [], render: () => <Privacy lang="en" /> },
  };
  for (const shelf of SHELVES) {
    const count = COUNTS[shelf.slug];
    all[`/catalogue/${shelf.slug}`] = {
      title: `${shelf.label}: ${count} to install in a sandbox · Boxquell`,
      description: `${shelf.text} ${count} ${shelf.label.toLowerCase()} in the Boxquell catalogue, each with what it needs from the network.`,
      lang: "en",
      data: [crumbs([["Boxquell", "/"], ["Catalogue", "/catalogue"], [shelf.label, `/catalogue/${shelf.slug}`]])],
      render: () => <Catalogue shelf={shelf.slug} />,
    };
  }
  for (const recipe of RECIPES) {
    const shelf = shelfOf(recipe);
    all[recipePath(recipe)] = {
      title: `${recipe.name} in a sandbox · Boxquell`,
      description: `Run ${recipe.name} in a Boxquell microVM: ${plain(recipe.description)}. What it installs, which network destinations it opens and how to set it up.`,
      lang: "en",
      data: [crumbs([["Boxquell", "/"], ["Catalogue", "/catalogue"], [shelf.label, `/catalogue/${shelf.slug}`], [recipe.name, recipePath(recipe)]])],
      render: () => <RecipePage recipe={recipe} />,
    };
  }
  for (const system of SYSTEMS) {
    all[systemPath(system)] = {
      title: `${system.name} as a sandbox system · Boxquell`,
      description: `Run coding agents on ${system.name} in a Boxquell microVM. ${plain(system.description)}`,
      lang: "en",
      data: [crumbs([["Boxquell", "/"], ["Catalogue", "/catalogue"], ["Systems", "/catalogue/systems"], [system.name, systemPath(system)]])],
      render: () => <SystemPage system={system} />,
    };
  }
  return all;
}

export const PAGES = pages();
