import { Request, Response } from 'express';
import { Review } from '../models/Review'; 
import { Plato } from '../models/Plato'; 

export const addReviewToPlato = async (req: Request, res: Response) => {
  try {
    const { platoId } = req.params; 
    const { comentario, calificacion, usuarioId } = req.body; // Incluyendo usuarioId en el body

    // Verificar si platoId está presente
    if (!platoId) {
      return res.status(400).send({ error: "Falta el ID del plato" });
    }

    // Verificar si usuarioId está presente
    if (!usuarioId) {
      return res.status(400).send({ error: "Falta el ID del usuario" });
    }

    const plato = await Plato.findByPk(platoId);
    if (!plato) {
      return res.status(404).send({ error: "Plato no encontrado" });
    }

    const review = await Review.create({
      comentario,
      calificacion,
      usuarioId,
      platoId,
    });

    return res.status(201).send(review);
  } catch (error) {
    console.error(error); // Mejor manejo del log de errores para diagnóstico
    return res.status(500).send({error: "Error al procesar la solicitud", detalle: error});
  }
};