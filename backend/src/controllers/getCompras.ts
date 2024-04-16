import { Request, Response } from 'express';
import { Compra } from '../models/Compra';

export const getAllCompras = async (_: Request, res: Response) => {
  try {
    const compras = await Compra.findAll();

    return res.status(200).json({ compras });
  } catch (error) {
    console.error('Error al obtener las compras:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};