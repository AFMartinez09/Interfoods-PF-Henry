import React from 'react';
import styles from './error.module.css';

const Error404: React.FC = () => {
  return (
       
    <div className={styles.errorContainer}>
      <h1 className={styles.errorTitle}>Error 404 - Página no encontrada</h1>
      <p className={styles.errorMessage}>Lo sentimos, la página que estás buscando no se encuentra en este sitio web.</p>
      <p className={styles.errorMessage}>Por favor, vuelve a <a href="/" className={styles.errorLink}>la página de inicio</a> o contáctanos si crees que esto es un error.</p>
      <img src='https://cdn-icons-png.flaticon.com/512/4923/4923785.png' alt="Error 404" className={styles.errorImage} />
    </div>
  
  );
};

export default Error404;

