import { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci"
import { Link, useNavigate } from 'react-router-dom'
import requests from '../../Requests'
import { useAppDispatch, useTypedSelector } from '../../hooks/reduxHooks'
import { IMovie } from '../../interfaces/interfaces'
import { logOut } from '../../slices/auth/authSlice'
import styles from './styles.module.scss'

const Navbar = () => {
  const dispatch = useAppDispatch()
  const user = useTypedSelector((state) => state.auth.user)
  const navigate = useNavigate()

  const [scroll, setScroll] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [searchResults, setSearchResults] = useState<IMovie[]>()

  const handleLogout = async () => {
    try {
      await dispatch(logOut());
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    };
  }, []);

  useEffect(() => {
    if (searchValue === '') {
      setSearchResults([])
      return;
    }

    const searchMovies = async () => {
      try {
        const response = await fetch(requests.requestSearchMovies(searchValue))
        const data = await response.json()
				const filteredResults = data.results.filter((movie: IMovie) => 
					movie.poster_path && movie.overview && movie.vote_average > 5
				)
        setSearchResults(filteredResults)
      } catch (error) {
        console.log('Ошибка при поиске фильмов:', error)
      }
    };

    const debounceTimeout = setTimeout(searchMovies, 500)
    return () => clearTimeout(debounceTimeout)
  }, [searchValue])

  return (
    <div className={`${styles.container} fixed top-0 left-0 w-full transition-all duration-300 ease-in-out 
		${scroll ? 'bg-gray-900/90 shadow-lg' : 'bg-transparent'}`}>
      <Link to='/'>
        <h1 className={styles.title}>INSIGMA</h1>
      </Link>
      
      <div className="absolute left-[39%] w-[20%]">
        <CiSearch className='absolute text-gray-400 left-[2%] top-[32%] ' />
        <input
          placeholder='Поиск'
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          className='p-2 bg-gray-700/50 text-white placeholder:text-gray-400 rounded pl-[10%] w-full'
        />

        {searchResults && searchResults?.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-white text-black max-h-60 overflow-y-auto shadow-lg">
            {searchResults?.map((movie) => (
              <Link 
                to={`/movie/${movie.id}`} 
                key={movie.id}
                className="block p-2 hover:bg-gray-200"
                onClick={() => setSearchValue('')}
              >
                {movie.title}
              </Link>
            ))}
          </div>
        )}
      </div>
      
      {user?.email ? (
        <div className=''>
          <Link to='/account'>
            <button className={styles.signIn}>{user?.email}</button>
          </Link>
          <button onClick={handleLogout} className={styles.signUp}>Выйти</button>
        </div>
      ) : (
        <div className=''>
          <Link to='/login'>
            <button className={styles.signIn}>Войти</button>
          </Link>
          <Link to='/signup'>
            <button className={styles.signUp}>Регистрация</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
