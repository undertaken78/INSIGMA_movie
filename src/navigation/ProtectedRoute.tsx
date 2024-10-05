import React from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { IProtectedRouteProps } from '../interfaces/interfaces'

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({children}) => {
	const {user} = UserAuth()

	return !user ? <Navigate to='/' /> : children
};

export default ProtectedRoute;