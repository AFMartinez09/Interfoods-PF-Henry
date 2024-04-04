import { NavLink } from 'react-router-dom'; // Importa Link de React Router
import styles from './Footer.module.css'; // Usa estilos directamente

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <h3 className={styles.title}><NavLink className={styles.title} to="/">INTERFOODS</NavLink></h3>
        <div className={styles.containerList}>
          <hr></hr>
          <h3 className={styles.links}><NavLink className={styles.links} to="/NuestrosPlatos">Nuestros platos</NavLink></h3>
          <h3 className={styles.links}><NavLink className={styles.links} to="/Comofunciona">Cómo funciona</NavLink></h3>
          <h3 className={styles.links}><NavLink className={styles.links} to="/QuienesSomos">¿Quiénes somos?</NavLink></h3>
          <h3 className={styles.links}><NavLink className={styles.links} to="/Faqs">FAQ'S</NavLink></h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


