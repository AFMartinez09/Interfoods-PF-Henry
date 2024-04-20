import { Request, Response } from "express";
import { createOrder } from "../controllers/paypalPay";

export const createOrderPaypal = async (req: Request, res: Response) => {
  try {
    const { product, price, description } = req.body;
    console.log("Creando Orden de pago Paypal");
    const response = await createOrder(product, price, description);
    res.status(200).json(response);
    console.log("Orden de pago Paypal creada con éxito");
  } catch (error) {
    console.error("Error al crear la orden con Paypal:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
};
