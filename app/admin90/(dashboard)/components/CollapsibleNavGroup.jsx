"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const Chevron = ({ open }) => (
  <svg
    className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${
      open ? "rotate-180" : "rotate-0"
    }`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export default function CollapsibleNavGroup({
  title,
  items,
  defaultOpen = true,
  isActive = false
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen || isActive);
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");

  useLayoutEffect(() => {
    if (contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    }
  }, [items]);

  useEffect(() => {
    setIsOpen(isActive || false);
  }, [isActive]);

  useEffect(() => {
    const onResize = () => {
      if (contentRef.current) {
        setHeight(`${contentRef.current.scrollHeight}px`);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div>
      <button
        type="button"
        className="group flex w-full items-center justify-between rounded-lg px-2 py-1 text-[11px] uppercase tracking-[0.24em] text-slate-400 transition hover:text-slate-600"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <Chevron open={isOpen} />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{
          maxHeight: isOpen ? height : "0px",
          opacity: isOpen ? 1 : 0.4
        }}
      >
        <ul ref={contentRef} className="mt-2 space-y-2 text-sm">
          {items.map((item) => (
            <li key={item.href}>
              <a
                className="flex items-center justify-between rounded-lg px-3 py-2 text-slate-700 transition hover:bg-slate-100"
                href={item.href}
              >
                <span>{item.label}</span>
                {item.statusLabel ? (
                  <span
                    className={`text-[10px] uppercase tracking-[0.18em] ${item.statusClassName}`}
                  >
                    {item.statusLabel}
                  </span>
                ) : null}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
