import React, { useEffect, useState } from 'react';
import Style from './Cart.module.css';

interface Food {
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
  const [foods, setFoods] = useState<Food[]>([]);
  let [totalQuantity, setTotalQuantity] = useState<number>(0); // Estado para el total de la cantidad de productos en el carrito

  useEffect(() => {
    const carritoGuardado = localStorage.getItem('cart');
    if (carritoGuardado) {
      setFoods(JSON.parse(carritoGuardado));
      totalQuantity = JSON.parse(carritoGuardado).reduce((total : any, food : any) => total + food.quantity, 0);
      setTotalQuantity(totalQuantity);
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
          <button className={Style.checkoutButton}>Comprar</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;