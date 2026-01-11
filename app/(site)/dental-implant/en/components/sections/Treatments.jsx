"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { treatmentsDefaults } from "../../../../../../lib/sectionDefaults";

export default function Treatments({ data }) {
  const content = data || treatmentsDefaults;
  const mediaItems = content.mediaItems || [];
  const microHighlights = content.highlights || [];
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  const [mediaReady, setMediaReady] = useState(false);
  const popupVideoRef = useRef(null);
  const dragRef = useRef({
    down: false,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    moved: false,
    cancelClick: false
  });
  const closeTimerRef = useRef(null);

  const extractYouTubeId = (url) => {
    if (!url || typeof url !== "string") return null;
    const cleaned = url.trim();
    const shortMatch = cleaned.match(/youtube\.com\/shorts\/([^?&#/]+)/i);
    if (shortMatch?.[1]) return shortMatch[1];
    const watchMatch = cleaned.match(/[?&]v=([^?&#/]+)/i);
    if (watchMatch?.[1]) return watchMatch[1];
    const youtuBeMatch = cleaned.match(/youtu\.be\/([^?&#/]+)/i);
    if (youtuBeMatch?.[1]) return youtuBeMatch[1];
    return null;
  };

  const normalizeMediaItem = (item) => {
    if (!item || typeof item !== "object") return null;
    const poster = item.poster || item.image || item.src || "";
    const videoUrl = (item.videoUrl || item.youtubeUrl || "").trim();
    const idFromUrl = extractYouTubeId(videoUrl);
    const provider = item.provider || (videoUrl || idFromUrl ? "youtube" : null);
    const inferredId = idFromUrl ?? item.id ?? null;
    const isShort = /youtube\.com\/shorts\//i.test(videoUrl);
    const type = item.type || (videoUrl || inferredId ? "embed" : "image");
    const aspect = item.aspect || (isShort ? "9/16" : "9/16");

    return {
      ...item,
      type,
      provider,
      id: inferredId,
      poster,
      src: item.src || poster || "",
      aspect,
      videoUrl
    };
  };

  const normalizedMediaItems = mediaItems
    .map(normalizeMediaItem)
    .filter(Boolean);

  const clamp = (index) => {
    const count = normalizedMediaItems.length;
    if (!count) return 0;
    return (index % count + count) % count;
  };

  const isActive = (index) => index === active;
  const isPrev = (index) => index === clamp(active - 1);
  const isNext = (index) => index === clamp(active + 1);

  const cardClassByIndex = (index) => {
    const base =
      "pointer-events-auto absolute top-1/2 -translate-y-1/2 transition-all duration-300 ease-out";
    if (!isActive(index) && !isPrev(index) && !isNext(index)) {
      return `${base} opacity-0 scale-75 pointer-events-none`;
    }
    const size = "h-[82%] sm:h-[84%] lg:h-[86%] w-[68%] sm:w-[60%] lg:w-[58%]";
    if (isActive(index)) {
      return `${base} ${size} z-30 left-[50%] -translate-x-1/2 opacity-100 scale-100`;
    }
    if (isPrev(index)) {
      return `${base} ${size} z-20 left-[6%] opacity-40 scale-90 blur-[0.5px]`;
    }
    return `${base} ${size} z-20 right-[6%] opacity-40 scale-90 blur-[0.5px]`;
  };

  const makeEmbedUrl = (item) => {
    if (!item) return null;
    if (item.provider === "youtube") {
      if (!item.id) return null;
      return `https://www.youtube-nocookie.com/embed/${item.id}?autoplay=1&playsinline=1&rel=0`;
    }
    if (item.provider === "vimeo") {
      return `https://player.vimeo.com/video/${item.id}?autoplay=1`;
    }
    return null;
  };

  const openItem = (item, force = false) => {
    const drag = dragRef.current;
    if (!force && drag.cancelClick) {
      drag.cancelClick = false;
      return;
    }
    drag.cancelClick = false;
    setCurrent(item);
    setOpen(true);
    setMediaReady(false);
  };

  const close = () => {
    if (popupVideoRef.current) {
      popupVideoRef.current.pause();
      popupVideoRef.current.currentTime = 0;
    }
    setOpen(false);
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setCurrent(null);
      setMediaReady(false);
    }, 220);
  };

  const prev = () => setActive((value) => clamp(value - 1));
  const next = () => setActive((value) => clamp(value + 1));

  useEffect(() => {
    if (!open || current?.type !== "video") return;
    if (!popupVideoRef.current) return;
    popupVideoRef.current.load();
    const playPromise = popupVideoRef.current.play?.();
    if (playPromise?.catch) playPromise.catch(() => {});
  }, [open, current]);

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handlePointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const drag = dragRef.current;
    drag.down = true;
    drag.startX = event.clientX;
    drag.startY = event.clientY;
    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
    drag.moved = false;
    drag.cancelClick = false;
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag.down) return;
    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
    const dx = drag.lastX - drag.startX;
    const threshold = event.pointerType === "mouse" ? 4 : 2;
    if (!drag.moved && Math.abs(dx) > threshold) {
      drag.moved = true;
    }
  };

  const handlePointerUp = (event) => {
    const drag = dragRef.current;
    if (!drag.down) return;
    const dx = drag.lastX - drag.startX;
    const dy = drag.lastY - drag.startY;
    drag.down = false;

    const clickCancel = event.pointerType === "mouse" ? 4 : 2;
    if (Math.abs(dx) > clickCancel && Math.abs(dx) >= Math.abs(dy)) {
      drag.cancelClick = true;
    }

    const threshold = event.pointerType === "mouse" ? 28 : 16;
    if (dx > threshold) prev();
    else if (dx < -threshold) next();
  };

  const popupStyle = useMemo(() => {
    const maxHeight = "85vh";
    if (current?.type === "video" || current?.type === "embed") {
      const aspect = current?.aspect || "9/16";
      if (aspect === "9/16") {
        return { aspectRatio: "9 / 16", width: "min(76vw, 420px)", maxHeight };
      }
      if (aspect === "1/1") {
        return { aspectRatio: "1 / 1", width: "min(92vw, 720px)", maxHeight };
      }
      return { aspectRatio: "16 / 9", width: "min(92vw, 960px)", maxHeight };
    }
    return { width: "min(92vw, 960px)", maxHeight };
  }, [current]);

  const embedSrc = current?.type === "embed" ? makeEmbedUrl(current) : null;
  const videoSrc = current?.type === "video" ? current?.src : null;

  return (
    <section
      id="treatments"
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-100 py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -left-40 top-24 h-px w-[120%] rotate-[-8deg] bg-gradient-to-r from-transparent via-copper-400/45 to-transparent"></div>

      <div className="mx-auto max-w-screen-2xl px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-[11px] tracking-[0.32em] uppercase text-main-400">
              {content.kicker}
            </p>

            <h2 className="mt-3 text-4xl sm:text-4xl lg:text-5xl font-extralight leading-15 text-main-900 tracking-tight">
              {content.titleLine1} <br className="hidden sm:block" />
              <span className="relative inline-block">
                {content.titleLine2}
                <span className="absolute left-0 right-0 -bottom-1 h-[1px] bg-copper-500/80 rounded-full"></span>
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-[15px] leading-relaxed font-light text-main-600">
              {content.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {microHighlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-main-200 bg-white/70 px-4 py-2 text-[12px] font-light text-main-700"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-10 mb-14 border-l-2 border-copper-400/70 pl-5">
              <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-main-800">
                {content.noteLabel}
              </p>
              <p className="mt-2 text-[14px] font-light text-main-700 leading-relaxed">
                {content.noteText}
              </p>

            </div>

            <button
              type="button"
              className="rounded-xl bg-gradient-to-r from-copper-600 to-copper-500 text-white shadow-[0_10px_10px_rgba(0,0,0,0.09)] hover:from-copper-700 hover:to-copper-500 px-4 py-3 text-[11.5px] font-medium uppercase tracking-[0.13em] inline-flex items-center justify-center cursor-pointer transition-transform duration-200 ease-out disabled:opacity-60 disabled:pointer-events-none"
              onClick={() =>
                window.dispatchEvent(new CustomEvent("open-book-consultation"))
              }
            >
              {content.ctaText}</button>
          </div>

          <div className="lg:col-span-5">
            <div
              className="relative h-[600px] sm:h-[680px] lg:h-[660px] select-none touch-pan-y"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              <div className="absolute inset-0 pointer-events-none">
                {normalizedMediaItems.map((item, index) => (
                  <button
                    key={`${item.id || item.poster || item.src || "media"}-${index}`}
                    type="button"
                    className={`${cardClassByIndex(index)}${
                      isActive(index)
                        ? " cursor-pointer pointer-events-auto"
                        : " cursor-default pointer-events-none"
                    }`}
                    disabled={!isActive(index)}
                    onClick={() => openItem(item)}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-[1.75rem]">
                      <img
                        src={item.poster || item.src}
                        alt="Media"
                        className="h-full w-full object-cover pointer-events-none select-none"
                        draggable={false}
                      />

                      <div
                        className={`absolute inset-0 ${
                          isActive(index)
                            ? "bg-gradient-to-tr from-main-900/45 via-main-800/10 to-transparent"
                            : "bg-gradient-to-tr from-main-900/55 via-main-800/20 to-transparent"
                        }`}
                      ></div>

                      {item.type === "video" || item.type === "embed" ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span
                            className={`inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/55 backdrop-blur border border-white/70 transition-transform duration-200 ${
                              isActive(index) ? "scale-100" : "scale-95"
                            }`}
                          >
                            <svg
                              className="h-6 w-6 text-copper-600 ml-0.5"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="absolute cursor-pointer left-0 sm:left-1 top-1/2 -translate-y-1/2 z-[70] p-2 rounded-full text-main-900/60 hover:text-copper-600 hover:scale-109 transition select-none"
                onClick={prev}
                aria-label="Previous"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M14.5 5.5L8 12l6.5 6.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                type="button"
                className="absolute  cursor-pointer right-0 sm:right-1 top-1/2 -translate-y-1/2 z-[70] p-2 rounded-full text-main-900/60 hover:text-copper-600 hover:scale-109 transition select-none"
                onClick={next}
                aria-label="Next"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9.5 5.5L16 12l-6.5 6.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {open ? (
              <div
                className="fixed inset-0 z-[2147483647] isolate flex items-center justify-center bg-black/75 p-4 sm:p-6"
                style={{ transform: "translateZ(0)" }}
                onClick={close}
                onTouchEnd={(event) => {
                  event.preventDefault();
                  close();
                }}
              >
                <div className="absolute inset-0 supports-[backdrop-filter]:backdrop-blur-sm"></div>

                <div className="sm:hidden fixed left-1/2 -translate-x-1/2 z-[2147483647] pointer-events-none top-6">
                  <div className="px-4 py-2 text-white/85 text-[14px] w-max leading-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.65)]">
                    tap the space bar to close.
                  </div>
                </div>

                <div
                  className="relative rounded-2xl overflow-hidden bg-black max-h-[65vh] sm:max-h-[85vh]"
                  style={{ ...popupStyle, transform: "translateZ(0)" }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      close();
                    }}
                    className="hidden sm:inline-flex absolute right-4 top-4 z-[120] h-10 w-10 items-center justify-center cursor-pointer rounded-full bg-black/60 text-white/90 text-2xl font-light hover:bg-white/10 transition"
                    aria-label="Close"
                  >
                    <span className="leading-none -translate-y-px select-none">
                      &times;
                    </span>
                  </button>

                  {!mediaReady && (current?.poster || current?.src) ? (
                    <img
                      src={current?.poster || current?.src}
                      alt="Poster"
                      className="absolute inset-0 z-10 h-full w-full object-cover"
                    />
                  ) : null}
                  {!mediaReady ? (
                    <div className="absolute inset-0 z-10 bg-black/30"></div>
                  ) : null}

                  {current?.type === "video" ? (
                    <video
                      ref={popupVideoRef}
                      controls
                      playsInline
                      preload="auto"
                      className={`relative z-20 h-full w-full ${
                        current?.aspect === "9/16"
                          ? "object-contain"
                          : "object-cover"
                      }`}
                      onLoadedData={() => setMediaReady(true)}
                      onCanPlay={() => setMediaReady(true)}
                    >
                      {videoSrc ? (
                        <source src={videoSrc} type="video/mp4" />
                      ) : null}
                    </video>
                  ) : null}

                  {current?.type === "embed" ? (
                    <iframe
                      src={embedSrc ?? undefined}
                      className="relative z-20 h-full w-full"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      onLoad={() => setMediaReady(true)}
                      title="Media embed"
                    ></iframe>
                  ) : null}

                  {current?.type === "image" ? (
                    <img
                      src={current?.src}
                      alt="Image"
                      className="relative z-20 h-full w-full object-contain"
                      draggable={false}
                    />
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
