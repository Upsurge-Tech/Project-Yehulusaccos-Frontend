import { NextResponse, NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { fullname, email, phone, city, reason, message } = await req.json();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  } as any);

  const companyMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.TO_EMAIL,
    subject: "New Contact Form Submission",
    text: `New contact form submission:\n\nName: ${fullname}\nEmail: ${email}\nPhone: ${phone}\nCity: ${city}\nReason: ${reason}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(companyMailOptions);
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error: any) {
    return NextResponse.json({ message: "Email failed to send" });
  }
}
