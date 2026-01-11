import { prisma } from "./prisma";

const DEFAULT_PAGES = [
  {
    slug: "thankyou",
    title: "Thank You",
    content:
      "Thank you for trusting our clinic.\n\nWe received your request and are preparing the best plan for you.\n\nA patient coordinator will review your details, call you to confirm the next steps, and share the available time slots.\n\nIf you would like to talk now, use the call or WhatsApp buttons below."
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    content:
      "We value your privacy and are committed to protecting your personal information.\n\nWe only collect data that is necessary to provide our services, improve your experience, and communicate with you when needed.\n\nWe do not sell or share your information with third parties except where required by law or to deliver services you have requested.\n\nYou can request access to your data or ask us to delete it at any time by contacting our support team."
  },
  {
    slug: "terms",
    title: "Terms",
    content:
      "By using this website, you agree to the following terms and conditions.\n\nAll content is provided for informational purposes only and does not replace professional medical advice.\n\nAppointments, pricing, and treatment plans are confirmed after clinical assessment.\n\nWe reserve the right to update these terms at any time. Continued use of the website indicates your acceptance of any changes."
  }
];

const ensurePages = async () => {
  const existing = await prisma.page.findMany({ select: { slug: true } });
  const existingSlugs = new Set(existing.map((item) => item.slug));

  const createData = DEFAULT_PAGES.filter(
    (page) => !existingSlugs.has(page.slug)
  );

  if (createData.length) {
    await prisma.page.createMany({ data: createData, skipDuplicates: true });
  }
};

export const getPageBySlug = async (slug) => {
  await ensurePages();
  return prisma.page.findUnique({ where: { slug } });
};

export const getPages = async () => {
  await ensurePages();
  return prisma.page.findMany({ orderBy: { title: "asc" } });
};
