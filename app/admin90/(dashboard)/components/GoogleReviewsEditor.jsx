"use client";

import { useState } from "react";

import FieldInput from "./FieldInput";

const emptyReview = {
  name: "",
  text: "",
  count: ""
};

const buildLabel = (index, label) => `Review #${index + 1} ${label}`;

export default function GoogleReviewsEditor({ initialItems }) {
  const [items, setItems] = useState(
    Array.isArray(initialItems) && initialItems.length
      ? initialItems
      : [emptyReview]
  );

  const handleAdd = () => {
    setItems((prev) => [...prev, emptyReview]);
  };

  const handleRemove = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
        Reviews
      </p>
      <div className="mt-4 space-y-4">
        {items.map((item, index) => (
          <div
            key={`review-${index}`}
            className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50/40 p-4"
          >
            <div className="grid gap-3 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
              <FieldInput
                name={`field.items.${index}.name`}
                label={buildLabel(index, "Name")}
                defaultValue={item?.name ?? ""}
              />
              <FieldInput
                name={`field.items.${index}.count`}
                label={buildLabel(index, "Count")}
                defaultValue={item?.count ?? ""}
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                aria-label={`Remove review ${index + 1}`}
              >
                ×
              </button>
            </div>
            <div className="grid gap-3">
              <FieldInput
                name={`field.items.${index}.text`}
                label={buildLabel(index, "Text")}
                defaultValue={item?.text ?? ""}
                isTextarea
              />
            </div>
          </div>
        ))}
      </div>
      <input type="hidden" name="reviewsLength" value={items.length} />
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
