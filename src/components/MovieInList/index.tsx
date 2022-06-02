import { Button } from 'react-bootstrap';
import { FaRegTrashAlt } from 'react-icons/fa';

import { Movie } from '../../interface/ApiMovies';

import { MovieCard } from '../MovieCard';

type Props = {
	movie: Movie;
	settings: boolean;
	notificationToaster: (msg: string, type: 'success' | 'error') => void;
	openModalCreateList: (idMovie: string | number) => void;
	removeMovie: (idMovie: string | number) => void;
};
const MovieInList = ({ movie, notificationToaster, openModalCreateList, settings, removeMovie }: Props) => {
	return (
		<div className='d-flex align-content-between flex-wrap'>
			<MovieCard
				key={movie.id}
				movie={movie}
				notificationToaster={notificationToaster}
				openModalCreateList={openModalCreateList}
			/>
			{settings && (
				<Button
					title='Remove movie'
					className='d-inline-block mt-3 w-100'
					onClick={() => removeMovie(movie.id as number)}
				>
					Remove movie <FaRegTrashAlt size={20} />
				</Button>
			)}
		</div>
	);
};

export default MovieInList;
