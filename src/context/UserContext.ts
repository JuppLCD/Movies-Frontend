import { createContext } from 'react';
import { DataErrorBackend, FormDataUser, UserLists } from '../interface/ApiBackend';

interface UserToken {
	isAuth: boolean;
	listsUser: UserLists | null;
	listUserModificate: () => void;
	logout: () => void;
	signin: (formDataUser: FormDataUser) => Promise<null | DataErrorBackend>;
	signup: (formDataUser: FormDataUser) => Promise<null | DataErrorBackend>;
}

export const UserContext = createContext<UserToken>({} as UserToken);
