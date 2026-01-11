"use client";

import { useState } from "react";
import { popularTreatmentsDefaults } from "../../../../../../lib/sectionDefaults";

export default function PopularTreatments({ data, whatsappLink }) {
  const content = data || popularTreatmentsDefaults;
  const treatments = content.items || [];
  const resolvedCtaLink = whatsappLink || content.ctaHref;
  const [current, setCurrent] = useState(0);
  const total = treatments.length || 1;
  const goTo = (direction) => {
    setCurrent((prev) => {
      const next = (prev + direction + total) % total;
      return next;
    });
  };
  const renderCard = (item) => (
    <article
      key={item.title}
      className="group rounded-3xl bg-white border border-main-200/70 overflow-hidden"
    >
      <div className="relative aspect-[16/10] bg-main-50">
        <img
          src={item.image}
          alt={item.alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10"></div>
      </div>

      <div className="p-6 lg:p-7">
        <h3 className="text-lg lg:text-[19px] font-light text-main-900">
          {item.title}
        </h3>

        <div className="mt-3 h-[1px] w-16 rounded-full bg-copper-500/80"></div>

        <p className="mt-4 text-sm leading-relaxed text-main-600 font-light">
          {item.description}
        </p>

        <a
          href={resolvedCtaLink}
          target="_blank"
          className="inline-block"
          rel="noreferrer"
        >
          <button className="mt-7 inline-flex items-center gap-2 text-[15px] font-light cursor-pointer text-copper-700 hover:text-copper-900 transition">
            {content.ctaText}
          </button>
        </a>
      </div>
    </article>
  );

  return (
    <section
      id="popular-treatments"
      className="relative bg-gradient-to-b from-gray-50 via-white to-gray-100 py-16 lg:py-24"
    >
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-medium tracking-[0.32em] uppercase text-main-400">
            {content.kicker}
          </p>

          <h2 className="mt-3 text-3xl sm:text-3xl lg:text-5xl font-extralight text-main-900 tracking-tight">
            {content.title}
          </h2>

          <p className="mt-4 text-sm sm:text-[17px] font-light text-main-600">
            {content.description}
          </p>
        </div>

        <div className="mt-10 lg:mt-14">
          {treatments.length ? (
            <div className="relative sm:hidden">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${current * 100}%)` }}
                >
                  {treatments.map((item) => (
                    <div key={item.title} className="w-full flex-shrink-0 pr-4 last:pr-0">
                      {renderCard(item)}
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="absolute left-1 top-1/2 -translate-y-1/2 rounded-full bg-white shadow-md border border-main-200 text-main-700 hover:text-main-900 h-10 w-10 flex items-center justify-center"
                onClick={() => goTo(-1)}
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                type="button"
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-white shadow-md border border-main-200 text-main-700 hover:text-main-900 h-10 w-10 flex items-center justify-center"
                onClick={() => goTo(1)}
                aria-label="Next"
              >
                ›
              </button>
            </div>
          ) : null}

          <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {treatments.map((item) => renderCard(item))}
          </div>
        </div>
      </div>
    </section>
  );
}
