import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Gmail App Passwords are 16 chars; spaces are just visual separators — strip them
    const smtpUser = (process.env.SMTP_USER || "").trim();
    const smtpPass = (process.env.SMTP_PASS || "").replace(/\s+/g, "").trim();
    const smtpTo = (process.env.SMTP_TO || smtpUser).trim();

    if (!smtpUser || !smtpPass) {
      console.error("SMTP credentials missing. SMTP_USER or SMTP_PASS not set.");
      return NextResponse.json(
        { error: "Server email configuration is missing." },
        { status: 500 }
      );
    }

    // Use port 587 + STARTTLS — more reliable than 465/SSL on most hosting platforms
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,       // STARTTLS — upgraded automatically
      auth: {
        user: smtpUser,
        pass: smtpPass,    // stripped spaces from App Password
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    // Verify SMTP connection before sending
    await transporter.verify();

    const mailOptions = {
      from: `"Portfolio Contact" <${smtpUser}>`,
      replyTo: `"${name}" <${email}>`,
      to: smtpTo,
      subject: `[Portfolio] New message from ${name}`,
      text: `You received a new contact form submission:\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a5f; border-bottom: 2px solid #ff6b6b; padding-bottom: 12px;">
            📩 New Portfolio Message
          </h2>
          <table style="width:100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4a6285; width: 80px;">Name</td>
              <td style="padding: 8px 0; color: #1e3a5f;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4a6285;">Email</td>
              <td style="padding: 8px 0;">
                <a href="mailto:${email}" style="color: #ff6b6b;">${email}</a>
              </td>
            </tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: #f8faff; border-radius: 8px; border-left: 3px solid #ff6b6b;">
            <p style="margin: 0; font-weight: bold; color: #4a6285; margin-bottom: 8px;">Message:</p>
            <p style="margin: 0; color: #1e3a5f; white-space: pre-line;">${message}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #8098b8;">
            Sent from your portfolio contact form · Reply directly to this email to reach ${name}
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("[Contact] Email sent successfully:", info.messageId);

    return NextResponse.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("[Contact] Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again or contact me directly." },
      { status: 500 }
    );
  }
}
