import {
	User as FirebaseUser,
	UserCredential,
} from 'firebase/auth'
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
	requestMovieById: (movieId : string | undefined) => string,
	requestCreditsById: (movieId: string | undefined) => string,
	requestSearchMovies: (query: string) => string,
}

export interface IMovie {
	adult?: boolean,
	backdrop_path: string,
	belongs_to_collection: {
		id: number,
		name: string,
		poster_path: string,
		backdrop_path: string,
	},
	budget: number,
	genres: {
		id: number,
		name: string,
	}[],
	homepage: string,
	id: number,
	imdb_id: string,
	origin_country: string[],
	original_language: string,
	original_title: string,
	overview: string,
	popularity: number,
	poster_path: string,
	production_companies: {
		id: number,
		logo_path: string,
		name: string,
		origin_country: string,
	}[],
	production_countries: {
		iso_3166_1: string,
		name: string,
	}[],
	release_date: string | number | Date,
	revenue: number,
	runtime: number,
	spoken_languages: {
		english_name: string,
		iso_639_1: string,
		name: string,
	}[],
	status: string,
	tagline: string,
	title: string,
	video: boolean,
	vote_average: number,
	vote_count: number,

}

export interface IActors {
	id: number,
	cast: {
		adult: boolean,
		gender: number,
		id: number,
		known_for_department: string,
		name: string,
		original_name: string,
		popularity: number,
		profile_path: string,
		cast_id: number,
		character: string,
		credit_id: string,
		order: number,

	}[],
	crew: {
		adult: boolean,
		gender: number,
		id: number,
		known_for_department: string,
		name: string,
		original_name: string,
		popularity: number,
		profile_path: string,
		credit_id: string,
		department: string,
		job: string,

	}[],

}

export interface IAuthContext {
	user: FirebaseUser | null,
	signUp: (email: string, password: string) => void
	logIn: (email: string, password: string) => Promise<UserCredential>
	logOut: () => Promise<void>
}

export interface IAuthContextProvider {
	children: ReactNode
}


