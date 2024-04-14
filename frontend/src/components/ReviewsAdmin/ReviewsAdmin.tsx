import { useEffect, useState } from "react";
import { disableReview, getAllReviews, getUserById } from "../../redux/actions/Actions";
import { Review, StoreState } from "../../redux/reducer/Reducer";
import styles from './ReviewsAdmin.module.css';
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";

const AllReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const foodState = useSelector((state: StoreState) => state.platos);
  const [loading, setLoading] = useState<boolean>(true);

  const platoForId = (id: number) => {
    let selectedItem = foodState.find(item => item.id === id);
    return selectedItem?.nombre;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviewsData = await getAllReviews();
        setReviews(reviewsData);
        setLoading(false)
      } catch (error) {
        console.error('Hubo un error al obtener las revisiones', error);
      }
    };

    fetchData();
  }, []);

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
      const reviewsData = await getAllReviews();
      setReviews(reviewsData);
    } catch (error) {
      console.error('Hubo un error al deshabilitar la revisión', error);
    }
  };

  return (
    <div className={styles.pageReviews}>
      {loading ? (
        <div className="containerLoading">
          <Loading/>
        </div>
      ) : (
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
                  {review.habilitado ? 'Deshabilitar' : 'Habilitar'}
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
  
};

export default AllReviews;