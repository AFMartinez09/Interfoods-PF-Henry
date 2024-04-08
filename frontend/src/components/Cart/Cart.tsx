import React, { useEffect, useState } from 'react';
import Style from './Cart.module.css';
import { useDispatch } from 'react-redux';
import { setTransaccionId } from '../../redux/actions/Actions';
import axios from 'axios';

export interface Food {
  name: string;
  img: string;
  weight: number;
  price: number;
  id: number;
  quantity: number;
}

interface CartProps {
  toggleMenu: () => void;
}
const Cart: React.FC<CartProps> = ({ toggleMenu }) => {
  const [userData, setUserData] = useState<any>(null);
  const [foods, setFoods] = useState<Food[]>([]);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const dispatch = useDispatch();
totalQuantity //!ESTA PALABRA ESTA YA QUE TOTALQUANTITY HACE QUE NO SALGA ERRORES PERO NO MOLESTA,NI SE VE
    useEffect(() => {
    const carritoGuardado = localStorage.getItem('cart');
    if (carritoGuardado) {
      setFoods(JSON.parse(carritoGuardado));
      setTotalQuantity(JSON.parse(carritoGuardado).reduce((total: any, food: any) => total + food.quantity, 0));
    }
  }, []);

  const addToCart = (id: number) => {
    const updatedFoods = foods.map(food => {
      if (food.id === id) {
        return { ...food, quantity: food.quantity + 1 };
      }
      return food;
    });
    setFoods(updatedFoods);
    localStorage.setItem('cart', JSON.stringify(updatedFoods));
    setTotalQuantity(prevTotalQuantity => prevTotalQuantity + 1);
  };

  const removeFromCart = (id: number) => {
    const updatedFoods = foods.map(food => {
      if (food.id === id && food.quantity > 0) {
        return { ...food, quantity: food.quantity - 1 };
      }
      return food;
    });
    
    const filteredFoods = updatedFoods.filter(food => food.quantity > 0);
    
    setFoods(filteredFoods);
    localStorage.setItem('cart', JSON.stringify(filteredFoods));
    
    const totalQuantity = filteredFoods.reduce((total, food) => total + food.quantity, 0);
    setTotalQuantity(totalQuantity);
  };
  
  const calcularTotal = () => {
    return foods.reduce((total, food) => total + (food.price * food.quantity), 0);
  };

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (!target.closest(`.${Style.cart}`)) {
      toggleMenu();
    }
   };

   const getUserData = () => {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUserData(userData);
    }
  };

  useEffect(getUserData)

  const emailUser = userData.email
  const nombreUser = userData.nombre

   const handleBuyClick = async () => {
    try {
      console.log("Handle buy click executed");
      const totalPrice = foods.reduce((total, food) => total + (food.price * food.quantity), 0);
      const selectedProducts = foods.map(food => food.name);
      const formattedProducts = selectedProducts.join(", ");

  
      const response = await axios.post("http://localhost:3000/api/payments/create-order", {
        idCompra: 'ID_DE_LA_COMPRA',
        producto: formattedProducts,
        precio: totalPrice,
        idUsuario: 'ID_DEL_USUARIO',
        emailUser,
        nombreUser
      });
      console.log("Response from backend:", response.data);
      const transactionId = response.data.transactionId;
      
      dispatch(setTransaccionId(transactionId));
      
      const mercadoPagoURL = response.data;
      window.location.href = mercadoPagoURL

      
    } catch (error) {
      console.error("Error al procesar la compra:", error);
    }
  };

  

return (
    <div className={Style.pageCart} onClick={handleClickOutside}>
      <div className={Style.cart}>
        <h2 className={Style.cartTitle}>Carrito</h2>
        <button className={Style.closeButton} onClick={toggleMenu}>X</button>
        <div className={Style.itemsContainer}>
          {foods.map((food) => (
            <div key={food.id} className={Style.cartItem}>
                <img src={food.img} alt={food.name} className={Style.itemImage} />
                <div className={Style.infoprecio}>
                  <div className={Style.info}>
                    <p className={Style.name}>{food.name}</p>
                  </div>
                  <div className={Style.info}>
                    <div className={Style.precio}>
                      <p>P/u: ${food.price ? food.price.toFixed(2) : "N/A"}</p>
                    </div>
                    <div className={Style.botonprecio}>
                       <button onClick={() => removeFromCart(food.id)} className={Style.btnCant}>-</button>
                       <p className={Style.cant}>{food.quantity}</p>
                       <button onClick={() => addToCart(food.id)} className={Style.btnCant}>+</button>
                    </div>
                  </div>
                </div>
            </div>
          ))}
        </div>
        <div className={Style.totalContainer}>
          <p className={Style.totalAmount}>Total a pagar:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${calcularTotal().toFixed(2)}</p>
          <button className={Style.checkoutButton} onClick={handleBuyClick} >Comprar</button>
          
        </div>
      </div>
    </div>
  );
}
export default Cart;