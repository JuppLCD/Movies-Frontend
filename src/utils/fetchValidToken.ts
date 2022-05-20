import { API_BACKEND, ENDPOINTS } from '../config';

export const fetchValidToken = async (token: string) => {
	const res = await window.fetch(API_BACKEND + ENDPOINTS.login, {
		method: 'POST',
		headers: { authorization: token },
	});
	if (res.status !== 204) {
		const error = await res.json();
		return error;
	}
	return { statusCode: 204 };
};
