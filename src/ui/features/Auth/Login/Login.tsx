import React from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import commonS from './../CommonAuthStyles.module.scss';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../../bll/store';
import { ROUTES } from '../../../../router/routes';

export const Login = React.memo(() => {
	const isLoggedIn = useSelector<RootStateType, boolean>(state => state.auth.isLoggedIn);

	if (isLoggedIn) {
		return <Navigate to={ROUTES.PROFILE} />;
	}
	return (
		<>
			<h1 className={commonS.title}>It-incubator</h1>
			<p className={commonS.subtitle}>Sign In</p>
			<LoginForm />
			<p className={commonS.centeredText}>Don't have an account?</p>
			<NavLink to={ROUTES.REG} className={commonS.redirectLink}>Registration</NavLink>
		</>
	);
});


