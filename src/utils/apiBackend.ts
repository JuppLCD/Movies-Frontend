import { useFetch } from '../hooks/useFetch';

import { API_BACKEND, KEY_LOCAL_STORAGE } from '../config';

import { OptionsFetch } from '../interface/useFetchTypes';

export default function apiBackend<TypeData>(endpoint: string, body?: { name: string }) {
	const localToken = window.localStorage.getItem(KEY_LOCAL_STORAGE);
	if (localToken === null) {
		throw new Error('No hay token, ruta restringida');
	}
	const uri = API_BACKEND + endpoint;

	const options: OptionsFetch = {
		method: 'GET',
		headers: { Authorization: localToken },
	};

	if (endpoint.includes('/list/create') || endpoint.includes('/list/update')) {
		options.headers['Content-Type'] = 'application/json';
		options.body = JSON.stringify(body);
	}

	switch (true) {
		case endpoint.includes('list/create'): {
			options.method = 'POST';
			break;
		}
		case endpoint.includes('list/update'): {
			options.method = 'PUT';
			break;
		}
		case endpoint.includes('list/delete'): {
			options.method = 'DELETE';
			break;
		}
	}

	const fetchState = useFetch<TypeData>({ uri, endpoint, options });
	return fetchState;
}
