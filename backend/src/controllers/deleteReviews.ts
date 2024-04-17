import { Request, Response } from 'express';
import { Review } from '../models/Review';

export const deleteReviewById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Buscar la review por su ID
    const reviewToDelete = await Review.findByPk(id);

    // Verificar si la review existe
    if (!reviewToDelete) {
      return res.status(404).json({ message: 'La review no existe' });
    }

    // Eliminar la review
    await reviewToDelete.destroy();

    return res.status(200).json({ message: 'Review eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la review:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};
