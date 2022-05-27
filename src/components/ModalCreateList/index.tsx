import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { ENDPOINTS } from '../../config';
import { useAuth } from '../../hooks/useAuth';
import { DataErrorBackend } from '../../interface/ApiBackend';
import fetchList from '../../utils/fetchList';
import { insertListIdEndpoint } from '../../utils/insertListIdEndpoint';
import { Spinner } from '../Spinner';

type Props = {
	show: { value: boolean; info: string };
	handleClose: () => void;
	notificationToaster: (msg: string, type: 'success' | 'error') => void;
};

export default function ModalCreateList({ show, handleClose, notificationToaster }: Props) {
	const [formCreteList, setFormCreteList] = useState({ input: '', loading: false });
	const { listUserModificate } = useAuth();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormCreteList((prevState) => ({ ...prevState, input: e.target.value }));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormCreteList((prevState) => ({ ...prevState, loading: true }));

		if (formCreteList.input.trim() === '') {
			notificationToaster('El nombre no puede estar vacio, no se ha creado la lista', 'error');
			setFormCreteList((prevState) => ({ ...prevState, loading: false }));
			return;
		}

		try {
			const data = await fetchList<{ listId: string | number } | DataErrorBackend>(ENDPOINTS.createList, {
				name: formCreteList.input,
			});
			const listId = (data as { listId: string | number })?.listId;

			if (!!listId) {
				notificationToaster('Se creo la lista - ' + formCreteList.input, 'success');
				listUserModificate();

				// * ESTE CODIGO SE REPITE EN EL COMPONENTE AddToList, EL CUAL ES PARA AGREGAR UNA PELICULA A UNA LISTA
				const data = await fetchList<null | DataErrorBackend>(
					insertListIdEndpoint(ENDPOINTS.addMovieFromList, listId) + show.info
				);
				setFormCreteList((prevState) => ({ ...prevState, loading: false }));

				if (!!(data as { ok: boolean })?.ok) {
					notificationToaster('Se agrego correctamente', 'success');
				} else if (!!(data as DataErrorBackend)?.error) {
					notificationToaster('No se pudo agregar la pelicula a la lista', 'error');
				}
			} else if (!!(data as DataErrorBackend)?.error) {
				notificationToaster('No se pudo crear la lista - ' + formCreteList.input, 'error');
			}
			handleClose();
			setFormCreteList((prevState) => ({ ...prevState, input: '' }));
		} catch (err) {
			console.error(err);
			notificationToaster('No se pudo crear realizar la accion', 'error');
			setFormCreteList((prevState) => ({ ...prevState, input: '' }));
		}
	};

	return (
		<>
			<Modal show={show.value} onHide={handleClose}>
				<Form onSubmit={handleSubmit} className='bg-dark text-white'>
					<Modal.Header closeButton>
						<Modal.Title>Create a new list</Modal.Title>
					</Modal.Header>
					{formCreteList.loading ? (
						<Spinner />
					) : (
						<Modal.Body>
							<Form.Control
								type='text'
								name='name'
								value={formCreteList.input}
								onChange={handleChange}
								placeholder='Name of new list'
							/>
						</Modal.Body>
					)}
					<Modal.Footer>
						<Button variant='light' type='button' onClick={handleClose}>
							Close
						</Button>
						<Button variant='warning' type='submit'>
							Create List
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
}
