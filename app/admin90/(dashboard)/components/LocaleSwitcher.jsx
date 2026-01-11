"use client";

import { useSearchParams, usePathname } from "next/navigation";

const Flag = ({ code }) => {
  if (code === "ru") {
    return (
      <svg aria-hidden="true" className="h-3.5 w-5 rounded-sm ring-1 ring-slate-200" viewBox="0 0 3 2">
        <rect width="3" height="2" fill="#fff" />
        <rect width="3" height="1.333" y="0.667" fill="#0039a6" />
        <rect width="3" height="0.667" y="1.333" fill="#d52b1e" />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" className="h-3.5 w-5 rounded-sm ring-1 ring-slate-200" viewBox="0 0 60 30">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0 0 L60 30 M60 0 L0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0 L60 30 M60 0 L0 30" stroke="#C8102E" strokeWidth="2.5" />
      <rect x="25" width="10" height="30" fill="#fff" />
      <rect y="10" width="60" height="10" fill="#fff" />
      <rect x="27" width="6" height="30" fill="#C8102E" />
      <rect y="12" width="60" height="6" fill="#C8102E" />
    </svg>
  );
};

const buildHref = (pathname, searchParams, locale) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set("locale", locale);
  return `${pathname}?${params.toString()}`;
};

export default function LocaleSwitcher() {
  const searchParams = useSearchParams();
  const pathname = usePathname() || "";
  const current = searchParams.get("locale") === "ru" ? "ru" : "en";

  return (
    <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1 text-xs font-semibold uppercase tracking-[0.2em]">
      {[
        { code: "en", label: "EN" },
        { code: "ru", label: "RU" }
      ].map((item) => {
        const active = item.code === current;
        return (
          <a
            key={item.code}
            href={buildHref(pathname, searchParams, item.code)}
            className={`px-3 py-1 rounded-md transition ${
              active
                ? "bg-copper-50 border border-copper-200 text-copper-700"
                : "text-slate-600 hover:text-copper-700"
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <Flag code={item.code} />
              {item.label}
            </span>
          </a>
        );
      })}
    </div>
  );
}
