import { Request, Response } from 'express';
import * as foodServices from '../services/foodServices';

export const updateFood = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const updateData = req.body;
        const updatedPlato = await foodServices.updateFood(Number(id), updateData);
        res.json(updatedPlato);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            // Manejo de errores no esperados
            res.status(500).json({ error: 'Un error desconocido ocurrió' });
        }
    }
};