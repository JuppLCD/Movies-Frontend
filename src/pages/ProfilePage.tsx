import { Container } from 'react-bootstrap';

import { ENDPOINTS } from '../config/index';

import { Spinner } from '../components/Spinner';
import ListMovie from '../components/ListMovie';

import { UserMoviesList } from '../interface/ApiBackend';

import apiBackend from '../utils/apiBackend';

import styles from './styles/ProfilePage.module.css';

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
				ProfilePage <div>{fetchState.data.name}</div>
				<ul className={styles.listGrid}>
					{fetchState.data.lists.map((list) => (
						<ListMovie key={list.id} list={list} />
					))}
				</ul>
			</Container>
		</main>
	);
};

export default ProfilePage;
