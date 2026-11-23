import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./styles.css";
import { App } from "./App";
import { normalise } from "./router";

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App path={normalise(location.pathname)} />
  </StrictMode>
);
// Sections fade in as they are reached; without scripts they are simply there.
document.documentElement.classList.add("anim");
// A built page arrives with its content; the development server starts empty.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
