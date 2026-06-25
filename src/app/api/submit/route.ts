import { NextRequest, NextResponse } from "next/server";

/* =====================================================
   /api/submit — receives the email gate submission,
   validates server-side, forwards to Make.com webhook.
   ===================================================== */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;
const recentRequests = new Map<string, number[]>();

function getIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const arr = (recentRequests.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  if (arr.length >= RATE_LIMIT_MAX) {
    recentRequests.set(ip, arr);
    return false;
  }
  arr.push(now);
  recentRequests.set(ip, arr);
  return true;
}

function str(v: unknown, max = 200): string | undefined {
  if (typeof v !== "string") return undefined;
  const t = v.trim();
  if (!t) return undefined;
  return t.slice(0, max);
}

export async function POST(req: NextRequest) {
  const ip = getIP(req);
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot — bots fill this; humans don't see it.
  if (typeof body._hp === "string" && body._hp.length > 0) {
    return NextResponse.json({ success: true });
  }

  const email = str(body.email, 254)?.toLowerCase();
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const payload = {
    email,
    firstName: str(body.firstName, 80),
    businessName: str(body.businessName, 200),
    notes: str(body.notes, 1000),
    vertical: str(body.vertical, 50),
    painPoint: str(body.painPoint, 50),
    source: "ai-business-brain",
    timestamp: new Date().toISOString(),
    ip,
  };

  const webhook = process.env.MAKE_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        console.error(
          `[submit] Make webhook returned ${res.status}; payload was still captured.`
        );
      }
    } catch (e) {
      console.error("[submit] Make webhook fetch failed:", e);
      // Don't fail the user-facing request — capture is the priority
    }
  } else {
    console.log(
      "[submit] No MAKE_WEBHOOK_URL set. Captured payload locally:",
      payload
    );
  }

  return NextResponse.json({ success: true });
}
