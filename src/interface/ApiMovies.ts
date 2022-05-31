export interface Movie {
	id?: number;
	title: string;
	overview: string;
	genres: [{ id: number; name: string }];
	poster_path: string;
}

export interface MoviesData {
	page: number;
	results: Movie[];
	total_pages: number;
}

export interface APIMovieImage {
	id: number;
	backdrops: {
		file_path: string;
		height: number;
		width: number;
	}[];
	posters: {
		file_path: string;
		height: number;
		width: number;
	}[];
}
