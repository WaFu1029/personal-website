"use client";

import { useState } from "react";

const DISCORD = "wohenxihuan5yangqi";
const EMAIL = "warren.jc.fu@gmail.com";

const Check = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline-block h-[0.85em] w-[0.85em] align-middle"
  >
    <path d="M5 12.5l4.5 4.5L19 7" />
  </svg>
);

export default function Socials() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const el = document.createElement("textarea");
      el.value = value;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      el.remove();
    }
    setCopied(key);
    setTimeout(() => setCopied((c) => (c === key ? null : c)), 1200);
  };

  const base = "group font-[family-name:var(--font-jakarta)] text-white";

  // short label that expands to the full word on hover
  const reveal = (short: string, full: string) => (
    <>
      <span className="group-hover:hidden">{short}</span>
      <span className="hidden group-hover:inline">{full}</span>
    </>
  );

  return (
    <div
      className="flex gap-4 text-xs font-normal lowercase sm:text-xl"
      style={{ letterSpacing: "-0.07em" }}
    >
      <a
        href="https://www.linkedin.com/in/warren-fu-2554a6267/"
        target="_blank"
        rel="noopener noreferrer"
        className={base}
      >
        {reveal("li", "linkedin")}
      </a>
      <a
        href="https://www.instagram.com/warrenfu_/"
        target="_blank"
        rel="noopener noreferrer"
        className={base}
      >
        {reveal("ig", "instagram")}
      </a>
      <a
        href="https://github.com/WaFu1029"
        target="_blank"
        rel="noopener noreferrer"
        className={base}
      >
        {reveal("gh", "github")}
      </a>
      <button
        type="button"
        onClick={() => copy("dc", DISCORD)}
        aria-label="copy discord handle"
        className={base}
      >
        {copied === "dc" ? <Check /> : reveal("dc", "discord")}
      </button>
      <button
        type="button"
        onClick={() => copy("em", EMAIL)}
        aria-label="copy email"
        className={base}
      >
        {copied === "em" ? <Check /> : reveal("em", "email")}
      </button>
    </div>
  );
}
