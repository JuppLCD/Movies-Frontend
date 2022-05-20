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
