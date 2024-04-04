import { NavLink } from 'react-router-dom'
import styles from './HomeUser.module.css'
import UserForm from '../userForm/UserForm'

const HomeUser = () => {
  return (
    <div className={styles.container}>
      <span>
        <div className={styles.containerMenu}>
          <h2 className={styles.title}>Mi perfil</h2>
          <NavLink to='/useraccount' className={styles.options}>Editar perfil</NavLink>
          <NavLink to='/useraccount/mispedidos' className={styles.options}>Mis pedidos</NavLink>
          <NavLink to='/' className={styles.close}>Cerrar sesión</NavLink>
        </div>
      </span>
      <span className={styles.profile}>
        <UserForm  />
      </span>
    </div>
  )
}

export default HomeUser