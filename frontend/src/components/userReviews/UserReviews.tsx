import { useEffect, useState } from "react";
import { disableReview, getReviewsUser, getUserById } from "../../redux/actions/Actions";
import { Review, StoreState } from "../../redux/reducer/Reducer";
import styles from './userReviews.module.css';
import { useDispatch, useSelector } from "react-redux";

const UserReviews = () => {
  const userIdString = localStorage.getItem("user");
  const userId = userIdString ? JSON.parse(userIdString).id : null;
  const [reviews, setReviews] = useState<Review[]>([]);
  const foodState = useSelector((state: StoreState) => state.platos);
  const dispatch = useDispatch();

  const platoForId = (id: number) => {
    let selectedItem = foodState.find(item => item.id === id);
    return selectedItem?.nombre;
  };

  const getReviews = async (dispatch: any, id: number) => {
    const reviews = await dispatch(getReviewsUser(id));
    if (reviews) {
      return reviews.filter((review: Review) => review.habilitado);
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
    </div>
  );
};

export default UserReviews;
