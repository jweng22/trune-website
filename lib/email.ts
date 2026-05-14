import { Resend } from "resend";

// TODO: Replace Google form URL with real onboarding form
const ONBOARDING_FORM_URL = "https://forms.google.com/PLACEHOLDER";

export async function sendWaitlistConfirmation(email: string): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[email] RESEND_API_KEY not set — skipping confirmation email");
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "Trune <noreply@trunehealth.com>",
    to: email,
    subject: "You're on the Trune waitlist",
    html: `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Inter',sans-serif;max-width:560px;margin:0 auto;padding:48px 24px;background:#FAFAF7">
        <p style="font-size:22px;font-weight:500;color:#0A0A0A;margin:0 0 16px">You're in.</p>
        <p style="font-size:16px;line-height:1.6;color:#6B6B68;margin:0 0 16px">
          Thanks for joining the Trune beta waitlist. We'll send you early access details when a spot opens.
        </p>
        <p style="font-size:16px;line-height:1.6;color:#6B6B68;margin:0 0 32px">
          Complete your onboarding profile so we can make your experience personal from day one:
        </p>
        <a href="${ONBOARDING_FORM_URL}" style="display:inline-block;background:#0A0A0A;color:#FAFAF7;padding:12px 28px;border-radius:999px;font-size:15px;font-weight:500;text-decoration:none">
          Complete your profile →
        </a>
        <p style="margin-top:48px;font-size:13px;color:#9A9A95;line-height:1.5">
          No spam, ever.
        </p>
      </div>
    `,
  });
}
