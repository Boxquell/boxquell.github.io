// Everything that names the project, its owner or an address lives here.
export const SITE = {
  name: "Boxquell",
  // The address the site is served from; shown in the legal pages.
  domain: import.meta.env.VITE_SITE_DOMAIN ?? "boxquell.app",
  repo: "https://github.com/Boxquell/boxquell",
  wiki: "https://github.com/Boxquell/boxquell/wiki",
  releases: "https://github.com/Boxquell/boxquell/releases/latest",
  org: "https://github.com/Boxquell",
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

export const CATALOGUE = {
  agents: ["Claude Code", "Codex", "Gemini CLI", "opencode", "pi", "Aider", "goose", "Amp", "GitHub Copilot CLI", "Cursor CLI", "Qwen Code", "herdr", "Orca server"],
  languages: ["Node.js", "Python", "Go", "Rust", "PHP", "Ruby", "Java", "Kotlin", "Lua", ".NET", "Deno", "Bun", "Elixir", "Zig"],
  tools: ["Git", "GitHub CLI", "GitLab CLI", "Docker", "Playwright", "PostgreSQL", "MariaDB", "Redis", "kubectl", "Terraform", "AWS CLI", "Homebrew", "Jira CLI", "code-server"],
  toolCount: 60,
  systems: ["Debian", "Ubuntu", "Alpine", "Arch Linux", "AlmaLinux"],
  systemCount: 10,
};
