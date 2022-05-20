import { Link } from 'react-router-dom';
import { Button, Dropdown } from 'react-bootstrap';
import { FaHeart, FaList } from 'react-icons/fa';

import { getMovieImg } from '../../utils/getMovieImg';

// Types
import { Movie } from '../../interface/ApiMovies';

// Css
import styles from './MovieCard.module.css';

import { useAuth } from '../../hooks/useAuth';

export function MovieCard({ movie }: { movie: Movie }) {
	const imageUrl = getMovieImg(movie.poster_path, 300);

	// TODO En caso de que exista un usuario tengo que buscar las listas del mismo para luego agregalas en el Dropdown de 'Add to List'
	const { isAuth } = useAuth();

	function Stop(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
	}

	return (
		<li className={styles.movieCard}>
			<Link to={'/movies/' + movie.id} className={styles.imgBox}>
				<img width={230} height={345} className={styles.movieImage} src={imageUrl} alt={movie.title} />
			</Link>
			<div className={styles.movieInfo}>
				<p>
					<span className={styles.movieDescription}>Description: </span>
					<br /> <br /> {movie.overview.length <= 120 ? movie.overview : movie.overview.slice(0, 120) + '...'}
				</p>
				<p className='text-primary fs-5 fw-bolder text-decoration-underline'>More info</p>
				{isAuth && (
					<div className='d-flex justify-content-around mt-5'>
						<Button title='Like' onClick={Stop}>
							<FaHeart className='text-ligth' size={20} />
						</Button>
						<Dropdown onClick={Stop} title='Add to list'>
							<Dropdown.Toggle variant='success' id='dropdown-basic'>
								<FaList className='text-ligth' size={20} />
							</Dropdown.Toggle>
							{/* Traer Los Dropdown.Tiems por fetch */}
							<Dropdown.Menu>
								<Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
								<Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
								<Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</div>
				)}
			</div>
			<div>{movie.title}</div>
		</li>
	);
}
