import { API_BACKEND, KEY_LOCAL_STORAGE } from '../config';

import { OptionsFetch } from '../interface/useFetchTypes';
import { DataErrorBackend } from './../interface/ApiBackend';

export default async function fetchList<TypeData>(endpoint: string, body?: { name: string }) {
	const localToken = window.localStorage.getItem(KEY_LOCAL_STORAGE);
	if (localToken === null) {
		throw new Error('No hay token, ruta restringida');
	}
	const uri = API_BACKEND + endpoint;

	const options: OptionsFetch = {
		method: 'GET',
		headers: { Authorization: localToken },
	};

	if (endpoint.includes('list/create') || endpoint.includes('list/update')) {
		options.headers['Content-Type'] = 'application/json';
		options.body = JSON.stringify(body);
	}

	switch (true) {
		case endpoint.includes('list/create') || endpoint.includes('movies/add'): {
			options.method = 'POST';
			break;
		}
		case endpoint.includes('list/update'): {
			options.method = 'PUT';
			break;
		}
		case endpoint.includes('list/delete') || endpoint.includes('movies/remove'): {
			options.method = 'DELETE';
			break;
		}
	}
	try {
		const res = await fetch(uri, options);

		if (!res.ok) {
			const error: DataErrorBackend = await res.json();
			return error;
		}
		if (res.status === 204) {
			return { ok: true };
		}
		const data: TypeData = await res.json();
		return data;
	} catch (err) {
		console.error('Error al realizar la peticion al backend - Listas');
	}
}
