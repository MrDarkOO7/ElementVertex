import { serviceLabel, validateContact } from "@/lib/contact";
import { site } from "@/content/site";

/**
 * POST /api/contact
 *
 * Validates the form and emails it to the team through Resend's REST API.
 * Configure with environment variables (see .env.example):
 *   RESEND_API_KEY      required in production
 *   CONTACT_TO_EMAIL    where enquiries are delivered (defaults to the site email)
 *   CONTACT_FROM_EMAIL  verified sender, e.g. "Element Vertex <hello@elementvertex.com>"
 */

const json = (body, status = 200) => Response.json(body, { status });

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  // Honeypot: real visitors never see or fill this field. Pretend success to bots.
  if (typeof payload?.website === "string" && payload.website.trim() !== "") {
    return json({ ok: true });
  }

  const result = validateContact(payload);
  if (!result.ok) {
    return json({ ok: false, errors: result.errors }, 422);
  }

  const { name, email, company, service, message } = result.value;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      // Local development: show the enquiry in the terminal instead of sending it.
      console.log("[contact] RESEND_API_KEY not set. Enquiry received:", result.value);
      return json({ ok: true });
    }
    console.error("[contact] RESEND_API_KEY is not configured; enquiry was NOT delivered.");
    return json({ ok: false, error: "Message could not be sent. Please email us directly." }, 503);
  }

  const subject = `New enquiry from ${name}`.replace(/[\r\n]+/g, " ").slice(0, 150);
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "-"}`,
    `Interested in: ${serviceLabel(service)}`,
    "",
    message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || `${site.name} <onboarding@resend.dev>`,
        to: [process.env.CONTACT_TO_EMAIL || site.email],
        reply_to: email,
        subject,
        text,
      }),
    });

    if (!response.ok) {
      console.error("[contact] Resend rejected the request:", response.status, await response.text());
      return json({ ok: false, error: "Message could not be sent. Please email us directly." }, 502);
    }
  } catch (error) {
    console.error("[contact] Failed to reach Resend:", error);
    return json({ ok: false, error: "Message could not be sent. Please email us directly." }, 502);
  }

  return json({ ok: true });
}
