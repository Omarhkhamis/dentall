"use client";

import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";

import CollapsibleNavGroup from "./CollapsibleNavGroup";

export default function SectionsNav({ sections }) {
  const pathname = usePathname() || "";
  const isActive = pathname.startsWith("/admin90/sections");
  const searchParams = useSearchParams();
  const locale = searchParams.get("locale") === "ru" ? "ru" : "en";

  const items = sections.map((section) => ({
    label: section.label,
    href: `/admin90/sections/${section.key}?locale=${locale}`,
    statusLabel: section.enabled ? "On" : "Off",
    statusClassName: section.enabled ? "text-emerald-500" : "text-slate-400"
  }));

  return (
    <CollapsibleNavGroup
      title="Sections"
      items={items}
      defaultOpen={false}
      isActive={isActive}
    />
  );
}
