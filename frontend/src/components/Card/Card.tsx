import { NavLink } from 'react-router-dom';
import Style from './Card.module.css'
import React, { useState, useEffect } from 'react';


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
  inventario: number;
}

const Card: React.FC<CardProps> = ({ name, img, weight, price, id, kilocalorias, carbohidratos, tipo, inventario }) => {
  const [cant, setCant] = useState<number>(0);


  useEffect(() => {
    const existingCart = localStorage.getItem('cart');
    if (existingCart) {
      const cartItems = JSON.parse(existingCart);
      const item = cartItems.find((item: any) => item.id === id);
      if (item) {
        setCant(item.quantity); 
      } else {
        setCant(0);
      }
    }
  });


  const addToCart = () => {
    const existingCart = localStorage.getItem('cart');
    if (existingCart) {
      const cartItems = JSON.parse(existingCart);
      const itemIndex = cartItems.findIndex((item: any) => item.id === id);
      if (itemIndex !== -1) {
        cartItems[itemIndex].quantity += 1;
      } else {
        
        cartItems.push({ id, name, img, weight, price, quantity: 1, inventario});
      }
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } else {
      localStorage.setItem(
        'cart',
        JSON.stringify([{ id, name, img, weight, price, quantity: 1 }])
      );
    }
    setCant(prevCant => prevCant + 1);
    const event = new Event('cartChange');
    window.dispatchEvent(event);
  };

  const removeFromCart = () => {
    const existingCart = localStorage.getItem('cart');
    if (existingCart) {
      const cartItems = JSON.parse(existingCart);
      const itemIndex = cartItems.findIndex((item: any) => item.id === id);
      if (itemIndex !== -1) {
        if (cartItems[itemIndex].quantity === 1) {
          cartItems.splice(itemIndex, 1);
        } else {
          cartItems[itemIndex].quantity -= 1;
        }
        localStorage.setItem('cart', JSON.stringify(cartItems));
        setCant(prevCant => prevCant > 0 ? prevCant - 1 : 0);
      }
    }
    const event = new Event('cartChange');
    window.dispatchEvent(event);
  };
  

  return (

    <div className={Style.card}>
      <NavLink to={`/detail/${id}`} className={Style.navLink}>
      <div className={Style.imgcontainer}>
      <img src={img} alt={name} className={Style.img}></img>
      {inventario === 0 && <p className={Style.stock}>Agotado</p>}
      <p className={Style.tipofoto}>{tipo}</p>
      </div>
      </NavLink>
      <div className={Style.conteinerName}>
        <h2 className={Style.name}>{name}</h2>
        <div className={Style.calorias}> <p className={Style.caloriastexto}> {kilocalorias} kilocalorias |  {weight}g grasas  |  {carbohidratos}g carbohidratos</p></div>
      </div>
      <div className={Style.conteinerPriceBtn}>
        <p className={Style.price}>USD: ${price}</p>
        <div className={Style.conteinerBtn}>
        {inventario !== 0 ? (
          <>
            {cant > 0 ? (
              <>
                <button className={Style.btn} onClick={removeFromCart}>-</button>
                <span className={Style.cant}>{cant}</span>
                <button className={Style.btn} onClick={addToCart} disabled={cant >= inventario}>+</button>
              </>
            ) : (
              <button className={Style.btnAdd} onClick={addToCart}>Añadir</button>
            )}
          </>
        ) : (
          <button className={Style.btnAddagootado} disabled>Agotado</button>
        )}
      </div>
      </div>
    </div>
  );
  
  
}

export default Card