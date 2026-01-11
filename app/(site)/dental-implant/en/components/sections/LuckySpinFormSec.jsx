"use client";

import { useId, useMemo, useState } from "react";

import { luckySpinDefaults } from "../../../../../../lib/sectionDefaults";
import { submitFormPayload } from "../../../../../../lib/formSubmit";

const wheelSvgTemplate = `
<svg viewBox="0 0 1000 1000" class="absolute inset-0" aria-hidden="true">
  <defs>
    <filter id="innerShadow">
      <feOffset dx="0" dy="2"/>
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feComposite in="blur" in2="SourceAlpha" operator="out" result="shadow"/>
      <feColorMatrix
        in="shadow"
        type="matrix"
        values="0 0 0 0 0
                0 0 0 0 0
                0 0 0 0 0
                0 0 0 .25 0"/>
      <feComposite in2="SourceGraphic" operator="over"/>
    </filter>

    <filter id="dropShadowBottom" x="-20%" y="-20%" width="140%" height="160%">
      <feOffset dx="0" dy="14"/>
      <feGaussianBlur stdDeviation="18"/>
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 0
                0 0 0 0 0
                0 0 0 0 0
                0 0 0 .18 0"/>
    </filter>

    <radialGradient id="sliceGrad-0" cx="50%" cy="50%" r="90%" fx="50%" fy="50%">
      <stop offset="0%" stop-color="var(--color-copper-500)"/>
      <stop offset="100%" stop-color="var(--color-copper-800)"/>
    </radialGradient>
    <radialGradient id="sliceGrad-1" cx="50%" cy="50%" r="90%" fx="50%" fy="50%">
      <stop offset="0%" stop-color="var(--color-copper-600)"/>
      <stop offset="100%" stop-color="var(--color-copper-800)"/>
    </radialGradient>
    <radialGradient id="sliceGrad-2" cx="50%" cy="50%" r="90%" fx="50%" fy="50%">
      <stop offset="0%" stop-color="var(--color-copper-500)"/>
      <stop offset="100%" stop-color="var(--color-copper-800)"/>
    </radialGradient>
    <radialGradient id="sliceGrad-3" cx="50%" cy="50%" r="90%" fx="50%" fy="50%">
      <stop offset="0%" stop-color="var(--color-copper-600)"/>
      <stop offset="100%" stop-color="var(--color-copper-800)"/>
    </radialGradient>
    <radialGradient id="sliceGrad-4" cx="50%" cy="50%" r="90%" fx="50%" fy="50%">
      <stop offset="0%" stop-color="var(--color-copper-500)"/>
      <stop offset="100%" stop-color="var(--color-copper-800)"/>
    </radialGradient>
    <radialGradient id="sliceGrad-5" cx="50%" cy="50%" r="90%" fx="50%" fy="50%">
      <stop offset="0%" stop-color="var(--color-copper-600)"/>
      <stop offset="100%" stop-color="var(--color-copper-800)"/>
    </radialGradient>
    <radialGradient id="sliceGrad-6" cx="50%" cy="50%" r="90%" fx="50%" fy="50%">
      <stop offset="0%" stop-color="var(--color-copper-500)"/>
      <stop offset="100%" stop-color="var(--color-copper-800)"/>
    </radialGradient>
    <radialGradient id="sliceGrad-7" cx="50%" cy="50%" r="90%" fx="50%" fy="50%">
      <stop offset="0%" stop-color="var(--color-copper-600)"/>
      <stop offset="100%" stop-color="var(--color-copper-800)"/>
    </radialGradient>
  </defs>

  <circle cx="500" cy="500" r="440" fill="none" stroke="#ffffff" stroke-width="20" filter="url(#dropShadowBottom)" />
  <circle cx="500" cy="500" r="460" fill="none" stroke="#ffffff" stroke-width="20" filter="url(#innerShadow)" />

  <circle cx="500" cy="40" r="5" fill="#000000"/>
  <circle cx="657.32926592981" cy="67.741394438482" r="5" fill="#000000"/>
  <circle cx="795.68230045581" cy="147.61955616527" r="5" fill="#000000"/>
  <circle cx="898.37168574084" cy="270" r="5" fill="#000000"/>
  <circle cx="953.01156638562" cy="420.12183827321" r="5" fill="#000000"/>
  <circle cx="953.01156638562" cy="579.87816172679" r="5" fill="#000000"/>
  <circle cx="898.37168574084" cy="730" r="5" fill="#000000"/>
  <circle cx="795.68230045581" cy="852.38044383473" r="5" fill="#000000"/>
  <circle cx="657.32926592981" cy="932.25860556152" r="5" fill="#000000"/>
  <circle cx="500" cy="960" r="5" fill="#000000"/>
  <circle cx="342.67073407019" cy="932.25860556152" r="5" fill="#000000"/>
  <circle cx="204.31769954419" cy="852.38044383473" r="5" fill="#000000"/>
  <circle cx="101.62831425916" cy="730" r="5" fill="#000000"/>
  <circle cx="46.988433614384" cy="579.87816172679" r="5" fill="#000000"/>
  <circle cx="46.988433614384" cy="420.12183827321" r="5" fill="#000000"/>
  <circle cx="101.62831425916" cy="270" r="5" fill="#000000"/>
  <circle cx="204.31769954419" cy="147.61955616527" r="5" fill="#000000"/>
  <circle cx="342.67073407019" cy="67.741394438482" r="5" fill="#000000"/>

  <g id="wheelGroup" style="transform-origin: 500px 500px;">
    <g id="wheelSlices" filter="url(#innerShadow)">
      <path d="M 500 500 L 500 50 A 450 450 0 0 1 818.19805153395 181.80194846605 Z" fill="url(#sliceGrad-0)"></path>
      <path d="M 500 500 L 500 50 A 450 450 0 0 1 818.19805153395 181.80194846605 Z" fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="2"></path>
      <text x="618.63186403318" y="213.5973449215" fill="rgba(255,255,255,0.96)" font-size="30" font-weight="700" text-anchor="middle" dominant-baseline="middle" transform="rotate(-67.5 618.63186403318 213.5973449215)" class=" text-[28px] lg:text-[23px] " style="letter-spacing:0.2px; paint-order:stroke; stroke:rgba(0,0,0,0.18); stroke-width:2px;">{{prize0}}</text>

      <path d="M 500 500 L 818.19805153395 181.80194846605 A 450 450 0 0 1 950 500 Z" fill="url(#sliceGrad-1)"></path>
      <path d="M 500 500 L 818.19805153395 181.80194846605 A 450 450 0 0 1 950 500 Z" fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="2"></path>
      <text x="786.4026550785" y="381.36813596682" fill="rgba(255,255,255,0.96)" font-size="30" font-weight="700" text-anchor="middle" dominant-baseline="middle" transform="rotate(-22.5 786.4026550785 381.36813596682)" class=" text-[28px] lg:text-[23px] " style="letter-spacing:0.2px; paint-order:stroke; stroke:rgba(0,0,0,0.18); stroke-width:2px;">{{prize1}}</text>

      <path d="M 500 500 L 950 500 A 450 450 0 0 1 818.19805153395 818.19805153395 Z" fill="url(#sliceGrad-2)"></path>
      <path d="M 500 500 L 950 500 A 450 450 0 0 1 818.19805153395 818.19805153395 Z" fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="2"></path>
      <text x="786.4026550785" y="618.63186403318" fill="rgba(255,255,255,0.96)" font-size="30" font-weight="700" text-anchor="middle" dominant-baseline="middle" transform="rotate(22.5 786.4026550785 618.63186403318)" class=" text-[28px] lg:text-[23px] " style="letter-spacing:0.2px; paint-order:stroke; stroke:rgba(0,0,0,0.18); stroke-width:2px;">{{prize2}}</text>

      <path d="M 500 500 L 818.19805153395 818.19805153395 A 450 450 0 0 1 500 950 Z" fill="url(#sliceGrad-3)"></path>
      <path d="M 500 500 L 818.19805153395 818.19805153395 A 450 450 0 0 1 500 950 Z" fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="2"></path>
      <text x="618.63186403318" y="786.4026550785" fill="rgba(255,255,255,0.96)" font-size="30" font-weight="700" text-anchor="middle" dominant-baseline="middle" transform="rotate(67.5 618.63186403318 786.4026550785)" class=" text-[28px] lg:text-[23px] " style="letter-spacing:0.2px; paint-order:stroke; stroke:rgba(0,0,0,0.18); stroke-width:2px;">{{prize3}}</text>

      <path d="M 500 500 L 500 950 A 450 450 0 0 1 181.80194846605 818.19805153395 Z" fill="url(#sliceGrad-4)"></path>
      <path d="M 500 500 L 500 950 A 450 450 0 0 1 181.80194846605 818.19805153395 Z" fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="2"></path>
      <text x="381.36813596682" y="786.4026550785" fill="rgba(255,255,255,0.96)" font-size="30" font-weight="700" text-anchor="middle" dominant-baseline="middle" transform="rotate(292.5 381.36813596682 786.4026550785)" class=" text-[28px] lg:text-[23px] " style="letter-spacing:0.2px; paint-order:stroke; stroke:rgba(0,0,0,0.18); stroke-width:2px;">{{prize4}}</text>

      <path d="M 500 500 L 181.80194846605 818.19805153395 A 450 450 0 0 1 50 500 Z" fill="url(#sliceGrad-5)"></path>
      <path d="M 500 500 L 181.80194846605 818.19805153395 A 450 450 0 0 1 50 500 Z" fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="2"></path>
      <text x="213.5973449215" y="618.63186403318" fill="rgba(255,255,255,0.96)" font-size="30" font-weight="700" text-anchor="middle" dominant-baseline="middle" transform="rotate(337.5 213.5973449215 618.63186403318)" class=" text-[28px] lg:text-[23px] " style="letter-spacing:0.2px; paint-order:stroke; stroke:rgba(0,0,0,0.18); stroke-width:2px;">{{prize5}}</text>

      <path d="M 500 500 L 50 500 A 450 450 0 0 1 181.80194846605 181.80194846605 Z" fill="url(#sliceGrad-6)"></path>
      <path d="M 500 500 L 50 500 A 450 450 0 0 1 181.80194846605 181.80194846605 Z" fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="2"></path>
      <text x="213.5973449215" y="381.36813596682" fill="rgba(255,255,255,0.96)" font-size="30" font-weight="700" text-anchor="middle" dominant-baseline="middle" transform="rotate(382.5 213.5973449215 381.36813596682)" class=" text-[28px] lg:text-[23px] " style="letter-spacing:0.2px; paint-order:stroke; stroke:rgba(0,0,0,0.18); stroke-width:2px;">{{prize6}}</text>

      <path d="M 500 500 L 181.80194846605 181.80194846605 A 450 450 0 0 1 500 50 Z" fill="url(#sliceGrad-7)"></path>
      <path d="M 500 500 L 181.80194846605 181.80194846605 A 450 450 0 0 1 500 50 Z" fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="2"></path>
      <text x="381.36813596682" y="213.5973449215" fill="rgba(255,255,255,0.96)" font-size="30" font-weight="700" text-anchor="middle" dominant-baseline="middle" transform="rotate(427.5 381.36813596682 213.5973449215)" class=" text-[28px] lg:text-[23px] " style="letter-spacing:0.2px; paint-order:stroke; stroke:rgba(0,0,0,0.18); stroke-width:2px;">{{prize7}}</text>
    </g>
  </g>

  <circle cx="500" cy="500" r="32" fill="#ffffff" />
  <circle cx="500" cy="500" r="22" fill="#b87333" />
</svg>
`;

