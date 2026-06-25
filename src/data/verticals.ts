import type { Vertical, VerticalKey } from "./types";

/* =========================================================
   HVAC
   ========================================================= */
export const hvac: Vertical = {
  key: "hvac",
  intakeLabel: "HVAC",
  archetypeBusinessName: "Evans Air & Heat",
  anchorTerm: "first-time-fix",

  fingerprint: {
    eyebrow: "THE METRICS YOU ACTUALLY LIVE BY",
    metrics: [
      { name: "First-time-fix rate", benchmark: "70–80% typical · 80%+ excellent" },
      { name: "How many service calls become maintenance plans", benchmark: "15–30% typical · 30–50% strong" },
      { name: "What jobs are really worth — by type", benchmark: "Service vs. repair vs. replacement read completely different" },
    ],
  },

  orchestration: {
    trigger: "A service call wraps up at a customer's home.",
    revenueTrack: {
      label: "Revenue track",
      steps: [
        { label: "Replacement-window scoring", detail: "If their system is aging past 12 years, the homeowner is quietly added to a pre-warm nurture — months before it breaks.", keyPlay: true },
        { label: "Maintenance plan offered, matched to the call", detail: "A good-better-best plan is presented, not pitched." },
        { label: "Financing surfaced at replacement", detail: "If they're ready to replace, financing is on the table without anyone asking." },
      ],
    },
    relationshipTrack: {
      label: "Relationship track",
      steps: [
        { label: "Decline path is tagged, not dropped", detail: "If they pass on the plan today, they're auto-tagged for a seasonal re-touch — spring AC, fall furnace.", keyPlay: true },
        { label: "Review request fires after the job", detail: "Quietly, at the right moment, to the right customer." },
        { label: "Seasonal pre-booking enrolled", detail: "Standing tune-ups booked before the season — not chased after it starts." },
      ],
    },
    outcome: "Replacement pipeline alive, plan attached, customer retained — zero admin touches.",
  },

  predictive: {
    insight:
      "Most shops only offer a maintenance plan on about 1 in 5 eligible service calls. Those silent passes are the same homeowners who'd be your $9K replacement in three years.",
    chart: {
      label: "Service calls converted to a maintenance plan",
      industryAverage: { label: "Typical shop", value: 22 },
      yourPotential: { label: "Strong shops", value: 45 },
      unit: "%",
    },
    move:
      "Auto-present a plan on every eligible service call — and tag every decline for a seasonal re-touch instead of forgetting them.",
    consequence:
      "Closing 20 of the calls you're missing this year keeps the replacement pipeline alive — $150K+ of future revenue you're currently giving back.",
  },

  tableStakes: ["Missed-call text-back", "Post-job review request", "Estimate follow-up reminder"],
};

/* =========================================================
   DENTAL
   ========================================================= */
export const dental: Vertical = {
  key: "dental",
  intakeLabel: "Dental",
  archetypeBusinessName: "Riverbend Family Dental",
  anchorTerm: "chair time",

  fingerprint: {
    eyebrow: "THE METRICS YOU ACTUALLY LIVE BY",
    metrics: [
      { name: "Chair time actually producing", benchmark: "75–85% typical · 85%+ top practices" },
      { name: "Hygiene patients leaving with the next visit booked", benchmark: "77% average · 94% top performers" },
      { name: "Treatment a patient was told they need — and never booked", benchmark: "55–65% acceptance median · 75%+ top quartile" },
    ],
  },

  orchestration: {
    trigger: "A hygiene visit just wrapped up.",
    revenueTrack: {
      label: "Revenue track",
      steps: [
        { label: "Diagnosed treatment surfaced, not buried in the chart", detail: "Every restoration mentioned in the room is logged and queued for follow-up — not lost in the note.", keyPlay: true },
        { label: "Insurance benefit window checked automatically", detail: "If their benefits expire soon, the outreach leads with that." },
        { label: "Financing surfaced if treatment is large", detail: "Payment options on the table without the front desk fishing for them." },
      ],
    },
    relationshipTrack: {
      label: "Relationship track",
      steps: [
        { label: "Hygiene gap predicted a week out and pre-filled", detail: "Empty chair time is forecast in advance and filled from a short-call list of patients who'd take an earlier slot.", keyPlay: true },
        { label: "Recall reminder timed to actual cadence", detail: "Personalized to this patient's history, not a generic blast." },
        { label: "Review request fires after the visit" },
      ],
    },
    outcome: "Open treatment booked, hygiene chair full, every patient retained — zero admin touches.",
  },

  predictive: {
    insight:
      "Most practices have 25–35% of last quarter's diagnosed treatment still sitting unbooked in the chart. That's already-earned demand quietly expiring.",
    chart: {
      label: "Chair time actually producing",
      industryAverage: { label: "Typical practice", value: 75 },
      yourPotential: { label: "Top performers", value: 88 },
      unit: "%",
    },
    move:
      "Auto-surface every patient with open treatment and expiring benefits, and pre-fill hygiene gaps from a short-call list before the day starts empty.",
    consequence:
      "A 10-point chair-time gain across four operatories is about $120K a year — at identical pricing.",
  },

  tableStakes: ["Appointment reminders", "Missed-call text-back", "Post-visit review request"],
};

