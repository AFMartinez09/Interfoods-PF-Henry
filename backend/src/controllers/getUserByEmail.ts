import { Request, Response } from 'express';
import { Usuario } from '../models/Usuario';

// Controlador para buscar un usuario por su correo electrónico
export const findUserByEmail = async (req: Request, res: Response) => {
  const { email } = req.params; // Suponiendo que el correo electrónico se pasa como parámetro en la URL

  try {
    // Buscar el usuario en la base de datos por su correo electrónico
    const user = await Usuario.findOne({ where: { email } });

    if (user) {
      // Si se encuentra el usuario, devolverlo en la respuesta
      return res.status(200).json({ user });
    } else {
      // Si no se encuentra el usuario, devolver un mensaje de error
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    // Manejar cualquier error que ocurra durante la búsqueda del usuario
    console.error('Error al buscar el usuario:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};
