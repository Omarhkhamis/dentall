"use client";

import { useId, useMemo, useState } from "react";

import { stepFormDefaults } from "../../../../../../lib/sectionDefaults";
import { submitFormPayload } from "../../../../../../lib/formSubmit";

export default function StepFormSec({ data }) {
  const content = data || stepFormDefaults;
  const toothOptions = content.toothOptions || [];
  const genderOptions = content.genderOptions || [];
  const initialToothModel = toothOptions?.[0]?.key || null;
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState(null);
  const [toothModel, setToothModel] = useState(initialToothModel);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const phoneInputId = useId();
  const resolvedPhoneId = `analysis-phone-${phoneInputId}`;

  const progress = useMemo(() => {
    if (step === 1) return 0.28;
    if (step === 2) return 0.55;
    return 0.95;
  }, [step]);

  const selectedTooth = toothOptions.find(
    (option) => option.key === toothModel
  );

  const handleFinish = () => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("open-book-consultation"));
  };

  const handleGenderSelect = (value) => {
    setGender(value);
    setStep((prev) => Math.max(prev, 2));
  };

  const handleToothSelect = (value) => {
    setToothModel(value);
    setStep((prev) => Math.max(prev, 3));
  };

  const canGoNext =
    (step === 1 && Boolean(gender)) ||
    (step === 2 && Boolean(toothModel)) ||
    (step === 3 && Boolean(name.trim()) && Boolean(phone.trim()));

  const handleNext = async () => {
    if (!canGoNext || isSubmitting) return;
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setIsSubmitting(true);
    try {
      const hiddenPhoneInput = document.getElementById(
        `${resolvedPhoneId}_hidden`
      );
      const rawHiddenPhone = hiddenPhoneInput?.value ?? "";
      const payload = {
        source: "step-form",
        fullName: name.trim(),
        phone: (phone || rawHiddenPhone).trim(),
        gender: gender || "",
        toothModel,
        toothModelLabel: selectedTooth?.label || ""
      };
      await submitFormPayload(payload);
      handleFinish();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrev = () => setStep((prev) => Math.max(1, prev - 1));
  return (
    <section className="relative overflow-hidden bg-white  pt-16 pb-16  md:pt-30 md:pb-30 ">
      <div className="mx-auto ... lg:grid-cols-2 gap-12">
        <div className="grid p-5 -pt-10 sm:pt-0 sm:p-0 items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative overflow-hidden rounded-xl  bg-gradient-to-br from-white via-gray-50 to-gray-100">
              <img
                src={content.image}
                alt={content.imageAlt}
                className=" h-[460px] sm:h-[650px] w-full object-cover"
              />

              <div className="pointer-events-none absolute -left-24 top-16 h-px w-[140%] rotate-[-10deg] bg-gradient-to-r from-transparent via-copper-400/50 to-transparent"></div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative rounded-2xl p-[1px] overflow-visible shadow-[0_35px_120px_rgba(0,0,0,0.15)]">
              <div className="pointer-events-none absolute -inset-[1px] rounded-[18px] opacity-70 step-copper-shimmer animate-border-shimmer"></div>

              <div className="pointer-events-none absolute -inset-8 rounded-[34px] step-copper-glow blur-21xl"></div>

              <div className="relative z-10 rounded-2xl bg-white/95 backdrop-blur-xl p-6 sm:p-8 ring-1 ring-black/12 shadow-[0_28px_90px_rgba(0,0,0,0.20),0_1px_0_rgba(255,255,255,0.92)_inset]">
                <p className=" text-[12px]  mt-2 md:mt-0 -mb-1 md:-mb-3 md:text-[15px] font-medium  uppercase text-main-400">
                  {content.kicker}
                </p>

                <h3 className="mt-3.5 md:mt-7 text-4xl sm:text-3xl lg:text-4xl tracking-[0.05em] md:tracking-[0] font-extralight text-main-900 ">
                  {content.title}
                </h3>

                <div className=" mt-2 md:mt-6 h-[3px] w-full rounded-full bg-main-100">
                  <div
                    className="h-[3px] rounded-full bg-copper-500 transition-all duration-300"
                    style={{ width: `${progress * 100}%` }}
                  ></div>
                </div>

                <div className="mt-5 md:mt-6 flex items-center justify-between">
                  <div className="text-[12px] uppercase tracking-[0.22em] text-main-500">
                    {content.stepLabel} {step} / {content.totalSteps}
                    {step === 2 && selectedTooth ? (
                      <span className="ml-3 text-[10px] uppercase tracking-[0.18em] text-main-400">
                        {content.selectedLabel}{" "}
                        <strong className="text-copper-700 font-semibold">
                          {selectedTooth.label}
                        </strong>
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="mt-4 md:mt-7">
                  {step === 1 && (
                    <>
                      <p className="text-[15px] font-light text-main-700">
                        {content.steps?.step1Description}
                      </p>

                      <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        {genderOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            className={`group rounded-2xl border px-6 py-3 md:px-5 py-5 text-left transition focus:outline-none focus:ring-2 focus:ring-copper-400/40 ${
                              gender === option.value
                                ? "border-copper-400 bg-copper-50/40 shadow-[0_10px_26px_rgba(47,44,39,0.12)]"
                                : "border-main-200 bg-white hover:border-copper-300"
                            }`}
                            onClick={() => handleGenderSelect(option.value)}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-[10px] md:text-[12px] uppercase tracking-[0.22em] text-main-500">
                                  {option.helper}
                                </div>
                                <div className="mt-1  text-[17px] md:text-lg font-light text-main-900">
                                  {option.label}
                                </div>
                              </div>
                              <span className="inline-flex h-7 w-7 md:h-9 md:w-9 text-[12px] md:text-[14px] items-center justify-center rounded-full border border-main-200 bg-white text-main-400">
                                <i className={`fa-solid ${option.icon}`}></i>
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <p className="text-[15px] font-light text-main-700">
                        {content.steps?.step2Description}
                      </p>

                      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
                        {toothOptions.map((option) => (
                          <button
                            key={option.key}
                            type="button"
                            className={`group rounded-2xl border p-2 transition focus:outline-none focus:ring-2 focus:ring-copper-400/40 ${
                              toothModel === option.key
                                ? "border-copper-400 bg-copper-50/40 shadow-[0_10px_26px_rgba(47,44,39,0.12)]"
                                : "border-main-200 bg-white hover:border-copper-300"
                            }`}
                            onClick={() => handleToothSelect(option.key)}
                          >
                            <div className="overflow-hidden rounded-xl border border-main-200 bg-main-50">
                              <img
                                src={option.image}
                                alt={option.label}
                                className="h-20 w-full object-cover sm:h-24"
                                loading="lazy"
                              />
                            </div>
                            <span className="mt-2 block text-center text-[12px] font-light text-main-700">
                              {option.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <p className="text-[15px] font-light text-main-700">
                        {content.steps?.step3Description}
                      </p>

                      <div className="mt-6 space-y-4">
                        <div>
                          <label
                            className="mb-1 block text-[10px] uppercase tracking-[0.18em] text-main-500"
                            htmlFor="analysis-name"
                          >
                            {content.fields?.fullNameLabel}
                          </label>
                          <input
                            id="analysis-name"
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder={content.fields?.fullNamePlaceholder}
                            className="w-full rounded-lg border border-main-200 bg-white px-3 py-2.5 text-sm text-main-900 outline-none transition focus:border-copper-400 focus:ring-1 focus:ring-copper-400/40"
                          />
                        </div>

                        <div>
                          <label
                            className="mb-1 block text-[10px] uppercase tracking-[0.18em] text-main-500"
                            htmlFor="analysis-phone"
                          >
                            {content.fields?.phoneLabel}
                          </label>
                          <div className="relative phone-iti" data-iti>
                            <input
                              id={resolvedPhoneId}
                              type="tel"
                              value={phone}
                              onChange={(event) => setPhone(event.target.value)}
                              placeholder={content.fields?.phonePlaceholder}
                              className="w-full rounded-lg border border-main-200 bg-white px-3 py-2.5 text-sm text-main-900 outline-none transition focus:border-copper-400 focus:ring-1 focus:ring-copper-400/40"
                            />
                          </div>
                          <input
                            type="hidden"
                            id={`${resolvedPhoneId}_hidden`}
                            name="phone"
                          />
                        </div>
                      </div>

                      <div className="mt-4 inline-flex items-center gap-2 text-[12px] text-main-500">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-main-200 bg-white text-copper-600">
                          <i className="fa-solid fa-lock text-[11px]"></i>
                        </span>
                        {content.steps?.privacyNote}
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-10 flex items-center justify-between gap-4 border-t border-main-200/70 pt-6">
                  <button
                    type="button"
                    className={`inline-flex items-center gap-2 rounded-xl cursor-pointer border px-6 py-3 text-[12px] uppercase tracking-[0.22em] transition border-main-200 text-main-700 ${
                      step === 1
                        ? "opacity-40 pointer-events-none"
                        : "hover:border-main-300 hover:bg-white"
                    }`}
                    onClick={handlePrev}
                  >
                    <span className="text-copper-600">←</span> {content.prevLabel}
                  </button>

                  <button
                    type="button"
                    className="rounded-xl bg-gradient-to-r from-copper-700 via-copper-600 to-copper-500 font-normal uppercase text-white shadow-[0_10px_30px_rgba(0,0,0,0.16)] hover:from-copper-800 hover:via-copper-700 hover:to-copper-500 hover:shadow-[0_12px_36px_rgba(0,0,0,0.18)] active:scale-[0.97] !py-2  sm:!py-2 !px-3 sm:!px-4 !text-[11px] sm:!text-[12px] !tracking-[0.01em] sm:!tracking-[0.20em] inline-flex items-center justify-center cursor-pointer transition-transform duration-200 ease-out disabled:opacity-60 disabled:pointer-events-none pr-5 pl-6"
                    onClick={handleNext}
                    disabled={!canGoNext || isSubmitting}
                  >
                    {step === 3 ? content.submitLabel : content.nextLabel}
                    <span className="text-white/90 pl-1"> →</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes border-shimmer {
            0%   { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }

          .step-copper-shimmer{
            background-image: linear-gradient(
              110deg,
              color-mix(in srgb, var(--color-copper-700) 0%, transparent) 0%,
              color-mix(in srgb, var(--color-copper-500) 82%, transparent) 16%,
              color-mix(in srgb, var(--color-copper-400) 70%, transparent) 32%,
              color-mix(in srgb, var(--color-copper-300) 38%, transparent) 48%,
              color-mix(in srgb, var(--color-copper-200) 18%, transparent) 62%,
              color-mix(in srgb, var(--color-copper-500) 0%, transparent) 78%
            );

            background-size: 220% 220%;
            animation: border-shimmer 4.6s linear infinite alternate;
          }
        `}</style>
      </div>
    </section>
  );
}
