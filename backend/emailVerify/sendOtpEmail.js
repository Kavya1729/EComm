import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { text } from "express";
dotenv.config();

export const sendOtpEmail = (otp, email) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailConfiguration = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Passdord Reset OTP",
    text: `Your OTP for password reset is ${otp}. It is valid for 10 minutes.
        `,
  };

  transporter.sendMail(mailConfiguration, function (err, info) {
    if (err) {
      console.log("Error occurred while sending otp ", err.message);
    } else {
      console.log("OTP sent successfully ", info.response);
    }
  });
};
