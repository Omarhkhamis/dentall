import { prisma } from "./prisma";
import { getSectionDefaults } from "./sectionDefaults";

const SUPPORTED_LOCALES = ["en", "ru"];

export const SECTION_DEFINITIONS = [
  { key: "hero", label: "Hero" },
  { key: "dentalImplant", label: "Dental Implants" },
  { key: "popularTreatments", label: "Popular Treatments" },
  { key: "bookAppointmentPrimary", label: "Book Appointment (Top)" },
  { key: "beforeAfter", label: "Before & After" },
  { key: "fullWidthCampaign", label: "Campaign Banner" },
  { key: "stepForm", label: "Step Form" },
  { key: "treatments", label: "Treatments" },
  { key: "bookAppointmentSecondary", label: "Book Appointment (Bottom)" },
  { key: "internationalPatients", label: "International Patients" },
  { key: "teamMembers", label: "Team Members" },
  { key: "clinic", label: "Clinic" },
  { key: "healthTourism", label: "Health Tourism" },
  { key: "luckySpin", label: "Lucky Spin" },
  { key: "localAttractions", label: "Local Attractions" },
  { key: "implantMatrix", label: "Implant Matrix" },
  { key: "techniquesUsed", label: "Techniques Used" },
  { key: "googleReviews", label: "Google Reviews" },
  { key: "faqs", label: "FAQs" }
];

const mergeSectionData = (defaults, current) => {
  if (current === null || typeof current === "undefined") return defaults;
  if (Array.isArray(defaults)) {
    return Array.isArray(current) ? current : defaults;
  }
  if (defaults && typeof defaults === "object") {
    const merged = { ...defaults };
    if (current && typeof current === "object") {
      for (const [key, value] of Object.entries(current)) {
        merged[key] = mergeSectionData(defaults[key], value);
      }
    }
    return merged;
  }
  return current;
};

const ensureLocaleSections = async (locale) => {
  const orderMap = new Map(
    SECTION_DEFINITIONS.map((section, index) => [section.key, index])
  );

  const existing = await prisma.section.findMany({
    where: { locale },
    select: { key: true, sortOrder: true }
  });
  const existingMap = new Map(existing.map((item) => [item.key, item]));

  // Rename legacy hollywood entries for this locale
  const legacy = await prisma.section.findMany({
    where: { key: "hollywoodSmile", locale }
  });
  if (legacy.length) {
    await prisma.section.updateMany({
      where: { key: "hollywoodSmile", locale },
      data: { key: "dentalImplant", label: "Dental Implants" }
    });
    existingMap.delete("hollywoodSmile");
  }

  for (const def of SECTION_DEFINITIONS) {
    const found = existingMap.get(def.key);
    if (!found) {
      await prisma.section.create({
        data: {
          key: def.key,
          label: def.label,
          enabled: true,
          locale,
          sortOrder: orderMap.get(def.key) ?? 0,
          data: getSectionDefaults(def.key, locale)
        }
      });
      continue;
    }
    if (found.sortOrder === null || typeof found.sortOrder === "undefined") {
      await prisma.section.update({
        where: { key_locale: { key: def.key, locale } },
        data: { sortOrder: orderMap.get(def.key) ?? 0 }
      });
    }
  }
};

export const ensureSections = async (locale = "en") => {
  const safeLocale = SUPPORTED_LOCALES.includes(locale) ? locale : "en";
  const localesToEnsure = new Set([safeLocale, "ru"]);
  for (const loc of localesToEnsure) {
    await ensureLocaleSections(loc);
  }
};

export const getSections = async () => {
  return getSectionsByLocale("en");
};

export const getSectionsByLocale = async (locale = "en") => {
  await ensureSections(locale);
  const sections = await prisma.section.findMany({ where: { locale } });
  const orderMap = new Map(
    SECTION_DEFINITIONS.map((section, index) => [section.key, index])
  );
  return sections.sort((a, b) => {
    const aOrder =
      typeof a.sortOrder === "number" ? a.sortOrder : orderMap.get(a.key) ?? 0;
    const bOrder =
      typeof b.sortOrder === "number" ? b.sortOrder : orderMap.get(b.key) ?? 0;
    return aOrder - bOrder;
  });
};

export const getSectionByKey = async (key, locale = "en") => {
  await ensureSections(locale);
  return prisma.section.findUnique({ where: { key_locale: { key, locale } } });
};

export const getSectionsMap = async (locale = "en") => {
  await ensureSections(locale);
  const sections = await prisma.section.findMany({ where: { locale } });
  const map = {};

  for (const section of sections) {
    const defaults = getSectionDefaults(section.key, locale);
    map[section.key] = {
      ...section,
      data: mergeSectionData(defaults, section.data)
    };
  }

  return map;
};
