import { Request, Response } from 'express';
import { Compra } from '../models/Compra';

export const getCompraByUserId = async (req: Request, res: Response) => {
  try {
    const { usuarioId } = req.params;

    if (!usuarioId) {
      return res.status(400).send({ error: "Falta el ID del usuario" });
    }

    const purchases = await Compra.findAll({ where: { usuarioId } });

    if (!purchases || purchases.length === 0) {
      return res.status(404).send({ message: "No se encontraron compras para el usuario con el ID proporcionado" });
    }

    return res.status(200).send(purchases);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Error al procesar la solicitud", detalle: error });
  }
};
