// import React, { useState, useEffect } from 'react';
// import styles from './MiPerfil.module.css';
// import { putUser, imageUpload } from '../../redux/actions/Actions'; 
// import Swal from 'sweetalert2';

// const MiPerfil = () => {
//   const [userData, setUserData] = useState<any>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedData, setEditedData] = useState<any>({});
//   const [profilePictureUrl, setProfilePictureUrl] = useState<File | undefined>(undefined);

//   const getUserData = () => {
//     const userDataString = localStorage.getItem('user');
//     if (userDataString) {
//       const userData = JSON.parse(userDataString);
//       setUserData(userData);
//     }
//   };

//   const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (isEditing) {
//       const selectedFile = event.currentTarget.files?.[0];
//       setProfilePictureUrl(selectedFile);
//     }
//   };
  

//   const uploadProfilePicture = async () => {
//     try {
//       if (profilePictureUrl !== undefined) {
//         const imageUrl = await imageUpload(profilePictureUrl);
//         return imageUrl;
//       }
//       return null;
//     } catch (error) {
//       console.error('Error al subir la imagen:', error);
//       throw new Error('Error al subir la imagen');
//     }
//   };

//   const saveChanges = async () => {
//     try {
//       const newProfilePictureUrl = await uploadProfilePicture();
//       await putUser(userData.email, {
//         ...editedData,
//         foto: newProfilePictureUrl || userData.foto,
//         nombre: editedData.nombre || userData.nombre,
//         apellido: editedData.apellido || userData.apellido,
//         pais: editedData.pais || userData.pais,
//         ciudad: editedData.ciudad || userData.ciudad,
//         direccion: editedData.direccion || userData.direccion,
//       });

//       const updatedUserData = {
//         ...userData,
//         ...editedData,
//         foto: newProfilePictureUrl || userData.foto,
//         nombre: editedData.nombre || userData.nombre,
//         apellido: editedData.apellido || userData.apellido,
//         pais: editedData.pais || userData.pais,
//         ciudad: editedData.ciudad || userData.ciudad,
//         direccion: editedData.direccion || userData.direccion,
//       };

//       setUserData(updatedUserData);
//       setIsEditing(false);
//       setEditedData({});
//       Swal.fire({
//         title: 'Cambios guardados',
//         text: 'Se han guardado los cambios correctamente',
//         icon: 'success',
//         confirmButtonText: 'Entendido',
//       });
//     } catch (error) {
//       console.error('Error al guardar los cambios:', error);
//       Swal.fire({
//         title: 'Error al guardar cambios',
//         text: 'Hubo un problema al intentar guardar los cambios. Por favor, inténtalo de nuevo más tarde.',
//         icon: 'error',
//         confirmButtonText: 'Entendido',
//       });
//     }
//   };

//   useEffect(() => {
//     getUserData();
//   }, []);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEditedData({
//       ...editedData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div className={styles.container}>
//       {userData ? (
//         <div className={styles.userInfo}>
//           <h2 className={styles.title}>Mi Perfil</h2>
//           <div className={styles.containerDato}>
//             <span className={styles.dataValue}>{userData.email}</span>
//           </div>
//           <label htmlFor="profilePictureInput">
//             <input
//               id="profilePictureInput"
//               type="file"
//               accept="image/*"
//               onChange={handleProfilePictureChange}
//               style={{ display: 'none' }}
//             />
//             {/* <img
//               src={userData?.foto ? userData.foto : "https://monestir.org/wp-content/uploads/2020/06/usuario.png"}
//               className={userData.foto ? styles.userImage : styles.userImageDefault}
//               alt="Imagen de perfil"
//               onClick={() => document.getElementById('profilePictureInput')?.click()}
//             /> */}
//           </label>
//           {isEditing ? (
//             <div className={styles.userData}>
//               <div className={styles.containerDato}>
//                 <span className={styles.dataType}>Nombre:</span>
//                 <input
//                   type="text"
//                   name="nombre"
//                   value={editedData.nombre !== undefined ? editedData.nombre : userData.nombre}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className={styles.containerDato}>
//                 <span className={styles.dataType}>Apellido:</span>
//                 <input
//                   type="text"
//                   name="apellido"
//                   value={editedData.apellido !== undefined ? editedData.apellido : userData.apellido}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className={styles.containerDato}>
//                 <span className={styles.dataType}>País:</span>
//                 <input
//                   type="text"
//                   name="pais"
//                   value={editedData.pais !== undefined ? editedData.pais : userData.pais}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className={styles.containerDato}>
//                 <span className={styles.dataType}>Ciudad:</span>
//                 <input
//                   type="text"
//                   name="ciudad"
//                   value={editedData.ciudad !== undefined ? editedData.ciudad : userData.ciudad}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className={styles.containerDato}>
//                 <span className={styles.dataType}>Dirección:</span>
//                 <input
//                   type="text"
//                   name="direccion"
//                   value={editedData.direccion !== undefined ? editedData.direccion : userData.direccion}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <button
//                 className={styles.editButton}
//                 onClick={() => setIsEditing(false)}
//               >
//                 Cancelar
//               </button>
//               <button
//                 className={styles.editButtoncancelar}
//                 onClick={saveChanges}
//               >
//                 Guardar cambios
//               </button>
//             </div>
//           ) : (
//             <div className={styles.userData}>
//               <div className={styles.containerDato}>
//                 <span className={styles.dataType}>Nombre:</span>
//                 <span className={styles.dataValue}>{userData.nombre}</span>
//               </div>
//               <div className={styles.containerDato}>
//                 <span className={styles.dataType}>Apellido:</span>
//                 <span className={styles.dataValue}>{userData.apellido}</span>
//               </div>
//               <div className={styles.containerDato}>
//                 <span className={styles.dataType}>País:</span>
//                 <span className={styles.dataValue}>{userData.pais}</span>
//               </div>
//               <div className={styles.containerDato}>
//                 <span className={styles.dataType}>Ciudad:</span>
//                 <span className={styles.dataValue}>{userData.ciudad}</span>
//               </div>
//               <div className={styles.containerDato}>
//                 <span className={styles.dataType}>Dirección:</span>
//                 <span className={styles.dataValue}>{userData.direccion}</span>
//               </div>
//               <button
//                 className={styles.editButton}
//                 onClick={() => setIsEditing(true)}
//               >
//                 Editar
//               </button>
//             </div>
//           )}
//         </div>
//       ) : (
//         <p>No hay datos de usuario disponibles</p>
//       )}
//     </div>
//   );
// };

