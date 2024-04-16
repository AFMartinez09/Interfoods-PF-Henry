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

  // id,
  // date_created,
  // status,
  // payment_id,
  // payment_type,
  // transaction_amount,
  // description,
  // user_email,
  // user_name,
  // http://localhost:5173/api/payments/success?collection_id=1317846960&collection_status=approved&payment_id=1317846960&status=approved&external_reference=null&payment_type=account_money&merchant_order_id=17728078956&preference_id=1753454923-229149f2-2eac-48ac-ba2a-7cc2a302429f&site_id=MLA&processing_mode=aggregator&merchant_account_id=null



  useEffect(() => {
    const carritoGuardado = localStorage.getItem('cart');
    if (carritoGuardado) {
      const parsedCart = JSON.parse(carritoGuardado);
      setFoods(parsedCart);
    }
  }, []);

  const getProductDescription = (): string => {
    const productDescriptions = foods.map((food) => {
      return `${food.name} (Cantidad: ${food.quantity})`;
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
            getProductDescription()
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