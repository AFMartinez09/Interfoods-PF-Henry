import SesionDesplegable from '../SesionDesplegable/SesionDesplegable';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';
import Cart from '../Cart/Cart';
import { useState } from 'react';

interface NavBarProps {
  onItemClick: (item: string) => void;
  toggleMenu: () => void;
  showMenu: boolean;
  auth: boolean; 
}

const NavBar: React.FC<NavBarProps> = ({ onItemClick, toggleMenu, showMenu, auth}) => {
  const [showMenuAuth, setShowMenuAuth] = useState(false);
  const [showMenuAdmin, setShowMenuAdmin] = useState(false);

  const toggleMenuAuth = () => {
    setShowMenuAuth(!showMenuAuth);
  };

  const toggleMenuAdmin = () => {
    setShowMenuAdmin(!showMenuAdmin);
  };

  const handleToggleMenu = () => {
    toggleMenu();
  };

  const handleItemClick = (item: string) => {
    onItemClick(item);
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className={styles.navContainer}>
      <div>
        <NavLink to="/" className={styles.parrafo}>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;INTERFOODS</p>
        </NavLink>
      </div>
      <div className={styles.navLinksContainer}>
        <ul className={styles.navList}>
          <li className={styles.navListItem}>
            <NavLink to="/NuestrosPlatos" className={styles.navLink} onClick={() => handleItemClick('MENU DE LA SEMANA')}>
              NUESTROS PLATOS
            </NavLink>
          </li>
          <li className={styles.navListItem}>
            <NavLink to="/Comofunciona" className={styles.navLink} onClick={() => handleItemClick('COMO FUNCIONA')}>
              COMO FUNCIONA
            </NavLink>
          </li>
          <li className={styles.navListItem}>
            <NavLink to="/QuienesSomos" className={styles.navLink} onClick={() => handleItemClick('FAQ\'S')}>
              ¿QUIENES SOMOS?
            </NavLink>
          </li>
          <li className={styles.navListItem}>
            <NavLink to="/Faqs" className={styles.navLink} onClick={() => handleItemClick('FAQ\'S')}>
              FAQ'S
            </NavLink>
          </li>
        </ul>
        {user.admin && (
          <div className={showMenuAdmin ? `${styles.containerAdmin} ${styles.containerAdminOpen}` : styles.containerAdmin}>
            <button onClick={toggleMenuAdmin} className={styles.navLink}>
              ADMIN
            </button>
            {showMenuAdmin && (
              <div className={styles.adminSubMenu}>
                <NavLink to="/admindashboard/crearplato" className={styles.navLinkAdm} onClick={() => handleItemClick('CREAR PLATO')}>
                  Crear Plato
                </NavLink>
                <NavLink to="/admindashboard/editar-eliminar" className={styles.navLinkAdm} onClick={() => handleItemClick('EDITAR/ELIMINAR')}>
                  Editar/Eliminar
                </NavLink>
              </div>
            )}
          </div>
        )}
      </div>
      <div>
      {auth ? (
          <button onClick={toggleMenuAuth} className={styles.navbtn}>
            <img src="https://monestir.org/wp-content/uploads/2020/06/usuario.png" alt="Logo 2" className={styles.navUser} />
          </button>
        ) : (
          <NavLink to="/Login" onClick={() => handleItemClick('LOGIN')}>
            <img src="https://monestir.org/wp-content/uploads/2020/06/usuario.png" alt="Logo 2" className={styles.navUser} />
          </NavLink>
        )}
        <button onClick={handleToggleMenu} className={styles.navbtn}>
          <img src="https://static.vecteezy.com/system/resources/previews/019/787/018/original/shopping-cart-icon-shopping-basket-on-transparent-background-free-png.png" alt="Logo 1" className={styles.navLogo}/>
        </button>
      </div>
      {showMenuAuth && <SesionDesplegable toggleMenu={toggleMenuAuth} />}
      {showMenu && <Cart toggleMenu={handleToggleMenu} />}
    </div>
  );
};

export default NavBar;