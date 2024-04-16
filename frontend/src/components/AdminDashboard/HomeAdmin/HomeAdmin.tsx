import { NavLink } from 'react-router-dom'
import StatusPayment from '../Graphics/StatusPayment/StatusPayment'
import Stock from '../Graphics/Stock/AllStock'
import Income from '../Graphics/Income/Mothly'
import DataUsers from '../Graphics/DataUsers/DataUsers'
import Styles from './HomeAdmin.module.css'

const HomeAdmin = () => {
  return (
    <div className={Styles.plataform}>
      <div className={Styles.first}>
        <span className={Styles.income}>
          <NavLink to='/admindashboard/income'>
            <Income />
          </NavLink>
        </span>
        <span className={Styles.stock}>
          <NavLink to='/admindashboard/stock'>
            <Stock />
          </NavLink>
        </span>
      </div>
      <div className={Styles.second}>
        <span className={Styles.statusPayment}>
          <NavLink to='/admindashboard/statuspayment'>
            <StatusPayment />
          </NavLink>
        </span>
        <hr></hr>
        <span className={Styles.datausers}>
          <NavLink to='/admindashboard/datausers'>
            <DataUsers />
          </NavLink>
        </span>
      </div>
    </div>
  )
}

export default HomeAdmin
