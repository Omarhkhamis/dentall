"use client";

import { dentalImplantDefaults } from "../../../../../../lib/sectionDefaults";

export default function DentalImplantSec({ data }) {
  const content = data || dentalImplantDefaults;
  return (
    <section className="relative overflow-hidden bg-gradient-to-r pt-10 md:pt0  from-gray-100 via-gray-200 to-gray-100">
      <div className="pointer-events-none absolute  md:-left-16 top-10 md:top-200 h-px w-[200vw] md:w-[120vw] -translate-x-1/30 bg-gradient-to-r from-transparent via-copper-400/40 to-transparent rotate-[-10deg] md:rotate-[70deg] opacity-60 z-0"></div>

      <div className="mx-auto max-w-screen-2xl px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative z-10  lg:max-w-4xl space-y-6 py-8 lg:pr-24 lg:py-24">
            <h2 className="text-4xl lg:text-5xl font-extralight text-main-900 leading-snug relative z-10">
              {content.headingLine1} <br />
              <span className="relative inline-block">
                {content.headingLine2}
                <span className="absolute left-0 right-0 -bottom-1 h-[1px] bg-copper-500 rounded-full"></span>
              </span>
            </h2>

            <p className="text-main-700 leading-relaxed relative z-10">
              {content.paragraphs?.[0]}
            </p>

            <p className="text-main-700 leading-relaxed relative z-10">
              {content.paragraphs?.[1]}
            </p>

            <button
              type="button"
              className="rounded-xl bg-gradient-to-r from-copper-600 to-copper-500 text-white shadow-[0_10px_10px_rgba(0,0,0,0.09)] hover:from-copper-700 hover:to-copper-500 px-4 py-3 text-[11.5px] font-medium uppercase tracking-[0.13em] inline-flex items-center justify-center cursor-pointer transition-transform duration-200 ease-out disabled:opacity-60 disabled:pointer-events-none"
              onClick={() =>
                window.dispatchEvent(new CustomEvent("open-book-consultation"))
              }
            >
              {content.buttonText}
            </button>
          </div>

          <div className="relative lg:static">
            <div className="relative h-[360px] sm:h-[420px]  lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-auto">
              <img
                src={content.mainImage}
                alt={content.mainImageAlt}
                className="absolute inset-0 h-full w-full object-cover object-right"
              />

              <div className="none pointer-events-none md:absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-gray-200 via-gray-200/60 to-transparent"></div>

              <div className="absolute -top-40 md:top-auto md:bottom-14  right-0 md:right-[24vh] h-28 w-28 md:h-42 md:w-42  rounded-full bg-white/25 backdrop-blur-sm border border-white/35 flex items-center justify-center">
                <img
                  src={content.detailImage}
                  alt={content.detailImageAlt}
                  className="h-24 w-24 md:h-36 md:w-36 rounded-full object-cover"
                />
              </div>
            </div>

            <div className="hidden lg:block lg:h-[620px]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
