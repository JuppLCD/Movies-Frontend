import { Button, Dropdown } from 'react-bootstrap';
import { FaHeart, FaList } from 'react-icons/fa';

import { useAuth } from '../../hooks/useAuth';

import { ENDPOINTS } from '../../config';

import { DataErrorBackend } from '../../interface/ApiBackend';

import fetchList from '../../utils/fetchList';
import { insertListIdEndpoint } from '../../utils/insertListIdEndpoint';

import styles from './AddToList.module.css';

type Props = {
	idMovie: string | number;
	openModalCreateList: (idMovie: string | number) => void;
	notificationToaster: (msg: string, type: 'success' | 'error') => void;
	drop?: 'up' | 'start' | 'end' | 'down';
};

const AddToList = ({ idMovie, openModalCreateList, notificationToaster, drop = 'down' }: Props) => {
	const { listsUser } = useAuth();

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
			{listLike?.id && (
				<Button
					title='Like'
					data-list-button='Like'
					data-list-id={(listLike as { name: string; id: number }).id}
					onClick={(e: React.MouseEvent<HTMLButtonElement>) => stopPropagation(e, addToList)}
				>
					<FaHeart className='text-ligth' size={20} />
				</Button>
			)}

			<Dropdown
				onClick={(e: React.MouseEvent<HTMLButtonElement>) => stopPropagation(e, addToList)}
				title='Add to list'
				drop={drop}
			>
				<Dropdown.Toggle variant='success' id='dropdown-basic'>
					<FaList className='text-ligth' size={20} />
				</Dropdown.Toggle>
				<Dropdown.Menu className={styles.DropdownMenu}>
					<Dropdown.Item data-list-create='Create_List' as={Button}>
						Create List
					</Dropdown.Item>
					<Dropdown.Divider />
					{lists.length !== 0 && (
						<>
							{lists.map((list) => (
								<Dropdown.Item as={Button} key={list.id} data-list-button={list.name} data-list-id={list.id}>
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