/* =========================================================
   ROOFING
   ========================================================= */
export const roofing: Vertical = {
  key: "roofing",
  intakeLabel: "Roofing",
  archetypeBusinessName: "CSRA Roofing Co.",
  anchorTerm: "close rate by lead source",

  fingerprint: {
    eyebrow: "THE METRICS YOU ACTUALLY LIVE BY",
    metrics: [
      { name: "Close rate by lead source", benchmark: "Referral 55–70% · retail 45–60% · portal leads under 3%" },
      { name: "What every job is actually making — by type", benchmark: "Residential re-roof 35–45% margin · new construction often less than half that" },
      { name: "How fast you get to a new lead", benchmark: "Under 5 minutes = up to 21x conversion · most contractors take hours" },
    ],
  },

  orchestration: {
    trigger: "A new lead just hit your inbox.",
    revenueTrack: {
      label: "Revenue track",
      steps: [
        { label: "Source-aware response under 5 minutes", detail: "The lead is scored by source, high-value ones get instant outreach, and follow-up is multi-touch — not a single voicemail.", keyPlay: true },
        { label: "Estimate sent, supplement checklist ready", detail: "If insurance, legitimate line items are surfaced for the supplement before the adjuster shows up." },
        { label: "Financing offered at close" },
      ],
    },
    relationshipTrack: {
      label: "Relationship track",
      steps: [
        { label: "Unsold estimates worked, not forgotten", detail: "Estimates that don't close in N days fire a multi-touch recovery sequence — most shops never work the unsold pile.", keyPlay: true },
        { label: "Storm event in your area → outreach to past customers and their neighbors" },
        { label: "Review request after the job" },
      ],
    },
    outcome: "Estimates closed, unsold pile worked, every lead source paid out — zero admin touches.",
  },

  predictive: {
    insight:
      "Following up on unsold estimates recovers 10–20% of jobs that would otherwise quietly die. Most shops never systematically work that pile.",
    chart: {
      label: "Unsold estimates actually worked",
      industryAverage: { label: "Most shops", value: 5 },
      yourPotential: { label: "Recoverable", value: 18 },
      unit: "%",
    },
    move:
      "Auto-launch a multi-touch recovery sequence on every unsold estimate at the 5-day mark, and route every new lead by source-expected close rate.",
    consequence:
      "Recovering 15% of last year's unsold estimates on a typical book is $80–120K of pure margin — no new leads needed.",
  },

  tableStakes: ["Post-job review requests", "Missed-call text-back", "Estimate appointment confirmations"],
};

/* =========================================================
   REAL ESTATE
   ========================================================= */
