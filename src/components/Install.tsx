import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { INSTALL } from "../site";

/** The install command for each system, with the visitor's own preselected. */
export function Install() {
  const [picked, setPicked] = useState("unix");
  const [copied, setCopied] = useState(false);
  // Read in the browser only; nothing is sent anywhere.
  useEffect(() => {
    if (/Windows/i.test(navigator.userAgent)) setPicked("windows");
  }, []);
  const entry = INSTALL.find((item) => item.id === picked) ?? INSTALL[0];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(entry.command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // No clipboard access: the command can still be selected by hand.
    }
  };
  return (
    <div className="install">
      <div className="install-tabs" role="tablist" aria-label="Your system">
        {INSTALL.map((item) => (
          <button key={item.id} role="tab" aria-selected={item.id === picked} className={item.id === picked ? "active" : ""} onClick={() => setPicked(item.id)}>
            {item.label}
          </button>
        ))}
      </div>
      <div className="install-line">
        <code>
          <span className="prompt" aria-hidden="true">
            $
          </span>
          {entry.command}
        </code>
        <button className="copy" onClick={copy} aria-label="Copy the command">
          {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
    </div>
  );
}
