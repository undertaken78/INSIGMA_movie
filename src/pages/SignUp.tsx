import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { bgImage } from '../constants/constants'
import { UserAuth } from '../context/AuthContext'

const SignUp = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const {user, signUp } = UserAuth()
	const navigate = useNavigate()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			await signUp(email, password)
			navigate('/')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<div className='w-full h-screen'>
				<img className='hidden sm:block absolute w-full h-full object-cover' src={bgImage} alt="/" />
				<div className='bg-black/60 fixed top-0 left-0 w-full h-screen' />
				<div className='fixed w-full px-4 py-24 z-50'>
					<div className='max-w-[450px] h-[550px] mx-auto bg-black/75 text-white'>
						<div className='max-w-[320px] mx-auto py-16'>
							<h1 className='text-2xl font-bold'>Create account</h1>
							<form onSubmit={handleSubmit} className='w-full flex flex-col py-4'>
								<input 
									onChange={(e) => setEmail(e.target.value)}
									type="email" 
									className='p-3 my-2 bg-gray-700 rounded' 
									placeholder='Email' 
									autoComplete='email' />
								<input 
									onChange={(e) => setPassword(e.target.value)}
									type="password" 
									className='p-3 my-2 bg-gray-700 rounded' placeholder='Password' 
									autoComplete='current-password'/>
								<div className='flex justify-between items-center text-sm text-gray-600'>
									<p><input className='mr-1.5' type="checkbox" />Remember me</p>
									<p className='cursor-pointer hover:text-gray-500'>Need help?</p>
								</div>
								<button className='bg-red-600 py-3 my-6 rounded font-bold'>Sign Up</button>
								<div className='flex flex-row items-center'>
									<p className='text-gray-600'>Already subscribe to Insigma?</p>
									<Link to='/login'>
										<p className='cursor-pointer text-gray-100 px-2 hover:text-gray-300'>Sign in</p>
									</Link>
								</div>
								
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SignUp;