"use client";

import { useState } from "react";
import { Check, Target, RotateCw } from "lucide-react";
import type { Vertical, OrchestrationStep, OrchestrationTrack } from "@/data/types";
import { Overview } from "./Overview";
import styles from "./BusinessBrain.module.css";

type Props = {
  vertical: Vertical;
  businessName?: string;
};

const STEP_REVEAL_MS = 500;

export function BusinessBrain({ vertical, businessName }: Props) {
  const [replayKey, setReplayKey] = useState(0);
  const headerName = businessName?.trim() || vertical.archetypeBusinessName;

  return (
    <div className={styles.shell}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {headerName} — <span className={styles.accent}>running on AI</span>
        </h2>
        <span className={styles.live}>
          <span className={styles.liveDot} aria-hidden="true" />
          LIVE
        </span>
      </div>

      <section className={styles.section}>
        <Overview />
      </section>

      <section className={styles.section}>
        <p className={styles.eyebrow}>{vertical.fingerprint.eyebrow}</p>
        <h3 className={styles.sectionTitle}>
          The metrics you <span className={styles.accent}>actually live by</span>
        </h3>
        <div className={styles.fingerprintGrid}>
          {vertical.fingerprint.metrics.map((m) => (
            <div key={m.name} className={styles.metricCard}>
              <div className={styles.metricName}>{m.name}</div>
              <div className={styles.metricBenchmark}>{m.benchmark}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section} key={`orch-${replayKey}`}>
        <h3 className={styles.sectionTitle}>
          Watch it run the whole play — <span className={styles.accent}>from one trigger</span>
        </h3>
        <p className={styles.sectionSub}>
          One thing happens. The system fires down every track at once. Nobody touches it.
        </p>

        <div className={styles.trigger}>
          <span className={styles.triggerLabel}>TRIGGER</span>
          <span>{vertical.orchestration.trigger}</span>
        </div>

        <div className={styles.splits}>↓ splits into parallel tracks ↓</div>

        <div className={styles.tracks}>
          <Track track={vertical.orchestration.revenueTrack} startIndex={0} />
          <Track track={vertical.orchestration.relationshipTrack} startIndex={0} />
        </div>

        <div className={styles.outcome}>
          <Target className={styles.outcomeIcon} size={18} aria-hidden="true" />
          <span>{vertical.orchestration.outcome}</span>
        </div>

        <button
          type="button"
          className={styles.replay}
          onClick={() => setReplayKey((k) => k + 1)}
        >
          <RotateCw size={12} style={{ display: "inline", marginRight: 6, verticalAlign: "-2px" }} />
          Replay the system
        </button>
      </section>

      <section className={styles.section}>
        <p className={styles.eyebrow}>THE PATTERN WE SPOTTED</p>
        <h3 className={styles.sectionTitle}>
          And it spots <span className={styles.accent}>what you&apos;d miss</span>
        </h3>

        <div className={styles.predictiveBody}>
          <div className={styles.predictiveLeft}>
            <p className={styles.insight}>{vertical.predictive.insight}</p>
            {vertical.predictive.chart && (
              <PredictiveChart chart={vertical.predictive.chart} />
            )}
          </div>

          <div className={styles.predictiveRight}>
            <div className={styles.moveBlock}>
              <span className={styles.moveLabel}>THE MOVE</span>
              <div className={styles.moveBody}>{vertical.predictive.move}</div>
            </div>
            <p className={styles.consequence}>{vertical.predictive.consequence}</p>
            <p className={styles.teaser}>
              → Your full breakdown shows exactly where this is happening in your business — and the plan to fix it.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Track({ track, startIndex }: { track: OrchestrationTrack; startIndex: number }) {
  return (
    <div className={styles.track}>
      <div className={styles.trackLabel}>{track.label}</div>
      {track.steps.map((step, i) => (
        <Step key={`${track.label}-${i}`} step={step} delayMs={(startIndex + i) * STEP_REVEAL_MS} />
      ))}
    </div>
  );
}

function Step({ step, delayMs }: { step: OrchestrationStep; delayMs: number }) {
  return (
    <div
      className={`${styles.step} ${step.keyPlay ? styles.stepKey : ""}`}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <span className={styles.stepCheck} aria-hidden="true">
        <Check size={11} strokeWidth={3} />
      </span>
      {step.keyPlay && <span className={styles.keyBadge}>KEY PLAY</span>}
      <div className={styles.stepTitle}>{step.label}</div>
      {step.detail && <div className={styles.stepDetail}>{step.detail}</div>}
    </div>
  );
}

function PredictiveChart({
  chart,
}: {
  chart: Exclude<Vertical["predictive"]["chart"], false>;
}) {
  const maxVal = Math.max(chart.industryAverage.value, chart.yourPotential.value);
  const baseHeightPct = (chart.industryAverage.value / maxVal) * 100;
  const strongHeightPct = (chart.yourPotential.value / maxVal) * 100;

  const fmt = (v: number) =>
    chart.unit === "$"
      ? `$${v.toLocaleString()}`
      : chart.unit === "x"
      ? `${v}x`
      : `${v}%`;

  return (
    <div className={styles.chart}>
      <div className={styles.bar}>
        <div className={styles.barValue}>{fmt(chart.industryAverage.value)}</div>
        <div className={styles.barFillWrap}>
          <div
            className={`${styles.barFill} ${styles.barFillBase}`}
            style={{ height: `${baseHeightPct}%` }}
          />
        </div>
        <div className={styles.barLabel}>{chart.industryAverage.label}</div>
      </div>
      <div className={styles.bar}>
        <div className={styles.barValue}>{fmt(chart.yourPotential.value)}</div>
        <div className={styles.barFillWrap}>
          <div
            className={`${styles.barFill} ${styles.barFillStrong}`}
            style={{ height: `${strongHeightPct}%`, animationDelay: "0.25s" }}
          />
        </div>
        <div className={styles.barLabel}>{chart.yourPotential.label}</div>
      </div>
      <div className={styles.chartLabel}>{chart.label}</div>
    </div>
  );
}
