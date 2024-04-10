import { Request, Response } from 'express';
import { Review } from '../models/Review'; 
import { Plato } from '../models/Plato'; 

export const addReviewToPlato = async (req: Request, res: Response) => {
  try {
    const { platoId } = req.params; // 
    const { comentario, calificacion } = req.body;
    const usuarioId = (req as any).usuario.id; 

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
    
    return res.status(400).send(error);
  }
  
};
