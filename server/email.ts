import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.EMAIL_FROM || "E-Skillora <hello@e-skillora.org>";
const APP_URL = process.env.APP_URL || "https://e-skillora.org";

export async function sendBetaGrantedNotification(grantedEmail: string): Promise<void> {
  await resend.emails.send({
    from: FROM,
    to: "bishoy@e-skillora.org",
    subject: `Beta trial granted - ${grantedEmail}`,
    html: `<p>Beta trial granted for <strong>${grantedEmail}</strong>. Follow up personally when ready.</p>`,
  });
}

export async function sendPasswordResetEmail(email: string, resetUrl: string): Promise<void> {
  await resend.emails.send({
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
