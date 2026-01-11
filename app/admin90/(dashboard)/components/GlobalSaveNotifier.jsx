"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Swal from "sweetalert2";

const showToast = (options) =>
  Swal.fire({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1800,
    timerProgressBar: true,
    ...options
  });

export default function GlobalSaveNotifier() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const saved = params.get("saved");
    const error = params.get("error");
    const reordered = params.get("reordered");
    const updated = params.get("updated");

    if (!saved && !error && !reordered && !updated) return;

    if (saved || updated || reordered) {
      const title = reordered
        ? "Order saved"
        : updated
          ? "Updated successfully"
          : "Saved successfully";
      showToast({ icon: "success", title });
    } else if (error) {
      showToast({ icon: "error", title: "Save failed" });
    }

    // Clean query params
    params.delete("saved");
    params.delete("error");
    params.delete("reordered");
    params.delete("updated");
    const url = `${window.location.pathname}${params.toString() ? "?" + params.toString() : ""}${window.location.hash}`;
    window.history.replaceState({}, "", url);
  }, [searchParams]);

  return null;
}
