import { useFetch } from '../hooks/useFetch';

import { ENDPOINTS } from '../config/index';

import { Spinner } from '../components/Spinner';

import { UserInfo } from '../interface/ApiBackend';

const ProfilePage = () => {
	const fetchState = useFetch<UserInfo>({ api: 'API_BACKEND', endpoint: ENDPOINTS.info });

	if (fetchState.data === null || fetchState.state === 'loading') {
		return <Spinner />;
	}

	if (fetchState.state === 'error') {
		return <p>{fetchState.error?.message}</p>;
	}
	return (
		<div>
			ProfilePage <div>{fetchState.data.name}</div>
		</div>
	);
};

export default ProfilePage;
