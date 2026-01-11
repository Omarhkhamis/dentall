import { getSeoSettings } from "../../../../lib/seoSettings";
import { updateSeoSettingsAction } from "../actions";
import FieldInput from "../components/FieldInput";
import SaveToast from "../components/SaveToast";

export default async function SeoSettingsPage() {
  const seo = await getSeoSettings();

  return (
    <div className="space-y-6">
      <SaveToast successMessage="SEO settings saved" errorMessage="Failed to save SEO settings" />
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          Settings
        </p>
        <h2 className="text-2xl font-semibold text-slate-900">
          SEO
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Control how your page appears in search and link previews.
        </p>
      </div>

      <form action={updateSeoSettingsAction} className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
            Meta Information
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <FieldInput
              name="metaTitle"
              label="Meta Title"
              defaultValue={seo.metaTitle}
            />
            <FieldInput
              name="metaKeywords"
              label="Meta Keywords (comma separated)"
              defaultValue={seo.metaKeywords || ""}
            />
          </div>

          <div className="mt-4">
            <FieldInput
              name="metaDescription"
              label="Meta Description"
              defaultValue={seo.metaDescription}
              isTextarea
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
            Social Preview
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <FieldInput
              name="metaImage"
              label="Meta Image (1200x630 recommended)"
              defaultValue={seo.metaImage || ""}
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Paste an image URL or upload to replace the link preview image.
          </p>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-copper-600 to-copper-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-sm transition hover:from-copper-700 hover:to-copper-500"
          >
            Save SEO Settings
          </button>
        </div>
      </form>
    </div>
  );
}
