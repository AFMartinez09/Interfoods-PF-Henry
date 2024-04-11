import { Request, Response } from 'express';
import * as foodServices from '../services/foodServices';

export const activeFood = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const response = await foodServices.activar(Number(id));
        res.json(response);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Un error desconocido ocurrió al intentar activar el plato' });
        }
    }
};