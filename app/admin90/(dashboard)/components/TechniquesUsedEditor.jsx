"use client";

import { useState } from "react";

import FieldInput from "./FieldInput";

const emptySlide = { title: "", body: "", image: "" };

export default function TechniquesUsedEditor({ initialSlides }) {
  const [slides, setSlides] = useState(
    Array.isArray(initialSlides) && initialSlides.length
      ? initialSlides
      : [emptySlide]
  );

  const handleAdd = () => setSlides((prev) => [...prev, emptySlide]);
  const handleRemove = (index) =>
    setSlides((prev) => prev.filter((_, i) => i !== index));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
            Techniques Used Slides
          </p>
          <p className="text-sm text-slate-600">
            Add/edit slides with title, body, and optional image.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 transition hover:border-slate-300"
        >
          Add Slide
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {slides.map((slide, index) => (
          <div
            key={`tech-slide-${index}`}
            className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Slide #{index + 1}
              </p>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                aria-label={`Remove slide ${index + 1}`}
              >
                ×
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <FieldInput
                name={`field.slides.${index}.title`}
                label="Title"
                defaultValue={slide?.title ?? ""}
              />
              <FieldInput
                name={`field.slides.${index}.image`}
                label="Image URL"
                defaultValue={slide?.image ?? ""}
              />
            </div>
            <FieldInput
              name={`field.slides.${index}.body`}
              label="Description"
              defaultValue={slide?.body ?? ""}
              isTextarea
            />
          </div>
        ))}
      </div>
      <input type="hidden" name="slidesLength" value={slides.length} />
    </div>
  );
}
