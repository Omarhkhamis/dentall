"use client";

import { useEffect, useRef, useState } from "react";

import { googleReviewsDefaults } from "../../../../../../lib/sectionDefaults";

export default function GoogleReviews({ data }) {
  const content = data || googleReviewsDefaults;
  const reviews = content.items || [];
  const trackRef = useRef(null);
  const stateRef = useRef({
    x: 0,
    startX: 0,
    startTranslate: 0,
    dragging: false,
    duration: 50,
    shiftPx: 0
  });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!trackRef.current) return;
    stateRef.current.shiftPx = trackRef.current.scrollWidth / 2;
  }, []);

  const setX = (value) => {
    const state = stateRef.current;
    if (!trackRef.current) return;
    let next = value;
    if (state.shiftPx > 0) {
      while (next <= -state.shiftPx) next += state.shiftPx;
      while (next > 0) next -= state.shiftPx;
    }
    state.x = next;
    trackRef.current.style.transform = `translate3d(${next}px,0,0)`;
  };

  const handlePointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const state = stateRef.current;
    if (!trackRef.current) return;

    state.dragging = true;
    setIsDragging(true);

    const computed = getComputedStyle(trackRef.current).transform;
    if (computed && computed !== "none") {
      const match = computed.match(/matrix.*\((.+)\)/);
      state.x = match ? parseFloat(match[1].split(",")[4]) : state.x;
    }

    trackRef.current.style.animation = "none";
    setX(state.x);

    state.startX = event.clientX;
    state.startTranslate = state.x;
    trackRef.current.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const state = stateRef.current;
    if (!state.dragging) return;
    setX(state.startTranslate + (event.clientX - state.startX));
  };

  const handlePointerUp = () => {
    const state = stateRef.current;
    if (!state.dragging || !trackRef.current) return;
    state.dragging = false;
    setIsDragging(false);

    const progress = state.shiftPx > 0 ? -state.x / state.shiftPx : 0;
    const delay = -(progress * state.duration);

    trackRef.current.style.transform = "";
    trackRef.current.style.animation = `marquee-left ${state.duration}s linear infinite`;
    trackRef.current.style.animationDelay = `${delay}s`;
  };

  const getInitials = (name, fallback) => {
    if (fallback && typeof fallback === "string" && fallback.trim()) {
      return fallback.trim();
    }
    if (!name || typeof name !== "string") return "";
    const trimmed = name.trim();
    return trimmed ? trimmed[0].toUpperCase() : "";
  };

  const marqueeItems = [...reviews, ...reviews];

  return (
    <section id="google-reviews" className="relative overflow-hidden bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-10">
        <div className="flex flex-col pt-15 gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[12px] tracking-[0.28em] uppercase text-main-400">
              {content.kicker}
            </p>
            <h2 className="mt-2 text-4xl sm:text-3xl leading-[1.3] lg:text-4xl font-extralight text-main-900 tracking-tight">
              {content.title}
            </h2>
            <p className="mt-3 text-sm sm:text-[15px] font-light text-main-600">
              {content.description}
            </p>
          </div>

          <div className="w-fit sm:w-auto inline-flex items-center justify-between sm:justify-start gap-3 rounded-full border border-main-200/70 bg-white/70 backdrop-blur px-4 py-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white shrink-0">
              <svg viewBox="0 0 48 48" className="h-5 w-5">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.236 32.659 29.02 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.957 3.043l5.657-5.657C34.047 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 16.108 18.961 12 24 12c3.059 0 5.842 1.154 7.957 3.043l5.657-5.657C34.047 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.197l-6.191-5.238C29.236 35.091 26.747 36 24 36c-4.999 0-9.205-3.324-10.685-7.955l-6.522 5.025C9.993 39.556 16.457 44 24 44z"/>
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.07 12.07 0 0 1-4.085 5.565l.003-.002 6.191 5.238C36.971 40.205 44 36 44 24c0-1.341-.138-2.65-.389-3.917z"/>
              </svg>
            </span>

            <div className="flex items-center gap-2 min-w-0">
              <div className="flex items-center gap-1 shrink-0">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg
                    key={`star-${index}`}
                    viewBox="0 0 24 24"
                    className={`h-4 w-4 fill-current ${
                      index === 0
                        ? "text-copper-100"
                        : index === 1
                        ? "text-copper-200"
                        : index === 2
                        ? "text-copper-300"
                        : index === 3
                        ? "text-copper-400"
                        : "text-copper-600"
                    }`}
                  >
                    <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
              </div>

              <span className="text-sm font-medium text-main-800 shrink-0">{content.rating}</span>
              <span className="text-xs text-main-500 shrink-0">•</span>
              <span className="text-xs text-main-500 truncate">{content.ratingCountLabel}</span>
            </div>
          </div>
        </div>

        <div className="relative mt-10 marquee">
          <div className="pointer-events-none md:block absolute inset-y-0 left-0 w-14 sm:w-30 bg-gradient-to-r from-white via-white/90 to-transparent z-10"></div>
          <div className="pointer-events-none md:block absolute inset-y-0 right-0 w-14 sm:w-30 bg-gradient-to-l from-white via-white/90 to-transparent z-10"></div>

          <div
            ref={trackRef}
            className={`marquee__track${isDragging ? " is-dragging" : ""}`}
            style={{
              "--marquee-duration": "50s",
              "--marquee-duration-mobile": "35s"
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {marqueeItems.map((review, index) => (
              <article
                key={`${review.name}-${index}`}
                className="review-card w-[320px] sm:w-[360px] rounded-3xl border border-main-200/70 bg-white/55 backdrop-blur-md px-6 py-6"
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 shrink-0 rounded-full bg-gradient-to-b from-copper-500 to-copper-400 text-white flex items-center justify-center font-semibold">
                    {getInitials(review.name, review.initials)}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-base font-light text-main-900 truncate">
                        {review.name}
                      </p>
                    </div>
                    <span className="text-[11px] tracking-[0.18em] uppercase text-main-500">
                      Verified
                    </span>
                  </div>
                </div>

                <div className="mt-5 review-fade text-sm leading-relaxed font-light text-main-700">
                  {review.text}
                </div>

                <div className="mt-5 flex items-center justify-between text-xs text-main-500">
                  <span className="text-copper-700/80">Hover to read more</span>
                  <span>{review.count}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="flex flex-col pt-15 gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div>
              <button
                type="button"
                className="rounded-xl bg-gradient-to-r from-copper-600 to-copper-500 text-white shadow-[0_10px_10px_rgba(0,0,0,0.09)] hover:from-copper-700 hover:to-copper-500 px-4 py-3 text-[11.5px] font-medium uppercase tracking-[0.13em] inline-flex items-center justify-center cursor-pointer transition-transform duration-200 ease-out disabled:opacity-60 disabled:pointer-events-none"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("open-book-consultation"))
                }
              >
                {content.ctaText}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
