import { NavLink } from 'react-router-dom'
import styles from './HomeAdmin.module.css'
import StatusPayment from '../Graphics/StatusPayment/StatusPayment'
import Stock from '../Graphics/Stock/AllStock'
import Income from '../Graphics/Income/Weekly'
import DataUsers from '../Graphics/DataUsers/DataUsers'

const HomeAdmin = () => {
  return (
    <div className={styles.container}>
      <div className={styles.first}>
        <span className={styles.income}>
          <NavLink to='/admindashboard/income'>
            <Income />
          </NavLink>
        </span>
        <span className={styles.stock}>
          <NavLink to='/admindashboard/stock'>
            <Stock />
          </NavLink>
        </span>
      </div>
      <div className={styles.second}>
        <span className={styles.statusPayment}>
          <NavLink to='/admindashboard/statuspayment'>
            <StatusPayment />
          </NavLink>
        </span>
        <span className={styles.datausers}>
          <NavLink to='/admindashboard/datausers'>
            <DataUsers />
          </NavLink>
        </span>
      </div>
    </div>
  )
}

export default HomeAdmin
{/* <h2 className={styles.title}>Admin dashboard</h2>
<NavLink to='/admindashboard'>

</NavLink>
<NavLink to='/admindashboard/crearplato'>
  Crear
</NavLink>
  Editar
<NavLink to='/' className={styles.close}>Cerrar sesión</NavLink> */}