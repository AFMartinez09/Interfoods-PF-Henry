import React from 'react';
import styles from './Comprajoel.module.css';

const Comprajoel : React.FC = () => {
  return (
       
    <div className={styles.errorContainer}>
      <h1 className={styles.errorTitle}>Gracias por tu compra</h1>
      <p className={styles.errorMessage}>Lo sentimos, la página que estás buscando no se encuentra en este sitio web.</p>
      <p className={styles.errorMessage}>Por favor, vuelve a <a href="/" className={styles.errorLink}>la página de inicio</a> o contáctanos si crees que esto es un error.</p>
      <img src='https://cdn-icons-png.flaticon.com/512/4923/4923785.png' alt="Error 404" className={styles.errorImage} />
    </div>
  
  );
};

export default Comprajoel;

