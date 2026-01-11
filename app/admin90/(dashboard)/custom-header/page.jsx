import { getCustomHeader } from "../../../../lib/customHeader";
import { updateCustomHeaderAction } from "../actions";
import FieldInput from "../components/FieldInput";
import SaveToast from "../components/SaveToast";

export default async function CustomHeaderPage() {
  const customHeader = await getCustomHeader();

  return (
    <div className="space-y-6">
      <SaveToast successMessage="Custom header saved" errorMessage="Failed to save custom header" />
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          Settings
        </p>
        <h2 className="text-2xl font-semibold text-slate-900">
          Custom Codes
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Inject custom code (e.g., Tag Manager) safely into the site head.
        </p>
      </div>

      <form action={updateCustomHeaderAction} className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
            Header Code
          </p>
          <div className="mt-4">
            <FieldInput
              name="customHeader"
              label="Custom Header Snippet"
              defaultValue={customHeader.content || ""}
              isTextarea
            />
            <p className="mt-2 text-xs text-slate-500">
              Paste scripts or meta tags to inject into the page head. Use responsibly.
            </p>
          </div>
          <div className="mt-8">
            <FieldInput
              name="customBody"
              label="Custom Body Snippet"
              defaultValue={customHeader.bodyContent || ""}
              isTextarea
            />
            <p className="mt-2 text-xs text-slate-500">
              Paste HTML to inject into the page body (e.g., a link or widget).
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-copper-600 to-copper-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-sm transition hover:from-copper-700 hover:to-copper-500"
          >
            Save Custom Header
          </button>
        </div>
      </form>
    </div>
  );
}
