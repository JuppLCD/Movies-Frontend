import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast';
import { FaEdit, FaRegSun, FaRegTrashAlt, FaTimes } from 'react-icons/fa';
import { Button, Container, Form } from 'react-bootstrap';

import useModal from '../hooks/useModal';
import { useAuth } from '../hooks/useAuth';

import { Spinner } from '../components/Spinner';
import ModalCreateList from '../components/ModalCreateList';
import MovieInList from '../components/MovieInList';

import { API_MOVIES, ENDPOINTS, KEY_API_MOVIES } from '../config';

import { UserMoviesList } from '../interface/ApiBackend';
import { Movie } from '../interface/ApiMovies';

import apiBackend from '../utils/apiBackend';
import { insertListIdEndpoint } from '../utils/insertListIdEndpoint';
import fetchList from '../utils/fetchList';

type SettingsPage = { open: boolean; name: string; editName: boolean };

const ListPage = () => {
	const navegate = useNavigate();
	const [movies, setMovies] = useState<Movie[]>([]);
	const [settings, setSettings] = useState<SettingsPage>({ open: false, name: '', editName: false });
	const { listId } = useParams();

	const { listUserModificate } = useAuth();
	const { show, handleClose, handleShow } = useModal();
	const fetchState = apiBackend<UserMoviesList>(insertListIdEndpoint(ENDPOINTS.getMoviesFromList, listId as string));

	useEffect(() => {
		if (fetchState.state === 'success' && fetchState.data !== null) {
			setSettings((prevState) => ({ ...prevState, name: (fetchState.data as UserMoviesList).lists[0].name }));
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

	if (fetchState.data !== null) {
		const notificationToaster = (msg: string, type: 'success' | 'error') => toast[type](msg);

		const openModalCreateList = (idMovie: string | number) => {
			handleShow(String(idMovie));
		};

		const deleteList = async () => {
			const data = await fetchList(ENDPOINTS.deleteList + listId);
			if ((data as { ok: true })?.ok) {
				notificationToaster('Se a eliminado la lista de reproduccion correctamente', 'success');
				navegate('/profile', { replace: true });
				listUserModificate();
			}
		};

		const removeMovie = async (movieId: number | string) => {
			const data = await fetchList(
				insertListIdEndpoint(ENDPOINTS.removeMovieFromList, listId as string) + String(movieId)
			);
			if ((data as { ok: true })?.ok) {
				notificationToaster('Se a eliminado la pelicula correctamente', 'success');
				setMovies((prevState) => {
					return prevState.filter((movie) => movie.id !== Number(movieId));
				});
			}
		};

		const renameList = async () => {
			const data = await fetchList(ENDPOINTS.updateList + String(listId), { name: settings.name });
			if ((data as { ok: true })?.ok) {
				notificationToaster('Se a cambiado el nombre correctamente', 'success');
				listUserModificate();
			}
		};

		return (
			<main className='py-2'>
				<Container fluid='md'>
					<div>
						{settings.open ? (
							<Button
								title='Close Settings'
								onClick={() => setSettings((prevState) => ({ ...prevState, open: false }))}
							>
								<FaTimes size={20} />
							</Button>
						) : (
							<Button title='Open Settings' onClick={() => setSettings((prevState) => ({ ...prevState, open: true }))}>
								<FaRegSun size={20} />
							</Button>
						)}
					</div>
					<section className='d-flex justify-content-between mt-2'>
						{settings.editName ? (
							<Form
								onSubmit={(e) => {
									e.preventDefault();
								}}
							>
								<Form.Control
									type='text'
									name='name'
									value={settings.name}
									onChange={(e) => {
										setSettings((prevState) => ({ ...prevState, name: e.target.value }));
									}}
								/>
								<Button type='submit' onClick={renameList}>
									Save
								</Button>
							</Form>
						) : (
							<h1>{settings.name}</h1>
						)}
						{settings.open && (
							<div>
								<Button
									title='Edit name'
									className='mx-1'
									onClick={() => {
										setSettings((prevState) => ({ ...prevState, editName: !prevState.editName }));
									}}
								>
									<FaEdit size={20} />
								</Button>
								<Button title='Delete List' onClick={deleteList}>
									<FaRegTrashAlt size={20} />
								</Button>
							</div>
						)}
					</section>
					<ul className='moviesGrid'>
						{movies.map((movie) => (
							<MovieInList
								key={movie.id}
								movie={movie}
								notificationToaster={notificationToaster}
								openModalCreateList={openModalCreateList}
								settings={settings.open}
								removeMovie={removeMovie}
							/>
						))}
					</ul>
					<Toaster />
					<ModalCreateList show={show} handleClose={handleClose} notificationToaster={notificationToaster} />
				</Container>
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
