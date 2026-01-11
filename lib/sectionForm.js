const cloneDeep = (value) => JSON.parse(JSON.stringify(value));

const mergeSectionData = (defaults, current) => {
  if (current === null || typeof current === "undefined") return defaults;
  if (Array.isArray(defaults)) {
    return Array.isArray(current) ? current : defaults;
  }
  if (defaults && typeof defaults === "object") {
    const merged = { ...defaults };
    if (current && typeof current === "object") {
      for (const [key, value] of Object.entries(current)) {
        merged[key] = mergeSectionData(defaults[key], value);
      }
    }
    return merged;
  }
  return current;
};

const humanizeSegment = (segment) => {
  if (typeof segment !== "string") return String(segment);
  if (/^\d+$/.test(segment)) return `#${Number(segment) + 1}`;
  return segment
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^\w/, (char) => char.toUpperCase());
};

const buildLabel = (pathParts) => {
  return pathParts.map(humanizeSegment).join(" ");
};

const isTextareaField = (value, path) => {
  if (typeof value !== "string") return false;
  if (value.includes("\n")) return true;
  if (value.length > 140) return true;
  const lowered = path.toLowerCase();
  return [
    "description",
    "subtitle",
    "paragraph",
    "body",
    "address",
    "note",
    "message",
    "text"
  ].some((key) => lowered.includes(key));
};

const shouldIncludeField = (path) => {
  const last = path.split(".").pop() || "";
  const lowered = last.toLowerCase();
  const full = path.toLowerCase();
  const excluded = [
    "id",
    "alt",
    "icon",
    "classname",
    "class",
    "style",
    "rel",
    "target",
    "arialabel",
    "aria",
    "data"
  ];
  if (excluded.includes(lowered)) return false;

  const allowed = [
    "title",
    "subtitle",
    "description",
    "role",
    "text",
    "technique",
    "candidates",
    "advantages",
    "disadvantages",
    "results",
    "body",
    "values",
    "columns",
    "rows",
    "type",
    "time",
    "label",
    "kicker",
    "heading",
    "paragraph",
    "cta",
    "button",
    "link",
    "href",
    "url",
    "image",
    "video",
    "background",
    "phone",
    "email",
    "address",
    "whatsapp",
    "social",
    "instagram",
    "facebook",
    "youtube",
    "prize",
    "prizes",
    "caption",
    "rating",
    "bullet",
    "bullets",
    "prefix",
    "highlight",
    "suffix",
    "name",
    "message",
    "placeholder"
  ];

  return allowed.some((key) => full.includes(key));
};

const buildFields = (data, prefix = []) => {
  if (data === null || typeof data === "undefined") return [];
  if (Array.isArray(data)) {
    return data.flatMap((item, index) =>
      buildFields(item, [...prefix, String(index)])
    );
  }
  if (typeof data === "object") {
    return Object.entries(data).flatMap(([key, value]) =>
      buildFields(value, [...prefix, key])
    );
  }

  const path = prefix.join(".");
  if (!shouldIncludeField(path)) return [];
  return [
    {
      path,
      label: buildLabel(prefix),
      value: data,
      isTextarea: isTextareaField(String(data ?? ""), path)
    }
  ];
};

const getValueAtPath = (obj, pathParts) => {
  let current = obj;
  for (const part of pathParts) {
    if (current == null) return undefined;
    current = current[part];
  }
  return current;
};

const setValueAtPath = (obj, pathParts, value) => {
  let current = obj;
  for (let i = 0; i < pathParts.length - 1; i += 1) {
    const part = pathParts[i];
    if (current[part] === undefined) {
      current[part] = {};
    }
    current = current[part];
  }
  const last = pathParts[pathParts.length - 1];
  current[last] = value;
};

const coerceValue = (rawValue, currentValue) => {
  if (typeof currentValue === "number") {
    const parsed = Number(rawValue);
    return Number.isNaN(parsed) ? currentValue : parsed;
  }
  if (typeof currentValue === "boolean") {
    return rawValue === "true" || rawValue === "on";
  }
  return rawValue;
};

const applyFormData = (baseData, formData) => {
  const updated = cloneDeep(baseData);
  for (const [name, rawValue] of formData.entries()) {
    if (!name.startsWith("field.")) continue;
    const path = name.replace(/^field\./, "");
    if (!path) continue;
    const pathParts = path.split(".");
    const currentValue = getValueAtPath(updated, pathParts);
    setValueAtPath(updated, pathParts, coerceValue(rawValue, currentValue));
  }
  return updated;
};

export {
  applyFormData,
  buildFields,
  mergeSectionData,
  shouldIncludeField
};
