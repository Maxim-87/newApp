import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.scss';
import { logoutTC } from '../../../bll/auth-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../../bll/store';
import { ROUTES } from '../../../router/routes';

type NavListType = Array<{ title: string, to: string }>;

export const Header = React.memo(() => {

	const dispatch = useDispatch();

	const isLoggedIn = useSelector<RootStateType, boolean>(state => state.auth.isLoggedIn);

	const navList: NavListType = [
		{ title: 'Profile', to: ROUTES.PROFILE },
		{ title: 'Decks', to: ROUTES.DECKS },
	];
	const mappedNavList = navList.map((m, key) => {
		return <li key={key}>
			<NavLink to={m.to} className={({ isActive }) => isActive ? s.active : ''}>
				{m.title}
			</NavLink>
		</li>;
	});

	const logoutHandler = useCallback(() => {
		dispatch(logoutTC());
	}, []);

	if (!isLoggedIn) {
		return (
			<header className={s.headerBlock}>

			</header>
		);
	}

	return (
		<header className={s.headerBlock}>
			<nav className={s.navBlock}>
				<ul>
					{mappedNavList}
				</ul>
			</nav>
			<div>
				{isLoggedIn && <button className={s.button} onClick={logoutHandler}>Logout</button>}
			</div>
		</header>
	);
});


