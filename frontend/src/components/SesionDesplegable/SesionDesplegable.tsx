import { NavLink, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from '@firebase/auth';
import Style from './SesionDesplegable.module.css';
import { app } from "../../Auth/firebaseConfig";

interface SesionDesplegableProps {
  toggleMenu: () => void;
}

const SesionDesplegable: React.FC<SesionDesplegableProps> = ({ toggleMenu }) => {
  const auth = getAuth(app);
  const navigate = useNavigate();

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (!target.closest(`.${Style.container}`)) {
      toggleMenu();
    }
  };

  const cerrarSesion = () => {
    signOut(auth).then(() => {
      navigate('/');
      setTimeout(() => {
        window.location.reload();
      }, 500); // Espera 500 milisegundos antes de recargar la página
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error);
    });
  }

  const handleCerrarSesionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Evita que el evento llegue al contenedor
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    cerrarSesion();
  }

  return (
    <div className={Style.pageDesplegable} onClick={handleClickOutside}>
      <div className={Style.container}>
        {/* <button className={Style.btnCerrarX} onClick={toggleMenu}>X</button> */}
        <div className={Style.item}>
          <img src='https://cdn-icons-png.flaticon.com/512/32/32438.png' className={Style.sesionImg}></img>
          <NavLink to={'/MiPerfil'} className={Style.btnPerfil} onClick={toggleMenu}><p className={Style.color2}>Mi perfil</p></NavLink> 
        </div>
        <hr />
        <div className={Style.item}>
          <img src='https://cdn.icon-icons.com/icons2/1769/PNG/512/4115235-exit-logout-sign-out_114030.png' className={Style.sesionImg}></img>
          <button className={Style.btnCerrarSesion} onClick={handleCerrarSesionClick}>
            <p className={Style.color}>Cerrar sesión</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SesionDesplegable;

//!codigo original
// import { getAuth, signOut } from '@firebase/auth';
// import Style from './SesionDesplegable.module.css';
// import { app } from "../../Auth/firebaseConfig";


// interface SesionDesplegableProps {
//   toggleMenu: () => void;
// }

// const SesionDesplegable: React.FC<SesionDesplegableProps> = ({ toggleMenu }) => {
  
//   const auth = getAuth(app);

//   const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
//     const target = event.target as HTMLElement;
//     if (!target.closest(`.${Style.container}`)) {
//       toggleMenu();
//     }
//   };

//   const cerrarSesion = () => {
//       signOut(auth)
//       toggleMenu()
//   }

//   return (
//     <div className={Style.pageDesplegable} onClick={handleClickOutside}>
//       <div className={Style.container}>
//         <button className={Style.btnCerrar} onClick={toggleMenu}>
//           x
//         </button>
//         <button className={Style.btnPerfil}> 
//           Mi perfil
//         </button>
//         <button className={Style.btnCerrarSesion} onClick={cerrarSesion}>
//           Cerrar sesión
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SesionDesplegable;































