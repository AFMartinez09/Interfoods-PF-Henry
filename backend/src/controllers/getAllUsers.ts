import { Request, Response } from 'express';
import { Usuario } from '../models/Usuario';

// Controlador para obtener todos los usuarios
export const getAllUsers = async (_: Request, res: Response) => {
  try {
    // Obtener todos los usuarios de la base de datos
    const users = await Usuario.findAll();

    // Si hay usuarios, devolverlos en la respuesta
    return res.status(200).json({ users });
  } catch (error) {
    // Manejar cualquier error que ocurra durante la obtención de los usuarios
    console.error('Error al obtener los usuarios:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};