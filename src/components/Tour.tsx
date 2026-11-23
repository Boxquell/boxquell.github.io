import { useState } from "react";

const STOPS = [
  { id: "network", label: "Rules", title: "Rules that say what they do", text: "Your own rules, some for an hour and some for reading only, next to what the installed software opened for itself. Each of those can be switched off." },
  { id: "activity", label: "Activity", title: "Every attempt, as it happens", text: "Name lookups and connections with destination, verdict, rule, bytes and duration. Allow or block a destination right from the log." },
  { id: "review-dark", label: "Review", title: "Changes wait for you", text: "In review mode the agent works on a copy of the project. Read what it changed, file by file, and take over what you want." },
  { id: "usage", label: "Usage", title: "Tokens and what they cost", text: "Read from the answers of the model APIs as they pass: per day, per key and per sandbox, with an estimate in dollars and a daily limit per key." },
  { id: "software", label: "Catalogue", title: "Agents, languages and tools", text: "Pick what a sandbox should have; what a recipe needs is installed with it. Your own recipes live in a git repository." },
  { id: "configuration", label: "Configuration", title: "Settings without dotfiles", text: "The settings and credentials of everything installed on one page, each with a plain sentence about what it does." },
  { id: "traffic", label: "Traffic", title: "Limits you can drag", text: "What a sandbox sent and received per hour and per destination, with sliders for speed and for data per run." },
  { id: "terminal", label: "Terminal", title: "A terminal where the rest is", text: "A shell or an agent inside the sandbox, in the app. SSH, VS Code Remote and JetBrains Gateway work as well." },
];

/** Screenshots of the app, one area at a time. */
export function Tour() {
  const [picked, setPicked] = useState(STOPS[0].id);
  const stop = STOPS.find((item) => item.id === picked) ?? STOPS[0];
  return (
    <div className="tour">
      <div className="tour-tabs" role="tablist" aria-label="Areas of the app">
        {STOPS.map((item) => (
          <button key={item.id} role="tab" aria-selected={item.id === picked} className={item.id === picked ? "active" : ""} onClick={() => setPicked(item.id)}>
            {item.label}
          </button>
        ))}
      </div>
      <div className="tour-text">
        <h3>{stop.title}</h3>
        <p>{stop.text}</p>
      </div>
      <div className="window">
        <div className="window-bar" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <img key={stop.id} src={`/shots/${stop.id}.webp`} width="1360" height="900" loading="lazy" alt={`Boxquell: ${stop.title}`} />
      </div>
    </div>
  );
}