export const realestate: Vertical = {
  key: "realestate",
  intakeLabel: "Real estate",
  archetypeBusinessName: "The Augusta Property Group",
  anchorTerm: "speed-to-lead",

  fingerprint: {
    eyebrow: "THE METRICS YOU ACTUALLY LIVE BY",
    metrics: [
      { name: "Speed-to-lead — how fast a new lead actually gets contacted", benchmark: "Under 5 min = 9–21x conversion · 78% choose the first responder" },
      { name: "How many past clients and referrals you actually touch each month", benchmark: "200+ with monthly cadence = 15–20 transactions a year" },
      { name: "Where your closed deals are really coming from", benchmark: "Sphere/referral 15–25% · portals under 3% · most agents spend the same on both" },
    ],
  },

  orchestration: {
    trigger: "A new lead just submitted — any source.",
    revenueTrack: {
      label: "Revenue track",
      steps: [
        { label: "Instant response, multi-channel, 14-touch cadence", detail: "Speed-to-lead under 5 minutes, then a 14-touch sequence — most agents stop after 2.", keyPlay: true },
        { label: "Cold leads tagged for long nurture", detail: "Portal browsers often search 8–12 months. They stay in cadence." },
        { label: "Showing booked → instant calendar confirm" },
      ],
    },
    relationshipTrack: {
      label: "Relationship track",
      steps: [
        { label: "Likely-to-move scoring on your sphere", detail: "Past clients near the 7-year move mark, with equity and life events, surface as a warm list — the highest-converting one you're not working.", keyPlay: true },
        { label: "Monthly value-touch on the whole database", detail: "Market update, equity check — runs whether or not you remember." },
        { label: "Anniversary check-in and referral ask after positive engagement" },
      ],
    },
    outcome: "Every lead worked, the sphere alive, repeat & referral compounding — zero admin touches.",
  },

  predictive: {
    insight:
      "You don't have a lead-volume problem. The sphere converts at 15–25% and the average agent isn't working it — while spending the same money on portal leads that close under 3%.",
    chart: {
      label: "Conversion by lead source",
      industryAverage: { label: "Portal leads", value: 3 },
      yourPotential: { label: "Sphere/referral", value: 20 },
      unit: "%",
    },
    move:
      "Run a standing monthly sphere cadence on autopilot, and surface the database contacts most likely to move this year — without you remembering.",
    consequence:
      "Turning 5% of your sphere into a working pipeline is 8–12 extra closings a year on the existing book — no new marketing dollars.",
  },

  tableStakes: ["Web-form auto-reply", "Missed-call text-back", "Listing-alert drips"],
};

/* =========================================================
   LANDSCAPING
   ========================================================= */
export const landscaping: Vertical = {
  key: "landscaping",
  intakeLabel: "Landscaping",
  archetypeBusinessName: "Greenline Property Care",
  anchorTerm: "route density",

  fingerprint: {
    eyebrow: "THE METRICS YOU ACTUALLY LIVE BY",
    metrics: [
      { name: "Route density — how tightly your stops cluster", benchmark: "5–10 mile clusters · the single biggest profit lever you have" },
      { name: "Maintenance versus enhancements — what revenue actually splits into", benchmark: "60–75% recurring / 25–40% enhancement is healthy" },
      { name: "How many customers you keep year over year", benchmark: "75–80% retention typical · 90%+ top performers" },
    ],
  },

  orchestration: {
    trigger: "A new customer just signed up for maintenance.",
    revenueTrack: {
      label: "Revenue track",
      steps: [
        { label: "Auto-clustered into the nearest existing route", detail: "Route density protected from day one — no scattered stops eating margin in drive time.", keyPlay: true },
        { label: "Enhancement upsell offered at the right seasonal moment", detail: "Hardscape, irrigation, mulch — timed to spring/summer instead of just hoping." },
        { label: "Membership or package offered after the first season" },
      ],
    },
    relationshipTrack: {
      label: "Relationship track",
      steps: [
        { label: "At-risk accounts flagged before they cancel", detail: "Missed payments, complaints, no enhancement in 12 months — surfaced as a save list weeks before the cancellation email comes.", keyPlay: true },
        { label: "Seasonal cadence year-round", detail: "Spring cleanup → mowing → fall cleanup → dormant pruning, no one remembering to send it." },
        { label: "Review request after each season" },
      ],
    },
    outcome: "Routes tight, churn flagged early, enhancements sold — zero admin touches.",
  },

  predictive: {
    insight:
      "Acquiring 10% of customers monthly while losing 8% to churn is paying CAC to tread water. The cheaper lever is the book you already have — and most owners aren't working it.",
    chart: {
      label: "Customer retention rate",
      industryAverage: { label: "Typical book", value: 77 },
      yourPotential: { label: "Top performers", value: 92 },
      unit: "%",
    },
    move:
      "Surface every at-risk account before they cancel, and run a standing enhancement-upsell campaign timed to season — to the customers you already have.",
    consequence:
      "Cutting churn 8 points on a 400-account book keeps roughly $250K in revenue you'd otherwise be paying to replace.",
  },

  tableStakes: ["Review requests after service", "Missed-call text-back", "Invoicing reminders"],
};

