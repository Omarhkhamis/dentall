import { getSections } from "../../../../lib/sections";

export default async function OverviewPage() {
  const sections = await getSections();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          Overview
        </p>
        <h2 className="text-2xl font-semibold text-slate-900">
          Section Status
        </h2>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <div
              key={section.key}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-slate-800">
                  {section.label}
                </p>
                <p className="text-xs text-slate-500">{section.key}</p>
              </div>
              <span
                className={`h-3 w-3 rounded-full ${
                  section.enabled ? "bg-emerald-500" : "bg-slate-300"
                }`}
                title={section.enabled ? "Enabled" : "Disabled"}
              ></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
