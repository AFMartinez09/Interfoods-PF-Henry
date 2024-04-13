import { Request, Response } from "express";
import { transporter } from "../config/nodemailer";

export const redirect = async (req: Request, res: Response) => {
  const { user_email, user_name } = req.query;
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_INTERFOOD,
      to: `${user_email}, "grupointerfoods@gmail.com"`,
      subject: "Confirmación de compra en InterFood",
      html: `Hola ${user_name}, gracias por tu compra`,
    });
    res.status(200).send("Pago aprobado");
  } catch (error) {
    console.error("No pudimos aprobar el pago:", error);
    res.status(500).send(error);
  }
};
