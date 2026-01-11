let swalPromise = null;

const loadSwal = async () => {
  if (typeof window === "undefined") return null;
  if (!swalPromise) {
    swalPromise = import("sweetalert2").then((mod) => mod.default || mod);
  }
  return swalPromise;
};

const pickFirstFilled = (payload, keys) => {
  if (!payload) return "";
  for (const key of keys) {
    const value = payload[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return "";
};

const normalizePhone = (value) => {
  const digits = String(value || "")
    .replace(/\D/g, "")
    .replace(/^0+/, "");
  if (!digits) return "";
  const trimmed = digits.slice(0, 15);
  return `+${trimmed}`;
};

const isLikelyValidPhone = (value) =>
  /^\+[1-9]\d{7,14}$/.test(String(value || "").trim());

const showAlert = async ({ title, text }) => {
  if (typeof window === "undefined") return;
  try {
    const Swal = await loadSwal();
    if (Swal) {
      await Swal.fire({
        title,
        text,
        icon: "warning",
        confirmButtonText: "OK",
        customClass: {
          confirmButton:
            "rounded-lg bg-copper-600 px-4 py-2 text-sm font-semibold text-white hover:bg-copper-700"
        },
        buttonsStyling: false
      });
      return;
    }
  } catch {
    // Fallback to alert below.
  }
  window.alert(text);
};

const ensureContactFields = async (payload) => {
  const name = pickFirstFilled(payload, ["fullName", "name", "full_name"]);
  const rawPhone = pickFirstFilled(payload, ["phone", "tel", "mobile"]);
  const phone = normalizePhone(rawPhone);
  const phoneValid = isLikelyValidPhone(phone);

  if (name && phoneValid) {
    return { name, phone };
  }

  let message = "Please enter your name and phone number.";
  if (!name && !phone) {
    message = "Please enter your name and phone number.";
  } else if (!name) {
    message = "Please enter your name.";
  } else if (!phone) {
    message = "Please enter your phone number.";
  } else if (!phoneValid) {
    message = "Please enter a valid phone number.";
  }

  await showAlert({ title: "Missing info", text: message });

  const error = new Error(message);
  error.code = phone && !phoneValid ? "INVALID_PHONE" : "MISSING_CONTACT_INFO";
  throw error;
};

export const buildFormPayload = (form, source) => {
  const payload = {};
  if (form) {
    const formData = new FormData(form);
    for (const [key, value] of formData.entries()) {
      if (!key) continue;
      if (typeof value === "string") {
        const trimmed = value.trim();
        if (trimmed) payload[key] = trimmed;
      } else if (value != null) {
        payload[key] = String(value);
      }
    }
  }

  if (source) payload.source = source;
  if (typeof window !== "undefined") {
    payload.page = window.location.pathname;
  }

  return payload;
};

export const submitFormPayload = async (payload, options = {}) => {
  const { skipRedirect = false } = options;
  const isSpin =
    (payload && payload.source === "lucky-spin") || Boolean(payload?.prize);
  const { name, phone } = await ensureContactFields(payload || {});
  const normalizedPayload = {
    ...payload,
    fullName: name,
    name: payload?.name || name,
    phone
  };

  const response = await fetch("/api/forms/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(normalizedPayload)
  });

  if (!response.ok) {
    throw new Error("Form submission failed.");
  }

  try {
    const data = await response.json();
    if (typeof window !== "undefined" && !skipRedirect && !isSpin) {
      const redirectTo = data?.redirectTo || "/thankyou";
      window.location.assign(redirectTo);
    }
    return data;
  } catch {
    if (typeof window !== "undefined" && !skipRedirect && !isSpin) {
      window.location.assign("/thankyou");
    }
    return {};
  }
};
