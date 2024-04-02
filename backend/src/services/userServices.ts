import { Usuario } from '../models/Usuario'; // Asegúrate de que la ruta al modelo es correcta

// Función para crear un nuevo usuario
export const createUser = async (userData: {
  nombre: string;
  apellido: string;
  email: string;
  foto: string;
  pais: string;
  ciudad: string;
  direccion: string;
  admin: boolean;
  habilitado: boolean;
}) => {
  try {
    const newUser = await Usuario.create(userData);
    return newUser;
  } catch (error) {
    throw new Error('Error al crear el usuario');
  }
};