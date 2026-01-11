import { prisma } from "./prisma";

export const DEFAULT_CUSTOM_HEADER = {
  content: "",
  bodyContent: ""
};

export const ensureCustomHeader = async () => {
  const existing = await prisma.customHeader.findFirst();
  if (existing) return existing;
  return prisma.customHeader.create({
    data: { ...DEFAULT_CUSTOM_HEADER }
  });
};

export const getCustomHeader = async () => {
  const record = await ensureCustomHeader();
  return {
    ...DEFAULT_CUSTOM_HEADER,
    ...record
  };
};
