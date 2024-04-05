import axios from 'axios';
import { GET_FILTRO, GET_FOOD, GET_PAIS, SIGNUP_USER_EMAIL, DELETE_MEAL, POST_MEAL, PUT_MEAL} from '../actions/ActionsTypes';
import { AnyAction } from 'redux';

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
  
      await axios.post("https://pf-henry-jmnh.onrender.com/api/register/signup", {       
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
      const response = await axios.get<{ user: UserData }>(`https://pf-henry-jmnh.onrender.com/api/register/usuario/${email}`);
  
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


  export const createMeal =  (
    nombre: string,
    origen: string,
    ingredientes: string[],
    kilocalorias: number,
    carbohidratos: number,
    grasas: number,
    peso: number,
    precio: number,
    tipo: string,
    imagen: File | null,
    descripcion: string,
    stock: string,
  ) => async( dispatch: (action:AnyAction) => void ) => {
    try {
      
      await axios.post('https://pf-henry-jmnh.onrender.com/api/admindashboard/crearplato/postFood', {
        nombre,
        origen,
        ingredientes,
        kilocalorias,
        carbohidratos,
        grasas,
        peso,
        precio,
        tipo,
        imagen,
        descripcion,
        stock,

      })
      return dispatch({
        type: POST_MEAL,
        payload: { 
           nombre,
           origen,
           ingredientes,
           kilocalorias,
           carbohidratos,
           grasas,
           peso,
           precio,
           tipo,
           imagen,
           descripcion,
           stock,
          },
      });
  
    } catch (error: any) {
      console.error("Error al crear un nuevo plato:", error);
      window.alert("¡Error al crear un nuevo plato!");
      throw new Error(error);
    }
  };

  export const upgradeMeal =  (
    id: number,
    nombre: string,
    origen: string,
    ingredientes: string[],
    kilocalorias: number,
    carbohidratos: number,
    grasas: number,
    peso: number,
    precio: number,
    tipo: string,
    imagen: File | null,
    descripcion: string,
    stock: string,
    ingrediente: string,
  ) => async(dispatch: (action:AnyAction) => void ) => {
    try {
      
      await axios.post(`https://pf-henry-jmnh.onrender.com/api/admindashboard/editar-eliminar/${id}`, {
        id,
        nombre,
        origen,
        ingredientes,
        kilocalorias,
        carbohidratos,
        grasas,
        peso,
        precio,
        tipo,
        imagen,
        descripcion,
        stock,
        ingrediente,
      })
      return dispatch({
        type: PUT_MEAL,
        payload: { 
          id,
           nombre,
           origen,
           ingredientes,
           kilocalorias,
           carbohidratos,
           grasas,
           peso,
           precio,
           tipo,
           imagen,
           descripcion,
           stock,
           ingrediente, 
          },
      });
  
    } catch (error: any) {
      console.error("Error al actualizar plato:", error);
      window.alert("¡Error al actualizar plato!");
      throw new Error(error);
    }
  };

  export const deleteMeal = (id: number) => async( dispatch:any ) => {
    try {
      await axios.delete(`https://pf-henry-jmnh.onrender.com/api/admindashboard/editar-eliminar/${id}`)
      return dispatch({
        type: DELETE_MEAL,
      });
    } catch (error) {
      console.error("Error al actualizar plato:", error);
      window.alert("¡Error al actualizar plato!");
    }
  }