import { Line } from 'react-chartjs-2';
import Style from '../Stock/Stock.module.css';

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';



ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
)

const Anual = () => {
  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [{
      label: 'Semanal',
      data: [9000, 7000, 5000, 8000, 10000, 11000, 8000, 20000, 5000, 13482, 1298, 12921 ],
      borderColor: 'aqua',
      tension: 0.4,
    }]
  }

  const options = {

  }

  return (
    <div className={Style.container}>
      <h1>Ingresos Mensuales</h1>
      <div className={Style.dropdown}>
      <button className={Style.dropdownBtn}>Plato</button>
      <div className={Style.dropdownContent}>
        <a className={Style.dropdownLink} href="/admindashboard/income/">Semanal</a>
        <a className={Style.dropdownLink} href="/admindashboard/income/mensual">Mensual</a>
      </div>
    </div>
      <div className={Style.bar}>
        <Line 
          data={data}
          options= {options}
        />
      </div>
    </div>
  )
}

export default Anual;