import { Request, Response } from 'express';
import { Usuario } from '../models/Usuario';


export const findUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await Usuario.findOne({ where: { id: parseInt(id) } });


    if (user) {
      return res.status(200).json({ user });
    } else {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al buscar el usuario:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};
