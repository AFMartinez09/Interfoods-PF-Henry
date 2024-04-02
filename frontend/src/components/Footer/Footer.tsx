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
import Style from './Footer.module.css';

const Footer: React.FC = () => {

  const handleLinkClick = (url: string) => {
    window.location.href = url;
  };

  return (
    <footer className={Style.footer}>
      <div className={Style.container}>
        <h3 className={Style.title} onClick={() => handleLinkClick('/')}>INTERFOODS!</h3>
        <div className={Style.containerList}>
          <hr></hr>
          <h3 className={Style.links} onClick={() => handleLinkClick('/NuestrosPlatos')}>Nuestros platos</h3>
          <h3 className={Style.links} onClick={() => handleLinkClick('/Comofunciona')}>Cómo funciona</h3>
          <h3 className={Style.links} onClick={() => handleLinkClick('/QuienesSomos')}>¿Quiénes somos?</h3>
          <h3 className={Style.links} onClick={() => handleLinkClick('/Faqs')}>FAQ'S</h3>
        </div>
        <div className={Style.containerList}>
          <h3 className={Style.links} onClick={() => handleLinkClick('/cart')}>Mis compras</h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


