import { Button, Dropdown } from 'react-bootstrap';
import { FaHeart, FaList } from 'react-icons/fa';

import { useAuth } from '../../hooks/useAuth';

import { ENDPOINTS } from '../../config';

import { DataErrorBackend } from '../../interface/ApiBackend';

import fetchList from '../../utils/fetchList';
import { insertListIdEndpoint } from '../../utils/insertListIdEndpoint';

type Props = {
	idMovie: string | number;
	openModalCreateList: (idMovie: string | number) => void;
	notificationToaster: (msg: string, type: 'success' | 'error') => void;
};

const AddToList = ({ idMovie, openModalCreateList, notificationToaster }: Props) => {
	const { listsUser } = useAuth();
	// TODO: Colocar z-index Dropdown.Menu para estar por ensima de las imagenes

	function stopPropagation(
		e: React.MouseEvent<HTMLButtonElement>,
		callback: (e: React.MouseEvent<HTMLButtonElement>) => void
	) {
		e.preventDefault();
		return callback(e);
	}

	async function addToList(e: React.MouseEvent<HTMLButtonElement>) {
		let elementHTML = e.target as HTMLInputElement;

		if (elementHTML.nodeName === 'path' || elementHTML.nodeName === 'svg') {
			elementHTML =
				elementHTML.nodeName === 'path'
					? (elementHTML.parentNode?.parentNode as HTMLInputElement)
					: (elementHTML.parentNode as HTMLInputElement);
		}

		const isButtonCreateList = !!elementHTML.dataset?.listCreate;

		const nameList = elementHTML.dataset?.listButton;
		const listId = elementHTML.dataset?.listId;

		if (!nameList && !listId && !isButtonCreateList) {
			return;
		}

		if (isButtonCreateList) {
			openModalCreateList(idMovie);
		}

		if (nameList && listId) {
			// * ESTE CODIGO SE REPITE EN EL COMPONENTE ModelCreateList, EL CUAL ES PARA AGREGAR UNA PELICULA A UNA LISTA
			const data = await fetchList<null | DataErrorBackend>(
				insertListIdEndpoint(ENDPOINTS.addMovieFromList, listId) + String(idMovie)
			);

			if (!!(data as { ok: boolean })?.ok) {
				notificationToaster('Se agrego correctamente', 'success');
			} else if (!!(data as DataErrorBackend)?.error) {
				notificationToaster('No se pudo agregar la pelicula a la lista', 'error');
			}
		}
	}
	if (!listsUser) {
		return <></>;
	}
	const listLike = listsUser.lists.find((list) => list.name === 'Likes');
	const lists = listsUser.lists.filter((list) => list.name !== 'Likes');
	return (
		<div className='d-flex justify-content-around mt-5'>
			<Button
				title='Like'
				data-list-button='Like'
				data-list-id={(listLike as { name: string; id: number }).id}
				onClick={(e: React.MouseEvent<HTMLButtonElement>) => stopPropagation(e, addToList)}
			>
				<FaHeart className='text-ligth' size={20} />
			</Button>

			<Dropdown onClick={(e: React.MouseEvent<HTMLButtonElement>) => stopPropagation(e, addToList)} title='Add to list'>
				<Dropdown.Toggle variant='success' id='dropdown-basic'>
					<FaList className='text-ligth' size={20} />
				</Dropdown.Toggle>
				<Dropdown.Menu>
					<Dropdown.Item data-list-create='Create_List'>Create List</Dropdown.Item>
					{lists.length !== 0 && (
						<>
							{lists.map((list) => (
								<Dropdown.Item key={list.id} data-list-button={list.name} data-list-id={list.id}>
									{list.name}
								</Dropdown.Item>
							))}
						</>
					)}
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
};

export default AddToList;
