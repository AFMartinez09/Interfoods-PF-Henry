import { Request, Response } from 'express';
import { Usuario } from '../models/Usuario';

export const deleteUserDuplicates = async (req: Request, res: Response) => {
    const { email } = req.params;
    try {
        // Encuentra todos los usuarios con el correo electrónico proporcionado
        const users = await Usuario.findAll({ where: { email } });

        // Verifica si hay más de un usuario con el mismo correo electrónico
        if (users.length <= 1) {
            return res.status(200).json({ message: 'No hay usuarios duplicados para eliminar' });
        }

        // Elimina todos los usuarios excepto el primero
        const usersToDelete = users.slice(1); // Obtén todos los usuarios excepto el primero
        await Promise.all(usersToDelete.map(async (user) => {
            await user.destroy();
        }));

        // Devuelve una respuesta exitosa
        return res.status(200).json({ message: 'Usuarios duplicados eliminados correctamente' });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            // Manejo de errores no esperados
            return res.status(500).json({ error: 'Un error desconocido ocurrió' });
        }
    }
};
