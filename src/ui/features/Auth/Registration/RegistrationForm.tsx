import React from 'react';
import s from './Registration.module.scss';
import commonS from './../CommonAuthStyles.module.scss';
import SuperInputText from '../../../components/SuperInputText/SuperInputText';
import SuperButton from '../../../components/SuperButton/SuperButton';
import { Navigate, NavLink } from 'react-router-dom';
import { Loader } from '../../../components/Loader/Loader';
import { ROUTES } from '../../../../router/routes';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../../../bll/store';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { register } from '../../../../bll/registration-reducer';

type PropsType = {
	isLoading: boolean
	errorMsg: string | null
	registrationSuccess: boolean
};

export const RegistrationForm = React.memo(({
												isLoading,
												errorMsg,
												registrationSuccess,
											}: PropsType) => {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector<RootStateType, boolean>(state => state.auth.isLoggedIn);

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
		validationSchema: Yup.object({
			email: Yup.string().email('Please enter valid email address.').required('Please enter your email'),
			password: Yup.string()
				.min(8, 'Password must be more than 7 characters.')
				.required('Please Enter your password')
				.matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
					'Must Contain 8 characters, one uppercase, one lowercase, one number and one special case character'),
			confirmPassword: Yup.string()
				.oneOf([Yup.ref('password'), null], 'Please make sure your passwords match'),
		}),
		onSubmit: values => {
			dispatch(register(values));
			formik.resetForm();
		},
	});
	if (registrationSuccess) {
		return <Navigate to={ROUTES.LOGIN} />;
	}

	if (isLoggedIn) {
		return <Navigate to={ROUTES.PROFILE} />;
	}
	return (
		<>
			<h2 className={commonS.title}>Learning Cards</h2>
			{isLoading && <Loader />}
			<p className={commonS.subtitle}>Sign Up</p>
			<p className={s.errorMsg}>{errorMsg}</p>
			<div className={commonS.form}>
				<form onSubmit={formik.handleSubmit} className={s.form}>
					<div className={commonS.formLine}>
						<SuperInputText type={'email'}
										autoFocus
										autoComplete='user-email'
										placeholder={' '}
										{...formik.getFieldProps('email')} />
						<label className={commonS.formLabel} htmlFor='name'>Email</label>
						{formik.touched.email && formik.errors.email ? (
							<div className={commonS.error}>{formik.errors.email}</div>
						) : null}
					</div>

					<div className={commonS.formLine}>
						<SuperInputText type='password'
										autoComplete='new-password'
										placeholder={' '}
										{...formik.getFieldProps('password')} />
						<label className={commonS.formLabel} htmlFor='password'>Password</label>
						{formik.touched.password && formik.errors.password ? (
							<div className={commonS.error}>{formik.errors.password}</div>
						) : null}
					</div>
					<div className={commonS.formLine}>
						<SuperInputText type='password'
										autoComplete='new-password'
										placeholder={' '}
										{...formik.getFieldProps('confirmPassword')} />
						<label className={commonS.formLabel} htmlFor='password'>Confirm password</label>
						{formik.touched.confirmPassword && formik.errors.confirmPassword ? (
							<div className={commonS.error}>{formik.errors.confirmPassword}</div>
						) : null}
					</div>
					<div className={s.btnBlock}>
						<SuperButton type='submit' disabled={isLoading}>Register</SuperButton>
					</div>
				</form>
			</div>
			<p className={commonS.centeredText}>Already a member?</p>
			<NavLink className={commonS.redirectLink} to='/login'>Sign In</NavLink>
		</>
	);
});

