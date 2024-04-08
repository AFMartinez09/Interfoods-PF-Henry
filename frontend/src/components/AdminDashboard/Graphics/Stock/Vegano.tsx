import { Bar } from 'react-chartjs-2';
import styles from './Stock.module.css'
import { 
  Chart as ChartJS,
  Tooltip,
  BarElement,
  Legend,
  CategoryScale,
  LinearScale,
  plugins,
 } from 'chart.js';


  ChartJS.register(
    Tooltip,
    BarElement,
    Legend,
    CategoryScale,
    LinearScale,
    plugins,
  )

const Vegano = () => {
  const vegano = {
    labels: [ 
      'Locro Vegano', 'Tacos Veganos', 'Guatita Vegana', 'Bandeja Paisa Vegana' ],
    datasets: [{
      label: 'Cantidad',
      data: [50, 40, 60, 20, 30, 33, 39, 30, 25, 15, 20, 15, 40, 42, 3, 10, 20, 19, 4],
      backgroundColor: 'rgba(191, 191, 191, 0.891)',
      borderWidth: 0,
    }]
      }


  
  const options = {
    plugins: {
      datalabels: {
        color: 'black',
        font: {
          size: 20,
        }
      }
    },
    legend: {
      padding: 10,
      position: 'bottom',
      labels: {
        color: 'black',
        font: {
          size: 20,
          weigth: 'bold'
        },
      padding: 20,
      }
    }
    
  }
  
  return (
    <div className={styles.container}>
    <h1>Vegano</h1>
    <div className={styles.dropdown}>
      <button className={styles.dropdownBtn}>Plato</button>
      <div className={styles.dropdownContent}>
      <a className={styles.dropdownLink} href="/admindashboard/stock/">Todos</a>
        <a className={styles.dropdownLink} href="/admindashboard/stock/principales">Principales</a>
        <a className={styles.dropdownLink} href="/admindashboard/stock/postres">Postres</a>
        <a className={styles.dropdownLink} href="/admindashboard/stock/vegano">Vegano</a>
      </div>
    </div>
    <div className={styles.bar}> 
      <Bar
      data={vegano}
      options = {options} />
    </div>
  </div>
)

}

export default Vegano  
