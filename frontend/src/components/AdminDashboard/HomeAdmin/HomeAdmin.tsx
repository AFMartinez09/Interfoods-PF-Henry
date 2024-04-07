import { NavLink } from 'react-router-dom'
import styles from './HomeAdmin.module.css'

const HomeAdmin = () => {
  return (
    <div className={styles.container}>
        <div className={styles.containerMenu}>
          <h2 className={styles.title}>Admin dashboard</h2>
          <NavLink to='/admindashboard' className={styles.options}>Inicio</NavLink>
          <NavLink to='/admindashboard/statuspayment' className={styles.options}>estatus de pago</NavLink>
          <NavLink to='/admindashboard/stock' className={styles.options}>Inventario</NavLink>
          <NavLink to='/admindashboard/income' className={styles.options}>Ingresos</NavLink>
          <NavLink to='/admindashboard/crearplato' className={styles.options}>Crear plato</NavLink>
          <NavLink to='/admindashboard/editar-eliminar' className={styles.options}>Editar/Eliminar</NavLink>
          <NavLink to='/' className={styles.close}>Cerrar sesión</NavLink>
        </div>
    </div>
  )
}

export default HomeAdmin