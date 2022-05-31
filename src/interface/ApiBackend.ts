export interface FormDataUser {
	name: string;
	password: string;
	passwordConfirm?: string;
}

export interface ErrorFormDataUser {
	backend: string;
	FormError: string;
}

export interface UserMoviesList {
	name: string;
	lists: [
		{
			name: string;
			id: string;
			movies: [number];
		}
	];
}

export interface UserLists {
	name: string;
	lists: [
		{
			name: string;
			id: number;
		}
	];
}

export interface DataErrorBackend {
	statusCode: number;
	error: string;
	message: string;
}
