import { useContext } from 'react';

import { UserContext } from '../context/UserContext';

const useAuth = () => {
	const { isAuth, logout, signin, signup } = useContext(UserContext);

	return { isAuth, logout, signin, signup };
};

export { useAuth };
