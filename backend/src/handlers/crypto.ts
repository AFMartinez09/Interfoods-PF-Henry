import { Request, Response } from "express";
import { payWithCrypto } from "../controllers/payWithCrypto";

export const payCrypto = async (req: Request, res: Response) => {
  const { nombre, descripcion, precio, user_email, user_name } = req.body;
  try {
    const response = await payWithCrypto(
      nombre,
      descripcion,
      precio,
      user_email,
      user_name
    );
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
