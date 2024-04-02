import { Request, Response } from 'express';
import * as foodServices from '../services/foodServices';

export const getFoodId = (req: Request, res: Response) => {
    try {
        const food = foodServices.findById(Number(req.params.id));

        return food ? res.send(food) : res.sendStatus(404);
    } catch (error) {
        return res.status(500).json({ error: 'Error searching for FoodsID.' });
    }
}
