
import styles from './Reseñas.module.css'
import React from "react";


const Reseñas: React.FC = () =>{
    return ( 
                    <div className={styles.container3}> 
                          <div>
                            <h1 className={styles.reseñastitulo}>Aqui algunas reseñas de nuestros clientes</h1>
                          </div>
                          <div className={styles.cartasreseñas2}>
                            <div className={styles.cartasreseñas}>
                                <div className={styles.reseña}>
                                    <p className={styles.textoreseñaestrella}>★★★★★</p>
                                    <p className={styles.textoreseña}>Pedi la bandeja paisa y me enamore</p>
                                    <p className={styles.textonombre}>Aurelio Cabello</p>
                                </div >
                            </div>
                            <div className={styles.cartasreseñas}>
                                <div className={styles.reseña}>
                                <p className={styles.textoreseñaestrella}>★★★★★</p>
                                    <p className={styles.textoreseña}>Me pedi 40 milanesas y no me arrepiento de nada, estaban muy ricas</p>
                                    <p className={styles.textonombre}>Joel Fernandez</p>
                                </div >
                            </div>
                            <div className={styles.cartasreseñas}>
                                <div className={styles.reseña}>
                                <p className={styles.textoreseñaestrella}>★★★★★</p>
                                    <p className={styles.textoreseña}>Excelente los platos, todo estaba  en su punto. la atencion fue muy buena en todo momento... recomendado</p>
                                    <p className={styles.textonombre}>Sharon Gonzalez</p>
                                </div >
                            </div>
                            <div className={styles.cartasreseñas}>
                                <div className={styles.reseña}>
                                    <p className={styles.textoreseñaestrella}>★★★★★</p>
                                    <p className={styles.textoreseña}>Todo muy rico, me pedi comida para toda la semana</p>
                                    <p className={styles.textonombre}>Joel Fernandez</p>
                                </div >
                            </div>
                          </div>
                        </div>
    );

} 

export default Reseñas