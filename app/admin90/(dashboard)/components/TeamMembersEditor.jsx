"use client";

import { useState } from "react";

import FieldInput from "./FieldInput";

const emptyMember = {
  name: "",
  role: "",
  description: "",
  image: ""
};

const buildLabel = (index, label) => `Member #${index + 1} ${label}`;

export default function TeamMembersEditor({ initialItems }) {
  const [members, setMembers] = useState(
    Array.isArray(initialItems) && initialItems.length
      ? initialItems
      : [emptyMember]
  );

  const handleAdd = () => {
    setMembers((prev) => [...prev, emptyMember]);
  };

  const handleRemove = (index) => {
    setMembers((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
        Team Members
      </p>
      <div className="mt-4 space-y-4">
        {members.map((member, index) => (
          <div
            key={`member-${index}`}
            className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50/40 p-4 lg:grid lg:grid-cols-4 lg:gap-4"
          >
            <FieldInput
              name={`field.items.${index}.name`}
              label={buildLabel(index, "Name")}
              defaultValue={member?.name ?? ""}
            />
            <FieldInput
              name={`field.items.${index}.role`}
              label={buildLabel(index, "Role")}
              defaultValue={member?.role ?? ""}
            />
            <FieldInput
              name={`field.items.${index}.description`}
              label={buildLabel(index, "Description")}
              defaultValue={member?.description ?? ""}
              isTextarea
            />
            <FieldInput
              name={`field.items.${index}.image`}
              label={buildLabel(index, "Image URL")}
              defaultValue={member?.image ?? ""}
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700 lg:col-span-4"
              aria-label={`Remove member ${index + 1}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <input type="hidden" name="teamMembersLength" value={members.length} />
      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={handleAdd}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 transition hover:border-slate-300"
        >
          Add member
        </button>
      </div>
    </div>
  );
}
