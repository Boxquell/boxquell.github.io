import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** Text with `inline code` as it is written in recipe descriptions. */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("`").map((part, i) => (i % 2 ? <code key={i}>{part}</code> : part))}
    </>
  );
}

/** A command with a button that copies it. */
export function Command({ command, prompt = "$" }: { command: string; prompt?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // No clipboard access: the command can still be selected by hand.
    }
  };
  return (
    <div className="command">
      <code>
        <span className="prompt" aria-hidden="true">
          {prompt}
        </span>
        {command}
      </code>
      <button className="copy" onClick={copy} aria-label="Copy the command">
        {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
        <span>{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}
