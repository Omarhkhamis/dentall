"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Swal from "sweetalert2";

const showToast = (options) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1800,
    timerProgressBar: true,
    ...options
  });
};

export default function SaveToast({
  successMessage = "Saved successfully",
  errorMessage = "Save failed"
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const saved = searchParams.get("saved");
    const error = searchParams.get("error");
    if (!saved && !error) return;

    if (saved) {
      showToast({
        icon: "success",
        title: successMessage
      });
    } else if (error) {
      showToast({
        icon: "error",
        title: errorMessage
      });
    }

    const url = new URL(window.location.href);
    url.searchParams.delete("saved");
    url.searchParams.delete("error");
    window.history.replaceState({}, "", url);
  }, [searchParams, successMessage, errorMessage]);

  return null;
}
