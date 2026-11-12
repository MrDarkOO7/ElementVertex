"use client";

import { useState } from "react";
import { useInterest } from "@/components/providers/InterestProvider";
import Button from "@/components/ui/Button";
import { site } from "@/content/site";
import { SERVICE_OPTIONS } from "@/lib/contact";
import styles from "./ContactForm.module.css";

const initialFields = { name: "", email: "", company: "", message: "", website: "" };

export default function ContactForm() {
  const { interest } = useInterest();
  const [fields, setFields] = useState(initialFields);
  const [pick, setPick] = useState({ base: "", value: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errors, setErrors] = useState({});

  // The select defaults to whatever the quiz / services explorer recorded,
  // but the visitor's own choice wins until a new suggestion arrives.
  const service = pick.base === interest ? pick.value : interest;

  const update = (event) => setFields((f) => ({ ...f, [event.target.name]: event.target.value }));

  async function onSubmit(event) {
    event.preventDefault();
    setStatus("sending");
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, service }),
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok && data.ok) {
        setStatus("sent");
        return;
      }
      if (data.errors) setErrors(data.errors);
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className={styles.done} role="status">
        <span className={styles.check} aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3>Message received.</h3>
        <p>
          Thank you, {fields.name.split(" ")[0] || "and welcome"}. We will read it carefully and get back to you to
          arrange your free call.
        </p>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form className={styles.form} onSubmit={onSubmit} aria-describedby="form-status">
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="cf-name">Your name</label>
          <input id="cf-name" name="name" required maxLength={100} autoComplete="name" value={fields.name} onChange={update} aria-invalid={Boolean(errors.name)} />
          {errors.name ? <p className={styles.error}>{errors.name}</p> : null}
        </div>
        <div className={styles.field}>
          <label htmlFor="cf-email">Email</label>
          <input id="cf-email" name="email" type="email" required maxLength={200} autoComplete="email" value={fields.email} onChange={update} aria-invalid={Boolean(errors.email)} />
          {errors.email ? <p className={styles.error}>{errors.email}</p> : null}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="cf-company">
            Business <span className={styles.optional}>(optional)</span>
          </label>
          <input id="cf-company" name="company" maxLength={120} autoComplete="organization" value={fields.company} onChange={update} />
        </div>
        <div className={styles.field}>
          <label htmlFor="cf-service">What do you need help with?</label>
          <select id="cf-service" value={service} onChange={(e) => setPick({ base: interest, value: e.target.value })}>
            <option value="">Choose one</option>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="cf-message">Tell us a little about your business and what you need</label>
        <textarea id="cf-message" name="message" required rows={5} maxLength={4000} value={fields.message} onChange={update} aria-invalid={Boolean(errors.message)} />
        {errors.message ? <p className={styles.error}>{errors.message}</p> : null}
      </div>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div className={styles.trap} aria-hidden="true">
        <label htmlFor="cf-website">Leave this field empty</label>
        <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" value={fields.website} onChange={update} />
      </div>

      <div className={styles.footer}>
        <Button type="submit" size="lg" arrow disabled={sending}>
          {sending ? "Sending…" : "Send message"}
        </Button>
        <p className={styles.privacy}>We only use your details to reply to you.</p>
      </div>

      <p id="form-status" className={styles.status} role="alert" hidden={status !== "error"}>
        Something went wrong sending that. Please try again, or email us at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </form>
  );
}
