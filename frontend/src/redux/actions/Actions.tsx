import axios from 'axios';
import { GET_FILTRO, GET_FOOD, GET_PAIS, SIGNUP_USER_EMAIL} from '../actions/ActionsTypes';
import {URL} from '../../App'

// ----------------------------------------------------------------------------

export const getFood = (comida : any) => ({
    type: GET_FOOD,
    payload: comida,
  })

// ----------------------------------------------------------------------------

  export const getPais = (event: any) => (
    {
    type: GET_PAIS,
    payload: event,
  })

// ----------------------------------------------------------------------------

  export const signUpNewUser = (  email: string, 
    password:string, 
    nombre: string,
    apellido: string,
    foto: string,
    pais: string,
    ciudad: string,
    direccion: string,
    admin: boolean,
    habilitado: boolean) => async (dispatch: any) => {
    try {  
  
      await axios.post(`${URL}/api/register/signup`, {            
      email,
      password,
      nombre,
      apellido,
      foto,
      pais,
      ciudad,
      direccion,
      admin,
      habilitado });
  
      return dispatch({
        type: SIGNUP_USER_EMAIL,
      });
  
    } catch (error: any) {
      console.error("Error al registrar nuevo usuario:", error);
      window.alert("¡Error al registrar nuevo usuario!");
      throw new Error(error);
    }
  };

  // ----------------------------------------------------------------------------

  export const getFiltro = (payload: any) => (
    console.log(payload),
    {
    type: GET_FILTRO,
    payload: payload,
  })

  // ---------------------------------------------------------------------------- 

  interface UserData {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    foto: string;
    pais: string;
    ciudad: string;
    direccion: string;
    admin: boolean;
    habilitado: boolean;
  }

  export const getUser = async (email: string): Promise<UserData> => {
    try {
      // Realizar la llamada a la API con Axios
      const response = await axios.get<{ user: UserData }>(`${URL}/api/register/usuario/${email}`);
  
      // Obtener el usuario devuelto en la respuesta
      const userData = response.data.user;
  
      // Guardar el usuario en el localStorage
      localStorage.setItem('user', JSON.stringify(userData));
  
      // Devolver el usuario obtenido
      return userData;
    } catch (error) {
      // Manejar errores de la llamada a la API
      console.error('Error al registrar al usuario:', error);
      throw new Error('Error al registrar al usuario');
    }
  };