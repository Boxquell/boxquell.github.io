import type { CSSProperties } from "react";

/** The logo of a recipe or system: its single-colour icon on the brand's colour. */
export function Mark({ icon, color, ink, name, size = 44 }: { icon: string | null; color: string; ink: string; name: string; size?: number }) {
  const style = { "--mark": color, "--ink": ink, "--icon": icon ? `url(${icon})` : "none", width: size, height: size, fontSize: size * 0.42 } as CSSProperties;
  return (
    <span className={icon ? "mark" : "mark letter"} style={style} aria-hidden="true">
      {icon ? null : name.slice(0, 1)}
    </span>
  );
}
