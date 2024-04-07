import { Request, Response } from 'express';
import { Usuario } from '../models/Usuario';

export const updateUser = async (req: Request, res: Response) => {
    const { email } = req.params;
    try {
        const updateData = req.body;
        
        // Lógica para actualizar el usuario
        const user = await Usuario.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Actualiza las propiedades del usuario con los datos proporcionados en el cuerpo de la solicitud
        await user.update(updateData);

        // Devuelve el usuario actualizado como respuesta
        return res.json(user);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            // Manejo de errores no esperados
            return res.status(500).json({ error: 'Un error desconocido ocurrió' });
        }
    }
};