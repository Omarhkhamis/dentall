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

  const records = await prisma.spinData.findMany({
    where,
    orderBy: { createdAt: order }
  });

  const header = ["id", "fullName", "phone", "prize", "createdAt"];

  const rows = records.map((record) =>
    [
      escapeCsv(record.id),
      escapeCsv(record.fullName),
      escapeCsv(record.phone),
      escapeCsv(record.prize),
      escapeCsv(record.createdAt?.toISOString?.() || "")
    ].join(",")
  );

  const csv = [header.join(","), ...rows].join("\n");

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="spin-data.csv"'
    }
  });
}
