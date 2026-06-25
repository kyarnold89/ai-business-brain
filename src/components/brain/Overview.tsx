"use client";

import Image from "next/image";
import { ShoppingBag, Settings, Megaphone, LifeBuoy } from "lucide-react";
import styles from "./Overview.module.css";

export function Overview() {
  return (
    <div>
      <p className={styles.caption}>
        Everything talks to everything — <span className={styles.captionAccent}>through one brain.</span>
      </p>

      <div className={styles.frame} aria-hidden="false">
        <svg className={styles.rings} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <circle
            className={styles.outerRing}
            cx="50" cy="50" r="46"
            fill="none"
            stroke="rgba(232,197,71,0.55)"
            strokeWidth="0.45"
            strokeDasharray="0.6 1.8"
            strokeLinecap="round"
          />
          <circle cx="50" cy="50" r="32" fill="none" stroke="rgba(247,243,234,0.18)" strokeWidth="0.4" />
          <circle cx="50" cy="50" r="18" fill="none" stroke="rgba(232,197,71,0.24)" strokeWidth="0.4" />

          <line x1="50" y1="50" x2="50" y2="6"  stroke="rgba(232,197,71,0.26)" strokeWidth="0.35" />
          <line x1="50" y1="50" x2="94" y2="50" stroke="rgba(232,197,71,0.26)" strokeWidth="0.35" />
          <line x1="50" y1="50" x2="50" y2="94" stroke="rgba(232,197,71,0.26)" strokeWidth="0.35" />
          <line x1="50" y1="50" x2="6"  y2="50" stroke="rgba(232,197,71,0.26)" strokeWidth="0.35" />
        </svg>

        <div className={styles.centerGlow} aria-hidden="true" />

        <div className={`${styles.ripple} ${styles.ripple1}`} aria-hidden="true" />
        <div className={`${styles.ripple} ${styles.ripple2}`} aria-hidden="true" />
        <div className={`${styles.ripple} ${styles.ripple3}`} aria-hidden="true" />

        <span className={`${styles.signalDot} ${styles.signalDotTop}`} />
        <span className={`${styles.signalDot} ${styles.signalDotRight}`} />
        <span className={`${styles.signalDot} ${styles.signalDotBottom}`} />
        <span className={`${styles.signalDot} ${styles.signalDotLeft}`} />

        <div className={`${styles.chip} ${styles.chipTop}`}>
          <ShoppingBag className={styles.chipIcon} aria-hidden="true" />
          <span>Sales</span>
        </div>
        <div className={`${styles.chip} ${styles.chipRight}`}>
          <Settings className={styles.chipIcon} aria-hidden="true" />
          <span>Operations</span>
        </div>
        <div className={`${styles.chip} ${styles.chipBottom}`}>
          <Megaphone className={styles.chipIcon} aria-hidden="true" />
          <span>Marketing</span>
        </div>
        <div className={`${styles.chip} ${styles.chipLeft}`}>
          <LifeBuoy className={styles.chipIcon} aria-hidden="true" />
          <span>Support</span>
        </div>

        <div className={styles.center}>
          <div className={styles.centerBreath}>
            <Image
              src="/assistant.png"
              alt="The Agent Augusta assistant"
              width={240}
              height={240}
              priority
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