/* =========================================================
   HOMESERVICE — Plumbing-flavored generic (HVAC-pattern model)
   ========================================================= */
export const homeservice: Vertical = {
  key: "homeservice",
  intakeLabel: "Plumbing",
  archetypeBusinessName: "Riverline Plumbing",
  anchorTerm: "first-time-fix",

  fingerprint: {
    eyebrow: "THE METRICS YOU ACTUALLY LIVE BY",
    metrics: [
      { name: "First-time-fix rate", benchmark: "70–80% typical · 80%+ excellent" },
      { name: "How many calls become a service plan", benchmark: "10–20% typical · 25%+ strong" },
      { name: "Repeat customer rate", benchmark: "30–50% on retained books · biggest predictor of next year's revenue" },
    ],
  },

  orchestration: {
    trigger: "A service call just wrapped at a customer's home.",
    revenueTrack: {
      label: "Revenue track",
      steps: [
        { label: "Service plan offered, matched to the call", detail: "Plan members come back 2–3x more often — the attach moment is right after a successful job, not a cold call later.", keyPlay: true },
        { label: "Quote sent in-truck with multiple options", detail: "Good-better-best, not a single price they have to negotiate." },
        { label: "Financing surfaced if the work is big enough" },
      ],
    },
    relationshipTrack: {
      label: "Relationship track",
      steps: [
        { label: "Win-back launched if the customer goes quiet", detail: "Customers who haven't called in 12+ months get a check-in before they call someone else.", keyPlay: true },
        { label: "Seasonal maintenance reminder fires automatically" },
        { label: "Review request after the job" },
      ],
    },
    outcome: "Plans attached, lapsed customers won back, no quote left dangling — zero admin touches.",
  },

  predictive: {
    insight:
      "Most home-service shops attach a service plan on roughly 1 in 6 eligible calls. Those passed-on customers are the same ones who call a competitor next year.",
    chart: {
      label: "Service calls converted to a plan",
      industryAverage: { label: "Typical shop", value: 16 },
      yourPotential: { label: "Strong shops", value: 30 },
      unit: "%",
    },
    move:
      "Auto-offer a plan on every eligible call, and run a quiet win-back sequence on customers who haven't called in 12+ months.",
    consequence:
      "Doubling plan attach on 1,000 annual service calls keeps a couple hundred thousand in recurring revenue you're currently giving to the next-cheapest contractor.",
  },

  tableStakes: ["Missed-call text-back", "Post-job review request", "Estimate follow-up reminder"],
};

/* =========================================================
   MEDSPA — Runs like dental (repeat-visit LTV model)
   ========================================================= */
