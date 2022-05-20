import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { ObjectSchema } from 'joi';
import { useAuth } from './useAuth';

import { DataErrorBackend, ErrorFormDataUser, FormDataUser } from '../interface/ApiBackend';

const Initial_Error = { FormError: '', backend: '' };
const Initial_Form = { name: 'user2', password: '123', passwordConfirm: '' };

const useFormAuth = (FormOf: 'login' | 'singup') => {
	const [formData, setFormData] = useState<FormDataUser>(Initial_Form);
	const [error, setError] = useState<ErrorFormDataUser>(Initial_Error);
	const [isSubmit, setIsSubmit] = useState(false);

	const { signin, signup } = useAuth();

	useEffect(() => {
		(async () => {
			if (!error.FormError && isSubmit) {
				let error: DataErrorBackend | null;
				if (FormOf === 'login') {
					error = await signin(formData);
				} else {
					error = await signup(formData);
				}
				if (!!error) {
					setError((prevError) => {
						return { ...prevError, backend: error?.message ?? 'No se pudo conectar al servidor' };
					});
					setIsSubmit(false);
				}
			}
		})();
	}, [isSubmit]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;

		setFormData((prevFormData: FormDataUser) => {
			return {
				...prevFormData,
				[name]: value,
			};
		});
	};
	const handleSubmit = async (e: FormEvent<HTMLFormElement>, ShemaValidator: ObjectSchema<any>): Promise<void> => {
		e.preventDefault();
		try {
			const user = await ShemaValidator.validateAsync(formData, { abortEarly: false });
			setError((prevError): ErrorFormDataUser => {
				return { ...prevError, FormError: '' };
			});
			setIsSubmit(true);
		} catch (err: any) {
			setError((prevError): ErrorFormDataUser => {
				return { ...prevError, FormError: err.message as string };
			});
		}
	};

	return { formData, error, handleSubmit, handleChange };
};

export { useFormAuth };
