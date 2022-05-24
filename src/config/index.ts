const HOST: string = import.meta.env.VITE_HOST_BAKEND;
const API_BACKEND = HOST + '/api/v1/';
const ENDPOINTS = {
	info: 'user/info',
	login: 'user/login',
	register: 'user/register',
	listsUser: 'list',
	createList: 'list/create',
	updateList: 'list/update/',
	deleteList: 'list/delete/',
	getMoviesFromList: 'list/:listId/movies',
	addMovieFromList: 'list/:listId/movies/add/',
	removeMovieFromList: 'list/:listId/movies/remove/',
};

const API_MOVIES = 'https://api.themoviedb.org/3';
const KEY_API_MOVIES: string = import.meta.env.VITE_KEY_API_MOVIES;
const KEY_LOCAL_STORAGE = 'movies-token';

export { API_MOVIES, KEY_API_MOVIES, KEY_LOCAL_STORAGE, API_BACKEND, ENDPOINTS };
