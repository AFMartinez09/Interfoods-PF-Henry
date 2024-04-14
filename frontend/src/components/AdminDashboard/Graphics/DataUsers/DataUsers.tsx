import React, { useEffect, useState } from 'react';
import styles from './DataUsers.module.css';
import { PutUserBlock, getAllUsers } from '../../../../redux/actions/Actions';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../../../redux/reducer/Reducer';
import SearchMail from './SearchMail';


interface Users {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  pais: string;
  ciudad: string;
  direccion: string;
  habilitado: boolean; 
}

const DataUsers: React.FC = () => {

  const dispatch = useDispatch();
  const users: Users[] = useSelector((state: StoreState) => state.users)
  const [search, setSearch] = useState<string>('')

const getUsers = async(dispatch: any) => {
  try {
    dispatch(getAllUsers())
  } catch (error) {
    console.error('hubo un error', error)
  }
}

  useEffect(() => {
    getUsers(dispatch)
  }, [dispatch])

  const handleBlockAccount = async (id: number) => {
    const user = users.find(user => user.id === id);
    if (user) {
      try {
        if (user.email) {
          const newHabilitadoState = !user.habilitado;
          
          await PutUserBlock(user.email, newHabilitadoState)(dispatch);
          getUsers(dispatch)
        }
      } catch (error) {
        console.error('Hubo un error', error);
      }
    }
  };
  
  const getSearch = (email:string) => {
    setSearch(email)
  }

  return (
      <div className={styles.container}>
        <h1 className={styles.headline}>Datos de usuarios</h1>
          <SearchMail setSearch={getSearch} />
        <table className={styles.table}>
          <thead>
            <tr className={styles.row}>
              <th className={styles.title}>NOMBRE</th>
              <th className={styles.title}>APELLIDO</th>
              <th className={styles.title}>EMAIL</th>
              <th className={styles.title}>PAIS</th>
              <th className={styles.title}>CIUDAD</th>
              <th className={styles.title}>DIRECCION</th>
              <th className={styles.title}>ELIMINAR CUENTA</th>
            </tr>        
          </thead>
          <tbody>
            {Array.isArray(users) && users.sort((a, b) => a.id - b.id)
            .map((user: {
              id: number, 
              nombre: string, 
              apellido: string, 
              email: string,
              pais: string,
              ciudad: string,
              direccion: string,
              habilitado: boolean,
            }) => (
              <tr key={user.id}>
                <td className={styles.field}>{user.nombre}</td>
                <td className={styles.field}>{user.apellido}</td>
                <td className={search && search === user.email ? styles.fieldSearch :  styles.field}>{user.email}</td>
                <td className={styles.field}>{user.pais}</td>
                <td className={styles.field}>{user.ciudad}</td>
                <td className={styles.field}>{user.direccion}</td>

                <td className={styles.checkbox}>
                  <label className={styles.switch}>
                    <input 
                      type='checkbox' 
                      onChange={() => handleBlockAccount(user.id)} 
                      checked={!user.habilitado} 
                    />
                    <span className={styles.slider}></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )
}

export default DataUsers