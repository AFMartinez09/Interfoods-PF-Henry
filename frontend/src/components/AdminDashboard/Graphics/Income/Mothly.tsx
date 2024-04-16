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
  plugins,
)

const Anual = () => {
  const dispatch = useDispatch();
  
  const incomes = (dispatch: any) => {
    dispatch(allIncomes())
  }

  useEffect(() => {
    incomes(dispatch)
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
            size: 18 // Cambiar la cadena '18' a un número 18
          }
        }
      },
      y: {
        ticks: {
          font: {
            size: 18 // Cambiar la cadena '18' a un número 18
          }
        },
        beginAtZero: true
      }
    },
    plugins: {
      datalabels: {
        color: '#000',
        font: {
          weight: 'bold' as const, // Cambiar la cadena 'bold' a una cadena literal 'bold'
          size: 20 // Cambiar la cadena '20' a un número 20
        }
      }
    }
  }
  
  
  return (
    <div className={Style.container}>
      <h1>Ingresos Mensuales</h1>
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