import { getSectionsByLocale } from "../../../lib/sections";

export default async function AdminHomePage({ searchParams }) {
  const locale = searchParams?.locale === "ru" ? "ru" : "en";
  const sections = await getSectionsByLocale(locale);
  const enabledCount = sections.filter((section) => section.enabled).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Welcome back</h2>
        <p className="mt-2 text-sm text-slate-600">
          Manage your landing page sections, content, and general settings.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
            Sections
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {enabledCount} / {sections.length}
          </p>
          <p className="mt-1 text-sm text-slate-500">Enabled sections</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
            Quick Links
          </p>
          <div className="mt-3 space-y-2 text-sm">
            <a
              href="/admin90/overview"
              className="block rounded-lg border border-slate-200 px-3 py-2 text-slate-700 transition hover:bg-slate-50"
            >
              Overview Status
            </a>
            <a
              href="/admin90/media"
              className="block rounded-lg border border-slate-200 px-3 py-2 text-slate-700 transition hover:bg-slate-50"
            >
              Media Library
            </a>
            <a
              href="/admin90/general"
              className="block rounded-lg border border-slate-200 px-3 py-2 text-slate-700 transition hover:bg-slate-50"
            >
              General Settings
            </a>
            <a
              href="/admin90/sections"
              className="block rounded-lg border border-slate-200 px-3 py-2 text-slate-700 transition hover:bg-slate-50"
            >
              Reorder Sections
            </a>
            <a
              href={`/admin90/sections/${sections[0]?.key || "hero"}`}
              className="block rounded-lg border border-slate-200 px-3 py-2 text-slate-700 transition hover:bg-slate-50"
            >
              Edit First Section
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