// export default MiPerfil;

import React, { useState, useEffect } from 'react';
import styles from './MiPerfil.module.css';
import { putUser, imageUpload } from '../../redux/actions/Actions'; 
import Swal from 'sweetalert2';

const MiPerfil = () => {
  const [userData, setUserData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<any>({});
  const [profilePictureUrl, setProfilePictureUrl] = useState<File | undefined>(undefined);

  const getUserData = () => {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUserData(userData);
    }
  };

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isEditing) {
      const selectedFile = event.currentTarget.files?.[0];
      setProfilePictureUrl(selectedFile);
    }
  };
  

  const uploadProfilePicture = async () => {
    try {
      if (profilePictureUrl !== undefined) {
        const imageUrl = await imageUpload(profilePictureUrl);
        return imageUrl;
      }
      return null;
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      throw new Error('Error al subir la imagen');
    }
  };

  const saveChanges = async () => {
    try {
      const newProfilePictureUrl = await uploadProfilePicture();
      await putUser(userData.email, {
        ...editedData,
        foto: newProfilePictureUrl || userData.foto,
        nombre: editedData.nombre || userData.nombre,
        apellido: editedData.apellido || userData.apellido,
        pais: editedData.pais || userData.pais,
        ciudad: editedData.ciudad || userData.ciudad,
        direccion: editedData.direccion || userData.direccion,
      });

      const updatedUserData = {
        ...userData,
        ...editedData,
        foto: newProfilePictureUrl || userData.foto,
        nombre: editedData.nombre || userData.nombre,
        apellido: editedData.apellido || userData.apellido,
        pais: editedData.pais || userData.pais,
        ciudad: editedData.ciudad || userData.ciudad,
        direccion: editedData.direccion || userData.direccion,
      };

      setUserData(updatedUserData);
      setIsEditing(false);
      setEditedData({});
      Swal.fire({
        title: 'Cambios guardados',
        text: 'Se han guardado los cambios correctamente',
        icon: 'success',
        confirmButtonText: 'Entendido',
      });
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      Swal.fire({
        title: 'Error al guardar cambios',
        text: 'Hubo un problema al intentar guardar los cambios. Por favor, inténtalo de nuevo más tarde.',
        icon: 'error',
        confirmButtonText: 'Entendido',
      });
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      {userData ? (
        <div className={styles.userInfo}>
          <h2 className={styles.title}>Mi Perfil</h2>
          <div className={styles.containerDato}>
            <span className={styles.dataValue}>{userData.email}</span>
          </div>
          <label htmlFor="profilePictureInput" style={{ pointerEvents: isEditing ? 'auto' : 'none' }}>
            <input
              id="profilePictureInput"
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              style={{ display: 'none' }}
              disabled={!isEditing}
              onClick={(e) => e.stopPropagation()}
              onDoubleClick={(e) => e.stopPropagation()}
            />
            <img
              src={isEditing
                ? "https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_640.png"
                : userData?.foto
                  ? userData.foto
                  : "https://monestir.org/wp-content/uploads/2020/06/usuario.png"}
              className={userData.foto ? styles.userImage : styles.userImageDefault}
              alt="Imagen de perfil"
              onClick={(e) => isEditing && e.stopPropagation()}
            />
          </label>
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
