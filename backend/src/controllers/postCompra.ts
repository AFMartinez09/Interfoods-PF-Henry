import { Request, Response } from "express";
import { Compra } from "../models/Compra";

export const createCompra = async (req: Request, res: Response) => {
  try {
    const { totalProductos, totalGasto, usuarioId, detallesPlatos } = req.body;

    // Verifica si todos los campos necesarios están presentes en el cuerpo de la solicitud
    if (!totalProductos || !totalGasto || !usuarioId || !detallesPlatos) {
      return res.status(400).json({ error: "Missing required fields in the request body." });
    }

    // Crea una nueva compra en la base de datos
    const newCompra = await Compra.create({
      totalProductos,
      totalGasto,
      usuarioId,
      detallesPlatos
    });

    // Devuelve la nueva compra creada en la respuesta
    return res.status(201).json(newCompra);
  } catch (error) {
    console.error("Error creating new purchase:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
