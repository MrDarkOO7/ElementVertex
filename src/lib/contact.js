import { services } from "@/content/services";

export const UNSURE = "unsure";

export const SERVICE_OPTIONS = [
  ...services.map((s) => ({ value: s.id, label: s.title })),
  { value: UNSURE, label: "Not sure yet" },
];

const limits = { name: 100, email: 200, company: 120, message: 4000 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (value, max) => (typeof value === "string" ? value.trim().slice(0, max) : "");

/**
 * Validates and normalises the contact form payload (server-side).
 * Returns { ok: true, value } or { ok: false, errors }.
 */
export function validateContact(input) {
  const value = {
    name: clean(input?.name, limits.name),
    email: clean(input?.email, limits.email),
    company: clean(input?.company, limits.company),
    services: cleanServices(input?.services),
    message: clean(input?.message, limits.message),
  };

  const errors = {};
  if (!value.name) errors.name = "Please tell us your name.";
  if (!EMAIL_PATTERN.test(value.email)) errors.email = "Please enter a valid email address.";
  if (!value.message) errors.message = "Please tell us a little about what you need.";

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, value };
}

/** Keeps only known, de-duplicated service ids. "Not sure yet" never sits beside a real choice. */
function cleanServices(input) {
  const list = Array.isArray(input) ? input : [];
  const known = new Set(SERVICE_OPTIONS.map((o) => o.value));
  const unique = [...new Set(list.filter((v) => typeof v === "string" && known.has(v)))];
  const specific = unique.filter((v) => v !== UNSURE);
  return specific.length ? specific : unique;
}

export function servicesLabel(values) {
  if (!values?.length) return "Not specified";
  return values.map((v) => SERVICE_OPTIONS.find((o) => o.value === v)?.label ?? v).join(", ");
}
