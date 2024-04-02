import { Request, Response } from "express";
import { registerNewUser } from "../controllers/postNewUser";

export const signUpNewUser = async (req: Request, res: Response) => {
  const {
    email,
    password,
    nombre,
    apellido,
    foto,
    pais,
    ciudad,
    direccion,
    admin,
    habilitado,
  } = req.body;
  try {
    const response = await registerNewUser(
      email,
      password,
      nombre,
      apellido,
      foto,
      pais,
      ciudad,
      direccion,
      admin,
      habilitado
    );
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).send(error);
  }
};
