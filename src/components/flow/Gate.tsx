"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ArrowRight, Calendar } from "lucide-react";
import { track } from "@vercel/analytics";
import type { PainKey, VerticalKey } from "@/data/types";
import { GHL_CALENDAR_URL, SOURCE } from "@/data/constants";
import styles from "./Gate.module.css";

type Props = {
  verticalKey: VerticalKey;
  painPoint: PainKey | "skip" | null;
  businessName: string;
  onSubmittedChange?: (submitted: boolean) => void;
};

const BULLETS = [
  "Your 2–3 biggest opportunities — and the plays that close them",
  "Which one to roll out first, and the order to build the rest",
  "What it actually takes to make it real — no fluff",
];

const NEXT_STEPS = [
  "We review your snapshot — vertical, pain, the plays that match.",
  "We map your 2–3 highest-impact plays to your business.",
  "You get your custom breakdown in your inbox.",
];

export const GATE_ELEMENT_ID = "brain-gate";

export function Gate({ verticalKey, painPoint, businessName, onSubmittedChange }: Props) {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [notes, setNotes] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollAnchor = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(true);
      track("gate_shown", { vertical: verticalKey });
    }, 3500);
    return () => clearTimeout(t);
  }, [verticalKey]);

  useEffect(() => {
    onSubmittedChange?.(submitted);
    if (submitted) scrollAnchor.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [submitted, onSubmittedChange]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (honeypot) return;
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          firstName: firstName.trim() || undefined,
          businessName: businessName.trim() || undefined,
          notes: notes.trim() || undefined,
          vertical: verticalKey,
          painPoint: painPoint && painPoint !== "skip" ? painPoint : undefined,
          source: SOURCE,
          timestamp: new Date().toISOString(),
          _hp: honeypot,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Something went wrong.");
      }
      track("email_submitted", {
        vertical: verticalKey,
        pain: painPoint ?? "none",
        hasName: businessName.trim() ? "yes" : "no",
        hasNotes: notes.trim() ? "yes" : "no",
      });
      setSubmitted(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "We couldn't send that just now. Try again in a moment.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div id={GATE_ELEMENT_ID} className={styles.wrap} ref={scrollAnchor}>
        <div className={`${styles.capture} ${styles.visible}`}>
          <div className={styles.captureInner}>
            <p className={styles.eyebrow}>GOT IT</p>
            <h2 className={styles.captureTitle}>
              We&apos;re <span className={styles.accent}>on it.</span>
            </h2>
            <p className={styles.captureSub}>
              We&apos;ll review your snapshot and send your custom breakdown to{" "}
              <span className={styles.emailHighlight}>{email}</span>
              {" "}as soon as it&apos;s ready.
            </p>

            <div className={styles.steps}>
              {NEXT_STEPS.map((s, i) => (
                <div key={i} className={styles.stepCard}>
                  <span className={styles.stepNum}>{i + 1}</span>
                  <p className={styles.stepBody}>{s}</p>
                </div>
              ))}
            </div>

            <div className={styles.calendarRow}>
              <p className={styles.calendarLead}>Want to jump the line?</p>
              <a
                href={GHL_CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.calendarBtn}
                onClick={() => track("calendar_clicked", { vertical: verticalKey })}
              >
                <Calendar size={16} aria-hidden="true" />
                Book a 15-min walkthrough
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id={GATE_ELEMENT_ID} className={styles.wrap}>
      <div className={`${styles.gate} ${visible ? styles.visible : ""}`}>
        <div className={styles.body}>
          <div>
            <p className={styles.eyebrow}>YOUR SNAPSHOT IS COMPLETE</p>
            <h2 className={styles.title}>
              You&apos;ve seen what&apos;s possible.{" "}
              <span className={styles.accent}>Now we&apos;ll build it with you.</span>
            </h2>
            <p className={styles.sub}>
              Drop your email and we&apos;ll send you a custom breakdown — your 2–3
              biggest plays and the order to make them in.
            </p>

            <ul className={styles.bullets}>
              {BULLETS.map((b) => (
                <li key={b} className={styles.bullet}>
                  <span className={styles.bulletIcon}>
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div>
              <label className={styles.formLabel} htmlFor="firstName">First name (optional)</label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Ky"
                className={styles.input}
                autoComplete="given-name"
              />
            </div>

            <div>
              <label className={styles.formLabel} htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourbusiness.com"
                className={styles.input}
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label className={styles.formLabel} htmlFor="notes">
                Anything specific you&apos;d want us to focus on? (optional)
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Whatever's on your mind — a bottleneck, a metric, a goal."
                className={styles.textarea}
                rows={3}
                maxLength={1000}
              />
            </div>

            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className={styles.honeypot}
              aria-hidden="true"
            />

            <button type="submit" disabled={submitting} className={styles.submit}>
              {submitting ? "Sending…" : "Send me my custom breakdown"}
              {!submitting && <ArrowRight size={18} aria-hidden="true" />}
            </button>

            {error && <p className={styles.error}>{error}</p>}

            <p className={styles.privacy}>
              Just your email — no spam, no credit card.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
