import React, { useEffect } from 'react';
import styles from './DataUsers.module.css';
import { getAllUsers } from '../../../../redux/actions/Actions';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../../../redux/reducer/Reducer';


interface Users {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  pais: string;
  ciudad: string;
  direccion: string;
  habilitado: boolean; // bloquear cuenta
  activo:boolean;  // desactivar cuenta
}

const DataUsers: React.FC = () => {

  const dispatch = useDispatch();
  const users: Users[] = useSelector((state: StoreState) => state.users)

console.log('123456', users)


const getUsers = async(dispatch: any) => {
  try {
    dispatch(getAllUsers())
  } catch (error) {
    
  }
}

  useEffect(() => {
    getUsers(dispatch)
    console.log('111111', getUsers)
  }, [])

  const handleBlockAccount = (id: number) => {
    
  }

  const handleDeleteAcoount = (id: number) => {
    // try {
    //   await delete(dispatch, id)

    // } catch (error) {
      
    // }
  }

  return (
    <div className={styles.continer}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NOMBRE</th>
            <th>APELLIDO</th>
            <th>EMAIL</th>
            <th>PAIS</th>
            <th>CIUDAD</th>
            <th>DIRECCION</th>
            <th>BLOQUEAR CUENTA</th>
            <th>DESACTIVAR CUENTA</th>
          </tr>        
        </thead>
        <tbody>
          {Array.isArray(users) && users.map((user: {
            id: number, 
            nombre: string, 
            apellido: string, 
            email: string,
            pais: string,
            ciudad: string,
            direccion: string,
            habilitado: boolean,
            activo: boolean,
          }) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nombre}</td>
              <td>{user.apellido}</td>
              <td>{user.email}</td>
              <td>{user.pais}</td>
              <td>{user.ciudad}</td>
              <td>{user.direccion}</td>
              <td><button onClick={() => handleBlockAccount(user.id)}>{user.habilitado}</button></td>
              <td><button onClick={() => handleDeleteAcoount(user.id)}>{user.activo}</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataUsers


