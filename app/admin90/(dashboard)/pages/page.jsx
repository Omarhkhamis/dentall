import { getPages } from "@lib/pages";

export default async function PagesIndex() {
  const pages = await getPages();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          Pages
        </p>
        <h2 className="text-2xl font-semibold text-slate-900">
          Edit Pages
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Update the content for the public pages.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {pages.map((page) => (
          <a
            key={page.slug}
            href={`/admin90/pages/${page.slug}`}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
              Page
            </p>
            <h3 className="mt-2 text-lg font-semibold text-slate-900">
              {page.title}
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              /{page.slug}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
