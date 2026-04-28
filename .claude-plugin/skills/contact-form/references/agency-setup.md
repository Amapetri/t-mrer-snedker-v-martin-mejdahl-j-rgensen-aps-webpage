# Agency setup — one-time

This runbook is read **once** by the kit owner. It produces the credentials every client repo created via `setup-website.sh` will inherit. After completing it, no revisit is needed for any individual client project.

## 1. Resend account

1. Sign up at https://resend.com
2. Verify the account email
3. Confirm tier:
   - **Free** — 3,000 emails/month, 100/day, 1 verified domain. Covers ~30 small-volume B2B contact forms.
   - **Pro $20/mo** — 50,000/month, no daily cap, 10 verified domains. See "Upgrade triggers" below.

## 2. Verified sending domain

1. Pick a subdomain you control. Recommended: `forms.<your-agency>.com`. The subdomain dedicates the agency's email reputation to website forms separately from any other agency mail (transactional, marketing).
2. Resend dashboard → Domains → Add Domain → enter the chosen domain
3. Add the DKIM/SPF (and DMARC if shown) records to the domain's DNS at the registrar
4. Verification typically completes in 5–60 minutes; status visible in the dashboard

After verification, every client repo can send `From: <Site Name> Website <contact@forms.<your-agency>.com>` via the agency's single Resend account. Clients never log into Resend.

**Do not let clients have their own Resend accounts.** The kit's whole point is zero client involvement; agency-owned credentials are non-negotiable for the simple-tier setup.

## 3. API key

1. Resend dashboard → API Keys → Create API Key
2. Scope: **Sending access** (no domain creation, no audience access — least privilege)
3. Copy the key (starts with `re_...`); save for the next step

## 4. Data Processing Addendum (no action — auto-bound)

Resend's standard Data Processing Addendum becomes binding automatically when accepting the Terms of Service during account signup; no separate signing step. The executed copy is accessible from the Resend dashboard at any time. Full document: https://resend.com/legal/dpa.

The DPA covers GDPR, UK GDPR, CCPA, Swiss data protection, the EU-U.S. Data Privacy Framework, Standard Contractual Clauses for international transfers, and sub-processor authorization. EU clients (or their legal teams) who ask whether your sub-processors have a DPA can be pointed at this URL.

## 5. Local agency.env file

Create the agency-shared env file:

```bash
mkdir -p ~/.config/website-redesign-kit
cat > ~/.config/website-redesign-kit/agency.env <<'EOF'
# Sourced by setup-website.sh on every new client project.
# Do NOT commit this file anywhere; it is machine-local.
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
# Bare address only — the contact form action prepends each client's site
# name as the display name at send time. So every client's contact emails
# arrive From "<Their Site Name> <contact@forms.youragency.com>".
CONTACT_FROM_EMAIL=contact@forms.youragency.com
EOF
chmod 600 ~/.config/website-redesign-kit/agency.env
```

`setup-website.sh` reads this file on each run and pushes both values to the new client's Vercel environment, plus writes them to `.env.local` for dev. If the file is missing, the script warns and asks for the values inline.

Replace the placeholder API key and From-address values with real ones.

## 6. Privacy policy disclosure (per-site)

The kit's `legal-compliance` skill template lists Resend as a sub-processor in the per-site privacy policy. After Step 6 Phase 3 builds the privacy page, verify the rendered page mentions:

- **Resend, Inc.** (US-based)
- **Purpose**: email delivery of contact form submissions
- **Data transferred**: visitor's name, email address, phone (if provided), subject, message
- **Cross-border transfer mechanism**: Standard Contractual Clauses (SCCs) under the EU's GDPR
- **Retention**: 30 days in Resend's logs (per Resend's standard); permanent in the agency's email inbox until deleted

The web-designer applies this when building the privacy page; verify during Step 7 architect review.

## Upgrade triggers

Move to Resend Pro ($20/month) when ANY of the following becomes true:

- Agency runs more than ~25 active client sites with contact forms (free tier 3,000/month total starts feeling tight at typical 5–50 messages/site/month)
- A single client's site spikes past the 100/day soft cap (botstorm or campaign coverage) and the cap silences other clients' forms for 24 hours
- A client requires sending from their own verified domain (Pro = 10 domains, free = 1)
- A client requires EU data residency and Resend's EU region (negotiate availability with Resend; not on the public pricing page)

Pro removes the daily cap, raises the domain limit, and unlocks dedicated-IP add-ons. The integration code does not change — only the API key and From-address need updating.

## Rotating the API key

If the agency API key leaks (committed to a client repo by accident, etc.):

1. Resend dashboard → API Keys → revoke the leaked key
2. Create a new key with the same Sending-access scope
3. Update `~/.config/website-redesign-kit/agency.env` with the new key
4. For each currently-deployed client project: `cd <project> && vercel env rm RESEND_API_KEY production && echo "<new-key>" | vercel env add RESEND_API_KEY production && vercel --prod`

A scripted rotation helper isn't shipped — at agency scale, the manual loop is acceptable for a once-a-year rotation event.
