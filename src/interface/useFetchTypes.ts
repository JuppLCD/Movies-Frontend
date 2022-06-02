export type HeadersFetch = {
	Authorization: string;
	'Content-Type'?: 'application/json' | 'application/json;charset=utf-8';
};

export type OptionsFetch = {
	method: 'GET' | 'POST' | 'PUT' | 'DELETE';
	headers: HeadersFetch;
	body?: string;
};

export type useFetchState<T> = {
	state: 'idle' | 'loading' | 'error' | 'success';
	data: null | T;
	error: null | Error;
};
