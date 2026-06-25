# The Agent Augusta Business Brain

An interactive lead-generation tool for Agent Augusta — a self-serve "demo disguised as an audit" that shows a local business owner what their business would look like running on AI, then captures their email to start a nurture sequence in GoHighLevel.

Live at: **brain.agentaugusta.com**

Tech: Next.js (App Router) + TypeScript + Tailwind, hosted on Vercel. No database — email submissions flow through one server-side API route into Make.com.

---

## Running it on your computer

1. Open a terminal in this folder.
2. Install dependencies (only needed the first time):
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open **http://localhost:3000** in your browser.

The page auto-reloads whenever a file changes.

---

## Connecting the email to your CRM (Make.com → GoHighLevel)

This is the plumbing that turns every email submission into a tagged contact in GoHighLevel. Setup is one-time.

### 1. Create the Make.com scenario

1. Sign in to **Make.com** and click **Create a new scenario**.
2. Add a module: search **Webhooks → Custom webhook**.
3. Click **Add**, give the webhook a name like `AI Business Brain submissions`, and **Save**.
4. Make.com will show you a webhook URL (looks like `https://hook.us1.make.com/abc123…`). **Copy it.**
5. Click **OK**. The scenario is now listening.

### 2. Tell this project where to send submissions

An **environment variable** is just a setting that lives outside the code (so secrets don't get committed).

**Locally on your computer:**
- In this folder, create a file named `.env.local` (note the leading dot).
- Paste this line into it, replacing the URL with the one Make.com gave you:
  ```
  MAKE_WEBHOOK_URL=https://hook.us1.make.com/abc123...
  ```
- Stop the dev server (Ctrl+C in the terminal) and run `npm run dev` again so it picks up the new setting.

**On Vercel (production):**
- Go to your Vercel dashboard → this project → **Settings** → **Environment Variables**.
- Add `MAKE_WEBHOOK_URL` with the same Make.com URL as the value. Select all three environments (Production, Preview, Development).
- Redeploy the project so the new variable takes effect.

### 3. Add the GoHighLevel module in Make

Back in Make.com, after your webhook module:

1. Click the **+** to add a module → search **GoHighLevel** → **Create/Update Contact**.
2. Connect your GoHighLevel account if you haven't already.
3. Map the fields from the webhook to the contact:
   - Email → `email`
   - First Name → `firstName`
   - Company → `businessName`
4. Add **tags** (these let you segment in GHL):
   - `brain-{{vertical}}` — e.g. `brain-hvac`, `brain-dental`
   - `pain-{{painPoint}}` — e.g. `pain-leads` (skipped if they tapped "Skip")
   - `source-ai-business-brain`
5. Add another GoHighLevel module: **Add Contact to Workflow** → pick your nurture workflow.
6. **Run once** with a test submission to verify the flow.

### 4. Test it end to end

1. Open the live site and run through the flow — pick a vertical, type a fake business name, submit your real email at the gate.
2. In Make.com, open the scenario → **History** → confirm the submission shows up.
3. In GoHighLevel → **Contacts** → confirm the new contact landed with the right tags.

### What the API sends

The payload Make receives on every submission:

```json
{
  "email": "owner@business.com",
  "firstName": "Ky",
  "businessName": "Smith Plumbing",
  "notes": "Mostly need help with scheduling and follow-up.",
  "vertical": "hvac",
  "painPoint": "leads",
  "source": "ai-business-brain",
  "timestamp": "2026-06-24T18:30:00.000Z",
  "ip": "1.2.3.4"
}
```

Anything optional (firstName, businessName, notes, painPoint) is omitted when not provided. In your Make scenario, map `notes` to a GoHighLevel custom field (or Airtable column) so you can read what the prospect typed before the call.

---

## Source-of-truth content

All vertical content (the operational metrics, headline plays, predictive insights, gap analysis) is extracted from the `industry-operations` skill and lives in `src/data/verticals.ts`. To add or update a vertical: edit that one file. The intake chips and brain auto-pick it up.

The `general` fallback ("Something else") never shows blanks — it uses honest universal ranges and a calm "we'd plug in your exact numbers on a call" note.

---

## Brand quick-reference

- **Colors:** Forest `#4A7359` · Mustard `#E8C547` (≤5% accent) · Cream `#F7F3EA` · Charcoal `#1A1A1A` · Slate `#3D4A5C`
- **Fonts:** Inter (UI/body) + Fraunces (display headlines)
- **Assistant character:** the green robot head. In public copy, call it "the assistant" or "interface head" — never "RealBot."

---

## Deploying to Vercel

1. Push this folder to GitHub.
2. In Vercel → **Add New → Project** → import the repo. Next.js is auto-detected; no config needed.
3. Add the `MAKE_WEBHOOK_URL` environment variable (Step 2 above).
4. Hit **Deploy**.
5. After it's live: go to **Settings → Domains** and add `brain.agentaugusta.com`. Vercel will give you a CNAME target.
6. In GoDaddy → DNS for `agentaugusta.com` → add a CNAME record:
   - **Name:** `audit`
   - **Value:** the Vercel CNAME target (looks like `cname.vercel-dns.com`)
   - **TTL:** 1 hour
7. Wait 5–30 min for DNS to propagate. The site will then be live at `brain.agentaugusta.com`.
