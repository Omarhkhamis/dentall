import { getGeneralSettings } from "../../../../lib/generalSettings";
import { updateGeneralSettingsAction } from "../actions";
import SaveToast from "../components/SaveToast";
import FieldInput from "../components/FieldInput";

export default async function GeneralSettingsPage() {
  const settings = await getGeneralSettings();

  return (
    <div className="space-y-6">
      <SaveToast successMessage="Settings saved" errorMessage="Failed to save settings" />
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          General
        </p>
        <h2 className="text-2xl font-semibold text-slate-900">
          Contact & Social
        </h2>
      </div>

      <form action={updateGeneralSettingsAction} className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
            Contact Information
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Phone
              </label>
              <input
                name="phone"
                defaultValue={settings.phone || ""}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-copper-400 focus:ring-1 focus:ring-copper-400/40"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-slate-500">
                WhatsApp Number
              </label>
              <input
                name="whatsappNumber"
                defaultValue={settings.whatsappNumber || ""}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-copper-400 focus:ring-1 focus:ring-copper-400/40"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Email
              </label>
              <input
                name="email"
                type="email"
                defaultValue={settings.email || ""}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-copper-400 focus:ring-1 focus:ring-copper-400/40"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Form Recipient Email
              </label>
              <input
                name="formRecipientEmail"
                type="email"
                defaultValue={settings.formRecipientEmail || ""}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-copper-400 focus:ring-1 focus:ring-copper-400/40"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Address
            </label>
            <textarea
              name="address"
              defaultValue={settings.address || ""}
              rows={3}
              className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-copper-400 focus:ring-1 focus:ring-copper-400/40"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
            Consultation Popup
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Open After (Seconds)
              </label>
              <input
                name="consultationDelaySeconds"
                type="number"
                min="0"
                defaultValue={settings.consultationDelaySeconds ?? 10}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-copper-400 focus:ring-1 focus:ring-copper-400/40"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
            Social Links
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Instagram
              </label>
              <input
                name="instagram"
                defaultValue={settings.social?.instagram || ""}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-copper-400 focus:ring-1 focus:ring-copper-400/40"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Facebook
              </label>
              <input
                name="facebook"
                defaultValue={settings.social?.facebook || ""}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-copper-400 focus:ring-1 focus:ring-copper-400/40"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-slate-500">
                YouTube
              </label>
              <input
                name="youtube"
                defaultValue={settings.social?.youtube || ""}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-copper-400 focus:ring-1 focus:ring-copper-400/40"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
            Brand Assets
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <FieldInput
              name="logoUrl"
              label="Logo"
              defaultValue={settings.logoUrl || ""}
            />
            <FieldInput
              name="faviconUrl"
              label="Favicon"
              defaultValue={settings.faviconUrl || ""}
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Paste an image URL or upload a new file. PNG/SVG recommended for logo, ICO/PNG for favicon.
          </p>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-copper-600 to-copper-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-sm transition hover:from-copper-700 hover:to-copper-500"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
