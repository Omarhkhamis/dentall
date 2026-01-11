import { redirect } from "next/navigation";

import { getAdminUser } from "../../../lib/adminAuth";
import { getSectionsByLocale } from "../../../lib/sections";
import { logoutAction } from "./actions";
import SidebarNav from "./components/SidebarNav";
import GlobalSaveNotifier from "./components/GlobalSaveNotifier";
import LocaleSwitcher from "./components/LocaleSwitcher";

export const metadata = {
  title: "BM | Dashboard"
};

export default async function AdminLayout({ children, searchParams }) {
  const user = await getAdminUser();
  if (!user) {
    redirect("/admin90/login");
  }

  const locale = searchParams?.locale === "ru" ? "ru" : "en";
  const sections = await getSectionsByLocale(locale);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="w-72 border-r border-slate-200 bg-white px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Admin Panel
              </p>
              <h1 className="text-lg font-semibold">BM Dashboard</h1>
            </div>
            <LocaleSwitcher />
          </div>

          <SidebarNav sections={sections} />

          <form action={logoutAction} className="mt-10">
            <button
              type="submit"
              className="w-full rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Logout
            </button>
          </form>
        </aside>

        <main className="flex-1 px-8 py-8">
          <div className="max-w-5xl">
            <GlobalSaveNotifier />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
