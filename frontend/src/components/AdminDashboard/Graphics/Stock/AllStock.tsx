import React from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { StoreState, Plato } from '../../../../redux/reducer/Reducer'; 
import styles from './Stock.module.css';
import { 
  Chart as ChartJS,
  Tooltip,
  BarElement,
  Legend,
  CategoryScale,
  LinearScale,
  plugins,
 } from 'chart.js';

ChartJS.register(Tooltip, 
  BarElement, 
  Legend, 
  CategoryScale,
   LinearScale, 
   plugins,
  );

const AllStock: React.FC = () => {
   
    const platos: Plato[] = useSelector((state: StoreState) => state.platos);
    const all = {
        labels: platos.map(plato => plato.nombre),
        datasets: [{
            label: 'Cantidad',
            data: platos.map(plato => plato.inventario),
            backgroundColor: 'rgba(191, 191, 191, 0.891)',
            borderWidth: 0,
        }],
    };

    const options = {
        plugins: {
            datalabels: {
                color: 'black',
                font: {
                    size: 20,
                },
            },
        },
        legend: {
            padding: 10,
            position: 'bottom',
            labels: {
                color: 'black',
                font: {
                    size: 20,
                    weight: 'bold',
                },
                padding: 20,
            },
        },
    };

    return (
        <div className={styles.container}>
            <h1>Inventario de todos los platos</h1>

            <div className={styles.dropdown}>
                <button className={styles.dropdownBtn}>Plato</button>
                <div className={styles.dropdownContent}>
                    <a className={styles.dropdownLink} href="/admindashboard/stock/">Todos</a>
                    {/* Otras opciones de dropdown se han comentado */}
                    {/* <a className={styles.dropdownLink} href="/admindashboard/stock/principales">Principales</a> 
                   <a className={styles.dropdownLink} href="/admindashboard/stock/postre">Postres</a> 
                    <a className={styles.dropdownLink} href="/admindashboard/stock/vegano">Vegano</a> */}
                </div>
            </div>

            <div className={styles.bar}>
                <Bar data={all} options={options} />
            </div>


         
        </div>
    );
};

export default AllStock;
