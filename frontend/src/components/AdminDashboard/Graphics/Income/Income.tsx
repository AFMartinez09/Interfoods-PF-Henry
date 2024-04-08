import { Line } from 'react-chartjs-2';
import Style from '../Stock/Stock.module.css'
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

const Income = () => {
  const semanal = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    datasets: [{
      label: 'Semanal',
      data: [900, 700, 500, 800, 1000, 1100, 800 ],
      borderColor: 'aqua',
      tension: 0.4,
    }]
  }

  const options = {

  }

  return (
    <div className={Style.container}>
      <h1>Ingresos Semanales</h1>
      <div className={Style.dropdown}>
      <button className={Style.dropdownBtn}>Periodo</button>
      <div className={Style.dropdownContent}>
        <a className={Style.dropdownLink} href="/admindashboard/income/">Semanal</a>
        <a className={Style.dropdownLink} href="/admindashboard/income/mensual">Mensual</a>
      </div>
    </div>
      <div className={Style.bar}>
        <Line 
          data={semanal}
          options= {options}
        />
      </div>
    </div>
  )
}

export default Income;