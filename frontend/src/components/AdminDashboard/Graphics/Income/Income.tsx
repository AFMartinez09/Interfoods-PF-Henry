import { Line } from 'react-chartjs-2';
import styles from './Income.module.css'
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
  const data = {
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
    <div className={styles.container}>
      <h1>Ingresos</h1>
      <div className={styles.line}>
        <Line 
          data={data}
          options= {options}
        />
      </div>
    </div>
  )
}

export default Income;