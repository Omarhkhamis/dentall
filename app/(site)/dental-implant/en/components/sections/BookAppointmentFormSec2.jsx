"use client";

import { useState } from "react";

import { bookAppointmentSecondaryDefaults } from "../../../../../../lib/sectionDefaults";
import { buildFormPayload, submitFormPayload } from "../../../../../../lib/formSubmit";

export default function BookAppointmentFormSec2({ data }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const content = data || bookAppointmentSecondaryDefaults;
  const fields = content.fields;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const payload = buildFormPayload(
        event.currentTarget,
        "book-appointment-secondary"
      );
      await submitFormPayload(payload);
      event.currentTarget.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-13 overflow-visible">
      <img
        src={content.backgroundImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-bottom"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-main-900/100 sm:from-main-900 via-copper-900/100 sm:via-copper-900/95 to-main-500/90"></div>

      <div className="relative z-10 mx-auto max-w-screen-2xl px-6 lg:px-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10"
        >
          <input
            type="text"
            placeholder=""
            autoComplete="off"
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-1 transition hidden"
            tabIndex={-1}
            aria-hidden="true"
            name="company"
          />

          <div className="max-w-xl lg:mr-10 space-y-1">
            <p className="text-[11px] tracking-[0.24em] uppercase text-main-200/70">
              {content.kicker}
            </p>
            <h2 className="text-[24px] sm:text-[25px] capitalize font-semibold text-white">
              {content.title}
            </h2>
            <p className="text-[12px] text-main-100/70">
              {content.description}
            </p>

            <style>{`
              @keyframes soft-pop {
                0%, 100% { transform: scale(1); opacity: 1; }
                50%      { transform: scale(1.06); opacity: 1; }
              }
              @keyframes soft-ring {
                0%, 100% { transform: scale(1); opacity: .18; }
                50%      { transform: scale(1.15); opacity: 0.56; }
              }
            `}</style>

            <span className="inline-flex text-[12px] mt-4 items-center gap-2 text-gray-300">
              <span className="relative inline-flex items-center justify-center">
                <span
                  className="absolute -inset-1 rounded-full"
                  style={{
                    background: "rgba(16,185,129,.35)",
                    filter: "blur(6px)",
                    animation: "soft-ring 2.6s ease-in-out infinite"
                  }}
                ></span>

                <i
                  className="fa-solid fa-lock relative z-10 text-emerald-600 text-[13px]"
                  style={{ animation: "soft-pop 2.6s ease-in-out infinite" }}
                ></i>
              </span>

              {content.privacyNote}
            </span>
          </div>

          <div className="flex-1 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] tracking-[0.18em] uppercase mb-1 text-main-100/70">
                  {fields.fullNameLabel}
                </label>
                <input
                  type="text"
                  placeholder={fields.fullNamePlaceholder}
                  autoComplete="name"
                  className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-1 transition border-white/15 bg-white/5 text-white placeholder:text-main-200/60 focus:border-copper-400 focus:ring-copper-400/70"
                  name="name"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] tracking-[0.18em] uppercase mb-1 text-main-100/70">
                  {fields.phoneLabel}
                </label>

                <div className="relative phone-iti" data-iti>
                  <input
                    type="tel"
                    placeholder={fields.phonePlaceholder}
                    autoComplete="tel"
                    className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-1 transition border-white/15 bg-white/5 text-white placeholder:text-main-200/60 focus:border-copper-400 focus:ring-copper-400/70"
                    id="phone-39euVyAtMuPJkz4hyGqX"
                  />
                </div>

                <input
                  type="hidden"
                  id="phone-39euVyAtMuPJkz4hyGqX_hidden"
                  name="phone"
                />
              </div>

              <div>
                <label className="block text-[10px] tracking-[0.18em] uppercase mb-1 text-main-100/70">
                  {fields.emailLabel}
                </label>
                <input
                  type="email"
                  placeholder={fields.emailPlaceholder}
                  autoComplete="email"
                  className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-1 transition border-white/15 bg-white/5 text-white placeholder:text-main-200/60 focus:border-copper-400 focus:ring-copper-400/70"
                  name="email"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-end gap-3">
              <div className="flex-1 -mb-[6.3px]">
                <label className="block text-[10px] tracking-[0.18em] uppercase mb-1 text-main-100/70">
                  {fields.messageLabel}
                </label>
                <textarea
                  rows={1}
                  placeholder={fields.messagePlaceholder}
                  className="w-full rounded-lg border outline-none focus:ring-1 transition rounded-xl px-3.5 py-2.5 text-[14px] resize-none mb-3 sm:mb-0 min-h-[4.2rem] sm:min-h-[1.6rem] border-white/15 bg-white/5 text-white placeholder:text-main-200/60 focus:border-copper-400 focus:ring-copper-400/70"
                  name="message"
                ></textarea>
              </div>

              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-copper-600 to-copper-500 text-white shadow-[0_10px_10px_rgba(0,0,0,0.09)] hover:from-copper-700 hover:to-copper-500 px-4 py-3 text-[11.5px] font-medium uppercase tracking-[0.13em] inline-flex items-center justify-center cursor-pointer transition-transform duration-200 ease-out disabled:opacity-60 disabled:pointer-events-none"
                disabled={isSubmitting}
              >
                {isSubmitting ? content.submittingText : content.submitText}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
