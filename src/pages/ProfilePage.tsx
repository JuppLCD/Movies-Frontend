import { ENDPOINTS } from '../config/index';

import { Spinner } from '../components/Spinner';

import { UserInfo } from '../interface/ApiBackend';

import apiBackend from '../utils/apiBackend';
import { Container } from 'react-bootstrap';

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
			<Container fluid='md'>
				ProfilePage <div>{fetchState.data.name}</div>
				{fetchState.data.lists.map((lists) => (
					<div key={lists.name}>
						list - {lists.name} - movies : [ {lists.movies.join(' | ')} ]
					</div>
				))}
			</Container>
		</main>
	);
};

export default ProfilePage;
