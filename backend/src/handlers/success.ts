import { Request, Response } from "express";
import { transporter } from "../config/nodemailer";

export const success = async (req: Request, res: Response) => {
  const {
    id,
    date_created,
    date_approved,
    status,
    payment_id,
    payment_type,
    transaction_amount,
    currency_id,
    description,
    buyer_email,
  } = req.query;
  try {
    if (status === "approved") {
      console.log(`El pago con ID ${payment_id} ha sido aprobado`);
      // Envía correo electrónico al comprador
      await transporter.sendMail({
        from: process.env.EMAIL_INTERFOOD,
        to: `${buyer_email}, "grupointerfoods@gmail.com"`,
        subject: "Confirmación de compra en InterFood",
        text: `¡Hola ${buyer_email}! Tu pago por ${description} ha sido aprobado. Detalles de la compra: ID de pago: ${payment_id}, Monto: ${transaction_amount} ${currency_id}. ¡Gracias por tu compra!`,
      });

      res.status(200).send({
        message: "Pago Exitoso",
        id: id,
        date_created: date_created,
        date_approved: date_approved,
        payment_type_id: payment_type,
        status: status,
        currency_id: currency_id,
        description: description,
        transaction_amount: transaction_amount,
        buyer_email: buyer_email,
      });
    } else {
      console.log(`No pudimos aprobar el pago con ID ${payment_id}`);
    }
  } catch (error) {
    console.error("No pudimos aprobar el pago:", error);
    res.status(500).send(error);
  }
};
