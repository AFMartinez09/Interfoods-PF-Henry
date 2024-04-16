import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Comprajoel.module.css';
import { createCompra } from '../../redux/actions/Actions';

interface Food {
  name: string;
  img: string;
  weight: number;
  price: number;
  id: number;
  inventario: number;
  quantity: number;
}

const Comprajoel: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    const carritoGuardado = localStorage.getItem('cart');
    if (carritoGuardado) {
      const parsedCart = JSON.parse(carritoGuardado);
      setFoods(parsedCart);
    }
  }, []);

  const calcularTotal = () => {
    const total = foods.reduce((total, food) => total + (food.price * food.quantity), 0);
    return total;
  };

  useEffect(() => {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const parsedUser = JSON.parse(userDataString);
      setUserData(parsedUser);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userData) { // Verificar si userData está definido antes de usarlo
          const userId = userData.id;
          const compraResponse = await createCompra(foods.length, calcularTotal(), userId, foods);
          console.log(compraResponse);
        }
      } catch (error) {
        console.error("Error al procesar la compra:", error);
      }
    };

    fetchData();

    localStorage.removeItem('cart')
  }, [userData, foods]); // Agregar userData y foods como dependencias para que el efecto se ejecute cuando cambien

  return (
    <div className={styles.errorContainer}>
      <img src='https://i.pinimg.com/originals/db/2f/f1/db2ff102f5f16ab41d3c4ee5f4d217c0.gif' alt="Error 404" className={styles.errorImage} />
      <h1 className={styles.errorTitle}>Gracias por tu compra</h1>
      <p className={styles.errorMessage}>Te agradecemos mucho por usar nuestros servicios.</p>
      <NavLink to="/" className={styles.button}>Volver a inicio</NavLink>
    </div>
  );
};

export default Comprajoel;




  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const status = 'approved'; 
  //       const payment_id = '123456';
  //       const payment_type = 'credit_card';

  //       const compraResponse = await success(status, payment_id, payment_type);
  //       console.log(compraResponse);
  //     } catch (error) {
  //       console.error("Error al procesar la compra:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);