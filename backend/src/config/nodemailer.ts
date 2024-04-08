import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL_INTERFOOD,
    pass: process.env.PASSWORD_INTERFOOD,
  },
});
