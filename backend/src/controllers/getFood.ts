import { Request, Response } from 'express'; // Importa Request también si lo necesitas
import * as foodServices from '../services/foodServices';

export const getFood = async (_req: Request, res: Response) => {
    try {
        const finalResponse = await foodServices.getEntriesWithoutSensitiveInfo();
        return res.send(finalResponse);
    } catch (error) {
        return res.status(500).json({ error: 'Error searching for Foods.' });
    }
};