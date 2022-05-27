import { useContext } from 'react';

import { UserContext } from '../context/UserContext';

const useAuth = () => {
	const { isAuth, listsUser, listUserModificate, logout, signin, signup } = useContext(UserContext);

	return { isAuth, listsUser, listUserModificate, logout, signin, signup };
};

export { useAuth };
