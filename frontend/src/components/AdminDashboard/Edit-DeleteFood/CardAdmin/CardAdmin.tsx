import { NavLink } from 'react-router-dom';
import Style from '../../../Card/Card.module.css'
import styled from './CardAdmin.module.css';
import React from 'react';
import { useDispatch } from "react-redux";
import { deleteMeal, activeMeal, getFood } from "../../../../redux/actions/Actions";
import Swal from 'sweetalert2';


interface CardProps {
  name: string;
  img: string;
  weight: number;
  price: number;
  id: number;
  kilocalorias: number;
  carbohidratos: number;
  stock: string;
  tipo: string;
  activo: boolean;
  inventario: number;
}

const Card: React.FC<CardProps> = ({ name, img, weight, price, id, kilocalorias, carbohidratos, stock, tipo, activo, inventario}) => {
  
  const dispatch = useDispatch();

  const handleDelete = async(id:number) => {
    try {
      await delet(dispatch, id)
     
    } catch (error) {
      console.error("Error al borrar:", error);
      Swal.fire({
        title: 'Error al borrar',
        text: 'Hubo un problema al intentar borrar un plato. Por favor, inténtalo de nuevo más tarde.',
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
    }
  }
  const handleActive = async(id:number) => {  
    try {
      await active(dispatch, id)
    } catch (error) {
      console.error("Error al borrar:", error);
      Swal.fire({
        title: 'Error al borrar',
        text: 'Hubo un problema al intentar borrar un plato. Por favor, inténtalo de nuevo más tarde.',
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
    }
  }
  const active = async (dispatch: any, id: number) => {
    try {
      await dispatch(activeMeal(id))
      await dispatch(getFood());
    } catch (error) {
      console.error("Error al borrar:", error);
    }
  }

  const delet = async (dispatch: any, id: number) => {
    try {
      await dispatch(deleteMeal(id))
      await dispatch(getFood());
    } catch (error) {
      console.error("Error al borrar:", error);
    }
  }
  // const fetchData = async () => {
  //   try {
  //     const action = getFood();
  //     await action(dispatch);
  //   } catch (error) {
  //     console.error('Error fetching food:', error); 
  //   }
  // };

 

  return (

    <div className={activo ? styled.card : styled.card2}>
      {activo ? ( // Si el plato está activo, mostrar el botón de eliminar con 'X', de lo contrario, mostrar 'A'
        <div className={styled.deleteContainer}>
          <button className={styled.delete} onClick={() => handleDelete(id)}>X</button>
        </div>
      ) : (
        <div className={styled.deleteContainer}>
          <button className={styled.delete} onClick={() => handleActive(id)}>ACTIVAR PLATO</button>
        </div>
      )}
      <div className={Style.imgcontainer}>
      <img src={img} alt={name} className={Style.img}></img>
      {stock !== 'Disponible' && <p className={Style.stock}>{stock}</p>}
      <p className={Style.tipofoto}>{tipo}</p>
      </div>
      <div className={Style.conteinerName}>
        <h2 className={Style.name}>{name}</h2>
        <div className={Style.calorias}> <p className={Style.caloriastexto}> {kilocalorias} kilocalorias |  {weight}g grasas  |  {carbohidratos}g carbohidratos</p></div>
      </div>
      <div className={Style.conteinerPriceBtn}>
        <p className={Style.price}>{price}$</p>
         <div className={inventario === 0 ? styled.inventario : styled.inventario2}>
          <p className={styled.textoinventario}>Inventario: {inventario}</p>
         </div>
      <NavLink className={styled.editar} to={`/admindashboard/editar/${id}`}>Editar</NavLink>
      </div>

    </div>
  );
  
  
}

export default Card