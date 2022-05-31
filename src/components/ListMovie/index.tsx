import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { APIMovieImage } from '../../interface/ApiMovies';

import apiMovies from '../../utils/apiMovies';
import { getMovieImg } from '../../utils/getMovieImg';

import styles from './ListMovie.module.css';

type Props = {
	list: {
		name: string;
		id: string;
		movies: [number];
	};
};

// TODO: Este compoenente LIST debe ser un link, que redireccione a la pagina de ListPage, donde se puede ver las peliculas agregadas, editar el nombre de la lista (posiblemente crear una descripcion) y eliminar peliculas de la lista.

const ListMovie = ({ list }: Props) => {
	const [movieImage, setMovieImage] = useState('');
	const fetchState = apiMovies<APIMovieImage>('/movie/' + list.movies[list.movies.length - 1] + '/images');

	useEffect(() => {
		if (fetchState.state === 'success' && fetchState.data !== null) {
			setMovieImage(getMovieImg((fetchState.data as APIMovieImage).posters[0].file_path, 300));
		}
	}, [fetchState]);

	return (
		<section className={styles.listCard} title={list.name}>
			<Link to={`/list/${list.id}`} className={styles.listLink}>
				<div className={styles.imgBox}>
					<p className={styles.listLength}>Movies: ({list.movies.length})</p>
					<img
						src={movieImage === '' ? 'img/placeholder.jpg' : movieImage}
						alt={`movie list ${list.name}`}
						className={styles.listImage}
					/>
				</div>
			</Link>
			<h4>{list.name.length > 30 ? list.name.slice(0, 30) + '...' : list.name}</h4>
		</section>
	);
};

export default ListMovie;
