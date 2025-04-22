import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendTwoFactorTokenEmail(email: string, token: string) {
  await resend.emails.send({
    from: "2FA@yourdomain.com",
    to: email,
    subject: "Your 2FA Code",
    html: `<p>Your 2FA code is: <strong>${token}</strong></p>`,
  });
}
