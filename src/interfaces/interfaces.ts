import { ReactNode } from 'react'

export interface IFirebaseConfig { 
	apiKey: string,
	authDomain: string,
	projectId: string,
	storageBucket: string,
	messagingSenderId: string,
	appId: string,
}


export interface IProtectedRouteProps {
	children: ReactNode
}

export interface IRequest {
	requestPopular: string,
	requestTopRated: string,
	requestTrending: string,
	requestHorror: string,
	requestUpcoming: string,
	requestMovieById: (movieId : string) => string,
	requestCreditsById: (movieId: string) => string,
	requestSearchMovies: (query: string) => string,
}


