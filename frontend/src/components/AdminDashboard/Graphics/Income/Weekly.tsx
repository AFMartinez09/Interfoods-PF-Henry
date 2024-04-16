import { Bar } from 'react-chartjs-2';
import Style from '../Stock/Stock.module.css';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  plugins,
} from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { allIncomes } from '../../../../redux/actions/Actions';
import { StoreState } from '../../../../redux/reducer/Reducer';


ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
)

const Anual = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(allIncomes())
  }, [])
  
  const totalIncome = useSelector((state: StoreState) => state.income)

  const data = {
    labels: ['Abril', 'Mayo', 'Junio'],
    datasets: [{
      label: 'Ingresos',
      data: [totalIncome],
      tension: 0.4,
      backgroundColor: 'rgba(75, 192, 192, 0.7)',
    }]
  }

  const options = {
    scales: {
      x: {
        ticks: {
          font: {
            size: 18
          }
        }
      },
      y: {
        ticks: {
          font: {
            size: 18
          }
        },
        beginAtZero: true
      }
    },
    plugins: {
      datalabels: {
        color: '#000',
        font: {
          weight: 'bold',
          size: '20',
        }
      }
    }
  }

  return (
    <div className={Style.container}>
      <h1>Ingresos Mensuales</h1>
      <div className={Style.dropdown}>
      <button className={Style.dropdownBtn}>Ingresos</button>
      <div className={Style.dropdownContent}>
        <a className={Style.dropdownLink} href="/admindashboard/income/mensual">Mensual</a>
      </div>
    </div>
      <div className={Style.bar}>
        <Bar
          data={data}
          options= {options}
        />
      </div>
    </div>
  )
}

export default Anual;
