"use client";

import { useEffect, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { track } from "@vercel/analytics";
import styles from "./FloatingCTA.module.css";

type Props = {
  gateElementId: string;
  hidden?: boolean;
};

export function FloatingCTA({ gateElementId, hidden = false }: Props) {
  const [armed, setArmed] = useState(false);
  const [gateInView, setGateInView] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  // Arm after the gate has had time to fade in
  useEffect(() => {
    const t = setTimeout(() => setArmed(true), 4000);
    return () => clearTimeout(t);
  }, []);

  // Watch whether the gate is currently visible in the viewport
  useEffect(() => {
    const el = document.getElementById(gateElementId);
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setGateInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [gateElementId]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    track("floating_cta_clicked");
    const el = document.getElementById(gateElementId);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      const emailInput = document.getElementById("email") as HTMLInputElement | null;
      emailInput?.focus({ preventScroll: true });
    }, 650);
  };

  const shown = armed && !gateInView && !dismissed && !hidden;

  return (
    <div
      className={`${styles.bar} ${shown ? styles.barShown : ""}`}
      role="region"
      aria-label="Get your custom breakdown"
    >
      <span className={styles.label}>Your snapshot&apos;s ready —</span>
      <a href={`#${gateElementId}`} onClick={handleClick} className={styles.button}>
        Claim your breakdown
        <ArrowRight size={16} aria-hidden="true" />
      </a>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className={styles.dismiss}
        aria-label="Dismiss"
      >
        <X size={14} aria-hidden="true" />
      </button>
    </div>
  );
}
