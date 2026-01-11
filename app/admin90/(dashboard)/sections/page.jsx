import ReorderSections from "../components/ReorderSections";
import { getSectionsByLocale } from "../../../../lib/sections";

export const dynamic = "force-dynamic";

export default async function SectionsReorderPage({ searchParams }) {
  const locale = searchParams?.locale === "ru" ? "ru" : "en";
  const sections = await getSectionsByLocale(locale);
  const reordered = searchParams?.reordered === "1";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Sections
          </p>
          <h2 className="text-2xl font-semibold text-slate-900">
            Reorder Sections ({locale.toUpperCase()})
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Drag-and-drop or use arrows to set the display order on the landing page.
          </p>
        </div>
        {reordered ? (
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-100">
            Order saved
          </span>
        ) : null}
      </div>

      <div className="flex gap-2">
        <a
          href="/admin90/sections?locale=en"
          className={`rounded-lg border px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${
            locale === "en"
              ? "border-copper-500 text-copper-700 bg-copper-50"
              : "border-slate-200 text-slate-600 bg-white"
          }`}
        >
          EN
        </a>
        <a
          href="/admin90/sections?locale=ru"
          className={`rounded-lg border px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${
            locale === "ru"
              ? "border-copper-500 text-copper-700 bg-copper-50"
              : "border-slate-200 text-slate-600 bg-white"
          }`}
        >
          RU
        </a>
      </div>

      <ReorderSections initialSections={sections} locale={locale} />
    </div>
  );
}
