import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ENDPOINTS, KEY_LOCAL_STORAGE } from '../config';

import { DataErrorBackend, FormDataUser, UserLists } from '../interface/ApiBackend';

import { fetchFormData } from '../utils/fetchFormData';
import fetchList from '../utils/fetchList';
import { fetchValidToken } from '../utils/fetchValidToken';

import { UserContext } from './UserContext';

type Props = {
	children: JSX.Element | JSX.Element[];
};

const UserProvider = ({ children }: Props) => {
	const [isAuth, setIsAuth] = useState(false);
	const [modificateLists, setModificateLists] = useState(false);
	const [listsUser, setListsUser] = useState<UserLists | null>(null);

	const navegate = useNavigate();

	useEffect(() => {
		(async () => {
			const localToken = localStorage.getItem(KEY_LOCAL_STORAGE);
			try {
				if (localToken !== null) {
					const data = await fetchValidToken(localToken);
					if (data.statusCode === 204) {
						setIsAuth(true);
					} else {
						localStorage.removeItem(KEY_LOCAL_STORAGE);
					}
				}
			} catch (err) {
				console.error(err);
			}
		})();
	}, []);

	useEffect(() => {
		if (isAuth) {
			// TODO: Buscar en el backend las listas del usuario con sus respectivos ids
			(async () => {
				const listsUser = await fetchList<UserLists>(ENDPOINTS.listsUser);
				if ((listsUser as UserLists)?.name) {
					setListsUser(listsUser as UserLists);
				} else if ((listsUser as DataErrorBackend)?.error) {
					console.error((listsUser as DataErrorBackend)?.error);
				}
			})();
		}
	}, [isAuth, modificateLists]);

	const logout = () => {
		localStorage.removeItem(KEY_LOCAL_STORAGE);
		navegate('/', { replace: true });
		setIsAuth(false);
	};

	const signin = async (formDataUser: FormDataUser): Promise<null | DataErrorBackend> => {
		const data = await fetchFormData(formDataUser, 'login');
		if (data.statusCode === 200) {
			localStorage.setItem(KEY_LOCAL_STORAGE, data.accessToken);
			setIsAuth(true);
			return null;
		} else {
			return data ?? 'Error';
		}
	};

	const signup = async (formDataUser: FormDataUser): Promise<null | DataErrorBackend> => {
		const data = await fetchFormData(formDataUser, 'register');
		if (data.statusCode === 200) {
			localStorage.setItem(KEY_LOCAL_STORAGE, data.accessToken);
			setIsAuth(true);
			return null;
		} else {
			return data ?? 'Error';
		}
	};

	const listUserModificate = () => setModificateLists(!modificateLists);

	return (
		<UserContext.Provider value={{ isAuth, listsUser, listUserModificate, logout, signin, signup }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
