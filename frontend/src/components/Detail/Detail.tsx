import React from "react";
import { NavLink, useParams } from "react-router-dom";
import styles from './Detail.module.css'
import Reseñas from "../Reseñas/Reseñas";
import {useSelector} from "react-redux";
import { StoreState } from '../../redux/reducer/Reducer';
import { useState, useEffect } from "react";
import Loading from "../Loading/Loading";

const Detail: React.FC = () =>{
  
  const [idComida, setIdComida] = useState<string>('');
  const [mostrarIngredientes, setMostrarIngredientes] = useState<boolean>(false);
  const { id } = useParams();

  useEffect(() => {
      if (id !== undefined) {
          setIdComida(id);
      }
  }, [id]);

  const toggleMostrarIngredientes = () => {
    setMostrarIngredientes(!mostrarIngredientes);
}
  const numeroEntero: number = (parseInt(idComida, 10));
  console.log(numeroEntero);
  
  const foodState = useSelector((state: StoreState) => state.platos);
 
  
  
  let selectedItem = foodState.find(item => item.id === numeroEntero);
  
  
  
  let id2 = selectedItem?.id
  let name = selectedItem?.nombre
  let img = selectedItem?.imagen
  let weight = selectedItem?.peso
  let price = selectedItem?.precio
  let stock = selectedItem?.stock
  const [cant, setCant] = useState<number>(0);
  useEffect(() => {
    const existingCart = localStorage.getItem('cart');
    if (existingCart) {
      const cartItems = JSON.parse(existingCart);
      const item = cartItems.find((item: any) => item.id === id2);
      if (item) {
        setCant(item.quantity); 
      } else {
        setCant(0);
      }
    }
  });

  const loading = foodState.length === 0;
  if (loading) {
    return <div><Loading/></div>;
  }


  
  const addToCart = () => {
    const existingCart = localStorage.getItem('cart');
    if (existingCart) {
      let id = id2
      const cartItems = JSON.parse(existingCart);
      const itemIndex = cartItems.findIndex((item: any) => item.id === id);
      if (itemIndex !== -1) {
        cartItems[itemIndex].quantity += 1;
      } else {
        cartItems.push({ id, name, img, weight, price, quantity: 1  });
      }
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } else {
      localStorage.setItem(
        'cart',
        JSON.stringify([{ id, name, img, weight, price, quantity: 1  }])
      );
    }
    setCant(prevCant => prevCant + 1);
  };

  const removeFromCart = () => {
    const existingCart = localStorage.getItem('cart');
    if (existingCart) {
      const cartItems = JSON.parse(existingCart);
      const itemIndex = cartItems.findIndex((item: any) => item.id === id2);
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
  };
    return ( 
                    <div className={styles.todo}>
                        <div className={styles.botonatras}>
                            <NavLink to='/NuestrosPlatos'><img className={styles.flechita} src={'https://marketplace.canva.com/mJzgw/MAEkLfmJzgw/1/tl/canva-MAEkLfmJzgw.png'}></img><span className={styles.atras}>Atras</span></NavLink>
                        </div>
                        <div className={styles.container1}>
                          <img className={styles.imagen2} src={img}/>
                            <div className={styles.container2}>
                             <h2 className={styles.name}>{name}<p className={styles.peso}>({weight}g)</p></h2>
                             <h2 className={styles.descripcion}>{selectedItem?.descripcion}</h2>
                             <div className={styles.calorias}> <p className={styles.caloriastexto}>{selectedItem?.kilocalorias} kilocalorias  |  {selectedItem?.grasas}g grasas  |  {selectedItem?.carbohidratos}g carbohidratos</p></div>
                             <div className={styles.botoncarro}>
                             {stock !== 'Agotado' ? (
                                   <>
                                   {cant > 0 ? (
                                   <>
                                   <button className={styles.btn} onClick={removeFromCart}>-</button>
                                   <span className={styles.cant}>{cant}</span>
                                   <button className={styles.btn} onClick={addToCart}>+</button>
                                   </>
                               ) : (
                                   <button className={styles.btnAdd} onClick={addToCart}>Añadir</button>
                                  )}
                               </>
                               ) : (
                                  <button className={styles.btnAdd2} disabled>Agotado</button>
                               )}
                             </div>
                             <div className={styles.ingredientes}>
                                  <button onClick={toggleMostrarIngredientes} className={styles.ingredientesboton}>{mostrarIngredientes ? <h1 className={styles.ingretitulo}>ingredientes&nbsp;-</h1> : <h1 className={styles.ingretitulo}>ingredientes&nbsp;+</h1>}</button>
                                   {mostrarIngredientes &&
                                   <h2 className={styles.ingretexto}>{selectedItem?.ingredientes.join(', ')}</h2>
                                   }
                             </div>
                           </div>
                          </div>
                          <div><Reseñas/></div>
                </div>
    );
}

export default Detail;