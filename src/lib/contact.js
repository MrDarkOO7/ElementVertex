import { services } from "@/content/services";

export const SERVICE_OPTIONS = [
  ...services.map((s) => ({ value: s.id, label: s.title })),
  { value: "unsure", label: "Not sure yet" },
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
    service: clean(input?.service, 40),
    message: clean(input?.message, limits.message),
  };

  const errors = {};
  if (!value.name) errors.name = "Please tell us your name.";
  if (!EMAIL_PATTERN.test(value.email)) errors.email = "Please enter a valid email address.";
  if (!value.message) errors.message = "Please tell us a little about what you need.";
  if (value.service && !SERVICE_OPTIONS.some((o) => o.value === value.service)) value.service = "unsure";

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, value };
}

export function serviceLabel(value) {
  return SERVICE_OPTIONS.find((o) => o.value === value)?.label ?? "Not specified";
}
