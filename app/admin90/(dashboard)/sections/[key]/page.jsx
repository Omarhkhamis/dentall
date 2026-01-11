import { notFound } from "next/navigation";

import { getSectionByKey } from "../../../../../lib/sections";
import { getSectionDefaults } from "../../../../../lib/sectionDefaults";
import { buildFields, mergeSectionData, shouldIncludeField } from "../../../../../lib/sectionForm";
import { toggleSectionAction, updateSectionAction } from "../../actions";
import CasesEditor from "../../components/CasesEditor";
import FieldInput from "../../components/FieldInput";
import SaveToast from "../../components/SaveToast";
import GoogleReviewsEditor from "../../components/GoogleReviewsEditor";
import TreatmentsMediaEditor from "../../components/TreatmentsMediaEditor";
import TeamMembersEditor from "../../components/TeamMembersEditor";
import ImplantMatrixEditor from "../../components/ImplantMatrixEditor";
import TechniquesUsedEditor from "../../components/TechniquesUsedEditor";

export default async function SectionEditorPage({ params, searchParams }) {
  const locale = searchParams?.locale === "ru" ? "ru" : "en";
  const section = await getSectionByKey(params.key, locale);
  if (!section) {
    notFound();
  }

  const defaults = getSectionDefaults(section.key, locale);
  const data = mergeSectionData(defaults, section.data ?? {});
  const rawFields = buildFields(data);
  const visibleFields = rawFields.filter((field) => shouldIncludeField(field.path));
  const isBeforeAfter = section.key === "beforeAfter";
  const isTreatments = section.key === "treatments";
  const isGoogleReviews = section.key === "googleReviews";
  const isTeamMembers = section.key === "teamMembers";
  const isImplantMatrix = section.key === "implantMatrix";
  const isTechniquesUsed = section.key === "techniquesUsed";
  const casesData = Array.isArray(data.cases) ? data.cases : [];
  const fields =
    section.key === "luckySpin"
      ? visibleFields.filter((field) => field.path.startsWith("prizes."))
      : visibleFields;
  const filteredFields = fields.filter((field) => {
    if (isTreatments) {
      return (
        !field.path.endsWith("galleryLabel") &&
        !field.path.endsWith("galleryHref") &&
        !field.path.startsWith("mediaItems.")
      );
    }
    if (isGoogleReviews) {
      return !field.path.startsWith("items.");
    }
    if (isTeamMembers) {
      return !field.path.startsWith("items.") && !field.path.startsWith("cta");
    }
    if (isImplantMatrix) {
      return (
        !field.path.startsWith("columns.") &&
        !field.path.startsWith("rows.") &&
        field.path !== "rows" &&
        field.path !== "columns"
      );
    }
    if (isTechniquesUsed) {
      return !field.path.startsWith("slides.");
    }
    return true;
  });
  const fieldsWithoutCases = isBeforeAfter
    ? filteredFields.filter((field) => !field.path.startsWith("cases."))
    : filteredFields;
  const groupedFields = fieldsWithoutCases.reduce((acc, field) => {
    const [top] = field.path.split(".");
    const key = top || "general";
    if (!acc[key]) acc[key] = [];
    acc[key].push(field);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <SaveToast successMessage="Section saved" errorMessage="Failed to save section" />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Section
          </p>
          <h2 className="text-2xl font-semibold text-slate-900">
            {section.label} ({locale.toUpperCase()})
          </h2>
        </div>

        <form action={toggleSectionAction.bind(null, section.key, locale)}>
          <input type="hidden" name="locale" value={locale} />
          <button
            type="submit"
            className={`rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-sm transition ${
              section.enabled
                ? "bg-emerald-500 hover:bg-emerald-600"
                : "bg-slate-400 hover:bg-slate-500"
            }`}
          >
            {section.enabled ? "Enabled" : "Disabled"}
          </button>
        </form>
      </div>

      <form action={updateSectionAction.bind(null, section.key)}>
        <input type="hidden" name="locale" value={locale} />
        <div className="space-y-5">
          {Object.entries(groupedFields).map(([group, items]) => {
            const showGroupTitle = items.length > 1;
            return (
            <div
              key={group}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              {showGroupTitle ? (
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                  {group}
                </p>
              ) : null}
              <div className={`${showGroupTitle ? "mt-4" : ""} grid gap-4 sm:grid-cols-2`}>
                {items.map((field) => (
                  <FieldInput
                    key={field.path}
                    name={`field.${field.path}`}
                    label={field.label}
                    defaultValue={field.value ?? ""}
                    isTextarea={field.isTextarea}
                  />
                ))}
              </div>
            </div>
          );
          })}
          {isGoogleReviews ? (
            <GoogleReviewsEditor
              initialItems={Array.isArray(data.items) ? data.items : []}
            />
          ) : null}
          {isTreatments ? (
            <TreatmentsMediaEditor
              initialItems={Array.isArray(data.mediaItems) ? data.mediaItems : []}
            />
          ) : null}
          {isImplantMatrix ? (
            <ImplantMatrixEditor
              initialColumns={Array.isArray(data.columns) ? data.columns : []}
              initialRows={Array.isArray(data.rows) ? data.rows : []}
            />
          ) : null}
          {isTechniquesUsed ? (
            <TechniquesUsedEditor
              initialSlides={Array.isArray(data.slides) ? data.slides : []}
            />
          ) : null}
          {isTeamMembers ? (
            <TeamMembersEditor
              initialItems={Array.isArray(data.items) ? data.items : []}
            />
          ) : null}
          {isBeforeAfter ? <CasesEditor initialCases={casesData} /> : null}
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
