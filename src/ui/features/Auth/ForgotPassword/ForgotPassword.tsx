import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import SuperInputText from '../../../components/SuperInputText/SuperInputText';
import SuperButton from '../../../components/SuperButton/SuperButton';
import s from '../CommonAuthStyles.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../../../bll/store';
import { ROUTES } from '../../../../router/routes';
import { sendUserEmail } from '../../../../bll/forgot-pass-reducer';


type PropsType = {};

export const ForgotPassword = React.memo(({}: PropsType) => {

	const isLoggedIn = useSelector<RootStateType, boolean>(state => state.auth.isLoggedIn);
	if (isLoggedIn) {
		return <Navigate to={ROUTES.PROFILE} />;
	}

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onRecoverPW = ((email: string) => {
		dispatch(sendUserEmail(email));
		navigate('/check-email');
	});


	const formik = useFormik({
		initialValues: {
			email: ''
		},
		validationSchema: Yup.object({
			email: Yup.string().email('Invalid email address').required('This field is required'),
		}),
		onSubmit: (values) => {
			onRecoverPW(values.email);
			formik.resetForm();
		},
	});


	return (
		<>
			<h1 className={s.title}>It-incubator</h1>
			<p className={s.subtitle}>Forgot your password?</p>
			<form onSubmit={formik.handleSubmit} className={s.form}>
				<div className={s.formLine}>
					<SuperInputText
						id={'email'}
						type={'email'}
						{...formik.getFieldProps('email')}
						placeholder={' '}
					/>
					<label className={s.formLabel}>Email</label>
					{formik.touched.email && formik.errors.email ? (
						<div className={s.error}>{formik.errors.email}</div>
					) : null}
				</div>
				<p className={s.baselineText}>Enter your email address and we will send you further instructions </p>
				<SuperButton type={'submit'}>Send Instructions</SuperButton>
			</form>
			<p className={s.centeredText}>Did you remember your password?</p>
			<Link to={'/login'} className={s.redirectLink}>Try logging in</Link>
		</>
	);
});

