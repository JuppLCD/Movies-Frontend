import { useEffect, useState } from 'react';

import { API_BACKEND, API_MOVIES, KEY_API_MOVIES, KEY_LOCAL_STORAGE } from '../config';

type Props = {
	endpoint: string;
	api: 'API_BACKEND' | 'API_MOVIES';
	errMenssage?: string;
};

type useFetchState<T> = {
	state: 'idle' | 'loading' | 'error' | 'success';
	data: null | T;
	error: null | Error;
};

const useFetch = <T>({ endpoint, api, errMenssage = 'Ocurrio un error al trar datos' }: Props) => {
	const [fetchState, setfetchState] = useState<useFetchState<T>>({ state: 'idle', data: null, error: null });

	useEffect(() => {
		let isMounted = true;
		const FetchData = async () => {
			setfetchState((prevState) => ({ ...prevState, state: 'loading' }));
			try {
				// TODO Pensar como implementar en las opciones del fetch otros metodos http
				let uri: string;
				let headersAPI: any;
				if (api === 'API_BACKEND') {
					const localToken = window.localStorage.getItem(KEY_LOCAL_STORAGE);
					if (localToken === null) {
						throw setfetchState({
							state: 'error',
							data: null,
							error: new Error('No hay token, ruta restringida'),
						});
					}
					uri = API_BACKEND + endpoint;
					headersAPI = { Authorization: localToken };
				} else {
					uri = API_MOVIES + endpoint;
					headersAPI = {
						Authorization: KEY_API_MOVIES,
						'Content-Type': 'application/json;charset=utf-8',
					};
				}

				const res = await window.fetch(uri, { method: 'GET', headers: headersAPI });
				if (!res.ok) {
					throw setfetchState({
						state: 'error',
						data: null,
						error: new Error(errMenssage),
					});
				}

				const data = await res.json();
				if (isMounted) {
					setfetchState({
						state: 'success',
						data: data,
						error: null,
					});
				}
			} catch (err) {
				console.error();
				setfetchState({
					state: 'error',
					data: null,
					error: err as Error,
				});
			}
		};
		FetchData();
		return () => {
			isMounted = false;
		};
	}, [endpoint]);

	return fetchState;
};

export { useFetch };
