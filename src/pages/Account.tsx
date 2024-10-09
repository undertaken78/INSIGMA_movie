import SavedShows from '../components/SavedShows/SavedShows'
import { bgImage } from '../constants/constants'
import { useAuth } from '../context/AuthContext'

const Account = () => {
	const {user} = useAuth()

	return (
		<>
			<div className='w-full text-white'>
				<img 
					className='w-full h-[400px] object-cover' 
					src={bgImage} 
					alt="/" />
			</div>
			<div className='bg-black/60 fixed top-0 left-0 w-full h-[550px]' />
			<div className='absolute top-[20%] p-4 md:p-8'>
				<p className='text-white text-2xl md:text-4xl font-bold'>{user?.email} Shows</p>
			</div>
			<SavedShows />
		</>
	);
};

export default Account;