
import { ErrorMessage, Field, Form, Formik } from 'formik';
import styles from './Reseñas.module.css'
import React, { useEffect, useState } from "react";
import { getAllReviews, getReviewForPlato, getUserById, postReview } from '../../redux/actions/Actions';
import ReviewValidationSchema from './validationsReseñas';
import { useSelector } from 'react-redux';
import { StoreState } from '../../redux/reducer/Reducer';


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

interface Reseña {
  calificacion: number;
  comentario: string;
  createdAt: string;
  habilitado: boolean;
  id: number;
  platoId: number;
  updatedAt: string;
  usuarioId: number;
}


const Reseñas: React.FC<reseñasProps> = ({idPlato}) =>{
    const [estrellasSeleccionadas, setEstrellasSeleccionadas] = useState(0);
    const [userData, setUserData] = useState<any>(null);
    const [reseñas, setReseñas] = useState<Reseña[]>([]);
    const [newReseña, setNewReseña] = useState<boolean>(false)
    const [position, setPosition] = useState(0);
    const [reseñasObtenidas, setReseñasObtenidas] = useState<boolean>(false)
    const [usersData, setUsersData] = useState<any[]>([]); // Estado para almacenar la información de los usuarios
    const [numColumns, setNumColumns] = useState(3); // Número predeterminado de columnas

  useEffect(() => {
    // Función para ajustar el número de columnas según el ancho de la pantalla
    const handleResize = () => {
      if (window.innerWidth <= 1300) {
        setNumColumns(1);
      } else if (window.innerWidth <= 1700) {
        setNumColumns(2);
      } else {
        setNumColumns(3);
      }
    };

    // Se ejecuta al cargar la página y cuando cambia el tamaño de la ventana
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize); // Limpia el evento al desmontar el componente
  }, []);

  const foodState = useSelector((state: StoreState) => state.platos);

  
  const platoForId = (id: number) => {
    let selectedItem = foodState.find(item => item.id === id);
    return selectedItem?.nombre
  }

    const handlePrev = () => {
      setPosition((prevPosition) => {
        if (prevPosition === 0) {
          return reseñasFiltradas.length - 1; // Si está en el primer elemento, regresa al último
        } else {
          return prevPosition - 1; // De lo contrario, retrocede al elemento anterior
        }
      });
    };
    
    const handleNext = () => {
      setPosition((prevPosition) => {
        if (prevPosition === reseñasFiltradas.length - 1) {
          return 0; // Si está en el último elemento, avanza al primero
        } else {
          return prevPosition + 1; // De lo contrario, avanza al siguiente elemento
        }
      });
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
                      setReseñas(dataReseña); 
                      setReseñasObtenidas(true);
                      return;
                  }
              }
              
              if (!reseñasObtenidas) {
                  dataReseña = await getAllReviews();
                  setReseñas(dataReseña);
                  setReseñasObtenidas(true);
              }
          } catch (error) {
              console.error('Error al obtener las reseñas:', error);
          }
      };
  
      fetchData();
      setNewReseña(false);
  }, [idPlato, newReseña, reseñasObtenidas]); 
  

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

    const filtrarReseñasPorPlato = () => {
      if (!isNaN(idPlato)) {
        const reseñasPlato = reseñas.filter(reseña => reseña.platoId === idPlato && reseña.habilitado);
        if (reseñasPlato.length > 0) {
          return reseñasPlato;
        }
      }
      return reseñas.filter(reseña => reseña.habilitado); // Filtrar todas las reseñas habilitadas si no hay reseñas específicas del plato
    }

    const reseñasFiltradas = filtrarReseñasPorPlato();

    useEffect(() => {
      const fetchData = async () => {
        try {
          if (reseñasFiltradas && reseñasFiltradas.length > 0) {
            const usersPromises = reseñasFiltradas.map(async (reseña) => {
              const user = await getUserById(reseña.usuarioId);
              return user;
            });
            const resolvedUsersData = await Promise.all(usersPromises);
            setUsersData(resolvedUsersData);
          } else {
            console.log('No hay reseñas filtradas disponibles.');
          }
        } catch (error) {
          console.error('Error al obtener la información del usuario:', error);
        }
      };
    
      // Verifica si ya hay datos de usuarios, si no los hay, realiza la llamada
      if (!usersData || usersData.length === 0) {
        fetchData();
      }
    }, [reseñasFiltradas, usersData]); // Agrega usersData como dependencia
    
    

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
                    <button 
                      type='submit' 
                      className={`${styles.submitButton} ${estrellasSeleccionadas === 0 ? styles.disabledButton : ''}`} 
                      disabled={estrellasSeleccionadas === 0}
                    >
                      Crear
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          )}
            {reseñasFiltradas && (
              <div className={styles.container3}> 
                <div>
                  <h1 className={styles.reseñastitulo}>Aquí algunas reseñas de nuestros clientes</h1>
                </div>
                <div className={styles.containerReseñasBtn}>
                {reseñasFiltradas.length > numColumns && (
                  <button onClick={handlePrev} className={styles.btnCarrousel}>
                    &#10094;
                  </button>
                )}
                <div className={styles.cartasreseñas2} style={{ gridTemplateColumns: `repeat(${numColumns}, 1fr)` }}>
                  {reseñasFiltradas.map((_, index) => {
                    if (index < numColumns) {
                      const currentIndex = (position + index) % reseñasFiltradas.length;
                      const reseñaItem = reseñasFiltradas[currentIndex];
                      return (
                        <div key={reseñaItem.id} className={styles.reseña}>
                          <p className={styles.textonombre}>
                            {usersData.find(user => parseInt(user.id) === reseñaItem.usuarioId)?.nombre} {usersData.find(user => parseInt(user.id) === reseñaItem.usuarioId)?.apellido}
                          </p>
                          <p className={styles.textoreseñaestrella}>{generarEstrellas(reseñaItem.calificacion)}</p>
                          <div className={styles.containercomentarionombreplato}>
                            <p className={styles.textoreseña}>{reseñaItem.comentario}</p>
                            <p className={styles.textonombreplato}>{platoForId(reseñaItem.platoId)}</p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
                {reseñasFiltradas.length > numColumns && (
                  <button onClick={handleNext} className={styles.btnCarrousel}>
                    &#10095;
                  </button>
                )}
                </div>
              </div>
            )}
        </div>
    );

} 

export default Reseñas