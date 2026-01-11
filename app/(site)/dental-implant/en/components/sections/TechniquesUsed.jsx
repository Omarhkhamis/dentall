"use client";

import { useMemo, useState } from "react";

import { techniquesUsedDefaults } from "../../../../../../lib/sectionDefaults";

const safeSlides = (slides) =>
  Array.isArray(slides) && slides.length
    ? slides
    : techniquesUsedDefaults.slides;

export default function TechniquesUsed({ data }) {
  const content = data || techniquesUsedDefaults;
  const slides = safeSlides(content.slides);
  const [index, setIndex] = useState(0);

  const current = useMemo(
    () => slides[(index % slides.length + slides.length) % slides.length],
    [index, slides]
  );

  const hasImage = current?.image;
  const hasText = current?.body || current?.title;
  const textOnly = hasText && !hasImage;
  const imageOnly = hasImage && !hasText;

  const next = () => setIndex((prev) => (prev + 1) % slides.length);
  const prev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section
      id="techniques-used"
      className="relative overflow-hidden bg-main-950 text-white py-16 lg:py-20"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-32 top-10 h-64 w-64 rounded-full bg-copper-500/10 blur-3xl" />
        <div className="absolute -right-32 bottom-10 h-64 w-64 rounded-full bg-copper-400/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-screen-2xl px-6 lg:px-10 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-copper-200/80">
              {content.kicker}
            </p>
            <h2 className="text-3xl sm:text-4xl font-extralight leading-tight text-white">
              {content.title}
            </h2>
            {content.description ? (
              <p className="mt-2 text-main-100/80 text-[15px] leading-relaxed max-w-3xl">
                {content.description}
              </p>
            ) : null}
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              className="h-10 w-10 rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
              aria-label="Previous slide"
            >
              <span className="text-lg">‹</span>
            </button>
            <button
              type="button"
              onClick={next}
              className="h-10 w-10 rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
              aria-label="Next slide"
            >
              <span className="text-lg">›</span>
            </button>
          </div>
        </div>

        <div
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-main-900 via-main-950 to-main-900 shadow-[0_28px_90px_rgba(0,0,0,0.35)] mx-auto max-w-screen-xl"
          style={{ height: "clamp(420px, 60vh, 620px)" }}
        >
          <div className="grid h-full gap-0 lg:grid-cols-2 min-h-[320px] items-center overflow-hidden">
            <div
              className={`p-6 sm:p-10 h-full ${
                imageOnly ? "lg:col-span-2" : ""
              }`}
            >
              <div className="h-full w-full flex items-center">
                {hasText ? (
                  <div className="space-y-4 max-w-2xl">
                    {current?.title ? (
                      <h3 className="text-2xl sm:text-3xl font-semibold text-white">
                        {current.title}
                      </h3>
                    ) : null}
                    {current?.body ? (
                      <p className="text-main-100/85 leading-relaxed text-[15px] sm:text-[16px] whitespace-pre-line">
                        {current.body}
                      </p>
                    ) : null}
                  </div>
                ) : (
                  <div className="text-main-200">No description provided.</div>
                )}
              </div>
            </div>

            {hasImage ? (
              <div
                className={`relative bg-black h-full ${
                  textOnly ? "lg:col-span-1" : "lg:col-span-1"
                } ${textOnly ? "" : imageOnly ? "lg:col-span-2" : ""}`}
                style={{ overflow: "hidden" }}
              >
                <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
                  <img
                    src={current.image}
                    alt={current.title || "Technique"}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex sm:hidden justify-center gap-3 py-4">
            <button
              type="button"
              onClick={prev}
              className="h-10 w-10 rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
              aria-label="Previous slide"
            >
              <span className="text-lg">‹</span>
            </button>
            <button
              type="button"
              onClick={next}
              className="h-10 w-10 rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
              aria-label="Next slide"
            >
              <span className="text-lg">›</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
