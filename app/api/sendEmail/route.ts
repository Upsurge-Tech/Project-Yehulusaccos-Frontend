import { NextApiRequest, NextApiResponse } from 'next';

import nodemailer from 'nodemailer';

export default async function sendEmail(req: NextApiRequest, res: NextApiResponse){
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }
  const { fullname, email, phone, city, reason, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  } as any);

  const confirmationMailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Confirmation Email',
    text: `Hello ${fullname},\n\nThank you for contacting us. We have received your message and will get back to you shortly.\n\nBest regards,\nYehulusaccos Team`,
  };

  const companyMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.TO_EMAIL,
    subject: 'New Contact Form Submission',
    text: `New contact form submission:\n\nName: ${fullname}\nEmail: ${email}\nPhone: ${phone}\nCity: ${city}\nReason: ${reason}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(confirmationMailOptions);
    await transporter.sendMail(companyMailOptions);
    res.status(200).json({ status: 'success' });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

