"use client";

import { useState } from "react";

import FieldInput from "./FieldInput";

const emptyItem = {
  poster: "",
  videoUrl: ""
};

const buildLabel = (index, label) => `Media #${index + 1} ${label}`;

const normalizeItem = (item) => {
  if (!item || typeof item !== "object") return emptyItem;
  const poster = item.poster || item.image || item.src || "";
  let videoUrl = item.videoUrl || item.youtubeUrl || "";
  if (!videoUrl && item.provider === "youtube" && item.id) {
    videoUrl = `https://www.youtube.com/watch?v=${item.id}`;
  }
  return { poster, videoUrl };
};

export default function TreatmentsMediaEditor({ initialItems }) {
  const [items, setItems] = useState(
    Array.isArray(initialItems) && initialItems.length
      ? initialItems.map(normalizeItem)
      : [emptyItem]
  );

  const handleAdd = () => {
    setItems((prev) => [...prev, emptyItem]);
  };

  const handleRemove = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
        Slider Media
      </p>
      <div className="mt-4 space-y-4">
        {items.map((item, index) => (
          <div
            key={`media-${index}`}
            className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50/40 p-4 lg:flex-row lg:items-end"
          >
            <div className="flex-1">
              <FieldInput
                name={`field.mediaItems.${index}.poster`}
                label={buildLabel(index, "Image")}
                defaultValue={item.poster}
              />
            </div>
            <div className="flex-1">
              <FieldInput
                name={`field.mediaItems.${index}.videoUrl`}
                label={buildLabel(index, "YouTube URL")}
                defaultValue={item.videoUrl}
              />
            </div>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
              aria-label={`Remove media ${index + 1}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <input type="hidden" name="mediaItemsLength" value={items.length} />
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
