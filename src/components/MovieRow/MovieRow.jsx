import { arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import { db } from '../../firebase.ts'


const MovieRow = ({item}) => {
	const [isLike, setIsLike] = useState(false)
	const [isSaved, setSaved] = useState(false)
	const [likedMovies, setLikedMovies] = useState([])
	const {user} = UserAuth()
	const navigate = useNavigate()

	const movieId = doc(db, 'users', `${user?.email}`)

	const saveShow = async () => {
		if(user?.email) {
			setIsLike(!isLike)
			setSaved(true)
			await updateDoc(movieId, {
				savedShows: arrayUnion({
					id: item.id,
					title: item.title,
					img: item.backdrop_path
				})
			})
		} else {
			alert('Please log in to save a movie')
		}
	}

	useEffect(() => {
    if (user?.email) {
      const unsubscribe = onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
        setLikedMovies(doc.data()?.savedShows || [])
      });

      return () => unsubscribe()
    } else {
			setLikedMovies([])
			setIsLike(false)
		}
  }, [user]);

	useEffect(() => {
    const isLikedInAccount = () => {
			if (likedMovies.some((likedMovie) => likedMovie.id === item.id)) {
				setIsLike(true)
			} else {
				setIsLike(false)
			}
		}
		isLikedInAccount()
  }, [likedMovies, item])

	if (!item.backdrop_path) {
    return null;
  }

	return (
			<div 
				className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'
				onClick={() => navigate(`/movie/${item.id}`)}
				>
				<img
					className='w-full h-auto block' 
					src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} 
					alt={item?.title} />

				<div className='absolute top-0 left-0 w-full h-full hover:bg-black/70 opacity-0 hover:opacity-100 transition easy-in-out delay-40'>
					<p className='whitespace-normal text-white font-bold text-xs md:text-sm flex items-center justify-center h-full text-center'>{item?.title}</p>

					<p
					className='opacity-50 hover:opacity-100 transition easy-in-out delay-50' 
					onClick={(e) => {
						e.stopPropagation()
						saveShow()
					}}>
						{isLike ? <FaHeart className='absolute top-4 left-4 text-gray-300' /> : <FaRegHeart className='absolute top-4 left-4 text-gray-300' />} </p>
				</div>
			</div>
	);
};

export default MovieRow;