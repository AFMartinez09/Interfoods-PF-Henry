import SesionDesplegable from '../SesionDesplegable/SesionDesplegable';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';
import Cart from '../Cart/Cart';
import { useState, useRef, useEffect} from 'react';
import { setAdminState } from '../../redux/actions/Actions';
import { useDispatch } from 'react-redux';

interface NavBarProps {
  onItemClick: (item: string) => void;
  toggleMenu: () => void;
  showMenu: boolean;
  auth: boolean; 
}

const NavBar: React.FC<NavBarProps> = ({ onItemClick, toggleMenu, showMenu, auth}) => {
  const [showMenuAuth, setShowMenuAuth] = useState(false);
  const [showMenuAdmin, setShowMenuAdmin] = useState(false);
  const adminMenuRef = useRef<HTMLDivElement>(null);
  const [userData, setUserData] = useState<any>(null);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  const dispatch = useDispatch();



  useEffect(() => {
    const calcularTotalQuantity = () => {
      const cartItems = localStorage.getItem('cart');
      if (cartItems) {
        const parsedCart = JSON.parse(cartItems);
        const total = parsedCart.reduce((accumulator: number, currentItem: any) => {
          return accumulator + currentItem.quantity;
        }, 0);
        return total;
      } else {
        return 0;
      }
    };
    const handleStorageChange = () => {
      const total = calcularTotalQuantity();
      console.log('sumaaa');
      
      setTotalQuantity(total);
    };

    const initialTotal = calcularTotalQuantity();
    setTotalQuantity(initialTotal);

    window.addEventListener('cartChange', handleStorageChange);

    return () => {
      window.removeEventListener('cartChange', handleStorageChange);
    };
  }, [localStorage.getItem('cart')]);

  useEffect(() => {
    const getUserData = () => {
      const userDataString = localStorage.getItem('user');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        setUserData(userData);  
      }
    }; 
  
    // Función para recargar el componente con un retraso de 1 segundo
    const reloadComponentWithDelay = () => {
      setTimeout(() => {
        getUserData(); // Vuelve a obtener los datos del usuario después de 1 segundo
      }, 1000); // 1000 milisegundos = 1 segundo
    };
  
    // Llama a la función para obtener los datos del usuario al montar el componente
    getUserData();
  
    // Agrega el event listener para el evento 'foto'
    window.addEventListener('foto', reloadComponentWithDelay);
  
    // Retira el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('foto', reloadComponentWithDelay);
    };
  }, []);


  // useEffect(() => {
  //   const reloadComponent = () => {
  //     setReload(true); // Cambia el estado de reload para forzar la actualización
  //     console.log(userData);
  //     console.log(localStorage.getItem('user')); 
  //   };
  //   window.addEventListener('foto', reloadComponent);
  // }, []);


  
  useEffect(() => {
    if (userData !== null && userData.admin !== undefined) {
      const isAdmin = (dispatch: any, admin: boolean) => {
        dispatch(setAdminState(admin));
      };
      isAdmin(dispatch, userData.admin);
    }
  }, [userData, dispatch]);

 
  

useEffect(() => {
  if (userData !== null && userData.admin !== undefined) {
    const isAdmin = (dispatch: any, admin: boolean) => {
      dispatch(setAdminState(admin));
    };
    isAdmin(dispatch, userData.admin);
  }
}, [userData, dispatch]);

 
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (adminMenuRef.current && !adminMenuRef.current.contains(event.target as Node)) {
        setShowMenuAdmin(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

 

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
  

  return (
    <div className={styles.navContainer}>
      <div>
        <NavLink to="/" className={styles.parrafo}>
        <div className={styles.parrafo2}>
            <img src='https://i.ibb.co/QHgqbVv/dmmngmoawnvsfaxcaz6d-transformed.png' className={styles.interlogo}></img>
            <p>INTERFOODS</p>
        </div>
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
        {userData && userData.admin && (
         <div ref={adminMenuRef} className={showMenuAdmin ? `${styles.containerAdmin} ${styles.containerAdminOpen}` : styles.containerAdmin}>
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
                <NavLink to="/admindashboard/allReviews" className={styles.navLinkAdm} onClick={() => handleItemClick('EDITAR/ELIMINAR')}>
                  Reviews
                </NavLink>
              </div>
            )}
          </div>
        )}
      </div>
      <div className={styles.carritonumero}>
        <button onClick={handleToggleMenu} className={styles.navbtn2}>
        <p className={totalQuantity === 0 ? styles.numero2 : styles.numero}>{totalQuantity}</p>
        <div className={styles.carritonumero}>
             <img src={totalQuantity !== 0 ? "https://i.ibb.co/jzrMVBD/carritoop.png" : "https://static.vecteezy.com/system/resources/previews/019/787/018/original/shopping-cart-icon-shopping-basket-on-transparent-background-free-png.png"}  
             className={totalQuantity !== 0 ? styles.navLogo : styles.navLogo2}/>
          </div>
        </button>
        {auth ? (
        <button onClick={toggleMenuAuth} className={styles.navbtn}>
          {userData && userData.foto ? (
            <img src={userData.foto} alt="Logo 3" className={styles.navUser3} />
          ) : (
            <img src="https://media-public.canva.com/ZkY4E/MAEuj5ZkY4E/1/t.png" alt="Logo 2" className={styles.navUser2} />
          )}
        </button>
       ) : (
           <NavLink to="/Login" onClick={() => handleItemClick('LOGIN')}>
              <img src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2019/png/iconmonstr-door-7.png&r=0&g=0&b=0" alt="Logo 2" className={styles.navUser} />
           </NavLink>
       )}
      </div>
      {showMenuAuth && <SesionDesplegable toggleMenu={toggleMenuAuth} />}
      {showMenu && <Cart toggleMenu={handleToggleMenu}/>}
    </div>
  );
};

export default NavBar;