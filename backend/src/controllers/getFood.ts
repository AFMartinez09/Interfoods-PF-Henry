import { Request, Response } from 'express'; // Importa Request también si lo necesitas
import * as foodServices from '../services/foodServices';

export const getFood = async (_req: Request, res: Response) => {
    try {
        const finalResponse = await foodServices.getEntriesWithoutSensitiveInfo();
        finalResponse.sort((a : any, b :any) => {
            // Convertir los nombres a minúsculas para un ordenamiento sin distinción de mayúsculas/minúsculas
            const nombreA = a.nombre.toLowerCase();
            const nombreB = b.nombre.toLowerCase();
            // Comparar los nombres y devolver el resultado de la comparación
            if (nombreA < nombreB) return -1;
            if (nombreA > nombreB) return 1;
            return 0;
        });
        return res.send(finalResponse);
    } catch (error) {
        return res.status(500).json({ error: 'Error searching for Foods.' });
    }
};