import { Plato } from "../Plato"; // Asegúrate de que la ruta al modelo Plato sea correcta
// import { NewFoodEntry } from '../types';
import { UpdateFoodEntry } from "../utils/types";
export const getEntries = async () => {
  return await Plato.findAll();
};

export const findById = async (id: number) => {
  return await Plato.findByPk(id, {
    attributes: { exclude: ["campoSensible1", "campoSensible2"] }, // Excluye los campos sensibles si los hay
  });
};

export const getEntriesWithoutSensitiveInfo = async () => {
  return await Plato.findAll({
    attributes: [
      "id",
      "nombre",
      "origen",
      "ingredientes",
      "kilocalorias",
      "carbohidratos",
      "grasas",
      "peso",
      "precio",
      "tipo",
      "imagen",
      "descripcion",
      "stock",
    ],
  });
};

export const addFood = async (newFoodEntry: any) => {
  const newPlato = await Plato.create(newFoodEntry);
  return newPlato;
};

export const updateFood = async (id: number, updateData: UpdateFoodEntry) => {
  const plato = await Plato.findByPk(id);
  if (!plato) {
    throw new Error("Plato no encontrado");
  }
  return await plato.update(updateData);
};

export const deleteFood = async (id: number) => {
  const plato = await Plato.findByPk(id);
  if (!plato) {
    throw new Error("Plato no encontrado");
  }
  await plato.destroy();
  return { message: "Plato eliminado exitosamente" };
};
