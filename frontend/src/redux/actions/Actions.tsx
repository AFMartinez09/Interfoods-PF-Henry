import axios from 'axios';
import { GET_FILTRO, GET_FOOD, GET_PAIS, SIGNUP_USER_EMAIL} from '../actions/ActionsTypes';

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
  
      await axios.post("http://127.0.0.1:3000/api/register/signup", {       
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

  export const getFiltro = (payload: any) => (
    console.log(payload),
    {
    type: GET_FILTRO,
    payload: payload,
  })