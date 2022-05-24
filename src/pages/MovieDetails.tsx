import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { useAuth } from '../hooks/useAuth';

import { getMovieImg } from '../utils/getMovieImg';
import apiMovies from '../utils/apiMovies';

import { Spinner } from '../components/Spinner';
import AddToList from '../components/AddToList';

// Types
import { Movie } from '../interface/ApiMovies';

// Css
import styles from './styles/MovieDetails.module.css';

export function MovieDetails() {
	const { isAuth } = useAuth();

	const { movieId } = useParams();
	const [movie, setMovie] = useState<Movie>();

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

	if (!!movie) {
		const imageUrl = getMovieImg(movie.poster_path, 500);
		return (
			<main className={styles.detailsContainer}>
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
					{isAuth && <AddToList idMovie={movie.id as number} />}
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
