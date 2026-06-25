export type VerticalKey =
  | "hvac"
  | "dental"
  | "roofing"
  | "realestate"
  | "landscaping"
  | "homeservice"
  | "medspa"
  | "general";

export type PainKey = "leads" | "paperwork" | "scheduling" | "numbers";

export type FingerprintMetric = {
  name: string;
  benchmark: string;
};

export type OrchestrationStep = {
  label: string;
  detail?: string;
  keyPlay?: boolean;
};

export type OrchestrationTrack = {
  label: string;
  steps: OrchestrationStep[];
};

export type PredictiveChart =
  | false
  | {
      label: string;
      industryAverage: { label: string; value: number };
      yourPotential: { label: string; value: number };
      unit: "%" | "$" | "x";
    };

export type Vertical = {
  key: VerticalKey;
  intakeLabel: string;
  archetypeBusinessName: string;
  anchorTerm: string;

  fingerprint: {
    eyebrow: string;
    metrics: FingerprintMetric[];
  };

  orchestration: {
    trigger: string;
    revenueTrack: OrchestrationTrack;
    relationshipTrack: OrchestrationTrack;
    outcome: string;
  };

  predictive: {
    insight: string;
    chart: PredictiveChart;
    move: string;
    consequence: string;
  };

  tableStakes: string[];

  isGeneralFallback?: boolean;
};
