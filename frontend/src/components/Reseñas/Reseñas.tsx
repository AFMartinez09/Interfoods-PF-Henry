
import { ErrorMessage, Field, Form, Formik } from 'formik';
import styles from './Reseñas.module.css'
import React, { useEffect, useState } from "react";
import { getAllReviews, getReviewForPlato, postReview } from '../../redux/actions/Actions';
import ReviewValidationSchema from './validationsReseñas';


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
    const [reseñas, setReseñas] = useState<string[]>([]);
    const [newReseña, setNewReseña] = useState<boolean>(false)
    const [position, setPosition] = useState(0);
    const [reseñasObtenidas, setReseñasObtenidas] = useState<boolean>(false)

    const handleNext = () => {
      setPosition((prevPosition) => Math.min(prevPosition + 1, reseñas.length - 3));
    };
  
    const handlePrev = () => {
      setPosition((prevPosition) => Math.max(prevPosition - 1, 0));
    };

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

    useEffect(() => {
      const fetchData = async () => {
          try {
              let dataReseña;
              if (!isNaN(idPlato)) {
                  const reseñasPlato = await getReviewForPlato(idPlato);
                  if (reseñasPlato.length > 0) {
                      dataReseña = reseñasPlato;
                      console.log('Plato', idPlato, dataReseña);
                      setReseñas(dataReseña); // Aquí estableces las reseñas
                      setReseñasObtenidas(true); // Establece el estado de reseñas obtenidas
                      return;
                  }
              }
              // Si llegas aquí, significa que no hay reseñas para el plato específico, entonces obtienes todas las reseñas
              if (!reseñasObtenidas) { // Verifica si ya se obtuvieron las reseñas
                  dataReseña = await getAllReviews();
                  console.log('Todos', dataReseña);
                  setReseñas(dataReseña);
                  setReseñasObtenidas(true);
              }
          } catch (error) {
              console.error('Error al obtener las reseñas:', error);
          }
      };
  
      fetchData();
      setNewReseña(false);
  }, [idPlato, newReseña, reseñasObtenidas]); // Agrega reseñasObtenidas al arreglo de dependencias
  
  
  
    
    

    const handleEstrellaClick = (valor: number) => {
        setEstrellasSeleccionadas(valor);
    };

    const handleSubmit = (values: initialValuesInt) => {
        values.estrellas = estrellasSeleccionadas;
        postReview(values.review, values.estrellas, idPlato, userData.id);
        setNewReseña(true)
    };

    const generarEstrellas = (calificacion: number): string => {
        const estrellaLlena = '★';
        const estrellaVacia = '☆';
        const totalEstrellas = 5;
    
        // Genera el string de estrellas
        const estrellas = estrellaLlena.repeat(calificacion) + estrellaVacia.repeat(totalEstrellas - calificacion);
    
        return estrellas;
    };

    return (
        <div>
          {userData && (
            <div className={styles.createdReview}>
              <h3 className={styles.formTitulo}>Escribe un comentario!</h3>
              <Formik
                initialValues={initialValues}
                validationSchema={ReviewValidationSchema} 
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
                    <p className="error"><ErrorMessage name="review" /></p>
                    <p className="error"><ErrorMessage name="estrellas" /></p>
                    <button type='submit' className={styles.submitButton}>Crear</button>
                  </Form>
                )}
              </Formik>
            </div>
          )}
          <div className={styles.container3}> 
            <div>
              <h1 className={styles.reseñastitulo}>Aqui algunas reseñas de nuestros clientes</h1>
            </div>
                <div className={styles.containerReseñasBtn}>
                        {reseñas.length > 3 && 
                            (
                                <button onClick={handlePrev} disabled={position === 0} className={styles.btnCarrousel}>
                                    Anterior
                                </button>
                            )
                        }
                        <div className={styles.cartasreseñas2}>
                        {reseñas && reseñas.length > 0 && reseñas.slice(position, position + 3).map((reseña: any) => (
                            <div key={reseña.id} className={styles.reseña}>
                            <p className={styles.textoreseñaestrella}>{generarEstrellas(reseña.calificacion)}</p>
                            <p className={styles.textoreseña}>{reseña.comentario}</p>
                            </div>
                        ))}
                        </div>
                        {reseñas.length > 3 && 
                            (
                            <button onClick={handleNext} disabled={position === reseñas.length - 3}  className={styles.btnCarrousel}>
                                Siguiente
                            </button>
                            )
                        }
                    </div>
            </div>
        </div>
    );

} 

export default Reseñas