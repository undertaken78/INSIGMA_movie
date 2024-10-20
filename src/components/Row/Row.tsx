import axios from 'axios'
import { useEffect, useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { IMovie, IRow } from '../../interfaces/interfaces'
import { slideLeft, slideRight } from '../../utils/utils'
import MovieRow from '../MovieRow/MovieRow'

const Row = ({title, fetchURL, id}: IRow) => {
	const [movies, setMovies] = useState<IMovie[]>()

	const sliderId = 'slider' + id

	useEffect(() => {
		axios.get(fetchURL).then((response) => {
			setMovies(response.data.results)
		})
	},[fetchURL])

	return (
		<>
			<h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
			<div className='relative flex items-center group'>
			{<MdChevronLeft 
			onClick={() => slideLeft(sliderId)}
			className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40}/>}
				<div id={sliderId} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
					{movies?.map((item, id) => (
						<MovieRow key={id} item={item}/>
					))}
				</div>
			{<MdChevronRight
			onClick={() => slideRight(sliderId)} 
			className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40}/>}	
			</div>
		</>
	);
};

export default Row;