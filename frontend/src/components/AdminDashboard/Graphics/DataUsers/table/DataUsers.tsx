import { useState } from 'react'
import styles from './DataUsers.module.css'

const DataUsers = () => {

  const [users, setUsers]= useState([])
  console.log(setUsers)
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
          {users.map((user: {
            id: number, 
            nombre: string, 
            apellido: string, 
            email: string,
            pais: string,
            ciudad: string,
            direccion: string,
          }) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nombre}</td>
              <td>{user.apellido}</td>
              <td>{user.email}</td>
              <td>{user.pais}</td>
              <td>{user.ciudad}</td>
              <td>{user.direccion}</td>
              <td><button>Bloquear</button></td>
              <td><button>Desactivar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataUsers