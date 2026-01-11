import { notFound } from "next/navigation";

import { getPageBySlug } from "@lib/pages";
import { updatePageAction } from "../../actions";

export default async function PageEditor({ params, searchParams }) {
  const page = await getPageBySlug(params.slug);
  if (!page) {
    notFound();
  }

  const saved = searchParams?.saved === "1";
  const error = searchParams?.error === "1";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Page
          </p>
          <h2 className="text-2xl font-semibold text-slate-900">
            {page.title}
          </h2>
          <p className="mt-2 text-sm text-slate-500">/{page.slug}</p>
        </div>

        <div className="text-xs text-slate-500">
          {saved ? "Saved." : error ? "Save failed." : ""}
        </div>
      </div>

      <form action={updatePageAction.bind(null, page.slug)}>
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <label className="flex flex-col gap-2 text-sm text-slate-600">
              <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                Title
              </span>
              <input
                name="title"
                defaultValue={page.title}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-copper-400 focus:ring-1 focus:ring-copper-400/40"
              />
            </label>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <label className="flex flex-col gap-2 text-sm text-slate-600">
              <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                Content
              </span>
              <textarea
                name="content"
                defaultValue={page.content}
                rows={10}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-copper-400 focus:ring-1 focus:ring-copper-400/40"
              />
            </label>
            <p className="mt-2 text-xs text-slate-400">
              Use blank lines to separate paragraphs.
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end">
          <button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-copper-600 to-copper-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-sm transition hover:from-copper-700 hover:to-copper-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
