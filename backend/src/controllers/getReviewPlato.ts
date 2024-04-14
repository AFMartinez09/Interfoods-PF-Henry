import { Request, Response } from 'express';
import { Review } from '../models/Review';

export const getReviewForPlato = async (req: Request, res: Response) => {
  try {
    const { platoId } = req.params;

    if (!platoId) {
      return res.status(400).send({ error: "Falta el ID del plato" });
    }

    const reviews = await Review.findAll({ where: { platoId } });

    return res.status(200).send(reviews);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Error al procesar la solicitud", detalle: error });
  }
};
