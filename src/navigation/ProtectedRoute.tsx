import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { IProtectedRouteProps } from '../interfaces/interfaces'

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({children}) => {
	const {user} = useAuth()

	return !user ? <Navigate to='/' /> : children
};

export default ProtectedRoute;