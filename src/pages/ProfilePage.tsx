import { useEffect, useState } from 'react';

import { useAuth } from '../hooks/useAuth';

import { FaRegSun, FaTimes } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { Button, Container } from 'react-bootstrap';

import { ENDPOINTS } from '../config/index';

import { Spinner } from '../components/Spinner';
import ListMovie from '../components/ListMovie';

import { UserMoviesList } from '../interface/ApiBackend';

import apiBackend from '../utils/apiBackend';
import fetchList from '../utils/fetchList';

type List = {
	name: string;
	id: string;
	movies: [number];
};

const ProfilePage = () => {
	const fetchState = apiBackend<UserMoviesList>(ENDPOINTS.info);
	const { listUserModificate, listsUser } = useAuth();

	const [lists, setLists] = useState<List[]>([]);
	const [settings, setSettings] = useState(false);

	useEffect(() => {
		if (fetchState.state === 'success' && fetchState.data !== null) {
			setLists(fetchState.data.lists);
		}
	}, [fetchState]);

	if (fetchState.data === null || fetchState.state === 'loading' || fetchState.state === 'idle') {
		return <Spinner />;
	}

	if (fetchState.state === 'error') {
		return <p>{fetchState.error?.message}</p>;
	}

	const notificationToaster = (msg: string, type: 'success' | 'error') => toast[type](msg);

	const deleteList = async (listId: string | number) => {
		const data = await fetchList(ENDPOINTS.deleteList + listId);
		if ((data as { ok: true })?.ok) {
			notificationToaster('Se a eliminado la lista de reproduccion correctamente', 'success');
			setLists((prevState) => prevState.filter((list) => String(list.id) !== String(listId)));
			listUserModificate();
		}
	};
	return (
		<main>
			<Container fluid='md' className='py-2'>
				<div>
					{settings ? (
						<Button title='Close Settings' onClick={() => setSettings(false)}>
							<FaTimes size={20} />
						</Button>
					) : (
						<Button title='Open Settings' onClick={() => setSettings(true)}>
							<FaRegSun size={20} />
						</Button>
					)}
				</div>
				<h1>{fetchState.data.name}</h1>
				{lists.length > 0 && (
					<ul className='moviesGrid'>
						{lists.map((list) => (
							<ListMovie key={list.id} list={list} deleteList={deleteList} settings={settings} />
						))}
					</ul>
				)}
				<Toaster />
			</Container>
		</main>
	);
};

export default ProfilePage;
