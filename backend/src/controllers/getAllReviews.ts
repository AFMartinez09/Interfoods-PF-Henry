import { Request, Response } from 'express';
import { Review } from '../models/Review';

export const getAllReviews = async (_: Request, res: Response) => {
  try {
    const reviews = await Review.findAll();

    return res.status(200).json({ reviews });
  } catch (error) {
    console.error('Error al obtener los review:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};