import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Comprajoel.module.css';
import { createCompra, success } from '../../redux/actions/Actions';
import { useLocation } from "react-router-dom";

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

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const status = searchParams.get("status");
  const payment_id = searchParams.get("payment_id");
  const payment_type = searchParams.get("payment_type");

  useEffect(() => {
    const carritoGuardado = localStorage.getItem('cart');
    if (carritoGuardado) {
      const parsedCart = JSON.parse(carritoGuardado);
      setFoods(parsedCart);
    }
  }, []);

  const getProductDescription = (): string => {
    const productDescriptions = foods.map((food) => {
      return `${food.name} (${food.quantity})`;
    });

    const allProductDescriptions = productDescriptions.join(', ');

    return allProductDescriptions;
  };

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
        const fecha = new Date();
        const fechaStr = fecha.toISOString(); // Convertir la fecha a una cadena de texto
  
        const totalStr = calcularTotal().toString();
  
        console.log(status, payment_id, payment_type,
          userData?.email,
          userData?.nombre,
          totalStr,
          fechaStr,
          getProductDescription());
  
        if (status !== null && payment_id !== null && payment_type !== null && userData?.email && userData?.nombre && userData?.id) {
          // Llamar a la función success
          const compraResponse = await success(
            userData.id,
            status,
            payment_id,
            payment_type,
            userData.email,
            userData.nombre,
            totalStr,
            fechaStr,
            getProductDescription(),
            foods
          );
          console.log(compraResponse);
        }
  
        if (userData && foods.length > 0) { // Verificar si userData está definido y si hay alimentos en el carrito
          const userId = userData.id;
          await createCompra(foods.length, calcularTotal(), userId, foods);
          localStorage.removeItem('cart'); // Mover la eliminación del carrito aquí
        }
      } catch (error) {
        console.error("Error al procesar la compra:", error);
      }
    };
  
    fetchData();
  }, [userData]); // Agregar todas las dependencias necesarias
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userData && foods.length > 0) { // Verificar si userData está definido y si hay alimentos en el carrito
          const userId = userData.id;
          await createCompra(foods.length, calcularTotal(), userId, foods);
          localStorage.removeItem('cart'); // Mover la eliminación del carrito aquí
        }
      } catch (error) {
        console.error("Error al procesar la compra:", error);
      }
    };
  
    fetchData();
  }, [userData, foods]);

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