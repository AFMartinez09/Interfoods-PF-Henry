import sequelize from "../sequelize";
import { Plato } from "../Plato";

async function main() {
  try {
    await sequelize.authenticate(); // Prueba la conexión con la base de datos
    console.log("Conexión con la base de datos establecida exitosamente.");

    // Recupera todos los platos existentes en la base de datos
    const platos = await Plato.findAll();
    console.log(
      "Platos encontrados:",
      platos.map((plato) => plato.toJSON())
    );
  } catch (error) {
    console.error("No se pudo conectar con la base de datos:", error);
  }
}

main();
