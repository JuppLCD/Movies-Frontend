import { Container } from 'react-bootstrap';

import { ENDPOINTS } from '../config/index';

import { Spinner } from '../components/Spinner';
import ListMovie from '../components/ListMovie';

import { UserMoviesList } from '../interface/ApiBackend';

import apiBackend from '../utils/apiBackend';

const ProfilePage = () => {
	const fetchState = apiBackend<UserMoviesList>(ENDPOINTS.info);

	if (fetchState.data === null || fetchState.state === 'loading') {
		return <Spinner />;
	}

	if (fetchState.state === 'error') {
		return <p>{fetchState.error?.message}</p>;
	}
	return (
		<main>
			<Container fluid='md'>
				<h1>{fetchState.data.name}</h1>
				<ul className='moviesGrid'>
					{fetchState.data.lists.map((list) => (
						<ListMovie key={list.id} list={list} />
					))}
				</ul>
			</Container>
		</main>
	);
};

export default ProfilePage;