const buildWheelSvg = (prefix, labels) => {
  const safePrefix = prefix ? `${prefix}-` : "";
  const safeSuffix = prefix ? `-${prefix}` : "";
  let svg = wheelSvgTemplate;

  const replaceId = (id) => {
    const prefixed = `${safePrefix}${id}`;
    svg = svg.replaceAll(`id="${id}"`, `id="${prefixed}"`);
    svg = svg.replaceAll(`url(#${id})`, `url(#${prefixed})`);
  };

  replaceId("innerShadow");
  replaceId("dropShadowBottom");
  for (let i = 0; i < 8; i += 1) {
    replaceId(`sliceGrad-${i}`);
  }

  svg = svg.replaceAll('id="wheelGroup"', `id="wheelGroup${safeSuffix}"`);
  svg = svg.replaceAll('id="wheelSlices"', `id="wheelSlices${safeSuffix}"`);

  labels.forEach((label, index) => {
    svg = svg.replaceAll(`{{prize${index}}}`, label);
  });

  return svg;
};

export default function LuckySpinFormSec({ data, idPrefix } = {}) {
  const content = data || luckySpinDefaults;
  const prizes = content.prizes || [];
  const reactId = useId();
  const baseId = idPrefix && idPrefix.trim().length ? idPrefix : reactId;
  const safeId = baseId.replace(/[^a-zA-Z0-9_-]/g, "") || "spin";
  const phoneId = `phone-${safeId}`;
  const wheelPinId = `wheelPin-${safeId}`;
  const luckyPinAnimId = `luckyPinAnim-${safeId}`;
  const copperGradId = `${safeId}-copperGrad`;
  const pinHeadClipId = `${safeId}-pinHeadClip`;
  const pinTailClipId = `${safeId}-pinTailClip`;
  const pinTailId = `pinTail-${safeId}`;
  const wheelSvgMarkup = useMemo(
    () => buildWheelSvg(safeId, prizes),
    [safeId, prizes]
  );

  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitSpin = async (payload, options = {}) => {
    setIsSubmitting(true);
    setFormError("");
    try {
      await submitFormPayload({
        ...payload,
        source: "lucky-spin",
        page: typeof window !== "undefined" ? window.location.pathname : ""
      }, options);
    } catch (error) {
      setFormError("Please try again. We could not save your spin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSpin = () => {
    if (isSpinning) return;
    const hiddenPhoneInput = document.getElementById(`${phoneId}_hidden`);
    const rawHiddenPhone = hiddenPhoneInput?.value ?? "";
    const trimmedName = fullName.trim();
    const trimmedPhone = (phone || rawHiddenPhone).trim();
    if (!trimmedName || !trimmedPhone) {
      setFormError("Please enter your name and phone number.");
      return;
    }
    const slices = prizes.length;
    if (!slices) return;
    const sliceAngle = 360 / slices;
    const index = Math.floor(Math.random() * slices);
    const spins = 5;
    const centerAngle = index * sliceAngle + sliceAngle / 2;
    const normalizedRotation = ((rotation % 360) + 360) % 360;
    const targetOffset = (360 - centerAngle - normalizedRotation + 360) % 360;
    const target = rotation + spins * 360 + targetOffset;

    const chosenPrize = prizes[index];

    setSelectedPrize("");
    setFormError("");
    setIsSpinning(true);
    setRotation(target);
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedPrize(chosenPrize);
      (async () => {
        try {
          await submitSpin({
            fullName: trimmedName,
            phone: trimmedPhone,
            prize: chosenPrize
          }, { skipRedirect: true });
        } finally {
          const { default: Swal } = await import("sweetalert2");
          const result = await Swal.fire({
            title: "You get",
            text: chosenPrize,
            confirmButtonText: "OK",
            allowOutsideClick: false
          });
          if (result?.isConfirmed) {
            window.location.assign("/thankyou");
          }
        }
      })();
    }, 3200);
  };

  const wheelStyle = useMemo(
    () => ({
      transform: `rotate(${rotation}deg)`,
      transformOrigin: "50% 50%",
      transition: isSpinning
        ? "transform 3.2s cubic-bezier(0.22, 1, 0.36, 1)"
        : "none"
    }),
    [rotation, isSpinning]
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-100 py-16 lg:py-24">
      <div className="pointer-events-none absolute -left-40 top-20 h-px w-[120%] rotate-[-8deg] bg-gradient-to-r from-transparent via-copper-400/45 to-transparent"></div>
      <div className="pointer-events-none absolute -left-40 bottom-24 h-px w-[120%] rotate-[6deg] bg-gradient-to-r from-transparent via-copper-400/25 to-transparent"></div>

      <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-copper-400/10 blur-3xl"></div>
      <div className="pointer-events-none absolute -bottom-40 -right-32 h-[520px] w-[520px] rounded-full bg-main-900/5 blur-3xl"></div>

      <img
        src={content.backgroundImage}
        style={{ filter: "brightness(0.65)" }}
        alt={content.backgroundAlt}
        className="pointer-events-none absolute bottom-0 right-0 w-[520px] max-w-none opacity-90 translate-y-10 md:translate-y-16 lg:w-[680px]"
      />

      <div className="relative z-10 mx-auto max-w-screen-2xl px-6 lg:px-10">
        <div className="mb-8 flex items-center gap-3">
          <span className="h-px w-10 bg-gradient-to-r from-transparent via-copper-400/70 to-transparent"></span>
          <span className="text-[11px] uppercase tracking-[0.26em] text-main-500">
            {content.kicker}
          </span>
        </div>

        <div
          className="w-full"
          data-lucky-spin
          data-instance-id={safeId}
          data-slice-count={prizes.length}
          data-spinning={isSpinning ? "1" : "0"}
        >
          <div className="relative rounded-2xl  overflow-visible ">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-6 flex items-center justify-center">
                <div className="relative w-[370px] h-[370px] md:w-[520px] md:h-[520px]">
                  <div
                    id={wheelPinId}
                    className="absolute left-1/2 -top-[18px] z-50 -translate-x-1/2"
                    style={{ willChange: "transform" }}
                  >
                    <div
                      id={luckyPinAnimId}
                      style={{
                        width: "56px",
                        height: "56px",
                        display: "inline-block",
                        willChange: "transform"
                      }}
                    >
                      <svg
                        viewBox="0 0 80 115"
                        className="h-[36px] w-[36px] translate-x-[30%] translate-y-[20%] md:translate-y-[0%] md:translate-x-[0%]  lg:h-[56px] lg:w-[56px]"
                        style={{ display: "block" }}
                        aria-hidden="true"
                      >
                        <defs>
                          <linearGradient
                            id={copperGradId}
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#e1a25f" />
                            <stop offset="45%" stopColor="#d97c21" />
                            <stop offset="100%" stopColor="#8a4f1d" />
                          </linearGradient>

                          <clipPath id={pinHeadClipId}>
                            <rect x="0" y="0" width="80" height="62" />
                          </clipPath>

                          <clipPath id={pinTailClipId}>
                            <rect x="0" y="56" width="80" height="59" />
                          </clipPath>
                        </defs>

                        <g clipPath={`url(#${pinHeadClipId})`}>
                          <path
                            fill={`url(#${copperGradId})`}
                            d="M40,0C17.9,0,0,17.7,0,39.4S40,115,40,115s40-53.9,40-75.6S62.1,0,40,0z
                               M40,52.5c-7,0-12.6-5.6-12.6-12.4S33,27.7,40,27.7s12.6,5.6,12.6,12.4C52.6,46.9,47,52.5,40,52.5z"
                          />
                          <path
                            fill="rgba(0,0,0,0.18)"
                            d="M40,20.5c-10.6,0-19.2,8.5-19.2,19s8.6,19,19.2,19s19.2-8.5,19.2-19S50.6,20.5,40,20.5z
                               M40,52.5c-7,0-12.6-5.6-12.6-12.4S33,27.7,40,27.7s12.6,5.6,12.6,12.4C52.6,46.9,47,52.5,40,52.5z"
                          />
                        </g>

                        <g
                          id={pinTailId}
                          clipPath={`url(#${pinTailClipId})`}
                          style={{
                            transformBox: "fill-box",
                            transformOrigin: "40px 58px",
                            willChange: "transform"
                          }}
                        >
                          <path
                            fill={`url(#${copperGradId})`}
                            d="M40,0C17.9,0,0,17.7,0,39.4S40,115,40,115s40-53.9,40-75.6S62.1,0,40,0z
                               M40,52.5c-7,0-12.6-5.6-12.6-12.4S33,27.7,40,27.7s12.6,5.6,12.6,12.4C52.6,46.9,47,52.5,40,52.5z"
                          />
                          <path
                            fill="rgba(0,0,0,0.18)"
                            d="M40,20.5c-10.6,0-19.2,8.5-19.2,19s8.6,19,19.2,19s19.2-8.5,19.2-19S50.6,20.5,40,20.5z
                               M40,52.5c-7,0-12.6-5.6-12.6-12.4S33,27.7,40,27.7s12.6,5.6,12.6,12.4C52.6,46.9,47,52.5,40,52.5z"
                          />
                        </g>
                      </svg>
                    </div>
                  </div>

                  <div
                    className="absolute inset-0"
                    style={wheelStyle}
                    dangerouslySetInnerHTML={{ __html: wheelSvgMarkup }}
                  />
                </div>
              </div>

              <div className="lg:col-span-6 lg:mt-2 md:-mt-5 ">
                <div>
                  <p className=" -mt-6 lg:mt-0 text-[9px] lg:text-[12px] uppercase tracking-[0.22em] text-main-500">
                    {content.tagline}
                  </p>

                  <h3 className=" mt-1 lg:mt-3 text-2xl lg:text-3xl mb-3 sm:text-4xl font-extralight text-main-900 tracking-[0.02em]">
                    {content.title}
                    <span className="relative inline-block">
                      <span className="absolute left-0 right-0 -bottom-1 h-[1px] bg-copper-500/80 rounded-full"></span>
                    </span>
                  </h3>
                  <p className=" text-[13px] font-light  text-main-500">
                    {content.description}
                  </p>

                  <div className="mt-6 grid gap-5">
                    <div>
                      <label className="mb-1.5 block text-[10px] tracking-[0.15em] uppercase text-main-500">
                        {content.form?.fields?.fullNameLabel}
                      </label>

                      <input
                        type="text"
                        placeholder={content.form?.fields?.fullNamePlaceholder}
                        autoComplete="name"
                        onChange={(event) => setFullName(event.target.value)}
                        className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-1 transition rounded-xl px-2.5 py-1.5 lg:px-3.5 lg:py-2.5 text-[14px] border-gray-200 bg-white text-main-900 placeholder:text-gray-400 focus:border-copper-500 focus:ring-copper-500/20"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-[11px] tracking-[0.24em] uppercase text-main-500">
                        {content.form?.fields?.phoneLabel}
                      </label>

                      <div className="relative phone-iti" data-iti>
                        <input
                          type="tel"
                          placeholder={content.form?.fields?.phonePlaceholder}
                          autoComplete="tel"
                          onChange={(event) => setPhone(event.target.value)}
                          className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-1 transition border-gray-200 bg-white text-main-900 placeholder:text-gray-400 focus:border-copper-500 focus:ring-copper-500/20  rounded-xl px-2.5 py-1.5 lg:px-3.5 lg:py-2.5 text-[14px] w-full"
                          id={phoneId}
                        />
                      </div>

                      <input
                        type="hidden"
                        id={`${phoneId}_hidden`}
                        name="phone"
                        value={phone}
                      />
                    </div>

                    <div className="hidden mt-2.5 lg:flex items-center gap-2 text-[12px] text-main-500">
                      <i className="fa-solid fa-lock text-emerald-600 text-[13px]"></i>
                      {content.form?.privacyNote}
                    </div>
                  </div>

                  <div className="mt-0  pt-6 flex justify-start">
                    <button
                      type="button"
                      className="rounded-xl bg-gradient-to-r from-copper-600 to-copper-500 text-white shadow-[0_10px_10px_rgba(0,0,0,0.09)] hover:from-copper-700 hover:to-copper-500 px-4 py-3 text-[11.5px] font-medium uppercase tracking-[0.13em] inline-flex items-center justify-center cursor-pointer transition-transform duration-200 ease-out disabled:opacity-60 disabled:pointer-events-none pr-5 pl-6"
                      onClick={handleSpin}
                      disabled={isSpinning || isSubmitting}
                    >
                      {isSpinning
                        ? content.spinLoadingLabel
                        : content.spinLabel}
                      <span className="text-white/90">{isSpinning ? "" : " →"}</span>
                    </button>
                  </div>

                  <input type="hidden" name="spinPrize" value={selectedPrize} />
                  {formError ? (
                    <p className="mt-2 text-[12px] text-red-600">{formError}</p>
                  ) : null}
                  <p className="mt-3 text-[12px] text-main-500">
                    {selectedPrize ? (
                      <>
                        <strong className="font-semibold text-main-800">
                          {content.resultLabel}
                        </strong>{" "}
                        {selectedPrize}
                      </>
                    ) : (
                      content.resultPlaceholder
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
