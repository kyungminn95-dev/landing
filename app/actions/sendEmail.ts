"use server";

import nodemailer from "nodemailer";

export async function sendEmail(formData: {
  name: string;
  phone: string;
  email: string;
  message: string;
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"뮤잇 문의" <${process.env.GMAIL_USER}>`,
    to: process.env.RECIPIENT_EMAIL,
    replyTo: formData.email,
    subject: `[뮤잇 문의] ${formData.name}님의 문의`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="border-bottom: 1px solid #eee; padding-bottom: 12px;">새 문의가 도착했습니다</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 10px 0; color: #666; width: 80px;">이름</td>
            <td style="padding: 10px 0; font-weight: 500;">${formData.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #666;">전화번호</td>
            <td style="padding: 10px 0;">${formData.phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #666;">이메일</td>
            <td style="padding: 10px 0;"><a href="mailto:${formData.email}">${formData.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #666; vertical-align: top;">문의내용</td>
            <td style="padding: 10px 0; white-space: pre-wrap;">${formData.message}</td>
          </tr>
        </table>
      </div>
    `,
  });
}
