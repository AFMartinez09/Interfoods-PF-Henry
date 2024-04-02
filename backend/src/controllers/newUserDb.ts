import { Request, Response } from 'express';
import { createUser } from '../services/userServices'; // Asegúrate de que la ruta es correcta

export const newUser = async (req: Request, res: Response) => {
  try {
    const createdUser = await createUser(req.body);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ error: "error al crear usuario"});
  }
};