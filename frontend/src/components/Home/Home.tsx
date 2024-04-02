import { NavLink } from 'react-router-dom';
import Cards from '../Cards/Cards';
import Style from './Home.module.css';

const Home = () => {

  return (
    <div className={Style.home}>
          <section className={Style.inicio}>
            <div>
              <h3 className={Style.title}>Come rico toda la semana</h3>
              <ul className={Style.lista}>
                <li className={Style.li}><svg className={Style.svg} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.393 7.5l-5.643 5.784-2.644-2.506-1.856 1.858 4.5 4.364 7.5-7.643-1.857-1.857z"/></svg>Recibe donde y cuando quieras.</li>
                <li className={Style.li}> <svg className={Style.svg} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.393 7.5l-5.643 5.784-2.644-2.506-1.856 1.858 4.5 4.364 7.5-7.643-1.857-1.857z"/></svg>Cancela en cualquier momento.</li>
                <li className={Style.li}> <svg className={Style.svg} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.393 7.5l-5.643 5.784-2.644-2.506-1.856 1.858 4.5 4.364 7.5-7.643-1.857-1.857z"/></svg>¡Comida de toda latinoamerica!</li>
                <li className={Style.li}> <svg className={Style.svg} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.393 7.5l-5.643 5.784-2.644-2.506-1.856 1.858 4.5 4.364 7.5-7.643-1.857-1.857z"/></svg>Sin cocinar, sin limpiar… ¡Listo en minutos!</li>
              </ul>
            </div>
            <img className={Style.img} src="https://funcionactiva.com/imagenes/Tipos-de-cocineros-1024x671.jpg" alt="" />
          </section>
          <section className={Style.conteinerCards}>    
            <Cards numberOfCards={3}/>
            <NavLink to='/NuestrosPlatos'><button className={Style.btnMas}>Ver todos</button></NavLink>
          </section>
    </div>
  );
}

export default Home;