export const medspa: Vertical = {
  key: "medspa",
  intakeLabel: "Med spa / wellness",
  archetypeBusinessName: "Riverbank Aesthetics",
  anchorTerm: "rebooking rate",

  fingerprint: {
    eyebrow: "THE METRICS YOU ACTUALLY LIVE BY",
    metrics: [
      { name: "Rebooking rate — clients who leave with the next visit booked", benchmark: "Varies widely · 70%+ separates a steady book from a leaky one" },
      { name: "Recommended treatments accepted vs. quietly skipped", benchmark: "The lifetime value lives in the series, not the single visit" },
      { name: "Idle provider and room time", benchmark: "An empty hour never comes back · high-margin, perishable" },
    ],
  },

  orchestration: {
    trigger: "A treatment visit just wrapped up.",
    revenueTrack: {
      label: "Revenue track",
      steps: [
        { label: "Recommended next service logged with the right interval", detail: "What the provider said next is captured in the moment — and surfaces again at the right cycle, not three months too late.", keyPlay: true },
        { label: "Package or membership offered at the right visit", detail: "After repeat visits, the math on a package becomes obvious — but only if someone asks." },
        { label: "Financing surfaced if treatment is large" },
      ],
    },
    relationshipTrack: {
      label: "Relationship track",
      steps: [
        { label: "Cycle-based rebook outreach", detail: "Clients overdue for their treatment cycle get a personalized nudge before they shop elsewhere.", keyPlay: true },
        { label: "Idle slot backfilled from a short-call list" },
        { label: "Review request after the visit" },
      ],
    },
    outcome: "Repeat visits booked, packages attached, idle hours filled — zero admin touches.",
  },

  predictive: {
    insight:
      "Clients who come once and never rebook are where the lifetime value silently dies. The wallet is in the series — and the rebook conversation rarely happens at checkout.",
    chart: {
      label: "Clients who rebook the next visit at checkout",
      industryAverage: { label: "Industry average", value: 45 },
      yourPotential: { label: "Top spas", value: 75 },
      unit: "%",
    },
    move:
      "Surface every client overdue for their treatment cycle, and backfill idle provider hours from a short-call list before the day starts.",
    consequence:
      "Lifting rebook by 20 points on a 500-client book is six-figure recurring revenue you're already operationally ready to handle.",
  },

  tableStakes: ["Appointment reminders", "Missed-call text-back", "Review requests"],
};

/* =========================================================
   GENERAL — Local-business fallback. NO BLANKS.
   ========================================================= */
export const general: Vertical = {
  key: "general",
  intakeLabel: "Something else",
  archetypeBusinessName: "A local business like yours",
  anchorTerm: "",
  isGeneralFallback: true,

  fingerprint: {
    eyebrow: "THE METRICS MOST LOCAL OPERATORS LIVE BY",
    metrics: [
      { name: "Repeat customer rate", benchmark: "Most local SMBs 20–40% · top operators 50%+" },
      { name: "Customers on a plan or package", benchmark: "The biggest margin lever most owners under-pitch" },
      { name: "How booked you stay — idle capacity", benchmark: "Empty hours or days never come back" },
    ],
  },

  orchestration: {
    trigger: "A customer interaction just wrapped — a job, a visit, a call.",
    revenueTrack: {
      label: "Revenue track",
      steps: [
        { label: "The right next offer surfaces at the right moment", detail: "Plan, package, or upgrade — matched to what just happened, not a generic blast.", keyPlay: true },
        { label: "Estimate or quote follows up automatically" },
        { label: "Payment or financing options surfaced where it fits" },
      ],
    },
    relationshipTrack: {
      label: "Relationship track",
      steps: [
        { label: "Quiet customers get re-engaged before they're gone", detail: "Anyone who hasn't bought in N months is surfaced — before they shop somewhere else.", keyPlay: true },
        { label: "Past customers stay on a standing cadence" },
        { label: "Review request fires at the right window" },
      ],
    },
    outcome: "Right offer at the right moment, customers retained, none forgotten — zero admin touches.",
  },

  predictive: {
    insight:
      "Across nearly every local business, the leak isn't lead volume. It's the customers you already paid to acquire who quietly stop buying — and the next-best offer that's never made at the right moment.",
    chart: false,
    move:
      "Surface every customer with a likely next purchase and the right window for the offer, before they look anywhere else.",
    consequence:
      "This is our general local-business model — the pattern holds across most service businesses. On a quick call we'd plug in your exact numbers.",
  },

  tableStakes: ["Missed-call text-back", "Review requests", "Appointment confirmations"],
};

/* ========================================================= */

export const verticals: Record<VerticalKey, Vertical> = {
  hvac,
  dental,
  roofing,
  realestate,
  landscaping,
  homeservice,
  medspa,
  general,
};

export const verticalOrder: VerticalKey[] = [
  "hvac",
  "dental",
  "roofing",
  "realestate",
  "landscaping",
  "homeservice",
  "medspa",
  "general",
];

export function getVertical(key: VerticalKey): Vertical {
  return verticals[key];
}
