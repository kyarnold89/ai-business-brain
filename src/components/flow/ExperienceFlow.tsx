"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { track } from "@vercel/analytics";
import { BusinessBrain } from "@/components/brain/BusinessBrain";
import { Gate, GATE_ELEMENT_ID } from "./Gate";
import { FloatingCTA } from "./FloatingCTA";
import { verticals, verticalOrder } from "@/data/verticals";
import type { PainKey, VerticalKey } from "@/data/types";
import styles from "./ExperienceFlow.module.css";

type Phase = "intake" | "building" | "brain";

const PAIN_OPTIONS: { key: PainKey; label: string }[] = [
  { key: "leads", label: "Winning new customers" },
  { key: "paperwork", label: "Drowning in paperwork" },
  { key: "scheduling", label: "Scheduling & the calendar" },
  { key: "numbers", label: "Knowing my numbers" },
];

const BUILDING_LINES = [
  "Reading how your business runs…",
  "Mapping your systems…",
  "Finding the quiet leaks…",
  "Assembling your snapshot…",
];

const BUILD_TOTAL_MS = 2600;

export function ExperienceFlow() {
  const [phase, setPhase] = useState<Phase>("intake");
  const [step, setStep] = useState<1 | 2>(1);
  const [verticalKey, setVerticalKey] = useState<VerticalKey | null>(null);
  const [pain, setPain] = useState<PainKey | "skip" | null>(null);
  const [businessName, setBusinessName] = useState("");
  const [buildLineIdx, setBuildLineIdx] = useState(0);
  const [gateSubmitted, setGateSubmitted] = useState(false);

  useEffect(() => {
    track("intake_started");
  }, []);

  useEffect(() => {
    if (phase === "brain" && verticalKey) {
      track("brain_revealed", { vertical: verticalKey });
    }
  }, [phase, verticalKey]);

  useEffect(() => {
    if (phase !== "building") return;

    const perLine = BUILD_TOTAL_MS / BUILDING_LINES.length;
    let i = 0;
    const ticker = setInterval(() => {
      i += 1;
      if (i < BUILDING_LINES.length) setBuildLineIdx(i);
    }, perLine);

    const advance = setTimeout(() => setPhase("brain"), BUILD_TOTAL_MS);

    return () => {
      clearInterval(ticker);
      clearTimeout(advance);
    };
  }, [phase]);

  const handleQ1 = (k: VerticalKey) => {
    track("vertical_selected", { vertical: k });
    setVerticalKey(k);
    setStep(2);
  };

  const handleQ2 = (p: PainKey | "skip") => {
    track("pain_selected", { pain: p });
    setPain(p);
    setBuildLineIdx(0);
    setPhase("building");
  };

  if (phase === "brain" && verticalKey) {
    return (
      <div className={styles.shell}>
        <BusinessBrain vertical={verticals[verticalKey]} businessName={businessName} />
        <Gate
          verticalKey={verticalKey}
          painPoint={pain}
          businessName={businessName}
          onSubmittedChange={setGateSubmitted}
        />
        <FloatingCTA gateElementId={GATE_ELEMENT_ID} hidden={gateSubmitted} />
      </div>
    );
  }

  if (phase === "building") {
    return (
      <div className={styles.shell}>
        <div className={styles.building}>
          <Image
            src="/assistant.png"
            alt=""
            width={200}
            height={200}
            priority
            className={styles.buildBot}
          />
          <p className={styles.buildEyebrow}>BUILDING YOUR SNAPSHOT</p>
          <p key={buildLineIdx} className={styles.buildLine}>
            {BUILDING_LINES[buildLineIdx]}
          </p>
          <div className={styles.buildBar}>
            <div className={styles.buildBarFill} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.shell}>
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>THE AGENT AUGUSTA BUSINESS BRAIN</p>
          <h1 className={styles.heroTitle}>
            See your business running on{" "}
            <span className={styles.accent}>AI</span> — in about 15 seconds.
          </h1>
          <p className={styles.heroSub}>
            Answer two quick questions and watch a live snapshot of your business
            operating on autopilot — the leaks it would close and the work it
            would run for you.
          </p>
          <div className={styles.trustRow}>
            <span className={styles.trustChip}>Takes ~15 seconds</span>
            <span className={styles.trustChip}>No signup to see it</span>
            <span className={styles.trustChip}>Built for CSRA businesses</span>
          </div>
        </div>
        <div className={styles.heroRight}>
          <Image
            src="/assistant.png"
            alt="The Agent Augusta assistant"
            width={320}
            height={320}
            priority
            className={styles.heroBot}
          />
        </div>
      </section>

      <section className={styles.intake}>
        {step === 1 && (
          <div className={styles.step} key="step1">
            <p className={styles.stepEyebrow}>QUESTION 1 OF 2</p>
            <h2 className={styles.stepTitle}>What kind of business do you run?</h2>
            <div className={styles.chipGrid}>
              {verticalOrder.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => handleQ1(k)}
                  className={styles.chip}
                >
                  {verticals[k].intakeLabel}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={styles.step} key="step2">
            <div className={styles.accessory}>
              <label htmlFor="bizname" className={styles.accessoryLabel}>
                Make it yours — optional
              </label>
              <input
                id="bizname"
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Your business name (e.g. Smith Plumbing)"
                className={styles.nameInput}
                autoComplete="organization"
              />
              <p className={styles.accessoryHint}>
                We&apos;ll use it in your snapshot if you add it. Either way, tap an
                answer below to continue.
              </p>
            </div>

            <p className={styles.stepEyebrow}>QUESTION 2 OF 2 · OPTIONAL</p>
            <h2 className={styles.stepTitle}>What eats up most of your time?</h2>
            <p className={styles.chipHint}>Tap one to see your snapshot.</p>

            <div className={styles.chipGrid}>
              {PAIN_OPTIONS.map((p) => (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => handleQ2(p.key)}
                  className={styles.chip}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => handleQ2("skip")}
              className={styles.skip}
            >
              Skip — just show me my snapshot →
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
