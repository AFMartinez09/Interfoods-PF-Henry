
import React from 'react';
import styles from './Funciona.module.css';
import imagen1 from '../../assets/img/_bd005963-346b-4f26-9398-579f64fcd9d6.jpg';
import imagen2 from '../../assets/img/_316764dc-ac61-47a8-aee6-843f829ebd42.jpg';
import { Link } from 'react-router-dom';


interface PlatoProps {}

const Funciona: React.FC<PlatoProps> = () => {
  
  return (
    <div className={styles.funcionaContainer}>
      <h1>¿Cómo funciona?</h1>
      <h3>Comer bien nunca había sido tan fácil</h3>
      <div className={styles.imagesContainer}>
        <div className={styles.imageWrapper}>
          <img src={imagen1} alt="Logo 1" />
        </div>
        <div className={styles.textWrapper}>
          <h2>Abre, come y disfruta</h2>
          <p>
            Una vez tengas tu pedido solo tendrás que <strong>disfrutar de tu comida.</strong>
            <br />
            ¡Nosotros cocinamos por ti, tú sólo preocúpate de aprovechar tu tiempo!
          </p>
        </div>
      </div>
      <div className={styles.imagesContainer}>
        <div className={styles.textWrapper}>
          <h2>Donde quiera que estes</h2>
          <p>
            <strong>Te garantizamos</strong> que tu pedido llegará estés donde estés totalmente
            fresco
            <br></br> 
           <strong>en una única entrega.</strong>
            <br />
            ¡Ya no tienes que preocuparte por ir a comprar, ponerte a cocinar y limpiar!
          </p>
        </div>
        <div className={styles.imageWrapper}>
          <img src={imagen2} alt="Logo 2" />
        </div>
      </div>
      
      <br></br>
      <br></br>
      <br></br>
      <div className={styles.sectionContainer}>
        <div className={`${styles.textContainer} ${styles.grisPastel}`}>
          <h1>¿Has visto ya nuestros platos disponibles?</h1>
          <p>Échale un vistazo a la carta y olvídate de cocinar.</p>
           <button className={styles.buttonOrange}>
          <Link to="/NuestrosPlatos">
            Ver los Platos
          </Link>
        </button>
        </div>
      </div>
    </div>
  );
};

export default Funciona;
