import { useEffect, useState } from 'react';

import { OptionsFetch, useFetchState } from '../interface/useFetchTypes';

type Props = {
	endpoint: string;
	uri: string;
	errMenssage?: string;
	options: OptionsFetch;
};

const useFetch = <T>({
	endpoint,
	uri,
	errMenssage = 'Ocurrio un error al trar datos',
	options = {
		method: 'GET',
		headers: {
			Authorization: 'authorization',
		},
	},
}: Props) => {
	const [fetchState, setfetchState] = useState<useFetchState<T>>({ state: 'idle', data: null, error: null });

	useEffect(() => {
		let isMounted = true;
		const FetchData = async () => {
			setfetchState((prevState) => ({ ...prevState, state: 'loading' }));
			try {
				const res = await window.fetch(uri, options);
				if (!res.ok) {
					throw setfetchState({
						state: 'error',
						data: null,
						error: new Error(errMenssage),
					});
				}

				if (res.status === 204 && isMounted) {
					setfetchState({
						state: 'success',
						data: null,
						error: null,
					});
					return;
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
