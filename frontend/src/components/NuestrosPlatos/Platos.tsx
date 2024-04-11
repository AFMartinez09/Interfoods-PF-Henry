import SearchBar from '../SearchBar/SearchBar';
import { useSelector } from 'react-redux';
import { StoreState } from '../../redux/reducer/Reducer';
import Card from '../Card/Card';
import Style from './Platos.module.css'



interface Food {
  id: number;
  nombre: string;
  origen: string;
  ingredientes: string[];
  kilocalorias: number;
  carbohidratos: number;
  grasas: number;
  peso: number;
  precio: number;
  tipo: string;
  imagen: string;
  stock: string;
  activo: boolean,
  inventario: number,
}

const NuestrosPlatos = () => {
  const foodState = useSelector((state: StoreState) => state.filtros)

  

  let foods: Food[] = foodState;
  foods = foods.filter(food => food.activo === true)

  const loading = foods.length === 0;


  return (
    <div className={Style.page}>
      <div className={Style.platos}>
        <div>
          <SearchBar />
        </div>
        <div className={Style.cards}>
          {loading ? (
            <div className={Style.loading}>
               <div className={Style.noexiste}>Lo sentimos mucho, No existen platos disponibles con estos criterios.</div>
            </div>
          ) : (
            foods.map((food) => (
                        <Card
                          tipo={food.tipo}
                          stock={food.stock}
                          carbohidratos={food.carbohidratos}
                          kilocalorias={food.kilocalorias}
                          key={food.id}
                          name={food.nombre}
                          img={food.imagen}
                          weight={food.peso}
                          price={food.precio}
                          id={food.id}
                        />
                      ))
          )
          }
        </div>
      </div>
    </div>
  );
};
//   return (
//     <div className={Style.page}>
//       <div className={Style.platos}>
//         <div><SearchBar/></div>
//         <div className={Style.cards}>
//         {foods.map((food) => (
//           <Card
//             tipo={food.tipo}
//             stock={food.stock}
//             carbohidratos={food.carbohidratos}
//             kilocalorias={food.kilocalorias}
//             key={food.id}
//             name={food.nombre}
//             img={food.imagen}
//             weight={food.peso}
//             price={food.precio}
//             id={food.id}
//           />
//         ))}
//       </div>
//       </div>
//     </div>
//   );
// }

export default NuestrosPlatos;
