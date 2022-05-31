import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';

import { useAuth } from '../hooks/useAuth';
import useModal from '../hooks/useModal';

import { getMovieImg } from '../utils/getMovieImg';
import apiMovies from '../utils/apiMovies';

import { Spinner } from '../components/Spinner';
import AddToList from '../components/AddToList';
import ModalCreateList from '../components/ModalCreateList';

// Types
import { Movie } from '../interface/ApiMovies';

// Css
import styles from './styles/MovieDetails.module.css';

export default function MovieDetails() {
	const [movie, setMovie] = useState<Movie>();
	const { show, handleClose, handleShow } = useModal();
	const { isAuth } = useAuth();

	const { movieId } = useParams();

	const fetchState = apiMovies<Movie>('/movie/' + movieId);

	useEffect(() => {
		setMovie(fetchState.data as Movie);
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
	if (!!movie) {
		const imageUrl = getMovieImg(movie.poster_path, 500);
		return (
			<main className={styles.detailsContainer}>
				<Toaster />
				<ModalCreateList show={show} handleClose={handleClose} notificationToaster={notificationToaster} />
				<img className={`${styles.col} ${styles.movieImage}`} src={imageUrl} alt={movie.title} />
				<div className={`${styles.col} ${styles.movieDetails}`}>
					<p className={styles.firstItem}>
						<strong>Title:</strong> {movie.title}
					</p>
					<p>
						<strong>Genres:</strong> {movie.genres.map((genre) => genre.name).join(', ')}
					</p>
					<p>
						<strong>Description:</strong> {movie.overview}
					</p>
					{isAuth && (
						<AddToList
							idMovie={movie.id as number}
							notificationToaster={notificationToaster}
							openModalCreateList={openModalCreateList}
							drop='up'
						/>
					)}
				</div>
			</main>
		);
	} else {
		return (
			<main>
				<p className='text-center my-auto'>No se pudo cargar la pagina</p>
			</main>
		);
	}
}
