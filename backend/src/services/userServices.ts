import { Usuario } from '../models/Usuario'; // Asegúrate de que la ruta al modelo es correcta

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
    // Verificar si ya existe un usuario con el mismo correo electrónico
    const existingUser = await Usuario.findOne({ where: { email: userData.email } });
    if (existingUser) {
      throw new Error('Ya existe un usuario con el mismo correo electrónico');
    }
    
    // Crear el nuevo usuario si no existe uno con el mismo correo electrónico
    const newUser = await Usuario.create(userData);
    return newUser;
  } catch (error) {
    throw new Error('Error al crear el usuario');
  }
};
