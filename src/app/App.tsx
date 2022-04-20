import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../bll/store';
import { Header } from '../ui/features/Header/Header';
import { Main } from '../ui/features/Main/Main';
import { useEffect } from 'react';
import { initializeApp } from '../bll/app-reducer';
import { Alert } from '../ui/components/Alert/Alert';
import s from './App.module.scss';

function App() {
	const dispatch = useDispatch();
	const isInitialized = useSelector<RootStateType, boolean>(
		(state) => state.app.isInitialized,
	);
	useEffect(() => {
		dispatch(initializeApp());
	}, [dispatch]);

	if (!isInitialized) {
		return (
			<div>
				LOADING...
			</div>
		);
	}

	return (
		<div className={s.app}>
			<Header />
			<Alert />
			<Main />
		</div>
	);
}

export default App;
