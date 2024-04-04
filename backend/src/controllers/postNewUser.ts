import { auth } from "../auth/firebaseAdmin";
import fetch from 'node-fetch';

export const registerNewUser = async (  
  email: string, 
  password:string, 
  nombre: string,
  apellido: string,
  foto: string,
  pais: string,
  ciudad: string,
  direccion: string,
  admin: boolean,
  habilitado: boolean) => {
  try {
    const userRecord = await auth.createUser({
      email,
      password,
    });

    const json = JSON.stringify({       
      email,
      nombre,
      apellido,
      foto,
      pais,
      ciudad,
      direccion,
      admin,
      habilitado,
    });

    const response = await fetch('https://pf-henry-jmnh.onrender.com/api/register/signupDb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: json,
    });

    if (!response.ok) {
      throw new Error('Error al registrar el usuario en la base de datos');
    }

    return userRecord;
  } catch (error) {
    throw new Error('Error al registrar el usuario');
  }
};