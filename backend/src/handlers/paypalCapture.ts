import { Request, Response } from "express";
import { captureOrder } from "../controllers/paypalPay";

export const captureOrderPaypal = async (req: Request, res: Response) => {
  try {
    const { orderID } = req.params;
    const response = await captureOrder(orderID);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error al capturar la orden de pago de paypal:", error);
    res
      .status(500)
      .json({ error: "Error al capturar la orden de pago de paypal." });
  }
};
