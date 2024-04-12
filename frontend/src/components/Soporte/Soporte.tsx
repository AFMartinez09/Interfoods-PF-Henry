import React from "react";
import styles from "./Soporte.module.css";

const Soporte: React.FC = () => {
  return (
    <div className={styles.errorContainer}>
      <h2 className={styles.errorTitle}>Teléfono: </h2>
      <h2 className={styles.errorTitle}>Correo: </h2>
      <h2 className={styles.errorTitle}>Ubicación: </h2>
      <div className={styles.iframeContainer}>
        <iframe
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=es&amp;q=Pueyrred%C3%B3n%20100,%20Villa%20Mar%C3%ADa,%20C%C3%B3rdoba,%20Argentina+(InterFood)&amp;t=k&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          frameBorder="0"
          className={styles.iframe}
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Soporte;
