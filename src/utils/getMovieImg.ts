export function getMovieImg(path: string, width: number) {
	return path ? `https://image.tmdb.org/t/p/w${width}${path}` : 'img/placeholder.jpg';
}
