import React from 'react'
import { Navigate } from 'react-router-dom'
import { useTypedSelector } from '../hooks/reduxHooks'
import { IProtectedRouteProps } from '../interfaces/interfaces'

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({children}) => {
	const user = useTypedSelector((state) => state.auth.user)

	return !user ? <Navigate to='/' /> : children
};

export default ProtectedRoute;