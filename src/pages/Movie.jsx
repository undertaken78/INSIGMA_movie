import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaRegStar } from "react-icons/fa"
import { useParams } from 'react-router-dom'
import requests from '../Requests'
import { convertRuntime, truncateOverview } from '../utils/utils.ts'

const Movie = () => {
	const {id} = useParams()
	const [movie, setMovie] = useState({})
	const [credits, setCredits] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const movieResponse = await axios.request(requests.requestMovieById(id))
				const creditsResponce = await axios.request(requests.requestCreditsById(id))
				setMovie(movieResponse.data)
				setCredits(creditsResponce.data)
			} catch (error) {
				console.log(error)
			}
		}
		fetchData()
	}, [id])

	console.log(credits)

	return (
		<>
			<div className='w-full h-[100vh] text-white'>
				<div className='w-full h-full flex items-center justify-center'>
					<div className='w-full h-full bg-gray-900/30 flex flex-col'>
						<div className='absolute w-full h-[90%] bg-gradient-to-r from-black/90 z-10' />
							<img 
								className='w-full h-[90%] object-cover absolute' 
								src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title} 
							/>
							<div className='w-full h-full flex flex-col px-12 z-20'>
								<h1 className='w-[30%] text-3xl md:text-4xl break-words whitespace-normal font-bold items-center relative top-[40%]'>{movie?.title}</h1>
								<div className='relative top-[40.5%] flex flex-row text-gray-400 pt-2'>
									<p>{new Date(movie?.release_date).getFullYear()}</p>
									<p className='px-2'>|</p>
									<p>{convertRuntime(movie?.runtime)}</p>
									<p className='px-2'>|</p>
									<p>{movie?.genres?.[0]?.name}</p>
									<p className='px-2'>|</p>
									<p>{movie?.vote_average?.toFixed(1)}</p>
									<FaRegStar className='relative top-[18%] left-1 text-yellow-300'/>
								</div>
								<p className='w-[40%] relative top-[42%] break-words whitespace-normal'>{truncateOverview(movie?.overview, 200)}</p>
								<div className='relative top-[41.5%] flex flex-col pt-2'>
									<p className='text-gray-400 flex'>
										В главных ролях: 
										<p className='text-white pl-1'>
										{credits?.cast?.slice(0, 3).map(actor => actor.name).join(',  ')}
										</p>
									</p>
									<p className='text-gray-400 flex'>
										Режиссёр:
										<p className='text-white pl-1'>
											{credits?.crew?.[0]?.name}
										</p>
									</p>
								</div>
							</div>
							
              {/* <p className='text-xs md:text-sm mt-4 relative  z-50'>{movie?.overview}</p> */}
					</div>
				</div>
			</div>
		</>
	);
};

export default Movie;