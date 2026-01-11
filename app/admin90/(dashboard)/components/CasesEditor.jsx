"use client";

import { useState } from "react";

import FieldInput from "./FieldInput";

const emptyCase = {
  image: "",
  caption: ""
};

const buildLabel = (index, label) => `Cases #${index + 1} ${label}`;

export default function CasesEditor({ initialCases }) {
  const [cases, setCases] = useState(
    Array.isArray(initialCases) && initialCases.length
      ? initialCases
      : [emptyCase]
  );

  const handleAdd = () => {
    setCases((prev) => [...prev, emptyCase]);
  };

  const handleRemove = (index) => {
    setCases((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
        Cases
      </p>
      <div className="mt-4 space-y-4">
        {cases.map((item, index) => (
          <div
            key={`case-${index}`}
            className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50/40 p-4 lg:flex-row lg:items-end"
          >
            <div className="flex-1">
              <FieldInput
                name={`field.cases.${index}.image`}
                label={buildLabel(index, "Image")}
                defaultValue={item?.image ?? ""}
              />
            </div>
            <div className="flex-1">
              <FieldInput
                name={`field.cases.${index}.caption`}
                label={buildLabel(index, "Caption")}
                defaultValue={item?.caption ?? ""}
              />
            </div>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
              aria-label={`Remove case ${index + 1}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <input type="hidden" name="casesLength" value={cases.length} />
      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={handleAdd}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 transition hover:border-slate-300"
        >
          Add new
        </button>
      </div>
    </div>
  );
}
