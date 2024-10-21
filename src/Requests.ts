import { IRequest } from './interfaces/interfaces'

const key = process.env.REACT_APP_API_KEY;

const requests: IRequest = {
  requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=ru-RU&page=1`,
  requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=ru-RU&page=1`,
  requestTrending: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=ru-RU&page=2`,
  requestHorror: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=ru-RU&query=horror&page=1&include_adult=false`,
  requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=ru-RU&page=1`,
  
  requestMovieById: (movieId: string | undefined) => `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&language=ru-RU`,
	requestCreditsById: (movieId: string | undefined) => `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${key}&language=ru-RU`, 
  
  requestSearchMovies: (query: string) => 
    `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=ru-RU&query=${encodeURIComponent(query)}&include_adult=true`
};

export default requests;
