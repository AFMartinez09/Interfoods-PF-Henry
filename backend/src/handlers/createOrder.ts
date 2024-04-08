import { Request, Response } from "express";
import { pay } from "../controllers/pay";

export const createOrder = async (req: Request, res: Response) => {
  console.log("creando orden de pago");
  const { idCompra, producto, precio, idUsuario,emailUser, nombreUser } = req.body;
  try {
    const response = await pay(idCompra, producto, precio, idUsuario,emailUser, nombreUser);
    res.status(201).json(response);
    console.log("orden creada con éxito");
  } catch (error) {
    console.error("Error al procesar el pago:", error);
    res.status(500).send(error);
  }
};
