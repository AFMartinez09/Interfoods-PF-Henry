import { Request, Response } from 'express';
import * as foodServices from '../services/foodServices';

export const upinventario = async (req: Request, res: Response) => {
    try {
        let { id } = req.query
        let {quantity} = req.query
        const response = await foodServices.cambiarinventario(Number(id), Number(quantity));
        res.json(response);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Un error desconocido ocurrió al intentar activar el plato' });
        }
    }
};