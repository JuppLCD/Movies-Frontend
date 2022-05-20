import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

interface LocationParams {
	state: {
		from: {
			pathname: string;
		} | null;
	};
}

type Props = {
	children: JSX.Element;
};

const PublicRoute = ({ children }: Props) => {
	const { isAuth } = useAuth();
	const location = useLocation() as LocationParams;

	if (isAuth) {
		const from = location.state?.from?.pathname || '/profile';
		return <Navigate to={from} replace />;
	}
	return children;
};

export default PublicRoute;
