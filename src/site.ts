// Everything that names the project, its owner or an address lives here.
const domain: string = import.meta.env.VITE_SITE_DOMAIN ?? "boxquell.app";

export const SITE = {
  name: "Boxquell",
  // The address the site is served from: in the legal pages, canonical links and the sitemap.
  domain,
  url: `https://${domain}`,
  repo: "https://github.com/Boxquell/boxquell",
  wiki: "https://github.com/Boxquell/boxquell/wiki",
  releases: "https://github.com/Boxquell/boxquell/releases/latest",
  org: "https://github.com/Boxquell",
  tagline: "A microVM for every coding agent",
  description:
    "Boxquell runs coding agents in microVMs on your own computer. The network is closed until you open it, every attempt is logged, and your API keys never enter the sandbox. Open source, no account, no cloud service.",
};

export const OWNER = {
  name: "Tobias Vorwachs",
  street: "Schwaneweder Str. 21",
  zip: "28779",
  city: "Bremen",
  country: { de: "Deutschland", en: "Germany" },
  email: "tobias@vorwachs.com",
};

export const INSTALL = [
  { id: "unix", label: "Linux and macOS", command: "curl -fsSL https://github.com/Boxquell/boxquell/releases/latest/download/install.sh | sh" },
  { id: "brew", label: "Homebrew", command: "brew install boxquell/tap/boxquell" },
  { id: "windows", label: "Windows", command: "irm https://github.com/Boxquell/boxquell/releases/latest/download/install.ps1 | iex" },
];
