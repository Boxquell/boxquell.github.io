import { useEffect, useState } from "react";
import { Ban, Check, KeyRound } from "lucide-react";

type Attempt = { kind: string; target: string; allowed: boolean; why: string; key?: boolean };

// What a working agent typically tries, and what the gateway makes of it.
const ATTEMPTS: Attempt[] = [
  { kind: "dns", target: "api.anthropic.com", allowed: true, why: "opened by Claude Code" },
  { kind: "tcp", target: "api.anthropic.com:443", allowed: true, why: "key put in on the way out", key: true },
  { kind: "tcp", target: "registry.npmjs.org:443", allowed: true, why: "opened by Node.js" },
  { kind: "dns", target: "telemetry.example.net", allowed: false, why: "no matching rule" },
  { kind: "tcp", target: "github.com:443", allowed: true, why: "allow github.com" },
  { kind: "tcp", target: "pastebin.com:443", allowed: false, why: "no matching rule" },
  { kind: "GET", target: "docs.example.com/guide", allowed: true, why: "read docs.example.com" },
  { kind: "POST", target: "docs.example.com/upload", allowed: false, why: "reading only" },
  { kind: "tcp", target: "192.168.1.10:22", allowed: false, why: "private network" },
  { kind: "tcp", target: "pypi.org:443", allowed: true, why: "allow pypi.org, 2 h left" },
];

const VISIBLE = 6;

/** A network log that fills by itself, to show what the gateway does. */
export function Gateway() {
  const still = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [count, setCount] = useState(still ? ATTEMPTS.length : 3);
  useEffect(() => {
    if (still) return;
    const timer = setInterval(() => setCount((n) => n + 1), 1500);
    return () => clearInterval(timer);
  }, [still]);
  const rows = Array.from({ length: Math.min(count, VISIBLE) }, (_, i) => {
    const index = count - Math.min(count, VISIBLE) + i;
    return { index, attempt: ATTEMPTS[index % ATTEMPTS.length] };
  });
  const seen = Array.from({ length: count }, (_, i) => ATTEMPTS[i % ATTEMPTS.length]);
  const blocked = seen.filter((attempt) => !attempt.allowed).length;
  return (
    <div className="gateway" role="img" aria-label="An example of the network log: connections to allowed destinations pass, everything else is blocked and listed">
      <div className="gateway-head">
        <span className="dot live" /> webshop · network log
        <span className="gateway-count">
          <b>{count - blocked}</b> allowed <b className="bad">{blocked}</b> blocked
        </span>
      </div>
      <ul>
        {rows.map(({ index, attempt }) => (
          <li key={index} className={attempt.allowed ? "ok" : "no"}>
            <span className="verdict">{attempt.allowed ? <Check size={14} aria-hidden /> : <Ban size={14} aria-hidden />}</span>
            <span className="kind">{attempt.kind}</span>
            <span className="target">{attempt.target}</span>
            <span className="why">
              {attempt.key && <KeyRound size={13} aria-hidden />}
              {attempt.why}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
