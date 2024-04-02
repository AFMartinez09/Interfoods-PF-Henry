import { NavLink } from 'react-router-dom'
import styles from './HomeAdmin.module.css'

const HomeAdmin = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Mi perfil</h2>
      <NavLink to='/editarperfil' className={styles.options}>Editar perfil</NavLink>
      <NavLink to='/mispedidos' className={styles.options}>Mis pedidos</NavLink>
      <NavLink to='/' className={styles.options}>Cerrar sesión</NavLink>
    </div>
  )
}

export default HomeAdmin