import { NavLink } from 'react-router-dom'
import styles from './HomeAdmin.module.css'
import FormMeal from '../RegisterMeal/FormMeal'

const HomeAdmin = () => {
  return (
    <div className={styles.container}>
      <span>
        <div className={styles.containerMenu}>
          <h2 className={styles.title}>Admin dashboard</h2>
          <hr />
          <NavLink to='/admindashboard' className={styles.options}>Crear plato</NavLink>
          <hr />
          <NavLink to='/admindashboard/editar' className={styles.options}>Editar</NavLink>
          <hr />
          <NavLink to='/admindasboard/eliminar' className={styles.options}>Eliminar</NavLink>
          <hr />
          <NavLink to='/' className={styles.close}>Cerrar sesión</NavLink>
          <hr />
        </div>
      </span>
      <span className={styles.meal}>
        <FormMeal  />
      </span>
    </div>
  )
}

export default HomeAdmin