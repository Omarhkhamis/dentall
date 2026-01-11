import nodemailer from "nodemailer";

import { getGeneralSettings } from "../../../../lib/generalSettings";
import { prisma } from "../../../../lib/prisma";

const EMAIL_TO_FALLBACK = "bmturkiya@gmail.com";

const isBlank = (value) =>
  value == null || (typeof value === "string" && !value.trim());

const asString = (value) => {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (Array.isArray(value)) {
    return value.map((item) => asString(item)).filter(Boolean).join(", ");
  }
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
};

const toPlainObject = (data) => {
  if (!data || typeof data !== "object") return {};
  if (data instanceof Map) return Object.fromEntries(data.entries());
  return data;
};

const sanitizePayload = (payload) => {
  const raw = toPlainObject(payload);
  const cleaned = {};
  for (const [key, value] of Object.entries(raw)) {
    if (!key) continue;
    const stringValue = asString(value).trim();
    if (!stringValue) continue;
    cleaned[key] = stringValue.slice(0, 4000);
  }
  return cleaned;
};

const buildTextBody = (fields) => {
  const lines = [];
  const entries = Object.entries(fields);
  for (const [key, value] of entries) {
    lines.push(`${key}: ${value}`);
  }
  return lines.join("\n");
};

const pickReplyTo = (fields) => {
  const candidates = [
    fields.email,
    fields.contactEmail,
    fields.userEmail,
    fields.replyTo
  ].filter(Boolean);
  const email = candidates.find((value) => /\S+@\S+\.\S+/.test(value));
  return email || undefined;
};

const createTransport = () => {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 0);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !port || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });
};

export async function POST(request) {
  let payload = {};
  const contentType = request.headers.get("content-type") || "";

  try {
    if (contentType.includes("application/json")) {
      payload = await request.json();
    } else {
      const formData = await request.formData();
      payload = Object.fromEntries(formData.entries());
    }
  } catch {
    payload = {};
  }

  const cleaned = sanitizePayload(payload);

  if (!isBlank(cleaned.company)) {
    return Response.json({ ok: true, skipped: true });
  }

  const source = cleaned.source || "website";
  const isSpin = source === "lucky-spin" || Boolean(cleaned.prize);
  const subject = `New form submission (${source})`;
  let settingsRecipient = "";
  try {
    const settings = await getGeneralSettings();
    settingsRecipient = settings?.formRecipientEmail || "";
  } catch {
    settingsRecipient = "";
  }

  const to = settingsRecipient || process.env.EMAIL_TO || EMAIL_TO_FALLBACK;
  const from =
    process.env.EMAIL_FROM || process.env.SMTP_USER || EMAIL_TO_FALLBACK;
  const replyTo = pickReplyTo(cleaned);

  const baseFields = {
    source,
    page: cleaned.page || "",
    submittedAt: new Date().toISOString()
  };

  const messageBody = buildTextBody({
    ...baseFields,
    ...cleaned
  });

  // Save spin submissions separately and do it early so email failures don't block storage.
  if (cleaned.fullName && cleaned.phone && cleaned.prize) {
    try {
      await prisma.spinData.create({
        data: {
          fullName: cleaned.fullName,
          phone: cleaned.phone,
          prize: cleaned.prize
        }
      });
    } catch (error) {
      // Ignore storage errors for spin data.
    }
  }

  if (!isSpin) {
    try {
      await prisma.formSubmission.create({
        data: {
          source,
          page: cleaned.page || null,
          payload: {
            ...cleaned,
            submittedAt: baseFields.submittedAt
          }
        }
      });
    } catch (error) {
      // Don't block the response if storage fails.
    }
  }

  const transport = createTransport();
  if (transport) {
    try {
      await transport.sendMail({
        to,
        from,
        subject,
        text: messageBody,
        ...(replyTo ? { replyTo } : {})
      });
    } catch (error) {
      // Log and continue so submissions are not blocked by email failures.
      console.error("Email delivery failed for form submission:", error);
    }
  }

  return Response.json({ ok: true });
}
