"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import bcrypt from "bcryptjs";
import { clearAdminSession } from "../../../lib/adminAuth";
import { prisma } from "../../../lib/prisma";
import { getSectionDefaults } from "../../../lib/sectionDefaults";
import { applyFormData, mergeSectionData } from "../../../lib/sectionForm";
import { DEFAULT_CUSTOM_HEADER } from "../../../lib/customHeader";

export const updateSectionAction = async (key, formData) => {
  try {
    const locale = String(formData.get("locale") || "en");
    const section = await prisma.section.findUnique({
      where: { key_locale: { key, locale } }
    });
    const defaults = getSectionDefaults(key, locale);
    const baseData = mergeSectionData(defaults, section?.data ?? {});
    const updatedData = applyFormData(baseData, formData);
    const casesLengthRaw = formData.get("casesLength");
    const mediaItemsLengthRaw = formData.get("mediaItemsLength");
    const reviewsLengthRaw = formData.get("reviewsLength");
    const columnsLengthRaw = formData.get("columnsLength");
    const rowsLengthRaw = formData.get("rowsLength");
    const slidesLengthRaw = formData.get("slidesLength");
    const localeParam = locale || "en";
    const casesLength = casesLengthRaw ? Number(casesLengthRaw) : null;
    const mediaItemsLength = mediaItemsLengthRaw
      ? Number(mediaItemsLengthRaw)
      : null;
    const reviewsLength = reviewsLengthRaw ? Number(reviewsLengthRaw) : null;
    const columnsLength = columnsLengthRaw ? Number(columnsLengthRaw) : null;
    const rowsLength = rowsLengthRaw ? Number(rowsLengthRaw) : null;
    const slidesLength = slidesLengthRaw ? Number(slidesLengthRaw) : null;

    if (key === "beforeAfter" && Number.isFinite(casesLength)) {
      updatedData.cases = Array.isArray(updatedData.cases)
        ? updatedData.cases.slice(0, casesLength)
        : [];
    }
    if (key === "teamMembers") {
      const teamLengthRaw = formData.get("teamMembersLength");
      const teamLength = teamLengthRaw ? Number(teamLengthRaw) : null;
      delete updatedData.ctaText;
      delete updatedData.ctaHref;
      if (Number.isFinite(teamLength)) {
        updatedData.items = Array.isArray(updatedData.items)
          ? updatedData.items.slice(0, teamLength)
          : [];
      }
    }

    if (key === "treatments" && Number.isFinite(mediaItemsLength)) {
      updatedData.mediaItems = Array.isArray(updatedData.mediaItems)
        ? updatedData.mediaItems.slice(0, mediaItemsLength)
        : [];
    }

    if (key === "googleReviews" && Number.isFinite(reviewsLength)) {
      updatedData.items = Array.isArray(updatedData.items)
        ? updatedData.items.slice(0, reviewsLength)
        : [];
    }
    if (key === "implantMatrix") {
      if (Number.isFinite(columnsLength)) {
        updatedData.columns = Array.isArray(updatedData.columns)
          ? updatedData.columns.slice(0, columnsLength)
          : [];
      }
      if (Number.isFinite(rowsLength)) {
        updatedData.rows = Array.isArray(updatedData.rows)
          ? updatedData.rows.slice(0, rowsLength)
          : [];
      }
      if (Array.isArray(updatedData.rows) && Array.isArray(updatedData.columns)) {
        updatedData.rows = updatedData.rows.map((row) => {
          const values = Array.isArray(row?.values) ? [...row.values] : [];
          if (values.length < updatedData.columns.length) {
            while (values.length < updatedData.columns.length) values.push("");
          } else if (values.length > updatedData.columns.length) {
            values.length = updatedData.columns.length;
          }
          return { ...row, values };
        });
      }
    }
    if (key === "techniquesUsed" && Number.isFinite(slidesLength)) {
      updatedData.slides = Array.isArray(updatedData.slides)
        ? updatedData.slides.slice(0, slidesLength)
        : [];
    }
    if (key === "teamMembers") {
      delete updatedData.ctaText;
      delete updatedData.ctaHref;
    }

    await prisma.section.update({
      where: { key_locale: { key, locale: localeParam } },
      data: { data: updatedData }
    });
  } catch (error) {
    redirect(`/admin90/sections/${key}?error=1`);
  }

  const localeParam = String(formData.get("locale") || "en");
  revalidatePath(`/admin90/sections/${key}`);
  revalidatePath(`/admin90/sections`);
  revalidatePath(`/dental-implant/${localeParam}`);
  redirect(`/admin90/sections/${key}?saved=1&locale=${localeParam}`);
};

