"use client";

import { heroDefaults } from "../../../../../../lib/sectionDefaults";
import ConsultationFormCard from "../ConsultationFormCard";

export default function HeroSlide({ data, whatsappLink }) {
  const content = data || heroDefaults;
  const form = content.form;
  const resolvedWhatsappLink =
    whatsappLink || "https://wa.me/+905465266449";

  return (
    <section className="relative pt-42 pb-20  h-auto  overflow-hidden bg-main-900">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        preload="none"
        playsInline
      >
        <source
          src={content.videoUrl}
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-main-900/90 via-main-900/80 to-main-900/90 sm:to-main-900/30"></div>

      <div className="relative z-10 h-full">
        <div className="mx-auto flex h-full max-w-screen-2xl flex-col justify-center px-6 lg:px-10">
          <div className="grid gap-1 sm:gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-center">
            <div className="space-y-6 xl:p-3 sm:p-0 text-white lg:max-w-2xl">
              <p className="text-[14px] tracking-[0.24em] mb-3 uppercase text-main-200/80">
                {content.kicker}
              </p>

              <h1 className="text-5xl sm:text-6xl lg:text-6xl font-extralight leading-tight">
                {content.titleLine1}
                <br className="hidden sm:block" />
                {content.titleLine2}
              </h1>

              <p className="text-[17px] tracking-[0.05em] font-extralight  sm:text-left text-main-100/80 lg:max-w-md">
                {content.subtitle}
              </p>

              <div className=" hidden sm:flex flex-wrap items-center gap-4">
                <a
                  href={resolvedWhatsappLink}
                  target="_blank"
                  className="inline-block"
                  rel="noreferrer"
                >
                  <button
                    type="button"
                    className="rounded-xl bg-gradient-to-r from-copper-600 to-copper-500 text-white shadow-[0_10px_10px_rgba(0,0,0,0.09)] hover:from-copper-700 hover:to-copper-500 px-4 py-3 text-[11.5px] font-medium uppercase tracking-[0.13em] inline-flex items-center justify-center cursor-pointer transition-transform duration-200 ease-out disabled:opacity-60 disabled:pointer-events-none"
                  >
                    <i className="fa-brands fa-whatsapp text-[15px] opacity-90 mr-2"></i>
                    {content.whatsappCta}</button>
                </a>
              </div>
            </div>

            <div className="flex justify-end">
              <ConsultationFormCard
                form={form}
                idPrefix="hero"
                className="w-full lg:max-w-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
