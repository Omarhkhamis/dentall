"use client";

import { implantMatrixDefaults } from "../../../../../../lib/sectionDefaults";

export default function ImplantMatrix({ data }) {
  const content = data || implantMatrixDefaults;
  const columns = Array.isArray(content.columns) ? content.columns : [];
  const rows = Array.isArray(content.rows) ? content.rows : [];

  const resolveRowValues = (row) => {
    if (row && Array.isArray(row.values) && row.values.length) {
      return row.values;
    }
    if (row && typeof row === "object") {
      return columns.map((col, index) => {
        const knownKeys = [
          "technique",
          "type",
          "candidates",
          "advantages",
          "disadvantages",
          "timeInTurkey",
          "results"
        ];
        const key = knownKeys[index] || index;
        return row[key] ?? "";
      });
    }
    return [];
  };

  return (
    <section
      id="implant-matrix"
      className="relative overflow-hidden bg-gradient-to-br from-main-900 via-main-950 to-main-900 text-white py-16 lg:py-20"
    >
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-copper-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-copper-400/10 blur-3xl" />

      <div className="mx-auto max-w-screen-2xl px-6 lg:px-10 space-y-6">
        <div className="max-w-3xl space-y-3">
          <p className="text-[11px] uppercase tracking-[0.28em] text-copper-200/90">
            {content.kicker}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extralight leading-tight text-white">
            {content.title}
          </h2>
          <p className="text-main-100/80 leading-relaxed text-[15px]">
            {content.description}
          </p>
        </div>

        {/* Desktop table */}
        <div className="hidden lg:block rounded-2xl border border-white/10 shadow-[0_28px_90px_rgba(0,0,0,0.35)] overflow-hidden">
          <div className="grid grid-cols-7 min-w-[960px]">
            <div className="contents">
              {columns.map((column, index) => (
                <div
                  key={`implant-matrix-head-${column}-${index}`}
                  className="bg-gradient-to-b from-copper-700 via-copper-600 to-copper-500 text-main-50 px-4 py-4 text-sm font-semibold uppercase tracking-[0.12em] border-b border-white/10"
                  style={{ gridColumn: `${index + 1} / span 1` }}
                >
                  {column}
                </div>
              ))}
            </div>

            {rows.map((row, rowIndex) => {
              const isAlt = rowIndex % 2 === 1;
              const baseClass = isAlt
                ? "bg-main-900/70"
                : "bg-main-900/50";
              const values = resolveRowValues(row);
              return (
                <div className="contents" key={`implant-matrix-row-${rowIndex}`}>
                  {columns.map((_, cellIndex) => (
                    <div
                      key={`implant-matrix-cell-${rowIndex}-${cellIndex}`}
                      className={`${baseClass} px-4 py-5 border-t border-white/5 text-[15px] leading-relaxed`}
                    >
                      <div className="text-sm font-semibold text-copper-100/90 mb-1 lg:hidden">
                        {columns[cellIndex]}
                      </div>
                      <div className="text-main-50">
                        {values[cellIndex] ?? ""}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile/Tablet cards */}
        <div className="lg:hidden grid grid-cols-1 gap-4">
          {rows.map((row, rowIndex) => (
            // Mobile cards
            <div
              key={`implant-matrix-card-${rowIndex}`}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.35)] overflow-hidden"
            >
              <div className="bg-gradient-to-r from-copper-600 to-copper-500 px-4 py-3 text-sm uppercase tracking-[0.18em] font-semibold text-main-50">
                {resolveRowValues(row)[0] || row.technique || `Row ${rowIndex + 1}`}
              </div>
              <div className="divide-y divide-white/10">
                {columns.slice(1).map((column, index) => {
                  const values = resolveRowValues(row);
                  const value = values[index + 1] ?? "";
                  return (
                    <div key={`implant-matrix-card-row-${rowIndex}-${index}`} className="px-4 py-3">
                      <p className="text-[12px] uppercase tracking-[0.16em] text-main-200/80">
                        {column}
                      </p>
                      <p className="mt-1 text-[15px] leading-relaxed text-main-50">
                        {value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
