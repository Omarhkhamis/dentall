"use client";

import { useEffect, useRef, useState } from "react";

import { beforeAfterDefaults } from "../../../../../../lib/sectionDefaults";

export default function BeforeAfter({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const content = data || beforeAfterDefaults;
  const cases = content.cases || [];
  const items = cases.length ? [...cases, ...cases, ...cases] : [];
  const sliderRef = useRef(null);
  const marqueeRef = useRef(null);
  const loopWidthRef = useRef(0);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const openLightbox = (image) => {
    setActiveImage(image);
    setIsOpen(true);
  };

  useEffect(() => {
    const node = sliderRef.current;
    if (!node) return undefined;
    const setWidth = node.scrollWidth / 3;
    if (!Number.isFinite(setWidth)) return undefined;
    loopWidthRef.current = setWidth;
    node.scrollLeft = setWidth;

    const normalize = () => {
      const width = loopWidthRef.current;
      if (!width) return;
      const low = width * 0.35;
      const high = width * 1.65;
      const max = width * 2;
      if (node.scrollLeft < low) {
        const prev = node.style.scrollBehavior;
        node.style.scrollBehavior = "auto";
        node.scrollLeft += width;
        node.style.scrollBehavior = prev;
      } else if (node.scrollLeft > high) {
        const prev = node.style.scrollBehavior;
        node.style.scrollBehavior = "auto";
        node.scrollLeft -= width;
        node.style.scrollBehavior = prev;
      } else if (node.scrollLeft > max) {
        const prev = node.style.scrollBehavior;
        node.style.scrollBehavior = "auto";
        node.scrollLeft = width + (node.scrollLeft - max);
        node.style.scrollBehavior = prev;
      }
    };

    const handleScroll = () => {
      normalize();
    };

    node.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      loopWidthRef.current = 0;
      node.removeEventListener("scroll", handleScroll);
    };
  }, [items.length]);

  const scrollByAmount = (direction) => {
    const node = sliderRef.current;
    if (!node) return;
    const amount = Math.round(node.clientWidth * 0.9);
    node.scrollBy({ left: amount * direction, behavior: "smooth" });

    requestAnimationFrame(() => {
      const width = loopWidthRef.current;
      if (!width) return;
      const low = width * 0.35;
      const high = width * 1.65;
      const max = width * 2;
      if (node.scrollLeft < low) {
        const prev = node.style.scrollBehavior;
        node.style.scrollBehavior = "auto";
        node.scrollLeft += width;
        node.style.scrollBehavior = prev;
      } else if (node.scrollLeft > high) {
        const prev = node.style.scrollBehavior;
        node.style.scrollBehavior = "auto";
        node.scrollLeft -= width;
        node.style.scrollBehavior = prev;
      } else if (node.scrollLeft > max) {
        const prev = node.style.scrollBehavior;
        node.style.scrollBehavior = "auto";
        node.scrollLeft = width + (node.scrollLeft - max);
        node.style.scrollBehavior = prev;
      }
    });
  };

  return (
    <section id="before-after" className="relative overflow-hidden bg-white py-16 lg:py-20">
      <div className="mx-auto grid max-w-screen-2xl gap-12 px-6 lg:px-10 lg:grid-cols-2 lg:items-center">
        <div className="order-1 mb-6 space-y-7 lg:order-1 lg:mb-10">
          <h2 className="text-4xl   xl:text-5xl font-extralight leading-snug text-main-900">
            {content.titleLine1} <br />
            <span className="relative inline-block">
              {content.titleLine2}
              <span className="absolute left-0 right-0 -bottom-2 h-[1px] bg-copper-500 rounded-full"></span>
            </span>
          </h2>

          <ul className="space-y-4 font-light text-[15px] mb-12 text-main-800">
            {content.bullets?.map((item, index) => (
              <li key={`${item.highlight}-${index}`} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-copper-600 text-white text-[11px] font-semibold shadow-sm">✓</span>
                <span>
                  {item.prefix}
                  <b className="text-copper-600 font-medium">{item.highlight}</b>
                  {item.suffix}
                </span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="rounded-xl bg-gradient-to-r from-copper-600 to-copper-500 text-white shadow-[0_10px_10px_rgba(0,0,0,0.09)] hover:from-copper-700 hover:to-copper-500 px-4 py-3 text-[11.5px] font-medium uppercase tracking-[0.13em] inline-flex items-center justify-center cursor-pointer transition-transform duration-200 ease-out disabled:opacity-60 disabled:pointer-events-none"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("open-book-consultation"))
            }
          >
            {content.ctaText}</button>
        </div>

        <div className="relative order-2 w-[90vw] max-w-[90vw] mx-auto lg:mx-0 lg:mt-0 lg:w-full lg:max-w-full lg:-ml-0">
          <div className="relative lg:mt-10">
            <div className="relative sm:hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-10 flex items-center justify-between px-2">
                <button
                  type="button"
                  aria-label="السابق"
                  onClick={() => scrollByAmount(-1)}
                  className="pointer-events-auto h-10 w-10 rounded-full border border-main-200 bg-white/95 text-main-700 shadow-md transition hover:bg-white"
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="التالي"
                  onClick={() => scrollByAmount(1)}
                  className="pointer-events-auto h-10 w-10 rounded-full border border-main-200 bg-white/95 text-main-700 shadow-md transition hover:bg-white"
                >
                  ›
                </button>
              </div>

              <div
                ref={sliderRef}
                className="flex gap-6 overflow-x-auto px-4 pb-3 no-scrollbar snap-x snap-mandatory"
              >
                {items.map((item, index) => (
                  <article
                    key={`${item.image}-${index}-mobile`}
                    className="shrink-0 w-[85%] snap-start rounded-3xl rounded-b-none bg-white border border-main-200/70 overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.05)]"
                  >
                    <div className="relative aspect-[3/4] bg-main-50">
                      <img
                        src={item.image}
                        className="absolute inset-0 h-full w-full object-cover object-center cursor-pointer"
                        alt="Smile case"
                        loading="lazy"
                        onClick={() => openLightbox(item.image)}
                      />
                    </div>

                    <p className="text-[12px] text-main-600 px-4 py-4 leading-relaxed">
                      {item.caption}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden marquee before-after-marquee hidden sm:block">
              <div
                ref={marqueeRef}
                className="marquee__track before-after-track gap-4 md:gap-6 pr-4 md:pr-32"
                style={{
                  "--marquee-offset": "0px",
                  "--marquee-duration": "42s",
                  "--marquee-duration-mobile": "30s"
                }}
              >
                {[...cases, ...cases].map((item, index) => (
                  <article
                    key={`${item.image}-${index}`}
                    className="shrink-0 w-[calc(100vw-3rem)] sm:w-[calc(50vw-2.5rem)] md:w-[325px]"
                  >
                    <div className="rounded-xl border border-main-200 overflow-hidden bg-white">
                      <img
                        src={item.image}
                        className="w-full h-auto max-h-[80vh] object-contain cursor-pointer md:max-h-none"
                        alt="Smile case"
                        loading="lazy"
                        onClick={() => openLightbox(item.image)}
                      />
                    </div>

                    <p className="text-[12px] text-main-500 mt-3 leading-relaxed">
                      {item.caption}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 transition-opacity ${
              isOpen ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            onClick={() => setIsOpen(false)}
          >
            <div
              className="relative flex max-w-[92vw] h-[70vh] max-h-[70vh] overflow-auto rounded-2xl bg-white shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="absolute top-3 right-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white text-xl font-light hover:bg-black/80 cursor-pointer transition"
                aria-label="Close"
                onClick={() => setIsOpen(false)}
              >
                <span className="leading-none translate-y-[-1px] select-none">
                  &times;
                </span>
              </button>

              {activeImage ? (
                <img
                  src={activeImage}
                  className="max-h-full w-auto object-contain m-auto"
                  alt="Smile case preview"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
