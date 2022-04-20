import { AlertMessage } from './AlertMessage';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootStateType } from '../../../bll/store';
import { setAppError, setAppInfo } from '../../../bll/app-reducer';

export const Alert = () => {
	const error = useSelector<RootStateType, boolean>(state => state.app.error);
	const info = useSelector<RootStateType, string>(state => state.app.appInfo);
	const dispatch = useDispatch();

	const onCloseHandler = useCallback(() => {
		dispatch(setAppError(false));
		dispatch(setAppInfo(''));
	}, [dispatch]);
	if (info === '') {
		return <></>;
	}
	return <AlertMessage text={info} onClose={onCloseHandler} error={error} />;
};
