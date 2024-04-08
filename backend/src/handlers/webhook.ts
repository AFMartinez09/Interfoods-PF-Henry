import { Request, Response } from "express";
import { verifyPayment } from "../controllers/verifyPayment";

export const webhook = async (req: Request, res: Response) => {
  console.log("verificando orden de pago");
  const { dataId } = req.body;
  try {
    const response = await verifyPayment(dataId);
    console.log(response);
    res.status(200).json(response);
    console.log("verificación exitosa");
  } catch (error) {
    console.error("Error al verificar el pago:", error);
    res.status(500).send(error);
  }
};
