import { useEffect, useState } from "react";

export function normalise(path: string): string {
  return path.length > 1 ? path.replace(/\/+$/, "") : "/";
}

/** The path of the page, kept in step with the address bar. On the server it is the path being rendered. */
export function usePath(initial: string): string {
  const [path, setPath] = useState(initial);
  useEffect(() => {
    const update = () => setPath(normalise(location.pathname));
    addEventListener("popstate", update);
    return () => removeEventListener("popstate", update);
  }, []);
  return path;
}

/** Go to a page of this site without loading it anew. */
export function go(to: string) {
  const [path, hash] = to.split("#");
  if (normalise(path || "/") !== normalise(location.pathname)) {
    history.pushState(null, "", to);
    dispatchEvent(new PopStateEvent("popstate"));
  } else if (hash !== undefined) {
    history.replaceState(null, "", to);
  }
  // After the page has drawn: to the section, or to the top.
  requestAnimationFrame(() => {
    const target = hash ? document.getElementById(hash) : null;
    if (target) target.scrollIntoView({ behavior: "smooth" });
    else scrollTo({ top: 0 });
  });
}
