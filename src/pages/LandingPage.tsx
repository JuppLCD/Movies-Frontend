import { useSearchParams } from 'react-router-dom';

import { useDebounce } from '../hooks/useDebounce';

import { MoviesGrid } from '../components/MoviesGrid';
import { Search } from '../components/Search';

export function LandingPage() {
	const [query] = useSearchParams();
	const search = query.get('search');
	const debouncedSearch = useDebounce(search, 300);

	return (
		<main>
			<Search />
			<MoviesGrid key={debouncedSearch} search={debouncedSearch} />
		</main>
	);
}
