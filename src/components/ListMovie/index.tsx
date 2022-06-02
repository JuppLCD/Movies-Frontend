import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaRegTrashAlt } from 'react-icons/fa';
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
	settings: boolean;
	deleteList: (listId: string | number) => void;
};

const ListMovie = ({ list, deleteList, settings }: Props) => {
	const [movieImage, setMovieImage] = useState('img/placeholder.jpg');

	// ! Solucionar el problema de hacer la peticion siendo list.movies[list.movies.length - 1] === undefined
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
					<img src={movieImage} alt={`movie list ${list.name}`} className={styles.listImage} />
				</div>
			</Link>
			<h4>{list.name.length > 30 ? list.name.slice(0, 30) + '...' : list.name}</h4>
			{settings && (
				<Button
					title='Remove movie'
					className='d-inline-block mt-3 w-100'
					onClick={() => deleteList(list.id as string)}
				>
					Remove movie <FaRegTrashAlt size={20} />
				</Button>
			)}
		</section>
	);
};

export default ListMovie;
