import React from "react";
import styles from "./Soporte.module.css";

const Soporte: React.FC = () => {
  const subject = "Consulta sobre InterFood";
  const body =
    "Hola equipo de InterFood,\n\nEstoy teniendo un problema con el servicio y me gustaría obtener ayuda. ¿Podrían por favor asistirme?\n\nGracias.";

  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  const mailtoLink = `mailto:grupointerfoods@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;

  return (
    <div className={styles.errorContainer}>
      <h2 className={styles.errorTitle}>
        Teléfono:{" "}
        <a
          className={styles.errorTitle}
          href="https://wa.me/3757723901?text=Hola! Gracias por comunicarte con el equipo de InterFood. ¿En que podemos ayudarte?"
          target="_blank"
        >
          3757723901
        </a>
      </h2>

      <h2 className={styles.errorTitle}>
        Correo:{" "}
        <a className={styles.errorTitle} href={mailtoLink} target="_blank">
          grupointerfoods@gmail.com
        </a>
      </h2>
      <h2 className={styles.errorTitle}>Ubicación: </h2>
      <div className={styles.iframeContainer}>
        <iframe
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=es&amp;q=Pueyrred%C3%B3n%20100,%20Villa%20Mar%C3%ADa,%20C%C3%B3rdoba,%20Argentina+(InterFood)&amp;t=k&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          className={styles.iframe}
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Soporte;
