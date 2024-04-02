import { NavLink } from 'react-router-dom'
import styles from './HomeAdmin.module.css'

const HomeAdmin = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Dashboard Admin</h2>
      <NavLink to='/createmeal' className={styles.options}>Crear platos</NavLink>
      <NavLink to='/editmeal' className={styles.options}>Editar platos</NavLink>
      <NavLink to='/deletemeal' className={styles.options}>Borrar platos</NavLink>
      <NavLink to='/' className={styles.options}>Cerrar sesión</NavLink>
    </div>
  )
}

export default HomeAdmin