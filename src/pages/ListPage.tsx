import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import useModal from '../hooks/useModal';

import { MovieCard } from '../components/MovieCard';
import { Spinner } from '../components/Spinner';
import ModalCreateList from '../components/ModalCreateList';

import { API_MOVIES, ENDPOINTS, KEY_API_MOVIES } from '../config';

import { UserMoviesList } from '../interface/ApiBackend';
import { Movie } from '../interface/ApiMovies';

import apiBackend from '../utils/apiBackend';
import { insertListIdEndpoint } from '../utils/insertListIdEndpoint';

const ListPage = () => {
	const [movies, setMovies] = useState<Movie[]>([]);
	const { show, handleClose, handleShow } = useModal();
	const { listId } = useParams();
	const fetchState = apiBackend<UserMoviesList>(insertListIdEndpoint(ENDPOINTS.getMoviesFromList, listId as string));

	useEffect(() => {
		if (fetchState.state === 'success' && fetchState.data !== null) {
			Promise.allSettled(
				fetchState.data?.lists[0].movies.map((movieId) => {
					return fetch(API_MOVIES + `/movie/${movieId}`, {
						method: 'GET',
						headers: { Authorization: KEY_API_MOVIES, 'Content-Type': 'application/json;charset=utf-8' },
					}).then((res) => res.json());
				})
			)
				.then((res) => {
					let moviesData: Movie[] = [];
					res.forEach((data, index) => {
						if (data.status == 'fulfilled') {
							moviesData.push(data.value as Movie);
						} else if (data.status == 'rejected') {
							console.error(`Error to fetch movie ${fetchState.data?.lists[0].movies[index]}`);
						}
					});
					setMovies(moviesData);
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}, [fetchState]);

	if (fetchState.state === 'idle' || fetchState.state === 'loading') {
		return <Spinner />;
	}

	if (fetchState.state === 'error') {
		return <p>{fetchState.error?.message}</p>;
	}

	const notificationToaster = (msg: string, type: 'success' | 'error') => toast[type](msg);

	const openModalCreateList = (idMovie: string | number) => {
		handleShow(String(idMovie));
	};

	if (fetchState.data) {
		return (
			<main>
				<h1>{fetchState.data.lists[0].name}</h1>
				<ul className='moviesGrid'>
					{movies.map((movie) => (
						<MovieCard
							key={movie.id}
							movie={movie}
							notificationToaster={notificationToaster}
							openModalCreateList={openModalCreateList}
						/>
					))}
				</ul>
				<Toaster />
				<ModalCreateList show={show} handleClose={handleClose} notificationToaster={notificationToaster} />
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
