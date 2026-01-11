"use client";

import { internationalPatientsDefaults } from "../../../../../../lib/sectionDefaults";

export default function InternationalPatientsSec({ data }) {
  const content = data || internationalPatientsDefaults;
  return (
    <section className="relative w-full py-14 lg:py-18 flex items-center justify-center overflow-hidden">
      <img
        src={content.backgroundImage}
        alt={content.backgroundAlt}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]"></div>

      <div className="relative z-10 max-w-2xl text-center px-6">
        <p className="text-xs font-semibold tracking-[0.22em] uppercase text-white/70 mb-4">
          {content.kicker}
        </p>

        <h1 className="text-white text-4xl sm:text-4xl lg:text-5xl font-extralight tracking-tight">
          {content.titleLine1}
          <span className="block mt-1 text-white/80 ">
            {content.titleLine2}
          </span>
        </h1>

        <p className="mt-4 mb-8 text-white/80 font-extralight leading-relaxed text-sm sm:text-[15px]">
          {content.description}
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
    </section>
  );
}
