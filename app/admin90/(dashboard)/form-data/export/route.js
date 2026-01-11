import { prisma } from "../../../../../lib/prisma";

const normalizeDate = (value, fallback) => {
  const date = value ? new Date(value) : null;
  return Number.isNaN(date?.getTime()) ? fallback : date;
};

const buildDateRange = (month, from, to) => {
  if (month) {
    const [year, monthIndex] = month.split("-").map(Number);
    if (!Number.isNaN(year) && !Number.isNaN(monthIndex)) {
      const start = new Date(year, monthIndex - 1, 1, 0, 0, 0, 0);
      const end = new Date(year, monthIndex, 1, 0, 0, 0, 0);
      return { gte: start, lt: end };
    }
  }

  const start = normalizeDate(from, null);
  const endRaw = normalizeDate(to, null);
  if (endRaw) {
    endRaw.setHours(23, 59, 59, 999);
  }

  if (start || endRaw) {
    return {
      ...(start ? { gte: start } : {}),
      ...(endRaw ? { lte: endRaw } : {})
    };
  }

  return null;
};

const pickValue = (payload, keys) => {
  if (!payload) return "";
  for (const key of keys) {
    const value = payload[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
};

const escapeCsv = (value) => {
  if (value == null) return "";
  const str = String(value).replace(/"/g, '""');
  return `"${str}"`;
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const order = searchParams.get("order") === "oldest" ? "asc" : "desc";
  const month = searchParams.get("month") || "";
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const createdAt = buildDateRange(month, from, to);
  const where = createdAt ? { createdAt } : undefined;

  const records = await prisma.formSubmission.findMany({
    where,
    orderBy: { createdAt: order }
  });

  const header = [
    "id",
    "source",
    "page",
    "fullName",
    "email",
    "phone",
    "message",
    "createdAt"
  ];

  const rows = records.map((record) => {
    const payload =
      typeof record.payload === "object" && record.payload ? record.payload : {};
    const fullName = pickValue(payload, ["fullName", "name"]);
    const email = pickValue(payload, ["email"]);
    const phone = pickValue(payload, ["phone"]);
    const message = pickValue(payload, ["message"]);
    return [
      escapeCsv(record.id),
      escapeCsv(record.source || payload.source || "form"),
      escapeCsv(record.page || payload.page || ""),
      escapeCsv(fullName),
      escapeCsv(email),
      escapeCsv(phone),
      escapeCsv(message),
      escapeCsv(record.createdAt?.toISOString?.() || "")
    ].join(",");
  });

  const csv = [header.join(","), ...rows].join("\n");

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="form-submissions.csv"'
    }
  });
}
