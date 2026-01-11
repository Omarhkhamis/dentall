"use client";

import { useState } from "react";

const Flag = ({ code }) => {
  if (code === "ru") {
    return (
      <svg
        aria-hidden="true"
        className="h-3.5 w-5 rounded-sm"
        viewBox="0 0 3 2"
      >
        <rect width="3" height="2" fill="#fff" />
        <rect width="3" height="1.333" y="0.667" fill="#0039a6" />
        <rect width="3" height="0.667" y="1.333" fill="#d52b1e" />
      </svg>
    );
  }
  // default EN/GB flag
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-5 rounded-sm"
      viewBox="0 0 60 30"
    >
      <rect width="60" height="30" fill="#012169" />
      <path
        d="M0 0 L60 30 M60 0 L0 30"
        stroke="#fff"
        strokeWidth="6"
      />
      <path
        d="M0 0 L60 30 M60 0 L0 30"
        stroke="#C8102E"
        strokeWidth="2.5"
      />
      <rect x="25" width="10" height="30" fill="#fff" />
      <rect y="10" width="60" height="10" fill="#fff" />
      <rect x="27" width="6" height="30" fill="#C8102E" />
      <rect y="12" width="60" height="6" fill="#C8102E" />
    </svg>
  );
};

export default function LocaleDropdown({ locale = "en" }) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prev) => !prev);
  const current = locale === "ru" ? "ru" : "en";
  const other = current === "ru" ? "en" : "ru";
  const hrefMap = {
    en: "/dental-implant/en",
    ru: "/dental-implant/ru"
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggle}
        className="inline-flex h-9 items-center justify-center rounded-full border border-transparent bg-transparent px-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600 hover:text-copper-500 transition"
      >
        <Flag code={current} />
        <span className="ml-1 text-slate-400">▾</span>
      </button>
      {open ? (
        <div className="absolute right-0 mt-1 w-16 rounded-lg border border-slate-200 bg-white shadow-lg overflow-hidden z-50">
          <a
            href={hrefMap[other]}
            className="flex items-center justify-center gap-2 px-2 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600 hover:bg-slate-50"
            onClick={() => setOpen(false)}
          >
            <Flag code={other} />
          </a>
        </div>
      ) : null}
    </div>
  );
}
