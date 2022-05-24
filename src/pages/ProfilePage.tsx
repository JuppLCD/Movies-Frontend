import { ENDPOINTS } from '../config/index';

import { Spinner } from '../components/Spinner';

import { UserInfo } from '../interface/ApiBackend';

import apiBackend from '../utils/apiBackend';

const ProfilePage = () => {
	const fetchState = apiBackend<UserInfo>(ENDPOINTS.info);

	if (fetchState.data === null || fetchState.state === 'loading') {
		return <Spinner />;
	}

	if (fetchState.state === 'error') {
		return <p>{fetchState.error?.message}</p>;
	}
	return (
		<main>
			ProfilePage <div>{fetchState.data.name}</div>
			{fetchState.data.lists.map((lists) => (
				<div>
					list - {lists.name} - movies : [ {lists.movies.join(' | ')} ]
				</div>
			))}
		</main>
	);
};

export default ProfilePage;
