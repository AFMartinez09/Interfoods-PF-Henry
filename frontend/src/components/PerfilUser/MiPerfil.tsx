import React, { useState, useEffect } from 'react';
import styles from './MiPerfil.module.css';
import { putUser } from '../../redux/actions/Actions';

const MiPerfil = () => {
  // Estado para almacenar los datos del usuario
  const [userData, setUserData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<any>({});

  // Función para obtener los datos del usuario del localStorage
  const getUserData = () => {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUserData(userData);
    }
  };

  const saveChanges = async () => {
    try {
      await putUser(userData.email, {
        ...editedData,
        nombre: editedData.nombre || userData.nombre,
        apellido: editedData.apellido || userData.apellido,
        pais: editedData.pais || userData.pais,
        ciudad: editedData.ciudad || userData.ciudad,
        direccion: editedData.direccion || userData.direccion,
      });
  
      const updatedUserData = {
        ...userData,
        ...editedData,
        nombre: editedData.nombre || userData.nombre,
        apellido: editedData.apellido || userData.apellido,
        pais: editedData.pais || userData.pais,
        ciudad: editedData.ciudad || userData.ciudad,
        direccion: editedData.direccion || userData.direccion,
      };
  
      setUserData(updatedUserData);
      setIsEditing(false);
      setEditedData({});
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };
  
  

  // Llama a la función getUserData al cargar el componente
  useEffect(() => {
    getUserData();
  }, []);

  // Función para manejar el cambio de los inputs de edición
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });
  };
  console.log(userData?.foto);
  
  return (
    <div className={styles.container}>
      {userData ? (
        <div className={styles.userInfo}>
          <h2 className={styles.title}>Mi Perfil</h2>
          <div className={styles.containerDato}>
                <span className={styles.dataValue}>{userData.email}</span>
          </div>
          <img src={userData?.foto ? userData.foto : "https://monestir.org/wp-content/uploads/2020/06/usuario.png"}className={userData.foto ? styles.userImage : styles.userImageDefault} />
          {isEditing ? (
            <div className={styles.userData}>
              <div className={styles.containerDato}>
                <span className={styles.dataType}>Nombre:</span>
                <input
                  type="text"
                  name="nombre"
                  value={editedData.nombre !== undefined ? editedData.nombre : userData.nombre}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.containerDato}>
                <span className={styles.dataType}>Apellido:</span>
                <input
                  type="text"
                  name="apellido"
                  value={editedData.apellido !== undefined ? editedData.apellido : userData.apellido}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.containerDato}>
                <span className={styles.dataType}>País:</span>
                <input
                  type="text"
                  name="pais"
                  value={editedData.pais !== undefined ? editedData.pais : userData.pais}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.containerDato}>
                <span className={styles.dataType}>Ciudad:</span>
                <input
                  type="text"
                  name="ciudad"
                  value={editedData.ciudad !== undefined ? editedData.ciudad : userData.ciudad}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.containerDato}>
                <span className={styles.dataType}>Dirección:</span>
                <input
                  type="text"
                  name="direccion"
                  value={editedData.direccion !== undefined ? editedData.direccion : userData.direccion}
                  onChange={handleInputChange}
                />
              </div>
              <button
                className={styles.editButton}
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </button>
              <button
                className={styles.editButtoncancelar}
                onClick={saveChanges}
              >
                Guardar cambios
              </button>
            </div>
          ) : (
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
              <button
                className={styles.editButton}
                onClick={() => setIsEditing(true)}
              >
                Editar
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>No hay datos de usuario disponibles</p>
      )}
    </div>
  );
};

export default MiPerfil;