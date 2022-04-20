import { useCallback, useEffect, useState } from 'react';
import s from './AlertMessage.module.scss';

type PropsType = {
	error: boolean
	text: string | null
	onClose: () => void
};

export const AlertMessage = ({ text, onClose, error }: PropsType) => {
	const [isOpen, setIsOpen] = useState<boolean>(error || !!text);

	const closeAlert = useCallback(() => {
		setIsOpen(false);
		onClose();
	}, [onClose, isOpen]);

	useEffect(() => {
		setIsOpen(error || !!text);
		const timeoutID = setTimeout(() => {
			closeAlert();
		}, 5000);

		return () => clearTimeout(timeoutID);
	}, [closeAlert, setIsOpen, error, text]);

	return (
		<>
			{isOpen &&
			<div className={`${s.container} ${error && s.error}`}>
				<div>{text}</div>
				<span onClick={closeAlert}>X</span>
			</div>}
		</>
	);
};