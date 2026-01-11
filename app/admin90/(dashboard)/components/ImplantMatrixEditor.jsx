"use client";

import { useMemo, useState } from "react";

import FieldInput from "./FieldInput";

const DEFAULT_COLUMNS = [
  "Technique",
  "Type",
  "Ideal Candidates",
  "Advantages",
  "Disadvantages",
  "Time in Türkiye",
  "Results"
];

const emptyRow = { values: [] };

const confirmDelete = async (title, text) => {
  const Swal = (await import("sweetalert2")).default;
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#b45309"
  });
  return result.isConfirmed;
};

export default function ImplantMatrixEditor({ initialColumns, initialRows }) {
  const [columns, setColumns] = useState(
    Array.isArray(initialColumns) && initialColumns.length
      ? initialColumns
      : DEFAULT_COLUMNS
  );
  const [rows, setRows] = useState(
    Array.isArray(initialRows) && initialRows.length ? initialRows : [emptyRow]
  );

  const normalizedRows = useMemo(() => {
    return rows.map((row) => {
      if (row && Array.isArray(row.values)) {
        const values = [...row.values];
        if (values.length < columns.length) {
          while (values.length < columns.length) values.push("");
        } else if (values.length > columns.length) {
          values.length = columns.length;
        }
        return { ...row, values };
      }
      if (row && typeof row === "object") {
        const knownKeys = [
          "technique",
          "type",
          "candidates",
          "advantages",
          "disadvantages",
          "timeInTurkey",
          "results"
        ];
        const values = columns.map((_, index) => {
          const key = knownKeys[index] || index;
          return row[key] ?? "";
        });
        return { ...row, values };
      }
      return { ...emptyRow, values: Array(columns.length).fill("") };
    });
  }, [rows, columns]);

  const handleColumnChange = (index, value) =>
    setColumns((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });

  const handleCellChange = (rowIndex, colIndex, value) => {
    setRows((prev) => {
      const updated = [...prev];
      const row = normalizedRows[rowIndex] || { ...emptyRow, values: [] };
      const values = [...row.values];
      values[colIndex] = value;
      updated[rowIndex] = { ...row, values };
      return updated;
    });
  };

  const handleAddRow = () => setRows((prev) => [...prev, emptyRow]);
  const handleRemoveRow = async (index) => {
    const ok = await confirmDelete("Delete row?", `This will remove row #${index + 1}.`);
    if (!ok) return;
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddColumn = () => {
    setColumns((prev) => [...prev, `Column ${prev.length + 1}`]);
    setRows((prev) =>
      prev.map((row) => ({
        ...row,
        values: Array.isArray(row.values)
          ? [...row.values, ""]
          : [...(row.values || []), ""]
      }))
    );
  };

  const handleRemoveColumn = async (index) => {
    const label = columns[index] || `Column ${index + 1}`;
    const ok = await confirmDelete("Delete column?", `This will remove "${label}".`);
    if (!ok) return;
    setColumns((prev) => prev.filter((_, i) => i !== index));
    setRows((prev) =>
      prev.map((row) => {
        if (!Array.isArray(row.values)) return row;
        const values = row.values.filter((_, i) => i !== index);
        return { ...row, values };
      })
    );
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
            Implant Matrix
          </p>
          <p className="text-sm text-slate-500">
            Edit column labels and table rows in place.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleAddColumn}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 transition hover:border-slate-300"
          >
            Add Column
          </button>
          <button
            type="button"
            onClick={handleAddRow}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 transition hover:border-slate-300"
          >
            Add Row
          </button>
        </div>
      </div>

      <div className="mt-5 hidden lg:block overflow-auto rounded-xl border border-slate-200">
        <table className="min-w-[960px] w-full border-collapse text-sm">
          <thead className="bg-gradient-to-r from-copper-600 to-copper-500 text-white">
            <tr>
              {columns.map((label, index) => (
                <th key={`col-head-${index}`} className="p-3 text-left align-bottom">
                  <FieldInput
                    name={`field.columns.${index}`}
                    label=""
                    defaultValue={label}
                  />
                </th>
              ))}
              <th className="w-[72px] p-3 text-left text-xs uppercase tracking-[0.16em] text-white/80">
                
              </th>
            </tr>
          </thead>
          <tbody>
            {normalizedRows.map((row, rowIndex) => (
              <tr
                key={`row-${rowIndex}`}
                className={rowIndex % 2 === 0 ? "bg-slate-50/50" : "bg-white"}
              >
                {columns.map((_, colIndex) => (
                  <td key={`cell-${rowIndex}-${colIndex}`} className="p-3 align-top">
                    <textarea
                      name={`field.rows.${rowIndex}.values.${colIndex}`}
                      defaultValue={row.values?.[colIndex] ?? ""}
                      onChange={(event) =>
                        handleCellChange(rowIndex, colIndex, event.target.value)
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-copper-400 focus:ring-1 focus:ring-copper-400/40"
                      rows={columns.length > 4 ? 3 : 2}
                    />
                  </td>
                ))}
                <td className="p-3 align-top">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleRemoveRow(rowIndex)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                      aria-label={`Remove row ${rowIndex + 1}`}
                    >
                      ×
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          {columns.length > 1 ? (
            <tfoot>
              <tr className="bg-slate-50/80">
                {columns.map((label, index) => (
                  <td key={`col-footer-${index}`} className="p-3 text-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveColumn(index)}
                      className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600 transition hover:border-slate-300"
                      aria-label={`Remove column ${index + 1}`}
                    >
                      ×
                    </button>
                  </td>
                ))}
                <td />
              </tr>
            </tfoot>
          ) : null}
        </table>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:hidden">
        {normalizedRows.map((row, rowIndex) => (
          <div
            key={`mobile-row-${rowIndex}`}
            className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Row #{rowIndex + 1}
              </p>
              <button
                type="button"
                onClick={() => handleRemoveRow(rowIndex)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                aria-label={`Remove row ${rowIndex + 1}`}
              >
                ×
              </button>
            </div>
            {columns.map((colLabel, colIndex) => (
              <div key={`mobile-cell-${rowIndex}-${colIndex}`}>
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  {colLabel}
                </p>
                <textarea
                  name={`field.rows.${rowIndex}.values.${colIndex}`}
                  defaultValue={row.values?.[colIndex] ?? ""}
                  onChange={(event) =>
                    handleCellChange(rowIndex, colIndex, event.target.value)
                  }
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-copper-400 focus:ring-1 focus:ring-copper-400/40"
                  rows={columns.length > 4 ? 3 : 2}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {columns.length > 1 ? (
        <div className="mt-4 lg:hidden flex flex-wrap gap-2">
          {columns.map((label, index) => (
            <button
              key={`mobile-col-remove-${index}`}
              type="button"
              onClick={() => handleRemoveColumn(index)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600 transition hover:border-slate-300"
              aria-label={`Remove column ${index + 1}`}
            >
              ×
            </button>
          ))}
        </div>
      ) : null}

      <input type="hidden" name="columnsLength" value={columns.length} />
      <input type="hidden" name="rowsLength" value={rows.length} />
    </div>
  );
}
