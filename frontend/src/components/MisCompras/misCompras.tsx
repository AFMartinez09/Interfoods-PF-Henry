import { useEffect, useState } from 'react';
import styles from './misCompras.module.css';
import { getComprasUser } from '../../redux/actions/Actions';
import Loading from '../Loading/Loading';

const MisCompras = () => {
  const [userData, setUserData] = useState<any>(null);
  const [compras, setCompras] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const parsedUser = JSON.parse(userDataString);
      setUserData(parsedUser);
    }
  }, []);

  useEffect(() => {
    if (userData?.id) {
      getComprasUser(userData.id)
        .then((comprasData) => {
          setCompras(comprasData);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error al obtener las compras:', error);
          setLoading(false);
        });
    }
  }, [userData]);

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loading}>
          <Loading/>
        </div>
      ) : (
        <>
          {compras.length !== 0 && (
            <h1 className={styles.title}>Mis Compras</h1>
          )}
          {compras.length === 0 ? (
            <div className={styles.containerMsj}>
              <h1 className={styles.title}>Mis Compras</h1>
              <p className={styles.mensaje}>No tienes compras realizadas.</p>
            </div>
          ) : (
            <div className={styles.comprasList}>
              {compras.map((compra, index) => (
                <div key={index} className={styles.compra}>
                  <p className={styles.dato}>Fecha: {new Date(compra.createdAt).toLocaleDateString()}</p>
                  <p className={styles.dato}>Total Gasto: ${compra.totalGasto}</p>
                  <p className={styles.dato}>Total Productos: {compra.totalProductos}</p>
                  <p className={styles.dato}>Detalles de Platos:</p>
                  <div>
                    {compra.detallesPlatos.map((detallePlato: any, index: number) => (
                      <div key={index} className={styles.productoCompra}>
                        <img src={detallePlato.img} alt={detallePlato.name} className={styles.platoImg} />
                        <p className={styles.dato}>{detallePlato.name}</p>
                        <p className={styles.dato}>Cantidad: {detallePlato.quantity}</p>
                        <p className={styles.dato}>Precio: ${detallePlato.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MisCompras;
