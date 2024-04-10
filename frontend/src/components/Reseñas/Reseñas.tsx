
import { Field, Form, Formik } from 'formik';
import styles from './Reseñas.module.css'
import React, { useEffect, useState } from "react";
import { postReview } from '../../redux/actions/Actions';


interface initialValuesInt {
    review: string
    estrellas: number
}

const initialValues: initialValuesInt = {
    review: '',
    estrellas: 0
}

interface reseñasProps{
    idPlato: number
}

const Reseñas: React.FC<reseñasProps> = ({idPlato}) =>{
    const [estrellasSeleccionadas, setEstrellasSeleccionadas] = useState(0);
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const getUserData = () => {
        const userDataString = localStorage.getItem('user');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            setUserData(userData);
        }
        };

        getUserData();
    }, []);

    const handleEstrellaClick = (valor: number) => {
        setEstrellasSeleccionadas(valor);
    };

    const handleSubmit = (values: initialValuesInt) => {
        values.estrellas = estrellasSeleccionadas;
        postReview(values.review, values.estrellas, idPlato, userData.id)
    };


    return (
        <div>
            {userData && (
            <div className={styles.createdReview}>
                <h3 className={styles.formTitulo}>Escribe un comentario!</h3>
                <Formik
                    initialValues={{ ...initialValues }}
                    onSubmit={handleSubmit}
                >
                    {({ values, handleChange }) => (
                        <Form>
                            <div className={styles.estrellasContainer}>
                                {[1, 2, 3, 4, 5].map((valor) => (
                                    <svg
                                        key={valor}
                                        className={valor <= estrellasSeleccionadas ? styles.estrellaSeleccionada : styles.estrella}
                                        onClick={() => handleEstrellaClick(valor)}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M0 0h24v24H0z" fill="none" />
                                        <path
                                            fill={valor <= estrellasSeleccionadas ? 'gold' : 'grey'}
                                            d="M11.99 2L15 8.1l6.5.94-4.72 4.61L17.94 21 12 17.27 6.06 21l-.84-7.35L2 8.99l6.5-.94L11.99 2z"
                                        />
                                    </svg>
                                ))}
                            </div>
                            <Field
                                placeholder='Comentario'
                                as='textarea'
                                name='review'
                                value={values.review}
                                onChange={handleChange}
                                className={styles.inputField}
                                maxLength={200} 
                            />
                            <button type='submit' className={styles.submitButton}>Crear</button>
                        </Form>
                    )}
                </Formik>
            </div>
            ) }
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
            </div>
    );

} 

export default Reseñas