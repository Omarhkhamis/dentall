"use client";

import { useEffect, useMemo, useState } from "react";

import { reorderSectionsAction } from "../actions";

const moveItem = (list, from, to) => {
  if (from === to || from < 0 || to < 0 || from >= list.length || to >= list.length) {
    return list;
  }
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
};

export default function ReorderSections({ initialSections, locale = "en" }) {
  const [items, setItems] = useState(initialSections || []);
  const [dragIndex, setDragIndex] = useState(null);
  const orderValue = useMemo(
    () => JSON.stringify(items.map((item) => item.key)),
    [items]
  );

  useEffect(() => {
    if (items.length !== initialSections.length) return;
  }, [items, initialSections.length]);

  const handleDragStart = (index) => () => setDragIndex(index);
  const handleDragOver = (index) => (event) => {
    event.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    setItems((prev) => moveItem(prev, dragIndex, index));
    setDragIndex(index);
  };
  const handleDragEnd = () => setDragIndex(null);

  const handleMove = (index, direction) => {
    const target = index + direction;
    setItems((prev) => moveItem(prev, index, target));
  };

  return (
    <form action={reorderSectionsAction} className="space-y-4">
      <input type="hidden" name="order" value={orderValue} readOnly />
      <input type="hidden" name="locale" value={locale} />
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
              Sections
            </p>
            <p className="text-sm text-slate-600">
              Drag to reorder or use arrows. Changes apply after saving.
            </p>
          </div>
          <button
            type="submit"
            className="rounded-lg bg-copper-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-sm transition hover:bg-copper-700"
          >
            Save Order
          </button>
        </div>

        <ul className="divide-y divide-slate-200">
          {items.map((section, index) => (
            <li
              key={section.key}
              className={`flex items-center justify-between gap-4 px-6 py-3 ${
                dragIndex === index ? "bg-slate-50" : ""
              }`}
              draggable
              onDragStart={handleDragStart(index)}
              onDragOver={handleDragOver(index)}
              onDragEnd={handleDragEnd}
            >
              <div className="flex items-center gap-3">
                <span className="cursor-grab text-slate-400">⋮⋮</span>
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {section.label}
                  </p>
                  <p className="text-xs text-slate-500">{section.key}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-semibold uppercase tracking-[0.16em] ${
                    section.enabled ? "text-emerald-500" : "text-slate-400"
                  }`}
                >
                  {section.enabled ? "On" : "Off"}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleMove(index, -1)}
                    className="h-8 w-8 rounded-lg border border-slate-200 bg-white text-sm text-slate-600 transition hover:border-slate-300 disabled:opacity-40"
                    disabled={index === 0}
                    aria-label="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(index, 1)}
                    className="h-8 w-8 rounded-lg border border-slate-200 bg-white text-sm text-slate-600 transition hover:border-slate-300 disabled:opacity-40"
                    disabled={index === items.length - 1}
                    aria-label="Move down"
                  >
                    ↓
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
}
