import { prisma } from "../../../../lib/prisma";
import { ensureDefaultAdmin } from "../../../../lib/adminAuth";
import { createAdminUserAction, updateAdminUserAction } from "../actions";
import SaveToast from "../components/SaveToast";

const formatDate = (value) => {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(value);
  } catch (error) {
    return value?.toISOString?.() ?? "";
  }
};

export default async function AdminUsersPage() {
  await ensureDefaultAdmin();
  const admins = await prisma.adminUser.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <SaveToast
        successMessage="Admin saved"
        errorMessage="Failed to save admin"
      />
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          Settings
        </p>
        <h2 className="text-2xl font-semibold text-slate-900">
          Admin Users
        </h2>
      </div>

      <form
        action={createAdminUserAction}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4"
      >
        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
          Add Admin
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-copper-400 focus:ring-1 focus:ring-copper-400/40"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Password
            </label>
            <input
              name="password"
              type="password"
              minLength={6}
              required
              className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-copper-400 focus:ring-1 focus:ring-copper-400/40"
            />
          </div>
        </div>
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-copper-600 to-copper-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-sm transition hover:from-copper-700 hover:to-copper-500"
          >
            Add Admin
          </button>
        </div>
      </form>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
            Existing Admins
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-[11px] uppercase tracking-[0.2em] text-slate-400">
              <tr>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Created</th>
                <th className="px-6 py-4">Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {admins.map((admin) => (
                <tr key={admin.id} className="text-slate-700 align-top">
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {admin.email}
                  </td>
                  <td className="px-6 py-4">
                    {formatDate(admin.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <form
                      action={updateAdminUserAction}
                      className="grid gap-3 sm:grid-cols-2"
                    >
                      <input type="hidden" name="id" value={admin.id} />
                      <input
                        name="email"
                        type="email"
                        defaultValue={admin.email}
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-copper-400 focus:ring-1 focus:ring-copper-400/40"
                      />
                      <input
                        name="password"
                        type="password"
                        placeholder="New password"
                        minLength={6}
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-copper-400 focus:ring-1 focus:ring-copper-400/40"
                      />
                      <div className="sm:col-span-2 flex items-center justify-end">
                        <button
                          type="submit"
                          className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
