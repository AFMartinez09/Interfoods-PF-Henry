import { NavLink } from 'react-router-dom'
import styles from './HomeAdmin.module.css'
import FormMeal from '../CreateMeal/FormMeal'

const HomeAdmin = () => {
  return (
    <div className={styles.container}>
        <div className={styles.containerMenu}>
          <h2 className={styles.title}>Admin dashboard</h2>
          <NavLink to='/admindashboard' className={styles.options}>Crear plato</NavLink>
          <NavLink to='/admindashboard/editar-eliminar' className={styles.options}>Editar/Eliminar</NavLink>
          <NavLink to='/' className={styles.close}>Cerrar sesión</NavLink>
        </div>
        <FormMeal  />
    </div>
  )
}

export default HomeAdmin