export const toggleSectionAction = async (key, locale = "en") => {
  const section = await prisma.section.findUnique({
    where: { key_locale: { key, locale } },
    select: { enabled: true }
  });

  if (!section) {
    redirect("/admin90");
  }

  await prisma.section.update({
    where: { key_locale: { key, locale } },
    data: { enabled: !section.enabled }
  });

  revalidatePath(`/admin90/sections/${key}`);
  revalidatePath(`/admin90/sections`);
  revalidatePath(`/dental-implant/${locale}`);
  redirect(`/admin90/sections/${key}?locale=${locale}`);
};

export const updateGeneralSettingsAction = async (formData) => {
  try {
    const rawDelay = String(formData.get("consultationDelaySeconds") || "").trim();
    const parsedDelay = rawDelay ? Number(rawDelay) : null;
    const safeDelay =
      Number.isFinite(parsedDelay) && parsedDelay >= 0
        ? Math.round(parsedDelay)
        : null;
    const data = {
      phone: String(formData.get("phone") || "").trim() || null,
      email: String(formData.get("email") || "").trim() || null,
      formRecipientEmail:
        String(formData.get("formRecipientEmail") || "").trim() || null,
      address: String(formData.get("address") || "").trim() || null,
      whatsappNumber:
        String(formData.get("whatsappNumber") || "").trim() || null,
      logoUrl: String(formData.get("logoUrl") || "").trim() || null,
      faviconUrl: String(formData.get("faviconUrl") || "").trim() || null,
      consultationDelaySeconds: safeDelay,
      social: {
        instagram: String(formData.get("instagram") || "").trim() || null,
        facebook: String(formData.get("facebook") || "").trim() || null,
        youtube: String(formData.get("youtube") || "").trim() || null
      }
    };

    const existing = await prisma.generalSettings.findFirst();
    if (existing) {
      await prisma.generalSettings.update({
        where: { id: existing.id },
        data
      });
    } else {
      await prisma.generalSettings.create({ data });
    }
  } catch (error) {
    redirect("/admin90/general?error=1");
  }

  revalidatePath("/admin90/general");
  revalidatePath("/dental-implant/en");
  revalidatePath("/dental-implant/ru");
  redirect("/admin90/general?saved=1");
};

export const updateSeoSettingsAction = async (formData) => {
  try {
    const existing = await prisma.seoSettings.findFirst();
    const metaTitle =
      String(formData.get("metaTitle") || "").trim() || existing?.metaTitle || "";
    const metaDescription =
      String(formData.get("metaDescription") || "").trim() ||
      existing?.metaDescription ||
      "";
    const metaKeywords = String(formData.get("metaKeywords") || "").trim() || null;
    const metaImage = String(formData.get("metaImage") || "").trim() || null;

    if (existing) {
      await prisma.seoSettings.update({
        where: { id: existing.id },
        data: { metaTitle, metaDescription, metaKeywords, metaImage }
      });
    } else {
      await prisma.seoSettings.create({
        data: { metaTitle, metaDescription, metaKeywords, metaImage }
      });
    }
  } catch (error) {
    redirect("/admin90/seo?error=1");
  }

  revalidatePath("/dental-implant/en");
  revalidatePath("/dental-implant/ru");
  redirect("/admin90/seo?saved=1");
};

