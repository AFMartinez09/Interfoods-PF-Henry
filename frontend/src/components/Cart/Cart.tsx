import React, { useEffect, useState } from 'react';
import Style from './Cart.module.css';
import { useDispatch } from 'react-redux';
import { setTransaccionId } from '../../redux/actions/Actions';
import axios from 'axios';
import { URL } from '../../App';



export interface Food {
  name: string;
  img: string;
  weight: number;
  price: number;
  id: number;
  inventario: number;
  quantity: number;
}

interface CartProps {
  toggleMenu: () => void;
}
const Cart: React.FC<CartProps> = ({ toggleMenu }) => {
  const [userData, setUserData] = useState<any>(null);
  const [foods, setFoods] = useState<Food[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const carritoGuardado = localStorage.getItem('cart');
    if (carritoGuardado) {
      const parsedCart = JSON.parse(carritoGuardado);
      setFoods(parsedCart);
    }
  }, [localStorage.getItem('cart')]);
  console.log(localStorage.getItem('cart'));
  

  const addToCart = (id: number) => {
    const updatedFoods = foods.map(food => {
      if (food.id === id) {
        return { ...food, quantity: food.quantity + 1 };
      }
      return food;
    });
    setFoods(updatedFoods);
    localStorage.setItem('cart', JSON.stringify(updatedFoods));
    const event = new Event('cartChange');
    window.dispatchEvent(event);
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
    const event = new Event('cartChange');
    window.dispatchEvent(event);
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

  useEffect(getUserData, []);

  const emailUser = userData?.email;
  const nombreUser = userData?.nombre;

  const handleBuyClick = async () => {
    try {
      const totalPrice = calcularTotal();
      const selectedProducts = foods.map(food => food.name).join(", ");

      const response = await axios.post(`${URL}/api/payments/create-order`, {
        idCompra: 'ID_DE_LA_COMPRA',
        producto: selectedProducts,
        precio: totalPrice,
        idUsuario: 'ID_DEL_USUARIO',
        emailUser,
        nombreUser
      });
      const comidaString = localStorage.getItem('cart');
      if (comidaString !== null) {
        const comida = JSON.parse(comidaString);
        for (const item of comida) {
          const id = item.id;
          const quantity = item.quantity;
          await axios.get(`${URL}/api/food/comida/inventario?id=${id}&quantity=${quantity}`);
        }
      }
      const transactionId = response.data.transactionId;
      dispatch(setTransaccionId(transactionId));
      const mercadoPagoURL = response.data;
      window.location.href = mercadoPagoURL;
    } catch (error) {
      console.error("Error al procesar la compra:", error);
    }
  };

  const login = () =>{
    window.location.href = "/login"
    toggleMenu()
  }

  return (
    <div className={Style.pageCart} onClick={handleClickOutside}>
      <div className={Style.cart}>
        <h2 className={Style.cartTitle}>Carrito</h2>
        <button className={Style.closeButton} onClick={toggleMenu}>X</button>
        <div className={Style.itemsContainer}>
          {!userData ? (
            <div className={Style.containerMsj}>
              <p className={Style.msj}>
                Debes iniciar sesion para realizar una compra
              </p>
              <div className={Style.login}>
                <button className={Style.loginboton} onClick={login}>ingresa aqui para inicar sesion o crear una cuenta!</button>
              </div>
            </div>
          ) : (
            foods.map((food) => (
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
                      <button onClick={() => addToCart(food.id)} disabled={food.quantity >= food.inventario} className={Style.btnCant}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
  
        <div className={Style.totalContainer}>
          <p className={Style.totalAmount}>Total a pagar: ${calcularTotal().toFixed(2)}</p>
          <button className={userData ? Style.checkoutButton : Style.checkoutButtonDis} onClick={handleBuyClick} disabled={!userData}>Comprar</button>
        </div>
      </div>
    </div>
  );
}
export default Cart;