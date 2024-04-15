import axios from "axios";
import {
  GET_FILTRO,
  GET_FOOD,
  GET_PAIS,
  SIGNUP_USER_EMAIL,
  DELETE_MEAL,
  POST_MEAL,
  PUT_MEAL,
  SIGNUP_USER_EMAIL_DB,
  SET_TRANSACCION_ID,
  SET_PAYMENT_STATUS,
  GET_ALL_USERS, 
  PUT_USER_BLOCK,
  SET_ADMIN_STATE,
  ACTIVATE_MEAL,
  SET_TYPE,
  SET_COUNTRY,
  GET_REVIEWS_USER,
} from '../actions/ActionsTypes';
import { AnyAction, Dispatch } from 'redux';
import {URL} from '../../App'
import { getAuth, signOut } from "@firebase/auth";
import { app } from "../../Auth/firebaseConfig";

// ----------------------------------------------------------------------------

export const getFood = () => async (dispatch: any) => {
  try {
    const { data } = await axios.get(`${URL}/api/food/`);
    if (data) {
      dispatch({
        type: GET_FOOD,
        payload: data,
      });
    } else {
      alert('There are no characters with this ID!');
    }
  } catch (error : any) {
    alert(error.message);
  }
};


// ----------------------------------------------------------------------------

export const getPais = (event: any) => ({
  type: GET_PAIS,
  payload: event,
});

// ----------------------------------------------------------------------------

export const signUpNewUser =
  (
    email: string,
    password: string,
    nombre: string,
    apellido: string,
    foto: string | null,
    pais: string,
    ciudad: string,
    direccion: string,
    admin: boolean,
    habilitado: boolean
  ) =>
  async (dispatch: any) => {
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
        habilitado,
      });

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

export const getFiltro = (payload: any) => ({
  type: GET_FILTRO,
  payload: payload,
});

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

const auth = getAuth(app);

export const getUser = async (email: string): Promise<UserData> => {
  try {
    const response = await axios.get<{ user: UserData }>(
      `${URL}/api/register/usuario/${email}`
    );

    // Obtener el usuario devuelto en la respuesta
    const userData = response.data.user;

    // Verificar si el usuario está habilitado
    if (!userData.habilitado) {
      signOut(auth)
      // Si el usuario no está habilitado, lanzar un error
      throw new Error("El usuario no está habilitado para iniciar sesión");
    }

    // Guardar el usuario en el localStorage
    localStorage.setItem("user", JSON.stringify(userData));

    // Devolver el usuario obtenido
    return userData;
  } catch (error) {
    // Manejar errores de la llamada a la API
    console.error("Error al registrar al usuario:", error);
    throw new Error("Error al registrar al usuario");
  }
};

export const putUser = async (
  email: string,
  data: object
): Promise<UserData> => {
  try {
    const response = await axios.put<{ user: UserData }>(
      `${URL}/api/register/usuario/update/${email}`,
      data
    );
    const userData = response.data.user;

    getUser(email);

    return userData;
  } catch (error) {
    console.error("Error al editar datos del usuario:", error);
    throw new Error("Error al editar datos del usuario");
  }
};

export const createMeal =
  (
    nombre: string,
    origen: string,
    ingredientes: string[],
    kilocalorias: number,
    carbohidratos: number,
    grasas: number,
    peso: number,
    precio: number,
    tipo: string,
    imagen: string | null,
    descripcion: string,
    stock: string,
    activo: boolean,
    inventario: number,
  ) => async (dispatch: Dispatch) => {
    try {
      await axios.post(`${URL}/api/food/postFood`, {
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
        activo,
        inventario,
      });

      dispatch({
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
          activo,
          inventario,
        },
      });
    } catch (error: any) {
      console.error("Error al crear un nuevo plato:", error);
      window.alert("¡Error al crear un nuevo plato!");
      throw new Error(error);
    }
  };

export const upgradeMeal =
  (
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
    inventario: number,
  ) => async (dispatch: (action: AnyAction) => void) => {
    try {
      // Filtrar los campos vacíos
      const requestBody = {
        ...(nombre && { nombre }),
        ...(origen && { origen }),
        ...(ingredientes.length > 0 && { ingredientes }),
        ...({ kilocalorias }),
        ...({ carbohidratos }),
        ...({ grasas }),
        ...(peso && { peso }),
        ...({ precio }),
        ...(tipo && { tipo }),
        ...(imagen && { imagen }),
        ...(descripcion && { descripcion }),
        ...({ stock }),
        ...({inventario})
      };
  
      await axios.put(`${URL}/api/food/${id}`, requestBody);
      
      return dispatch({
        type: PUT_MEAL,
        payload: requestBody,
      });
    } catch (error: any) {
      console.error("Error al actualizar plato:", error);
      window.alert("¡Error al actualizar plato!");
      throw new Error(error);
    }
  };

