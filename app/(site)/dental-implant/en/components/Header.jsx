"use client";

import { useEffect, useMemo } from "react";

import { DEFAULT_GENERAL_SETTINGS } from "../../../../../lib/generalSettings";
import LocaleDropdown from "./LocaleDropdown";

export default function Header({ general, locale = "en" }) {
  const settings = general || DEFAULT_GENERAL_SETTINGS;
  const phoneLink = settings.phone
    ? `tel:${settings.phone.replace(/\s+/g, "")}`
    : "tel:+905465266449";
  const whatsappNumber = settings.whatsappNumber
    ? settings.whatsappNumber.replace(/\s+/g, "")
    : null;
  const whatsappLink = whatsappNumber
    ? `https://wa.me/${whatsappNumber}`
    : "https://wa.me/+905465266449";
  const logoSrc = settings.logoUrl || "/uploads/bm-logo-brown.svg";
  const instagramLink = settings.social?.instagram || "#";
  const facebookLink = settings.social?.facebook || "#";
  const youtubeLink = settings.social?.youtube || "#";
  const localeToggleHref =
    locale === "ru" ? "/dental-implant/en" : "/dental-implant/ru";
  const localeLabel = locale === "ru" ? "🇬🇧 EN" : "🇷🇺 RU";
  const bookLabel = locale === "ru" ? "Записаться" : "Book Consultation";
  const handleConsultationOpen = () => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("open-book-consultation"));
  };

  useEffect(() => {
    const headerEl = document.getElementById("siteHeader");
    if (!headerEl) return;

    const onScroll = () => {
      if (window.scrollY > 10) {
        headerEl.classList.remove("bg-transparent");
        headerEl.classList.add(
          "bg-slate-950/95",
          "backdrop-blur",
          "shadow-lg",
          "border-b",
          "border-white/5"
        );
      } else {
        headerEl.classList.add("bg-transparent");
        headerEl.classList.remove(
          "bg-slate-950/95",
          "backdrop-blur",
          "shadow-lg",
          "border-b",
          "border-white/5"
        );
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      id="siteHeader"
      className="fixed inset-x-0 top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100 shadow-sm transition-colors duration-300 ease-out"
    >
      <div className="mx-auto max-w-screen-2xl w-full px-6 lg:px-10">
        <div className="flex h-24 items-center justify-between gap-6">
          <a href={`/dental-implant/${locale}`} className="flex items-center">
            <img
              src={logoSrc}
              alt="BM TÜRKIEY"
              className="h-9 md:h-10 md:-mt-1 w-auto"
            />
          </a>

          <div className="flex items-center gap-3 md:gap-5">
            <div className="hidden md:flex items-center gap-2 text-[13px] text-slate-500 border-r border-main-200 pr-5">
              <a
                href={instagramLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 hover:border-copper-500 hover:text-copper-500 transition"
              >
                <i className="fa-brands fa-instagram text-[15px]"></i>
              </a>
              <a
                href={facebookLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 hover:border-copper-500 hover:text-copper-500 transition"
              >
                <i className="fa-brands fa-facebook-f text-[13px]"></i>
              </a>
              <a
                href={youtubeLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 hover:border-copper-500 hover:text-copper-500 transition"
              >
                <i className="fa-brands fa-youtube text-[15px]"></i>
              </a>
            </div>

            <div className="flex items-center gap-3 text-slate-700">
              <div className="hidden lg:flex flex-col items-end text-[12px] leading-tight">
                <span className="uppercase tracking-[0.16em] text-slate-400">
                  {locale === "ru" ? "Позвонить" : "Call Us"}
                </span>
                <a
                  href={phoneLink}
                  className="font-normal text-sm tracking-[0.06em] hover:text-copper-500 transition"
                >
                  {settings.phone}
                </a>
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 w-9 md:h-9 md:w-9 items-center justify-center rounded-full border border-slate-300 text-copper-600 hover:border-copper-500 hover:text-copper-500 transition"
                aria-label="WhatsApp"
              >
                <i className="fa-brands fa-whatsapp text-[13.5px] md:text-[17px]"></i>
              </a>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-xl bg-gradient-to-r from-copper-700 via-copper-600 to-copper-500 font-normal uppercase text-white shadow-[0_10px_30px_rgba(0,0,0,0.16)] hover:from-copper-800 hover:via-copper-700 hover:to-copper-500 hover:shadow-[0_12px_36px_rgba(0,0,0,0.18)] active:scale-[0.97] !py-2 sm:!py-2 !px-3 sm:!px-4 !text-[11px] sm:!text-[12px] !tracking-[0.01em] sm:!tracking-[0.20em] inline-flex items-center justify-center cursor-pointer transition-transform duration-200 ease-out disabled:opacity-60 disabled:pointer-events-none"
                onClick={handleConsultationOpen}
              >
                {bookLabel}
              </button>
              <LocaleDropdown locale={locale} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
