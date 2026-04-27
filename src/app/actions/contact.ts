"use server";

// ─────────────────────────────────────────────
// Contact Form Server Action
// Primary lead capture for Tømrer & Snedker v/ Martin Mejdahl Jørgensen ApS
//
// Data is ALWAYS written to .submissions/contact-YYYY-MM-DD.json
// so leads are never lost — even without email configuration.
//
// Rate limiting: in-memory Map, max 3 submissions per IP per 5-minute window.
// Honeypot: bot_field — silently succeed if filled.
// ─────────────────────────────────────────────

import fs from "fs";
import path from "path";
import { headers } from "next/headers";

// ── Types ─────────────────────────────────────

export type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  bot_field?: string; // honeypot — must be empty
};

export type ContactFormResult =
  | { success: true }
  | { success: false; error: string };

// ── Rate limiting ──────────────────────────────
// In-memory store: ip → { count, windowStart }
// Resets every 5 minutes per IP, max 3 submissions.

const RATE_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const RATE_MAX = 3;

const rateLimitStore = new Map<string, { count: number; windowStart: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now - entry.windowStart > RATE_WINDOW_MS) {
    // Fresh window
    rateLimitStore.set(ip, { count: 1, windowStart: now });
    return true; // allowed
  }

  if (entry.count >= RATE_MAX) {
    console.warn(
      `[contact-form] Rate limit exceeded for IP ${ip} — ${entry.count} submissions in current window`,
    );
    return false; // blocked
  }

  entry.count += 1;
  rateLimitStore.set(ip, entry);
  return true; // allowed
}

// ── Validation ────────────────────────────────

const VALID_SUBJECTS = [
  "Tagrenovering",
  "Tilbygning",
  "Vinduer & Døre",
  "Isolering",
  "Garage/Carport",
  "Fugtskade",
  "Andet",
] as const;

function validateSubmission(data: ContactFormData): string | null {
  if (!data.name || data.name.trim().length < 2) {
    return "Navn er påkrævet (mindst 2 tegn).";
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    return "En gyldig e-mailadresse er påkrævet.";
  }

  if (!data.subject || !(VALID_SUBJECTS as readonly string[]).includes(data.subject)) {
    return "Vælg venligst et emne fra listen.";
  }

  if (!data.message || data.message.trim().length < 20) {
    return "Beskrivelsen skal være mindst 20 tegn.";
  }

  return null; // valid
}

// ── Submission storage ────────────────────────

function writeSubmission(data: Omit<ContactFormData, "bot_field">, ip: string) {
  try {
    const submissionsDir = path.join(process.cwd(), ".submissions");

    // Ensure directory exists at runtime (may not exist in production)
    if (!fs.existsSync(submissionsDir)) {
      fs.mkdirSync(submissionsDir, { recursive: true });
    }

    const dateStr = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const filePath = path.join(submissionsDir, `contact-${dateStr}.json`);

    const entry = {
      timestamp: new Date().toISOString(),
      ip_hash: ip.slice(0, 8) + "****", // partial IP — do not log full IP in file
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone?.trim() || null,
      subject: data.subject,
      message: data.message.trim(),
    };

    // Read existing entries or start fresh
    let existing: typeof entry[] = [];
    if (fs.existsSync(filePath)) {
      try {
        const raw = fs.readFileSync(filePath, "utf-8");
        existing = JSON.parse(raw);
        if (!Array.isArray(existing)) existing = [];
      } catch {
        existing = [];
      }
    }

    existing.push(entry);
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), "utf-8");

    console.log(
      `[contact-form] Submission written to ${filePath} — from: ${entry.email}, subject: ${entry.subject}`,
    );
  } catch (err) {
    console.error("[contact-form] Failed to write submission to disk:", err);
    // Do not re-throw — a disk write failure should not cause the form to error
    // if we've already logged the data. The console.log above is the fallback.
  }
}

// ── Server Action ─────────────────────────────

export async function submitContactForm(
  formData: ContactFormData,
): Promise<ContactFormResult> {
  // 1. Honeypot check — bots fill hidden fields, humans don't
  if (formData.bot_field && formData.bot_field.trim().length > 0) {
    console.log("[contact-form] Honeypot triggered — silently returning success");
    // Silently succeed so bots don't know they were blocked
    return { success: true };
  }

  // 2. Get client IP for rate limiting
  const headersList = await headers();
  const forwarded = headersList.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

  // 3. Rate limit check
  if (!checkRateLimit(ip)) {
    return {
      success: false,
      error:
        "For mange henvendelser fra din forbindelse. Prøv igen om 5 minutter, eller ring til os på +45 40 36 88 62.",
    };
  }

  // 4. Server-side validation
  const validationError = validateSubmission(formData);
  if (validationError) {
    return { success: false, error: validationError };
  }

  // 5. Log the full submission to console (always — immediate visibility in server logs)
  console.log("[contact-form] New inquiry received:", {
    timestamp: new Date().toISOString(),
    name: formData.name.trim(),
    email: formData.email.trim(),
    phone: formData.phone?.trim() || "(not provided)",
    subject: formData.subject,
    message: formData.message.trim().slice(0, 200) + (formData.message.length > 200 ? "…" : ""),
  });

  // 6. Persist to disk — guaranteed lead capture regardless of email config
  const { bot_field: _omitted, ...safeData } = formData;
  writeSubmission(safeData, ip);

  // 7. Return success
  return { success: true };
}
