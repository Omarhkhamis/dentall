"use client";

import { useId, useMemo, useState } from "react";

import { heroDefaults } from "../../../../../lib/sectionDefaults";
import { buildFormPayload, submitFormPayload } from "../../../../../lib/formSubmit";

export default function ConsultationFormCard({ form, idPrefix, className }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fallbackForm = heroDefaults.form;
  const resolvedForm = form || fallbackForm;
  const fields = resolvedForm.fields || fallbackForm.fields;
  const baseId = useId();
  const phoneInputId = useMemo(
    () => `${idPrefix || "consultation"}-${baseId}`,
    [baseId, idPrefix]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const payload = buildFormPayload(event.currentTarget, "consultation-card");
      await submitFormPayload(payload);
      event.currentTarget.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={className}>
      <div className="w-full rounded-3xl bg-gradient-to-br from-copper-500/40 via-main-800/70 to-copper-700/20 p-[1px] shadow-[0_18px_60px_rgba(0,0,0,0.55)]">
        <div className="rounded-[22px] bg-main-950/80 backdrop-blur-xl border border-white/10 px-7 py-8">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5 pointer-events-none relative z-0">
              <p className="text-[11px] tracking-[0.20em] uppercase font-medium text-main-100/70">
                {resolvedForm.kicker}
              </p>

              <h2 className="text-[24px] sm:text-[25px] capitalize font-light leading-snug tracking-[0.01em] text-white">
                {resolvedForm.title}
              </h2>

              <p className="text-[15px] font-light leading-relaxed text-main-100/70">
                {resolvedForm.description}
              </p>
            </div>

            <input
              type="text"
              placeholder=""
              autoComplete="off"
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-1 transition hidden"
              tabIndex={-1}
              aria-hidden="true"
              name="company"
            />

            <div className="space-y-1.5">
              <label className="block text-[10px] font-medium tracking-[0.15em] uppercase text-main-100/70">
                {fields.fullNameLabel}
              </label>

                <input
                  type="text"
                  placeholder={fields.fullNamePlaceholder}
                  autoComplete="name"
                  name="fullName"
                  className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-1 transition rounded-xl px-3.5 py-2.5 text-[14px] border-white/10 bg-main-900/60 text-white placeholder:text-main-300/60 focus:border-copper-400 focus:ring-copper-400/60"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-medium tracking-[0.15em] uppercase text-main-100/70">
                  {fields.phoneLabel}
                </label>

                <div className="relative phone-iti" data-iti>
                  <input
                    type="tel"
                    placeholder={fields.phonePlaceholder}
                    autoComplete="tel"
                    className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-1 transition border-white/10 bg-main-900/60 text-white placeholder:text-main-300/60 focus:border-copper-400 focus:ring-copper-400/60"
                    id={phoneInputId}
                  />
                </div>

                <input
                  type="hidden"
                  id={`${phoneInputId}_hidden`}
                  name="phone"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-medium tracking-[0.15em] uppercase text-main-100/70">
                  {fields.emailLabel}
                </label>

                <input
                  type="email"
                  placeholder={fields.emailPlaceholder}
                  autoComplete="email"
                  name="email"
                  className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-1 transition rounded-xl px-3.5 py-2.5 text-[14px] border-white/10 bg-main-900/60 text-white placeholder:text-main-300/60 focus:border-copper-400 focus:ring-copper-400/60"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-medium tracking-[0.15em] uppercase text-main-100/70">
                {fields.messageLabel}
              </label>

              <textarea
                rows={3}
                placeholder={fields.messagePlaceholder}
                name="message"
                className="w-full rounded-lg border outline-none focus:ring-1 transition rounded-xl px-3.5 py-2.5 text-[14px] resize-none border-white/10 bg-main-900/60 text-white placeholder:text-main-300/60 focus:border-copper-400 focus:ring-copper-400/60"
              ></textarea>
            </div>

            <div className="grid">
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-copper-600 to-copper-500 text-white shadow-[0_10px_10px_rgba(0,0,0,0.09)] hover:from-copper-700 hover:to-copper-500 px-4 py-3 text-[11.5px] font-medium uppercase tracking-[0.13em] inline-flex items-center justify-center cursor-pointer transition-transform duration-200 ease-out disabled:opacity-60 disabled:pointer-events-none"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? resolvedForm.submittingText
                  : resolvedForm.submitText}
              </button>

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
                    className="fa-solid ml-1 relative z-10 text-emerald-600 text-[13px]"
                    style={{
                      animation: "soft-pop 2.6s ease-in-out infinite"
                    }}
                  ></i>
                </span>

                {resolvedForm.privacyNote}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
