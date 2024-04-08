import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import styles from './StatusPayment.module.css'
import { Chart as ChartJS, Tooltip, ArcElement, Legend } from 'chart.js';

ChartJS.register(
  ArcElement, 
  Tooltip, 
  ChartDataLabels, 
  Legend,
);



const StatusPayment= () => {
  const DataStatus = {
    // etiquetas a mostrar
    labels: ['Pendiente', 'Cancelado', 'Pagado'],
    datasets: [
      {
        label: 'Numero de pedidos',
        // datos de cada etiqueta
        data: [12, 3, 23],
        backgroundColor: [
          'rgba(211, 211, 5, 0.504)',
          'rgba(222, 11, 11, 0.542)',
          'rgba(15, 141, 11, 0.541)',
        ],
        borderColor: [
          'rgba(211, 211, 5, 0.504)',
          'rgba(222, 11, 11, 0.542)',
          'rgba(15, 141, 11, 0.541)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    plugins: {
      datalabels: {
        // estilos deseados en la grafica
        anchor: 'center',
        align: 'center',
        color: 'black',
        font: {
          size: 25,
          weight: 'bold'
        },
        // funcion para mostrar en porcentaje
        formatter: (value: number, ctx: any) => {
          const dataArr = ctx.chart.data.datasets[0].data;
          const sum = dataArr.reduce((a: number, b: number) => a + b, 0);
          const percentage = ((value * 100) / sum).toFixed(2) + '%';
          return percentage;
        },
      },
        // estilos deseados en las etiqueta
      legend: {
        padding: 10,
        position: 'bottom',
        labels: {
          color: 'black',
          font: {
            size: 20,
            weight: 'bold'
          },
          padding: 20,
        }
    },
  },
  };

  return (
    <div className={styles.container}>
      <h1>Total estado de pedidos</h1>
      <div className={styles.doughnut}>
        <Doughnut 
        data={DataStatus} 
        options= {options} />
      </div>
    </div>
  );
};

export default StatusPayment;
