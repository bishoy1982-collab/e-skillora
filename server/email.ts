import { Resend } from "resend";

const FROM = process.env.EMAIL_FROM || "E-Skillora <hello@e-skillora.org>";
const APP_URL = process.env.APP_URL || "https://e-skillora.org";

function getResend(): Resend {
  if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY is not set");
  return new Resend(process.env.RESEND_API_KEY);
}

export async function sendBetaWelcomeEmail(email: string): Promise<void> {
  await getResend().emails.send({
    from: "Bishoy from E-Skillora <bishoy@e-skillora.org>",
    to: email,
    subject: "You're in - 30 days free on E-Skillora",
    text: `Hi! I'm Bishoy, the founder of E-Skillora. I saw your interest and wanted to personally welcome you. Your 30 days free starts today, no credit card needed. Head to e-skillora.org to get started. I'd love to hear what you think, just reply to this email anytime. - Bishoy`,
  });
}

export async function sendPasswordResetEmail(email: string, resetUrl: string): Promise<void> {
  await getResend().emails.send({
    from: FROM,
    to: email,
    subject: "Reset your E-Skillora password",
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #1A1A1A;">
        <div style="font-size: 24px; font-weight: 700; color: #1C3A2F; margin-bottom: 24px;">e-Skillora</div>
        <h1 style="font-size: 22px; font-weight: 700; color: #1C3A2F; margin-bottom: 16px;">
          Reset your password
        </h1>
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
          We received a request to reset the password for your E-Skillora account.
          Click the button below to choose a new password. This link expires in 1 hour.
        </p>
        <a href="${resetUrl}" style="display: inline-block; background: #1C3A2F; color: #ffffff;
          text-decoration: none; padding: 14px 28px; border-radius: 8px; font-size: 16px; font-weight: 700;">
          Reset Password →
        </a>
        <p style="font-size: 14px; color: #6B7280; margin-top: 32px; line-height: 1.6;">
          If you didn't request this, you can safely ignore this email. Your password won't change.
        </p>
      </div>
    `,
  });
}
