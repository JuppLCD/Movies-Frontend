import { useContext } from 'react';

import { UserContext } from '../context/UserContext';

const useAuth = () => {
	const { isAuth, listsUser, logout, signin, signup } = useContext(UserContext);

	return { isAuth, listsUser, logout, signin, signup };
};

export { useAuth };