export const deleteMeal = (id: number) => async (dispatch: any) => {
  try {
    await axios.delete(`${URL}/api/food/${id}`);
    return dispatch({
      type: DELETE_MEAL,
    });
  } catch (error) {
    console.error("Error al actualizar plato:", error);
    window.alert("¡Error al actualizar plato!");
  }
};

export const activeMeal = (id: number) => async (dispatch: any) => {
  console.log(id);

  try {
    await axios.post(`${URL}/api/food/${id}`);
    return dispatch({
      type: ACTIVATE_MEAL,
    });
  } catch (error) {
    console.error("Error al actualizar plato:", error);
    window.alert("¡Error al actualizar plato!");
  }
};

export const imageUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "jdiimohm");

  try {
    const response = await axios.post<any>(
      "https://api.cloudinary.com/v1_1/dbqekrcf4/image/upload",
      formData
    );

    return response.data.secure_url;
  } catch (error) {
    console.error("Error al subir imagen:", error);
  }
};

export const signUpNewUserDb =
  (
    email: string,
    nombre: string,
    apellido: string,
    foto: string,
    pais: string,
    ciudad: string,
    direccion: string,
    admin: boolean,
    habilitado: boolean
  ) =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      await axios.post(`${URL}/api/register/signupDb`, {
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

      dispatch({
        type: SIGNUP_USER_EMAIL_DB, // Reemplaza 'SIGNUP_USER_EMAIL_DB' con el tipo de acción correcto
      });
    } catch (error: any) {
      // console.error("Error al registrar nuevo usuario:", error);
      // window.alert("¡Error al registrar nuevo usuario!");
      // throw new Error(error);
    }
  };

export const setTransaccionId = (transactionId: string) => ({
  type: SET_TRANSACCION_ID,
  payload: transactionId,
});

// Acción para establecer el estado del pago
export const setPaymentStatus = (status: boolean) => ({
  type: SET_PAYMENT_STATUS,
  payload: status,
});

export const getAllUsers = () => async (dispatch: Dispatch<AnyAction>) => {
  try {
    const response = await axios.get(`${URL}/api/register/usuarios`)
    const users = await response.data.users;
    dispatch({
      type: GET_ALL_USERS,
      payload: users,
    });
  } catch (error) {
    console.error("Hubo un error al obtener los usuarios", error);
  }
}

export const PutUserBlock = (email: string, habilitado: boolean) => async (dispatch: any) => {
  try {
    const response = await axios.put(`${URL}/api/register/usuario/update/${email}`, {
      habilitado: habilitado
    });
    const blockUser = response.data;
    dispatch({
      type: PUT_USER_BLOCK,
      payload: blockUser,
    });
  } catch (error) {
    console.error('hubo un error ', error);
  }
}
// Definir creadores de acciones
export const setAdminState = (isAdmin: boolean) => ({
  type: SET_ADMIN_STATE,
  payload: isAdmin
});

export const settype = (payload: string) => {
  console.log('Payload:', payload); // Agregar el console.log aquí
  return {
    type: SET_TYPE,
    payload: payload
  };
};

export const setcountry = (payload : string) => ({
  type: SET_COUNTRY,
  payload: payload
});
export const postReview = async (comentario: string, estrellas: number, platoId: number, userId: number) => {
  try {
    await axios.post(`${URL}/api/food/${platoId}/reviews`, {
      comentario: comentario,
      calificacion: estrellas, 
      usuarioId: userId,
    });

    console.log(comentario, estrellas, platoId, userId);
    

  } catch (error) {
    console.error("Error al crear la review:", error);
    window.alert("¡Error al crear la review!");
  }
}

export const getReviewForPlato = async (idPlato: number) => {
  try {
    const response = await axios.get(`${URL}/api/food/${idPlato}/reviews`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las reseñas del plato:', error);
    return [];
  }
};

export const getAllReviews = async () => {
  try {
    const response = await axios.get(`${URL}/api/food/reviews`);
    
    return response.data.reviews;
  } catch (error) {
    console.error('Error al obtener las reseñas del plato:', error);
    return [];
  }
};

export const getUserById = async (idUser: number) => {
  try {
    const response = await axios.get(`${URL}/api/register/getUsuario/${idUser}`);
    
    return response.data.user;
  } catch (error) {
    console.error('Error al obtener el usuario por id:', error);
    return [];
  }
};

export const getReviewsUser = (id: number) => async (dispatch: any) => {
  try {
    const response = await axios.get(`${URL}/api/food/usuario/${id}/reviews`);
    const reviews = response.data; // Obtener las revisiones de la respuesta
    dispatch({
      type: GET_REVIEWS_USER,
      payload: reviews, // Agregar las revisiones a la tienda
    });
    return reviews; // Devolver las revisiones obtenidas
  } catch (error) {
    console.error('Error al obtener las reseñas del usuario:', error);
  }
};


export const disableReview = async (id: number) => {
  try {
    await axios.put(`${URL}/api/food/disableReview/${id}`);
  } catch (error) {
    console.error('Error al cambiar el estado del plato:', error);
  }
}