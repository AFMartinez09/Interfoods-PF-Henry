import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SearchByEmail } from '../../../../redux/actions/Actions';
import styles from './SearchMail.module.css';
import { StoreState } from '../../../../redux/reducer/Reducer';
import Highlighter from 'react-highlight-words';

interface Users {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  pais: string;
  ciudad: string;
  direccion: string;
  habilitado: boolean; 
}

const SearchMail = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const searchResult:Users[] = useSelector((state: StoreState) => state.searchEmail)
console.log(searchResult)
  const getEmails = async(dispatch: any) => {
    try {
      console.log('searchMail', email)
      dispatch(SearchByEmail(email))
    } catch (error) {
      console.error('hubo un error', error)
    }
  }
  
  useEffect(() => {
    if(email){
      getEmails(dispatch)
    }
  }, [email])

  const handleSubmit = (e: any) => {
    e.preventDefault();
    getEmails(dispatch);
  }

  const handleInputChange = (e:any) => {
    setEmail(e.target.value)
  }

  return (
    <div>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <div>
            <input 
              className={styles.text}
              type='search'
              name='search'
              value={email}
              onChange={handleInputChange}
              placeholder='Buscar Email'
            />
            <button className={styles.search}
              type='submit'
              onClick={handleSubmit}
              >Buscar
            </button>
          </div>
        </form>
      </div>
      {Array.isArray(searchResult) && searchResult.map(user => (
        <Highlighter
          highlightClassName={styles.Highlight}
          searchWords={[email]}
          autoEscape={true}
          textToHighlight={user.email}
        />
      ))}
    </div>
  )
}

export default SearchMail