export const updateCustomHeaderAction = async (formData) => {
  try {
    const content =
      String(formData.get("customHeader") || "").trim() ||
      DEFAULT_CUSTOM_HEADER.content;
    const bodyContent =
      String(formData.get("customBody") || "").trim() ||
      DEFAULT_CUSTOM_HEADER.bodyContent;

    const existing = await prisma.customHeader.findFirst();
    if (existing) {
      await prisma.customHeader.update({
        where: { id: existing.id },
        data: { content, bodyContent }
      });
    } else {
      await prisma.customHeader.create({ data: { content, bodyContent } });
    }
  } catch (error) {
    redirect("/admin90/custom-header?error=1");
  }

  revalidatePath("/dental-implant/en");
  revalidatePath("/dental-implant/ru");
  redirect("/admin90/custom-header?saved=1");
};

export const updatePageAction = async (slug, formData) => {
  try {
    const title = String(formData.get("title") || "").trim();
    const content = String(formData.get("content") || "").trim();
    await prisma.page.update({
      where: { slug },
      data: {
        title: title || "Untitled",
        content
      }
    });
  } catch (error) {
    redirect(`/admin90/pages/${slug}?error=1`);
  }

  revalidatePath(`/admin90/pages/${slug}`);
  revalidatePath(`/${slug}`);
  redirect(`/admin90/pages/${slug}?saved=1`);
};

export const createAdminUserAction = async (formData) => {
  try {
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const password = String(formData.get("password") || "");
    if (!email || password.length < 6) {
      redirect("/admin90/admin-users?error=1");
    }

    const existing = await prisma.adminUser.findUnique({ where: { email } });
    if (existing) {
      redirect("/admin90/admin-users?error=1");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.adminUser.create({
      data: { email, passwordHash }
    });
  } catch (error) {
    redirect("/admin90/admin-users?error=1");
  }

  revalidatePath("/admin90/admin-users");
  redirect("/admin90/admin-users?saved=1");
};

export const reorderSectionsAction = async (formData) => {
  const rawOrder = String(formData.get("order") || "[]");
  const locale = String(formData.get("locale") || "en");
  let keys = [];
  try {
    const parsed = JSON.parse(rawOrder);
    if (Array.isArray(parsed)) keys = parsed.map((item) => String(item));
  } catch {
    keys = [];
  }

  const existing = await prisma.section.findMany({
    where: { locale },
    select: { key: true }
  });
  const existingKeys = new Set(existing.map((item) => item.key));
  const filtered = keys.filter((key) => existingKeys.has(key));
  const missing = existing
    .map((item) => item.key)
    .filter((key) => !filtered.includes(key));
  const finalOrder = [...filtered, ...missing];

  await Promise.all(
    finalOrder.map((key, index) =>
      prisma.section.update({
        where: { key_locale: { key, locale } },
        data: { sortOrder: index }
      })
    )
  );

  revalidatePath("/admin90");
  revalidatePath(`/admin90/overview`);
  revalidatePath(`/admin90/sections`);
  revalidatePath(`/dental-implant/${locale}`);
  redirect(`/admin90/sections?reordered=1&locale=${locale}`);
};

export const updateAdminUserAction = async (formData) => {
  try {
    const id = String(formData.get("id") || "").trim();
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const password = String(formData.get("password") || "");

    if (!id || (!email && !password)) {
      redirect("/admin90/admin-users?error=1");
    }

    const data = {};

    if (email) {
      const existing = await prisma.adminUser.findUnique({ where: { email } });
      if (existing && existing.id !== id) {
        redirect("/admin90/admin-users?error=1");
      }
      data.email = email;
    }

    if (password) {
      if (password.length < 6) {
        redirect("/admin90/admin-users?error=1");
      }
      data.passwordHash = await bcrypt.hash(password, 10);
    }

    await prisma.adminUser.update({
      where: { id },
      data
    });
  } catch (error) {
    redirect("/admin90/admin-users?error=1");
  }

  revalidatePath("/admin90/admin-users");
  redirect("/admin90/admin-users?saved=1");
};

export const logoutAction = async () => {
  await clearAdminSession();
  redirect("/admin90/login");
};
