import React , { ChangeEvent, useEffect, useState} from 'react'
import Styles from './SearchBar.module.css'
import { useDispatch, useSelector} from 'react-redux';
import { getFiltro, setcountry, settype} from '../../redux/actions/Actions';
import { StoreState } from '../../redux/reducer/Reducer';
import axios from 'axios';
import {URL} from '../../App'

const SearchBar: React.FC = () => {
    const dispatch = useDispatch();
    let tipo = useSelector((state: StoreState) => state.tipo);
    let pais = useSelector((state: StoreState) => state.pais);
    const [selectedType, setSelectedType] = useState<string>(tipo);
    const [selectedCountry, setSelectedCountry] = useState<string>(pais);
    const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 700px)');
    setIsMobile(mediaQuery.matches);

    const handleResize = () => {
      setIsMobile(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  const handleSelectChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedType(selectedValue);
    dispatch(settype(selectedValue));
    
    try {
      const params = new URLSearchParams({
        pais: selectedCountry,
        tipo: selectedValue,
      });
  
      const response = await axios.get(`${URL}/api/food/filtro?${params}`);
  
      dispatch(getFiltro(response.data));
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleSelectCountryChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedCountry(selectedValue);
    dispatch(setcountry(selectedValue));
  
    try {
      const params = new URLSearchParams({
        pais: selectedValue,
        tipo: selectedType,
      });
  
      const response = await axios.get(`${URL}/api/food/filtro?${params}`);
  
      dispatch(getFiltro(response.data));
    } catch (error) {
      console.error('Error:', error);
    }
  };

    const handleButtonClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        if(event.currentTarget.value === selectedType){
            setSelectedType('Todosa');
            dispatch(settype('Todosa'))
            try {
                const params = new URLSearchParams({
                    pais: selectedCountry,
                    tipo: 'Todosa',
                });
    
                // Realizar una solicitud GET con axios y pasar los parámetros a través de la URL
                // const response = await axios.get(`http://localhost:3000/api/food/filtro?${params}`);
                const response = await axios.get(`${URL}/api/food/filtro?${params}`);
    
                // Verificar la respuesta si es necesario
    
                // Actualizar el estado con los datos recibidos del servidor
                dispatch(getFiltro(response.data)) 
                dispatch(settype(event.currentTarget.value))
            } catch (error) {
                console.error('Error:', error);
            }

        } else {
        setSelectedType(event.currentTarget.value);
        dispatch(settype(event.currentTarget.value))
        try {
            const params = new URLSearchParams({
                pais: selectedCountry,
                tipo: event.currentTarget.value,
            });
            // Realizar una solicitud GET con axios y pasar los parámetros a través de la URL
            // const response = await axios.get(`http://localhost:3000/api/food/filtro?${params}`);
            const response = await axios.get(`${URL}/api/food/filtro?${params}`);

            // Verificar la respuesta si es necesario
            // Actualizar el estado con los datos recibidos del servidor
            dispatch(getFiltro(response.data))
        } catch (error) {
            console.error('Error:', error);
        }
       }
    };


  
    const handleButtonClickcountry = async (event: React.MouseEvent<HTMLButtonElement>) => {
        if(event.currentTarget.value === selectedCountry){
            setSelectedCountry('Todos');
            dispatch(setcountry('Todos'));
            try {
                const params = new URLSearchParams({
                    pais: 'Todos',
                    tipo: selectedType,
                });
    
                // Realizar una solicitud GET con axios y pasar los parámetros a través de la URL
                // const response = await axios.get(`http://localhost:3000/api/food/filtro?${params}`);
                const response = await axios.get(`${URL}/api/food/filtro?${params}`);
    
                // Verificar la respuesta si es necesario
    
                // Actualizar el estado con los datos recibidos del servidor
                dispatch(getFiltro(response.data)) 
            } catch (error) {
                console.error('Error:', error);
            }

        } else {
        setSelectedCountry(event.currentTarget.value);
        dispatch(setcountry(event.currentTarget.value))
        try {
            const params = new URLSearchParams({
                pais: event.currentTarget.value,
                tipo: selectedType,
            });
            // Realizar una solicitud GET con axios y pasar los parámetros a través de la URL
            // const response = await axios.get(`http://localhost:3000/api/food/filtro?${params}`);
            const response = await axios.get(`${URL}/api/food/filtro?${params}`);

            // Verificar la respuesta si es necesario
            // Actualizar el estado con los datos recibidos del servidor
            dispatch(getFiltro(response.data)) 
        } catch (error) {
            console.error('Error:', error);
        }
       }
    };

 


    return (
        <div className={Styles.container}>
          <div className={Styles.todo}>
            <div className={Styles.comida}>
              <span>
                {isMobile ? (
                  <select onChange={handleSelectChange} value={selectedType} className={Styles.select}>
                    <option value="Todosa">Todos</option>
                    <option value="plato fuerte">Principales</option>
                    <option value="postre">Postres</option>
                    <option value="plato vegano">Vegano</option>
                  </select>
                ) : (
                  <>
                    <button value="Todosa" onClick={handleButtonClick} className={selectedType === 'Todosa' ? Styles.botoncomida2 : Styles.botoncomida}>Todos</button>
                    <button value='plato fuerte' onClick={handleButtonClick} className={selectedType === 'plato fuerte' ? Styles.botoncomida2 : Styles.botoncomida}>Principales</button>
                    <button value='postre' onClick={handleButtonClick} className={selectedType === 'postre' ? Styles.botoncomida2 : Styles.botoncomida}>Postres</button>
                    <button value='plato vegano' onClick={handleButtonClick} className={selectedType === 'plato vegano' ? Styles.botoncomida2 : Styles.botoncomida}>Vegano</button>
                  </>
                )}
              </span>
            </div>
            <div className={Styles.comida}>
              <span>
                {isMobile ? (
                  <select onChange={handleSelectCountryChange} value={selectedCountry} className={Styles.select}>
                    <option value="Todos">Todos</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Ecuador">Ecuador</option>
                  </select>
                ) : (
                  <>
                    <button value="Todos" onClick={handleButtonClickcountry} className={selectedCountry === 'Todos' ? Styles.botoncomida2 : Styles.botoncomida}>Todos</button>
                    <button value="Argentina" onClick={handleButtonClickcountry} className={selectedCountry === 'Argentina' ? Styles.botoncomida2 : Styles.botoncomida}>Argentina</button>
                    <button value="Colombia" onClick={handleButtonClickcountry} className={selectedCountry === 'Colombia' ? Styles.botoncomida2 : Styles.botoncomida}>Colombia</button>
                    <button value="Mexico" onClick={handleButtonClickcountry} className={selectedCountry === 'Mexico' ? Styles.botoncomida2 : Styles.botoncomida}>Mexico</button>
                    <button value="Ecuador" onClick={handleButtonClickcountry} className={selectedCountry === 'Ecuador' ? Styles.botoncomida2 : Styles.botoncomida}>Ecuador</button>
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      );

}

export default SearchBar;


