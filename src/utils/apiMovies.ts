import { useFetch } from '../hooks/useFetch';

import { API_MOVIES, KEY_API_MOVIES } from '../config';

import { OptionsFetch } from '../interface/useFetchTypes';

export default function apiMovies<TypeData>(endpoint: string) {
	const uri = API_MOVIES + endpoint;
	const options: OptionsFetch = {
		method: 'GET',
		headers: { Authorization: KEY_API_MOVIES, 'Content-Type': 'application/json;charset=utf-8' },
	};
	const fetchState = useFetch<TypeData>({ uri, endpoint, options });

	return fetchState;
}
