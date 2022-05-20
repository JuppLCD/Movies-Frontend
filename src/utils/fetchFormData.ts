import { API_BACKEND, ENDPOINTS } from '../config';

import { FormDataUser } from '../interface/ApiBackend';

export const fetchFormData = async (formDataUser: FormDataUser, path: 'login' | 'register') => {
	try {
		const res = await window.fetch(API_BACKEND + ENDPOINTS[path], {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formDataUser),
		});
		const data = await res.json();
		if (res.status !== 200) {
			return data;
		}
		return { statusCode: 200, accessToken: data.accessToken };
	} catch (err) {
		console.error(err);
	}
};
