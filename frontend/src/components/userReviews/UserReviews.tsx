import React, { useEffect, useState } from "react";
import { disableReview, getReviewsUser, getUserById } from "../../redux/actions/Actions";
import { Review, StoreState } from "../../redux/reducer/Reducer";
import styles from './userReviews.module.css';
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/Loading";

const UserReviews = () => {
  const userIdString = localStorage.getItem("user");
  const userId = userIdString ? JSON.parse(userIdString).id : null;
  const [reviews, setReviews] = useState<Review[]>([]);
  const foodState = useSelector((state: StoreState) => state.platos);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  const platoForId = (id: number) => {
    let selectedItem = foodState.find(item => item.id === id);
    return selectedItem?.nombre;
  };

  const getReviews = async (dispatch: any, id: number) => {
    const reviews = await dispatch(getReviewsUser(id));
    if (reviews) {
      const reviewsFilter = reviews.filter((review: Review) => review.habilitado);
      setLoading(false)
      return reviewsFilter
    } else {
      return [];
    }
  };
  
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviewsData = await getReviews(dispatch, userId);
        setReviews(reviewsData);
      } catch (error) {
        console.error('Hubo un error al obtener las revisiones del usuario', error);
      }
    };
  
    fetchData();
  }, [dispatch, userId]);
  

  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await Promise.all(reviews.map(review => getUserById(review.usuarioId)));
        setUsers(usersData);
      } catch (error) {
        console.error('Hubo un error al obtener los usuarios', error);
      }
    };

    fetchUsers();
  }, [reviews]);

  const generarEstrellas = (calificacion: number): string => {
    const estrellaLlena = '★';
    const estrellaVacia = '☆';
    const totalEstrellas = 5;

    const estrellas = estrellaLlena.repeat(calificacion) + estrellaVacia.repeat(totalEstrellas - calificacion);

    return estrellas;
  };

  const handleToggleReview = async (id: number) => {
    try {
      await disableReview(id);
      const reviewsData = await getReviews(dispatch, userId);
      setReviews(reviewsData);
    } catch (error) {
      console.error('Hubo un error al deshabilitar la revisión', error);
    }
  };

  return (
    <div className={styles.pageReviews}>
      {!loading ? (
        <React.Fragment>
          {reviews.length > 0 ? (
            <>
            <h1 className={styles.titulo}>Comentarios</h1>
            <div className={styles.containerReseñas}>
              {reviews.map((review, index) => (
                <div key={review.id} className={styles.reseña}>
                  <p className={styles.textonombre}>
                    {users[index] && `${users[index].nombre} ${users[index].apellido}`}
                  </p>
                  <p className={styles.textoreseñaestrella}>{generarEstrellas(review.calificacion)}</p>
                  <div className={styles.containercomentarionombreplato}>
                    <p className={styles.textoreseña}>{review.comentario}</p>
                    <p className={styles.textonombreplato}>{platoForId(review.platoId)}</p>
                  </div>
                  <button 
                    onClick={() => handleToggleReview(review.id)}
                    className={`${styles.button} ${review.habilitado ? styles.deshabilitar : styles.habilitar}`}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
            </>
          ) : (
            <div  className={styles.containerMsj}>
            <h3  className={styles.titulo}>No haz hecho comentarios, ingresa a un producto para comentar</h3>
            </div>
          )}
        </React.Fragment>
      ) : (
        <div className="containerLoading">
          <Loading/>
        </div>
      )}
    </div>
  );
  
};

export default UserReviews;
