import { prisma } from "./prisma";

export const DEFAULT_GENERAL_SETTINGS = {
  phone: "+90 546 526 64 49",
  email: "info@atomclinic.com",
  formRecipientEmail: null,
  address: "Talatpaşa Cd No:33/A, 34180 Bahçelievler/İstanbul, Turkey",
  whatsappNumber: "+905465266449",
  consultationDelaySeconds: 10,
  logoUrl: "/uploads/bm-logo-brown.svg",
  faviconUrl: "/uploads/favicon.ico",
  social: {
    instagram: "https://www.instagram.com/atomclinictr",
    facebook: "https://www.facebook.com/p/Atom-Clinic-100088413120680/",
    youtube: "https://www.youtube.com/@ATOMclinic"
  }
};

export const ensureGeneralSettings = async () => {
  const existing = await prisma.generalSettings.findFirst();
  if (existing) return existing;

  return prisma.generalSettings.create({
    data: {
      ...DEFAULT_GENERAL_SETTINGS
    }
  });
};

export const getGeneralSettings = async () => {
  const settings = await ensureGeneralSettings();
  return {
    ...DEFAULT_GENERAL_SETTINGS,
    ...settings,
    consultationDelaySeconds:
      settings.consultationDelaySeconds ??
      DEFAULT_GENERAL_SETTINGS.consultationDelaySeconds,
    social: {
      ...DEFAULT_GENERAL_SETTINGS.social,
      ...(settings.social || {})
    }
  };
};
