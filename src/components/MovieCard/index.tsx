import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

import { getMovieImg } from '../../utils/getMovieImg';

import AddToList from '../AddToList';
// Types
import { Movie } from '../../interface/ApiMovies';

// Css
import styles from './MovieCard.module.css';
import { Button } from 'react-bootstrap';

type Props = {
	movie: Movie;
	notificationToaster: (msg: string, type: 'success' | 'error') => void;
	openModalCreateList: (idMovie: string | number) => void;
};

export function MovieCard({ movie, notificationToaster, openModalCreateList }: Props) {
	const { isAuth } = useAuth();
	const imageUrl = getMovieImg(movie.poster_path, 300);

	return (
		<li className={styles.movieCard}>
			<Link to={'/movies/' + movie.id} className={styles.movieLink}>
				<div className={styles.imgBox}>
					<img width={230} height={345} className={styles.movieImage} src={imageUrl} alt={movie.title} />
				</div>

				<div className={styles.movieInfo}>
					<p>
						<span className={styles.movieDescription}>Description: </span>
						<br /> <br /> {movie.overview.length <= 120 ? movie.overview : movie.overview.slice(0, 120) + '...'}
					</p>
					<p className='text-primary fs-5 fw-bolder text-decoration-underline'>More info</p>

					{isAuth && (
						<AddToList
							idMovie={movie.id as number}
							notificationToaster={notificationToaster}
							openModalCreateList={openModalCreateList}
						/>
					)}
				</div>
			</Link>
			<div className='text-center'>{movie.title}</div>
		</li>
	);
}
