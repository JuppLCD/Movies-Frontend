import { useState } from 'react';

const useModal = () => {
	const [show, setShow] = useState({ value: false, info: '' });

	const handleClose = () => setShow((prev) => ({ ...prev, value: false }));
	const handleShow = (info: string) => setShow({ info, value: true });

	return { show, handleClose, handleShow };
};

export default useModal;
