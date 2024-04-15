import { useState } from 'react'
import styles from './SearchMail.module.css';

const SearchMail = ({ setSearch }: { setSearch: any }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(email)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
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
            >Buscar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SearchMail

