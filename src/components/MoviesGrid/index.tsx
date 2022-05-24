import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Spinner } from '../Spinner';
import { Empty } from '../Empty';
import { MovieCard } from '../MovieCard';

// Types
import { Movie, MoviesData } from '../../interface/ApiMovies';

// Css
import styles from './MoviesGrid.module.css';

import apiMovies from '../../utils/apiMovies';

export function MoviesGrid({ search }: { search: string }) {
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [movies, setMovies] = useState<Movie[]>([]);

	const fetchState = apiMovies<MoviesData>(
		search ? `/search/movie?query=${search}&page=${page}` : `/discover/movie?page=${page}`
	);

	useEffect(() => {
		if (fetchState.state === 'success' && !!fetchState.data) {
			setMovies((prevMovies) => {
				if (page === 1 && prevMovies.length !== 0) {
					return prevMovies;
				} else {
					const data = fetchState.data?.results as Movie[];
					return [...prevMovies].concat(data);
				}
			});
			setHasMore(fetchState.data.page < fetchState.data.total_pages);
		}
	}, [fetchState]);

	if ((fetchState.state === 'loading' || fetchState.state === 'idle') && page === 1) {
		return <Spinner />;
	}
	if (movies.length === 0) {
		return <Empty />;
	}
	if (fetchState.state === 'error' || fetchState.error) {
		return <p>Error al conectarce con el servidor</p>;
	}

	return (
		<InfiniteScroll
			dataLength={movies.length}
			hasMore={hasMore}
			next={() => setPage((prevPage) => prevPage + 1)}
			loader={<Spinner />}
		>
			<ul className={styles.moviesGrid}>
				{movies.map((movie) => (
					<MovieCard key={movie.id} movie={movie} />
				))}
			</ul>
		</InfiniteScroll>
	);
}
