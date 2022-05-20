import { createContext } from 'react';
import { DataErrorBackend, FormDataUser } from '../interface/ApiBackend';

interface UserToken {
	isAuth: boolean;
	logout: () => void;
	signin: (formDataUser: FormDataUser) => Promise<null | DataErrorBackend>;
	signup: (formDataUser: FormDataUser) => Promise<null | DataErrorBackend>;
}

export const UserContext = createContext<UserToken>({} as UserToken);
