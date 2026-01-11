"use server";

import { redirect } from "next/navigation";
import { createAdminSession, verifyAdminCredentials } from "../../../lib/adminAuth";

export const loginAction = async (formData) => {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  const user = await verifyAdminCredentials(email, password);
  if (!user) {
    redirect("/admin90/login?error=1");
  }

  await createAdminSession(user.id);
  redirect("/admin90");
};
