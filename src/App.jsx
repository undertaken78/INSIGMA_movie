import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import { AuthContextProvider } from './context/AuthContext'
import ProtectedRoute from './navigation/ProtectedRoute'
import Account from './pages/Account'
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import Movie from './pages/Movie'
import SignUp from './pages/SignUp'


const App = () => {
	return (
		<div>
			<AuthContextProvider>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<LogIn />} />
					<Route path='/signup' element={<SignUp />} />
					<Route path='/movie/:id' element={<Movie />} />
					<Route 
						path='/account' 
						element={
							<ProtectedRoute>
								<Account />
							</ProtectedRoute>} 
						/>
				</Routes>
			</AuthContextProvider>
		</div>
	)
}

export default App