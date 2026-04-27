# Review Findings Queue

Append-only queue of findings surfaced by the review agents (`architect`, `customer-perspective`, `accessibility-auditor`, `browser-qa`). The `/redesign` orchestrator drains this file at phase boundaries and at the final review pass. `/publish` reads it as part of the pre-publish gate.

## Run log

Every time a review lane runs, it appends ONE line to this section with the plugin version it ran against. This is how the orchestrator detects stale review passes on resumption — if the current plugin version is newer than the last run of a given lane, that lane is stale and must re-run before publish.

```
YYYY-MM-DDThh:mm — reviewer=<name> — plugin=<version> — scope=<routes/dimensions/all> — verdict=<N critical, M warning, K note>
```

Example:

```
2026-04-24T15:30 — reviewer=architect         — plugin=1.1.0 — scope=all — verdict=0 critical, 1 warning, 2 note
2026-04-24T15:31 — reviewer=customer          — plugin=1.1.0 — scope=home,services,contact — verdict=1 warning, 3 note
2026-04-24T15:32 — reviewer=a11y              — plugin=1.1.0 — scope=all — verdict=0 critical, 0 warning
2026-04-24T15:35 — reviewer=browser-qa        — plugin=1.1.0 — scope=home,kontakt,ydelser,om-os,cookie-politik — verdict=1 critical, 0 warning, 2 note
```

*(No review runs recorded yet.)*

---

## Finding schema

Each finding is a single block. **Every field is non-optional in the structure** — use `n/a` if not applicable. The publish gate parses these fields, so schema drift breaks the gate.

```
### YYYY-MM-DDThh:mm — [reviewer] — [severity] — blocking:[yes|no]
**Where:** [file:line or page route]
**What:** [one-line description]
**Why:** [WCAG criterion / brief quote / buyer friction — cite the source]
**Suggested fix:** [concrete change]
**Status:** pending
**Reason:** n/a           *(required on deferred and rejected; n/a otherwise)*
**Publish-allowed:** n/a   *(required on deferred; `yes` or `no` — see publish-gate contract below)*
**Related findings:** none *(IDs of findings this duplicates or relates to)*
```

**Severity:** `critical` | `warning` | `note`
**Blocking:** `yes` (build halts until addressed) | `no`
**Status:** `pending` | `handled` | `deferred` | `rejected`

## Publish-gate contract

The orchestrator reads this file during Step 10 to compute the publish gate:

| Finding state | Publish gate |
|---------------|-------------|
| `status: pending` AND `blocking: yes` | **BLOCK** — must reach a terminal state before publish. |
| `status: deferred` AND `blocking: yes` | **BLOCK** — blocking findings cannot be indefinitely deferred. |
| `status: deferred` AND `publish-allowed: yes` AND `reason` set | **ALLOW** — explicit deferral with a documented reason. |
| `status: deferred` AND `publish-allowed: no` | **BLOCK** — deferred but not cleared for publish. |
| `status: deferred` AND `publish-allowed` missing or empty | **BLOCK** — malformed deferral is treated as unsafe. |
| `status: handled` | ALLOW. |
| `status: rejected` AND `reason` set | ALLOW — but on `blocking: yes` findings the rejection reason must cite concrete evidence (see "Rejected criticals" below). |
| `status: rejected` AND `reason` missing | **BLOCK** — unjustified rejection is treated as unhandled. |

## Rejected criticals

A `blocking: yes` finding cannot be `status: rejected` without a substantive `reason:` that proves the reviewer was factually wrong (e.g., "architect cited missing hero photo but `design-direction.md` brief section 3.2 explicitly states hero may be type-only on legal pages — this is a legal page"). Vague reasons ("not needed," "will do later") do not clear the gate.

## Distinctiveness is always blocking

Any finding from `architect` citing a `design-direction.md` violation is `critical` and `blocking`, regardless of how the reviewer phrased it. Any `rendered-fidelity` finding from `browser-qa` whose severity is `critical` is also blocking. The orchestrator must treat these as build-halting.

## Stale-lane detection on resumption

When `/redesign` resumes on an existing project, it reads this file's Run log, compares each lane's last-run `plugin=<version>` to the current plugin version from `.claude-plugin/plugin.json`, and:

- If any lane's last run is OLDER than the current plugin version → that lane is stale → Step 7 re-enters for that lane before publish.
- If a lane has no run-log entry at all → that lane has never run → Step 7 re-enters for that lane.
- If all lanes ran on the current plugin version AND no finding is in a blocking state → the gate is green and Step 11 may proceed.

---

*(No findings recorded yet. Review commands write here between their `/loop` cycles. Each finding uses the schema above verbatim.)*
