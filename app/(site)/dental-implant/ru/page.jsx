import Script from "next/script";

import Footer from "../en/components/Footer";
import Header from "../en/components/Header";
import DentalImplantEffects from "../en/components/DentalImplantEffects";
import Overlays from "../en/components/Overlays";
import { getGeneralSettings } from "../../../../lib/generalSettings";
import { getSectionsByLocale, getSectionsMap } from "../../../../lib/sections";
import { getSeoSettings } from "../../../../lib/seoSettings";
import {
  HeroSlide,
  DentalImplantSec,
  PopularTreatments,
  BookAppointmentFormSec,
  BeforeAfter,
  FullWidthCampaignBanner,
  StepFormSec,
  Treatments,
  BookAppointmentFormSec2,
  InternationalPatientsSec,
  TeamMembers,
  ClinicSec,
  HealthTourism,
  LuckySpinFormSec,
  LocalAttractions,
  ImplantMatrix,
  TechniquesUsed,
  GoogleReviews,
  Faqs
} from "../en/components/sections";

export const viewport = {
  width: "device-width",
  initialScale: 1
};

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const [seo, general] = await Promise.all([getSeoSettings(), getGeneralSettings()]);
  const keywords = seo.metaKeywords
    ? seo.metaKeywords.split(",").map((item) => item.trim()).filter(Boolean)
    : undefined;
  const icon = general?.faviconUrl || "/uploads/favicon.ico";
  const envBase =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "https://lp.bmturkiye.com";
  const baseUrl = envBase || "https://lp.bmturkiye.com";
  const toAbsolute = (path) => {
    if (!path) return undefined;

    try {
      const url = new URL(path);
      const host = url.hostname.toLowerCase();
      if (host.includes("localhost") || host === "127.0.0.1" || host === "0.0.0.0") {
        return baseUrl ? `${baseUrl}${url.pathname}` : undefined;
      }
      return path;
    } catch {
      // not absolute, continue.
    }

    if (!baseUrl) return undefined;
    try {
      return new URL(path, baseUrl).toString();
    } catch {
      return undefined;
    }
  };
  const rawImage = seo.metaImage || general?.logoUrl || null;
  const resolvedImage = toAbsolute(rawImage);

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords,
    robots: {
      index: true,
      follow: true
    },
    alternates: {
      ...(baseUrl
        ? {
            canonical: `${baseUrl}/dental-implant/ru`,
            languages: {
              en: `${baseUrl}/dental-implant/en`,
              ru: `${baseUrl}/dental-implant/ru`,
              tr: `${baseUrl}/tr/dental-implant`,
              "x-default": `${baseUrl}/dental-implant/en`
            }
          }
        : {})
    },
    openGraph: {
      type: "website",
      siteName: "BM TÜRKIEY",
      locale: "ru",
      title: seo.metaTitle,
      description: seo.metaDescription,
      ...(baseUrl ? { url: `${baseUrl}/dental-implant/ru` } : {}),
      images: resolvedImage ? [{ url: resolvedImage }] : undefined
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle,
      description: seo.metaDescription,
      images: resolvedImage ? [resolvedImage] : undefined
    },
    icons: icon ? { icon } : undefined
  };
}

export default async function DentalImplantPageRu() {
  const locale = "ru";
  const [sectionsMap, orderedSections, general] = await Promise.all([
    getSectionsMap(locale),
    getSectionsByLocale(locale),
    getGeneralSettings()
  ]);
  const whatsappNumber = general?.whatsappNumber
    ? general.whatsappNumber.replace(/\s+/g, "")
    : null;
  const whatsappLink = whatsappNumber
    ? `https://wa.me/${whatsappNumber}`
    : "https://wa.me/+905465266449";

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/intl-tel-input@19.5.6/build/js/intlTelInput.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/intl-tel-input@19.5.6/build/js/utils.js"
        strategy="afterInteractive"
      />
      <Header general={general} locale="ru" />
      <DentalImplantEffects />
      <main>
        {orderedSections
          .filter((section) => sectionsMap[section.key]?.enabled)
          .map((section) => {
            const data = sectionsMap[section.key]?.data;
            switch (section.key) {
              case "hero":
                return (
                  <HeroSlide
                    key={section.key}
                    data={data}
                    whatsappLink={whatsappLink}
                  />
                );
              case "dentalImplant":
                return <DentalImplantSec key={section.key} data={data} />;
              case "popularTreatments":
                return (
                  <PopularTreatments
                    key={section.key}
                    data={data}
                    whatsappLink={whatsappLink}
                  />
                );
              case "bookAppointmentPrimary":
                return (
                  <BookAppointmentFormSec key={section.key} data={data} />
                );
              case "beforeAfter":
                return <BeforeAfter key={section.key} data={data} />;
              case "fullWidthCampaign":
                return <FullWidthCampaignBanner key={section.key} data={data} />;
              case "stepForm":
                return <StepFormSec key={section.key} data={data} />;
              case "treatments":
                return <Treatments key={section.key} data={data} />;
              case "bookAppointmentSecondary":
                return (
                  <BookAppointmentFormSec2 key={section.key} data={data} />
                );
              case "internationalPatients":
                return (
                  <InternationalPatientsSec key={section.key} data={data} />
                );
              case "teamMembers":
                return <TeamMembers key={section.key} data={data} />;
              case "clinic":
                return (
                  <ClinicSec
                    key={section.key}
                    data={data}
                    whatsappLink={whatsappLink}
                  />
                );
              case "healthTourism":
                return <HealthTourism key={section.key} data={data} />;
              case "luckySpin":
                return (
                  <LuckySpinFormSec
                    key={section.key}
                    idPrefix="lucky-section"
                    data={data}
                  />
                );
              case "localAttractions":
                return (
                  <LocalAttractions
                    key={section.key}
                    data={data}
                    whatsappLink={whatsappLink}
                  />
                );
              case "implantMatrix":
                return <ImplantMatrix key={section.key} data={data} />;
              case "techniquesUsed":
                return <TechniquesUsed key={section.key} data={data} />;
              case "googleReviews":
                return <GoogleReviews key={section.key} data={data} />;
              case "faqs":
                return <Faqs key={section.key} data={data} />;
              default:
                return null;
            }
          })}
      </main>
      <Footer general={general} locale="ru" />
      <Overlays
        heroData={sectionsMap.hero?.data}
        consultationDelaySeconds={general?.consultationDelaySeconds}
        whatsappLink={whatsappLink}
        luckySpinData={sectionsMap.luckySpin?.data}
      />
    </>
  );
}
