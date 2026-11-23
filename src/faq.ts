import { COUNTS, recipesOf } from "./catalogue";

const agents = recipesOf("agent")
  .map((recipe) => recipe.name)
  .join(", ");

/** Questions and answers, shown on /faq and given to search engines as structured data. */
export const FAQ: { q: string; a: string }[] = [
  {
    q: "What is Boxquell?",
    a: "Boxquell is an open-source tool that runs coding agents in microVMs on your own computer. Each sandbox is a small virtual machine with its own kernel. Its network is closed until you allow a destination, every connection attempt is logged, and API keys stay on your computer instead of entering the sandbox. It comes as a desktop app, a web interface, a command line and an MCP server.",
  },
  {
    q: "How is a Boxquell sandbox different from a Docker container?",
    a: "A container shares the kernel of your computer; a Boxquell sandbox is a microVM (libkrun or QEMU) with a kernel of its own, so the boundary is that of a virtual machine. On top of that, Boxquell owns the only network path out of the sandbox, which lets it decide per destination, log every attempt and put API keys into requests on their way out. Docker itself can be installed inside a sandbox.",
  },
  {
    q: "Which coding agents does Boxquell support?",
    a: `The catalogue has ${COUNTS.agents} agents: ${agents}. Each one is installed with a click or with one command, and brings the network destinations it needs. You can add your own agents and tools as recipes in a git repository.`,
  },
  {
    q: "Which operating systems does Boxquell run on?",
    a: "Boxquell is built and tested on Linux (x86_64 with KVM). A build for macOS is produced with every release, but nobody has run a sandbox there yet, so treat it as untested. On Windows, use Boxquell inside WSL 2 with the Linux install; the native Windows build cannot give a sandbox your project folder. Inside a sandbox you choose between Debian, Ubuntu, Alpine, Arch Linux and AlmaLinux.",
  },
  {
    q: "What do I need to run it?",
    a: "On Linux: KVM, an OpenSSH client and libkrun (the default) or QEMU. The install script offers to install what is missing, and `boxquell doctor` tells you what your computer still needs. No account and no cloud service are involved.",
  },
  {
    q: "How do my API keys stay out of the sandbox?",
    a: "Keys are stored on your computer and tied to the hosts they are meant for. The sandbox only holds a placeholder. When a request leaves for one of those hosts, Boxquell replaces the placeholder with the real key; requests to any other host never get it. A helper command that prints a short-lived token, as used with company sign-in, works the same way.",
  },
  {
    q: "What can an agent see of my files?",
    a: "Only the project folder you give the sandbox, which appears there as /workspace, plus folders you share on purpose. In review mode the sandbox gets a copy of the project instead; you read the agent's changes file by file and take over what you want.",
  },
  {
    q: "What happens when an agent tries to reach something that is not allowed?",
    a: "The name does not resolve or the connection is refused, the attempt is written to the network log with the reason, and you get a notification with a button to allow that destination for good or for an hour. Nothing is let through first and reported later.",
  },
  {
    q: "Can I allow a website for reading only, or only for a while?",
    a: "Yes. A rule can allow a destination for good, for a limited time, or for reading only, which lets GET, HEAD and OPTIONS requests through and refuses the rest. You can also limit how fast a sandbox sends and receives and how much data it may move per run.",
  },
  {
    q: "Does Boxquell need an account or send telemetry?",
    a: "No. There is no account and no telemetry. Boxquell contacts GitHub to keep the catalogues of installable software up to date and to look for a new version once a day; both can be switched off in the settings.",
  },
  {
    q: "What does Boxquell cost?",
    a: "Nothing. Boxquell is open source under the MIT or the Apache-2.0 licence, at your choice. You pay your model provider for the tokens your agents use; Boxquell shows that usage per day, per key and per sandbox with a cost estimate, and can stop a key at a daily limit.",
  },
  {
    q: "Can I use my editor with a sandbox?",
    a: "Yes. Every sandbox is reachable over SSH from your computer, so VS Code Remote-SSH and JetBrains Gateway work, and code-server can be installed for an editor in the browser. The app has a terminal of its own as well.",
  },
  {
    q: "Can an AI assistant manage sandboxes for me?",
    a: "Yes. `boxquell mcp` is a Model Context Protocol server for assistants on your computer. It can list, create, start and stop sandboxes, install software, give tasks to an agent and read the changes of a review. What it may do, such as changing network rules or deleting sandboxes, is set in the settings.",
  },
  {
    q: "How do I add software that is not in the catalogue?",
    a: "Software is installed by recipes: small TOML files with an install script and the network destinations the software needs. Put your own recipes into a git repository and add it with `boxquell repo add`; they then appear in the catalogue next to the official ones.",
  },
  {
    q: "Is Boxquell ready for daily work?",
    a: "It is in early development. The core works and is tested on Linux, but expect rough edges and breaking changes. Known limits: the sandbox network is IPv4 only, UDP other than DNS is refused, and with the QEMU backend only Debian sandboxes get the project folder.",
  },
];
