import { prisma } from "./prisma";

export const ensureSeoSettings = async () => {
  const existing = await prisma.seoSettings.findFirst();
  if (existing) return existing;

  return prisma.seoSettings.create({
    data: {
      metaTitle: "",
      metaDescription: "",
      metaKeywords: null,
      metaImage: null
    }
  });
};

export const getSeoSettings = async () => {
  const settings = await ensureSeoSettings();
  return settings;
};
