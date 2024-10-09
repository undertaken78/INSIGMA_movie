import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import requests from '../../Requests'
import { truncateOverview } from '../../utils/utils.ts'

const Main = () => {
	const [movies, setMovies] = useState([])
	const navigate = useNavigate()

	const randomPopularMovie = movies[Math.floor(Math.random() * movies.length)]



	useEffect(() => {
		axios.get(requests.requestPopular).then((response) => {
			setMovies(response.data.results)
		})
	}, [])

	return (
		<div className='w-full h-[550px] text-white'>
			<div className='w-full h-full'>
				<div className='absolute w-full h-[550px] bg-gradient-to-r from-black' />
				<img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original/${randomPopularMovie?.backdrop_path}`} alt={randomPopularMovie?.title} />
				<div className='absolute w-full top-[30%] p-4 md:p-8'>
					<h1 className='text-3xl md:text-5xl font-bold'>{randomPopularMovie?.title}</h1>
					<div className='my-4'>
						<button 
							className='border border-gray-300 bg-gray-300 text-black px-5 py-2 rounded'
							onClick={() => {navigate(`/movie/${randomPopularMovie.id}`)}}
							>Смотреть</button>
						<button className='border border-gray-300 text-white px-5 py-2 ml-4 rounded'>Посмотреть позже</button>
					</div>
					<p className='text-gray-500 text-sm'>Дата выхода: {randomPopularMovie?.release_date}</p>
					<p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>{truncateOverview(randomPopularMovie?.overview, 150)}</p>
				</div>
			</div>
		</div>
	);
};

export default Main;