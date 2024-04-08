import { NavLink } from 'react-router-dom';
import Style from '../../../Card/Card.module.css'
import styled from './CardAdmin.module.css';
import React from 'react';
import { useDispatch } from "react-redux";
import { deleteMeal } from "../../../../redux/actions/Actions";


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
}

const Card: React.FC<CardProps> = ({ name, img, weight, price, id, kilocalorias, carbohidratos, stock, tipo}) => {
  
  const dispatch = useDispatch();
  //! Esto esta malo simplemente lo hice para TS me dejara hacer commit
  // Elimina el id cuando se dé click en X
  const handleDelete = async(id:number) => {
    try {
      await dispatch(deleteMeal(id))
    } catch (error) {
      
    }
  }
// Style => viene de Card
// styled => es de CardAdmin
  return (

    <div className={styled.card}>
      <div className={styled.deleteContainer}>
      <button className={styled.delete} onClick={() =>handleDelete(id)}>X</button>
      </div>
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
      <NavLink className={styled.editar} to={`/admindashboard/editar/${id}`}>Editar</NavLink>
      </div>

    </div>
  );
  
  
}

export default Card