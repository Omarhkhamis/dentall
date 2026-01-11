"use client";

import { usePathname } from "next/navigation";

import CollapsibleNavGroup from "./CollapsibleNavGroup";
import SectionsNav from "./SectionsNav";

export default function SidebarNav({ sections }) {
  const pathname = usePathname() || "";
  const isPages = pathname.startsWith("/admin90/pages");
  const isData =
    pathname.startsWith("/admin90/spin-data") ||
    pathname.startsWith("/admin90/form-data");
  const isSettings =
    pathname.startsWith("/admin90/overview") ||
    pathname.startsWith("/admin90/general") ||
    pathname.startsWith("/admin90/seo") ||
    pathname.startsWith("/admin90/media") ||
    pathname.startsWith("/admin90/admin-users") ||
    pathname.startsWith("/admin90/custom-header") ||
    pathname.startsWith("/admin90/sections");

  return (
    <nav className="mt-8 space-y-6">
      <SectionsNav sections={sections} />

      <CollapsibleNavGroup
        title="Pages"
        items={[
          { label: "Thank You", href: "/admin90/pages/thankyou" },
          { label: "Privacy Policy", href: "/admin90/pages/privacy-policy" },
          { label: "Terms", href: "/admin90/pages/terms" }
        ]}
        defaultOpen={false}
        isActive={isPages}
      />

      <CollapsibleNavGroup
        title="Data - Leads"
        items={[
          { label: "Spin Data", href: "/admin90/spin-data" },
          { label: "Form Data", href: "/admin90/form-data" }
        ]}
        defaultOpen={false}
        isActive={isData}
      />

      <CollapsibleNavGroup
        title="Settings"
        items={[
          { label: "Overview", href: "/admin90/overview" },
          { label: "General", href: "/admin90/general" },
          { label: "Reorder Sections", href: "/admin90/sections" },
          { label: "Custom Codes", href: "/admin90/custom-header" },
          { label: "SEO", href: "/admin90/seo" },
          { label: "Media", href: "/admin90/media" },
          { label: "Admin Users", href: "/admin90/admin-users" }
        ]}
        defaultOpen={false}
        isActive={isSettings}
      />
    </nav>
  );
}
