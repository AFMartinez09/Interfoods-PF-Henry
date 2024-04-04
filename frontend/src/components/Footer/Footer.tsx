// import Style from './Footer.module.css'

// const Footer = () => {
//   return(
//     <footer className={Style.footer}>
//       <div className={Style.conteiner}>
//         <h3 className={Style.title}>INTERFOODS!</h3>
//         <div className={Style.conteinerList}>
//           <h3 className={Style.links}>Nuestros platos</h3>
//           <h3 className={Style.links}>Como funciona</h3>
//           <h3 className={Style.links}>¿Quienes somos?</h3>
//           <h3 className={Style.links}>FAQ'S</h3>
//         </div>
//         <div className={Style.conteinerList}>
//           <h3 className={Style.links}> Mis compras</h3>
//         </div>
//       </div>
//     </footer>
//   )
// }

// export default Footer

import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link de React Router
import styles from './Footer.module.css'; // Usa estilos directamente

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <h3 className={styles.title}><Link to="/">INTERFOODS!</Link></h3>
        <div className={styles.containerList}>
          <hr></hr>
          <h3 className={styles.links}><Link to="/NuestrosPlatos">Nuestros platos</Link></h3>
          <h3 className={styles.links}><Link to="/Comofunciona">Cómo funciona</Link></h3>
          <h3 className={styles.links}><Link to="/QuienesSomos">¿Quiénes somos?</Link></h3>
          <h3 className={styles.links}><Link to="/Faqs">FAQ'S</Link></h3>
        </div>
        <div className={styles.containerList}>
          <h3 className={styles.links}><Link to="/cart">Mis compras</Link></h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


