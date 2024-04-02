import React , { useState} from 'react'
import Styles from './SearchBar.module.css'
import { useDispatch, useSelector} from 'react-redux';
import { getFiltro} from '../../redux/actions/Actions';
import { StoreState } from '../../redux/reducer/Reducer';
import axios from 'axios';


const SearchBar: React.FC = () => {
    const dispatch = useDispatch();
    const tipo = useSelector((state: StoreState) => state.tipo);
    const pais = useSelector((state: StoreState) => state.pais);
    const [selectedType, setSelectedType] = useState<string>(tipo);
    const [selectedCountry, setSelectedCountry] = useState<string>(pais);
    

    const handleButtonClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        setSelectedType(event.currentTarget.value);
        try {
            const params = new URLSearchParams({
                pais: selectedCountry,
                tipo: event.currentTarget.value,
            });
            // Realizar una solicitud GET con axios y pasar los parámetros a través de la URL
            const response = await axios.get(`http://localhost:3000/api/food/filtro?${params}`);

            // Verificar la respuesta si es necesario
            // Actualizar el estado con los datos recibidos del servidor
            dispatch(getFiltro(response.data)) 
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleButtonClickcountry = async (event: React.MouseEvent<HTMLButtonElement>) => {
        setSelectedCountry(event.currentTarget.value);
        try {
            const params = new URLSearchParams({
                pais: event.currentTarget.value,
                tipo: selectedType,
            });

            // Realizar una solicitud GET con axios y pasar los parámetros a través de la URL
            const response = await axios.get(`http://localhost:3000/api/food/filtro?${params}`);

            // Verificar la respuesta si es necesario

            // Actualizar el estado con los datos recibidos del servidor
            dispatch(getFiltro(response.data)) 
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div className={Styles.container}>
        <div>
        <div className={Styles.comida}> 
            <span>
                <button value="Todosa" onClick={handleButtonClick} className={selectedType === 'Todosa' ? Styles.botoncomida2 : Styles.botoncomida}>Todos</button>
                <button value='plato fuerte' onClick={handleButtonClick} className={selectedType === 'plato fuerte' ? Styles.botoncomida2 : Styles.botoncomida}>Principales</button>
                <button value='postre' onClick={handleButtonClick} className={selectedType === 'postre' ? Styles.botoncomida2 : Styles.botoncomida}>Postres</button>
                <button value='plato vegano' onClick={handleButtonClick} className={selectedType === 'plato vegano' ? Styles.botoncomida2 : Styles.botoncomida}>Vegano</button>
            </span>
        </div>
        <div className={Styles.comida}>
            <span>
                <button value="Todos" onClick={handleButtonClickcountry} className={selectedCountry === 'Todos' ? Styles.botoncomida2 : Styles.botoncomida}>Todos</button>
                <button value="Argentina" onClick={handleButtonClickcountry} className={selectedCountry === 'Argentina' ? Styles.botoncomida2 : Styles.botoncomida}>Argentina</button>
                <button value="Colombia" onClick={handleButtonClickcountry} className={selectedCountry === 'Colombia' ? Styles.botoncomida2 : Styles.botoncomida}>Colombia</button>
                <button value="Mexico" onClick={handleButtonClickcountry} className={selectedCountry === 'Mexico' ? Styles.botoncomida2 : Styles.botoncomida}>Mexico</button>
                <button value="Ecuador" onClick={handleButtonClickcountry} className={selectedCountry === 'Ecuador' ? Styles.botoncomida2 : Styles.botoncomida}>Ecuador</button>
            </span>
        </div>
        </div>
        <div className={Styles.searchbar}>
          {/* <input 
                  type="text"
                  placeholder="Busca la comida..."
               />
              <button type="submit" >Search</button> */}
        </div>
        </div>
        
    )

}

export default SearchBar;