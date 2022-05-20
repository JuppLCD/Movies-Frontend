import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

type Props = {
	children: JSX.Element;
};

const PrivateRoute = ({ children }: Props) => {
	const { isAuth } = useAuth();
	const location = useLocation();

	if (!isAuth) {
		return <Navigate to='/user/login' state={{ from: location }} replace />;
	}
	return children;
};

export default PrivateRoute;
