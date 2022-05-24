import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Hooks
import { useFormAuth } from '../../hooks/useFormAuth';

// Shema Validation
import { FormLoginSchema } from '../../utils/schema/FormLoginSchema';
import { FormRegisterSchema } from '../../utils/schema/FormRegisterSchema';

import styles from './FormUser.module.css';

const FormUser = ({ type }: { type: 'login' | 'singup' }) => {
	const { formData, error, handleSubmit, handleChange } = useFormAuth(type);

	const SchemaValidator = type === 'login' ? FormLoginSchema : FormRegisterSchema;

	return (
		<main className={styles.main}>
			<Form className={styles.form} onSubmit={(e) => handleSubmit(e, SchemaValidator)}>
				<h2>{type === 'login' ? 'Log In' : 'Sing Up'}</h2>
				{!!error.FormError && <p className='bg-danger text-center p-2 text-white'>{error.FormError}</p>}
				{!!error.backend && <p className='bg-warning text-center p-2 text-white'>{error.backend}</p>}

				<Form.Group className='mb-3'>
					<Form.Label htmlFor='usernameInput'>Usuario:</Form.Label>
					<Form.Control
						id='usernameInput'
						type='text'
						name='name'
						value={formData.name}
						onChange={handleChange}
						placeholder='Username'
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Label htmlFor='passwordInput'>Contraseña:</Form.Label>
					<Form.Control
						id='passwordInput'
						autoComplete='off'
						type='password'
						name='password'
						value={formData.password}
						onChange={handleChange}
						placeholder='*******'
					/>
				</Form.Group>
				{type === 'singup' && (
					<Form.Group className='mb-3'>
						<Form.Label htmlFor='passwordConfirm'>Confirmar Contraseña:</Form.Label>
						<Form.Control
							id='passwordConfirm'
							autoComplete='off'
							type='password'
							name='passwordConfirm'
							value={formData.passwordConfirm}
							onChange={handleChange}
							placeholder='*******'
						/>
					</Form.Group>
				)}

				<Button variant='primary' className='d-block w-100' type='submit'>
					{type === 'login' ? 'Login' : 'Singup'}
				</Button>

				<div>
					<Link to={`/user/${type === 'singup' ? 'login' : 'singup'}`} className='d-inline-block my-3'>
						{type === 'singup' ? 'Login' : 'Singup'}
					</Link>
				</div>
			</Form>
		</main>
	);
};

export default FormUser;
