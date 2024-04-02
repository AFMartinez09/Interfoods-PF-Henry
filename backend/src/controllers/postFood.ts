import { Request, Response } from "express";
import * as foodServices from "../services/foodServices";
import { NewFoodEntry } from "../utils/types";

export const createFood = async (req: Request, res: Response) => {
  try {
    // Aquí podrías agregar validación adicional para asegurarte
    // de que req.body cumpla con la interfaz NewFoodEntry
    const newFoodEntry: NewFoodEntry = req.body;
    const newPlato = await foodServices.addFood(newFoodEntry);
    res.status(201).json(newPlato);
  } catch (error) {
    res.status(400).json({ error: "Error creating new food entry." });
  }
};
