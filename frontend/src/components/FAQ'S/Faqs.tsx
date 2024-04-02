import React, { useState } from 'react';
import styles from './Faqs.module.css';
import { Link } from 'react-router-dom';

interface FaqsProps {}

const Faqs: React.FC<FaqsProps> = () => {
  const [preguntas] = useState([
    {
      pregunta: "¿Qué es InterFoods?",
      respuesta: "InterFoods es un servicio de entrega de comida a domicilio que te permite descubrir y disfrutar de la mejor gastronomía internacional."
    },
    {
      pregunta: "¿Cómo funciona el servicio?",
      respuesta: "Es muy sencillo. Solo tienes que elegir tu ciudad, seleccionar los platos que más te gusten y nosotros te los llevamos a casa."
    },
    {
      pregunta: "¿Dónde y cuándo entregan?",
      respuesta: "Entregamos en toda la ciudad en la cual estes, de lunes a domingo, de 12:00 a 23:00 horas."
    },
    {
      pregunta: "¿Hay un importe mínimo para realizar un pedido?",
      respuesta: "No,no hay ningun importe mínimo!, solo elige el plato o los platos que quieras y te lo enviamos! ."
    },
    {
      pregunta: "¿Puedo realizar un pedido el día que quiera?",
      respuesta: "Sí, puedes realizar un pedido cualquier día de la semana."
    },
    {
      pregunta: "¿Cuál es el último día de la semana para realizar un pedido?",
      respuesta: "El último día de la semana para realizar un pedido es el domingo."
    },
    {
      pregunta: "¿Se puede realizar un pedido por teléfono o WhatsApp?",
      respuesta: "Sí, puedes realizar un pedido por teléfono al 3446-309499 o por WhatsApp al 3446-309499."
    },
    {
      pregunta: "¿Qué pasa si mi pedido llega golpeado o en mal estado?",
      respuesta: "No es lo habitual pero si por alguna razón la caja ha sufrido algún golpe y se ha dañado alguno de tus platos, por favor, póngase en contacto con nosotros escribiéndonos al chat de Whatsapp(3446-309499) o envíanos un correo electrónico a pedidosInterfoods@gmail.com."  
    },
 {
      pregunta: "¿Se puede devolver un pedido si no me gusta?",
      respuesta: "No hay opción de devolver un pedido, pero si por cualquier cosa no ha cumplido tus expectativas, ponte en contacto con nosotros para conocer más en detalle el caso y poder ofrecerte una solución."  
    },

  ]);

  const [respuestasVisibles, setRespuestasVisibles] = useState<string[]>([]);
  

  const toggleRespuesta = (pregunta: string) => {
    setRespuestasVisibles(prevRespuestas => {
      if (prevRespuestas.includes(pregunta)) {
        return prevRespuestas.filter(item => item !== pregunta);
      } else {
        return [...prevRespuestas, pregunta];
      }
    });
  };

  return (
    <div className={styles.faqContainer}>
      <h1 className={styles.faqTitle}>Preguntas frecuentes</h1>
      <ul className={styles.faqList}>
        {preguntas.map((pregunta) => (
          <li key={pregunta.pregunta} className={styles.faqItem}>
            <div className={styles.faqHeader} onClick={() => toggleRespuesta(pregunta.pregunta)}>
              <h2 className={styles.faqQuestion}>{pregunta.pregunta}</h2>
              <span className={styles.faqToggle}>{respuestasVisibles.includes(pregunta.pregunta) ? "-" : "+"}</span>
            </div>
            {respuestasVisibles.includes(pregunta.pregunta) && (
              <p className={styles.faqAnswer}>{pregunta.respuesta}</p>
            )}
          </li>
        ))}
      </ul>
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

export default Faqs;
