import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from '../components/Spinner';

import { ENDPOINTS } from '../config';
import { UserMoviesList } from '../interface/ApiBackend';

import apiBackend from '../utils/apiBackend';
import { insertListIdEndpoint } from '../utils/insertListIdEndpoint';

const ListPage = () => {
	const { listId } = useParams();
	const fetchState = apiBackend<UserMoviesList>(insertListIdEndpoint(ENDPOINTS.getMoviesFromList, listId as string));

	useEffect(() => {
		if (fetchState.state === 'success') {
			// TODO: Hacer un Promice.all() de las peliculas de la lista y guardarlas en un state
		}
	}, [fetchState]);

	if (fetchState.state === 'idle' || fetchState.state === 'loading') {
		return <Spinner />;
	}

	if (fetchState.state === 'error') {
		return <p>{fetchState.error?.message}</p>;
	}

	if (fetchState.data) {
		return (
			<main>
				<h1>{fetchState.data.name}</h1>
				<p>Esta pagina es de la lista de peliculas cuyo id es igual a ==&gt; ( {listId} )</p>
			</main>
		);
	} else {
		return (
			<main>
				<p>No se pudieron cargar las peliculas de la lista</p>
			</main>
		);
	}
};

export default ListPage;
