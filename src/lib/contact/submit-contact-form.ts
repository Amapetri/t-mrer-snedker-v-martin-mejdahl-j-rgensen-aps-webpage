'use server';

import { checkBotId } from 'botid/server';
import { contactSchema } from './contact-schema';
import { sendContactEmail } from './send-contact-email';

export type ContactFormState =
  | { status: 'idle' }
  | { status: 'success' }
  | {
      status: 'error';
      code: 'validation_failed' | 'bot_detected' | 'send_failed' | 'config_missing';
      fieldErrors?: Record<string, string[] | undefined>;
    };

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot. Bots fill hidden fields; humans don't see them.
  // Return success silently so attackers can't tell they were caught.
  const honeypot = formData.get('website');
  if (typeof honeypot === 'string' && honeypot.length > 0) {
    return { status: 'success' };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  });
  if (!parsed.success) {
    return {
      status: 'error',
      code: 'validation_failed',
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  // Vercel BotID. Always returns isBot=false on localhost; effective in production.
  const verification = await checkBotId();
  if (verification.isBot) {
    return { status: 'error', code: 'bot_detected' };
  }

  const siteName = process.env.CONTACT_SITE_NAME;
  const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  if (!siteName || !recipientEmail || !fromEmail) {
    return { status: 'error', code: 'config_missing' };
  }

  // Optional. Falls back to siteName so deployments predating CONTACT_FROM_NAME keep working.
  const fromName = process.env.CONTACT_FROM_NAME || siteName;

  const result = await sendContactEmail({
    ...parsed.data,
    siteName,
    recipientEmail,
    fromEmail,
    fromName,
    subjectPrefix: process.env.CONTACT_SUBJECT_PREFIX,
  });

  if (!result.ok) {
    return { status: 'error', code: result.error };
  }

  return { status: 'success' };
}
