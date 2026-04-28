import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Please fill all required fields." },
        { status: 400 }
      );
    }

    // Gmail App Passwords must have NO spaces — strip them just in case
    const emailUser = process.env.EMAIL_USER?.trim();
    const emailPass = process.env.EMAIL_PASS?.replace(/\s/g, "").trim();

    if (!emailUser || !emailPass) {
      console.error("❌ Missing EMAIL_USER or EMAIL_PASS in environment variables");
      return NextResponse.json(
        { error: "Email configuration missing. Please contact support." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // use SSL
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // Verify connection before sending
    await transporter.verify();

    await transporter.sendMail({
      from: `"Arya Madam Website" <${emailUser}>`,
      to: "aryamadamcraftsupplies@gmail.com",
      replyTo: email,
      subject: `New Contact Form Message: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e6cfa7; border-radius: 12px;">
          <h2 style="color: #2c5f7c; border-bottom: 2px solid #e6cfa7; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #555; width: 120px;">Name:</td>
              <td style="padding: 10px; color: #111;">${name}</td>
            </tr>
            <tr style="background: #fdfaf6;">
              <td style="padding: 10px; font-weight: bold; color: #555;">Email:</td>
              <td style="padding: 10px; color: #111;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #555;">Phone:</td>
              <td style="padding: 10px; color: #111;">${phone || "Not provided"}</td>
            </tr>
            <tr style="background: #fdfaf6;">
              <td style="padding: 10px; font-weight: bold; color: #555;">Subject:</td>
              <td style="padding: 10px; color: #111;">${subject}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #555; vertical-align: top;">Message:</td>
              <td style="padding: 10px; color: #111; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
          <p style="margin-top: 24px; font-size: 12px; color: #999; text-align: center;">
            Sent from aryamadamcraftsupplies.com contact form
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("❌ Contact form error:", error?.message || error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again." },
      { status: 500 }
    );
  }
}
