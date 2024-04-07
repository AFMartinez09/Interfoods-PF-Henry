import React from 'react';
import { NavLink } from 'react-router-dom'; // Importa Link si estás usando React Router
import styles from './Comprajoel.module.css';

const Comprajoel : React.FC = () => {
  return (
    <div className={styles.errorContainer}>
      <img src='https://i.pinimg.com/originals/db/2f/f1/db2ff102f5f16ab41d3c4ee5f4d217c0.gif' alt="Error 404" className={styles.errorImage} />
      <h1 className={styles.errorTitle}>Gracias por tu compra</h1>
      <p className={styles.errorMessage}>Te agradecemos mucho por usar nuestros servicos.</p>
      {/* Botón para volver a la página de inicio */}
      <NavLink to="/" className={styles.button}>Volver a inicio</NavLink>
    </div>
  );
};

export default Comprajoel;