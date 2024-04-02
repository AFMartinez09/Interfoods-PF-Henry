import { promises as fs } from "fs";
import path from "path";
import sequelize from "../sequelize"; // Ajusta la ruta según la estructura de tu proyecto
import { Plato } from "../Plato"; // Ajusta la ruta según la estructura de tu proyecto

// Función para cargar los platos desde un archivo JSON
async function cargarPlatosDesdeJSON(): Promise<any[]> {
  const filePath = path.join(__dirname, "services", "food.json"); // Asegúrate de que la ruta sea correcta
  const rawData = await fs.readFile(filePath, "utf8");
  const platos = JSON.parse(rawData);
  return platos;
}

// Función para insertar platos en la base de datos
async function insertarPlatos() {
  try {
    const platos = await cargarPlatosDesdeJSON();
    await sequelize.sync({ force: true }); // Precaución con `force: true`

    for (const plato of platos) {
      await Plato.create({
        nombre: plato.nombre,
        origen: plato.origen,
        ingredientes: plato.ingredientes,
        kilocalorias: plato.kilocalorias,
        carbohidratos: plato.carbohidratos,
        grasas: plato.grasas,
        peso: plato.peso,
        precio: plato.precio,
        tipo: plato.tipo,
        imagen: plato.imagen,
        descripcion: plato.descripcion,
        stock: plato.stock,
      });
    }
    console.log("Todos los platos fueron insertados exitosamente.");
  } catch (error) {
    console.error("Error al insertar platos:", error);
  }
}

// Ejecuta la función de inserción
insertarPlatos();
