import { useState, useEffect } from 'react';
import styles from './MiPerfil.module.css';

const MiPerfil = () => {
  // Estado para almacenar los datos del usuario
  const [userData, setUserData] = useState<any>(null);

  // Función para obtener los datos del usuario del localStorage
  const getUserData = () => {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUserData(userData);
    }
  };

  // Llama a la función getUserData al cargar el componente
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className={styles.container}>
      {userData ? (
        <div className={styles.userInfo}>
          <h2 className={styles.title}>Mi Perfil</h2>
          {/* <img src={userData.foto} alt={`${userData.nombre} ${userData.apellido}`} className={styles.userImage} /> */}
          <img src={'https://th.bing.com/th/id/OIP.8TfLK_Efr8ssRY1JXr24pgHaFj?w=235&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'} alt={`${userData.nombre} ${userData.apellido}`} className={styles.userImage} />
          <div className={styles.userData}>
            <div className={styles.containerDato}>
              <span className={styles.dataType}>Nombre:</span>
              <span className={styles.dataValue}>{userData.nombre}</span>
            </div>
            <div className={styles.containerDato}>
              <span className={styles.dataType}>Apellido:</span>
              <span className={styles.dataValue}>{userData.apellido}</span>
            </div>
            <div className={styles.containerDato}>
              <span className={styles.dataType}>Email:</span>
              <span className={styles.dataValue}>{userData.email}</span>
            </div>
            <div className={styles.containerDato}>
              <span className={styles.dataType}>País:</span>
              <span className={styles.dataValue}>{userData.pais}</span>
            </div>
            <div className={styles.containerDato}>
              <span className={styles.dataType}>Ciudad:</span>
              <span className={styles.dataValue}>{userData.ciudad}</span>
            </div>
            <div className={styles.containerDato}>
              <span className={styles.dataType}>Dirección:</span>
              <span className={styles.dataValue}>{userData.direccion}</span>
            </div>
            <div className={styles.containerDato}>
              <span className={styles.dataType}>Habilitado:</span>
              <span className={styles.dataValue}>{userData.habilitado ? 'Sí' : 'No'}</span>
            </div>
            <div className={styles.containerDato}>
              <span className={styles.dataType}>Admin:</span>
              <span className={styles.dataValue}>{userData.admin ? 'Sí' : 'No'}</span>
            </div>
          </div>
        </div>
      ) : (
        <p>No hay datos de usuario disponibles</p>
      )}
    </div>
  );
  
};

export default MiPerfil;
