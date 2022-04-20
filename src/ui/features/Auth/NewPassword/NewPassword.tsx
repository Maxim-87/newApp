import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import SuperInputText from '../../../components/SuperInputText/SuperInputText';
import SuperButton from '../../../components/SuperButton/SuperButton';
import s from '../CommonAuthStyles.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import commonS from './../CommonAuthStyles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { sendNewUserPassword } from '../../../../bll/new-pass-reducer';
import { RootStateType } from '../../../../bll/store';
import { ROUTES } from '../../../../router/routes';


type PropsType = {};

export const NewPassword = React.memo(({}: PropsType) => {
	const { token } = useParams();
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const onNewPasswordHandler = (password: string) => {
		dispatch(sendNewUserPassword(password, token));
		setTimeout( () => {
			navigate('/profile');
		}, 1000 );
	};


	const formik = useFormik({
		initialValues: {
			password: ''
		},
		validationSchema: Yup.object({
			password: Yup.string()
				.min(8, 'Must be at least 8 characters long')
				.required('This field is required'),
		}),
		onSubmit: (values) => {
			onNewPasswordHandler(values.password);
			formik.resetForm();
		},
	});
	const isLoggedIn = useSelector<RootStateType, boolean>(state => state.auth.isLoggedIn);

	if (isLoggedIn) {
		return <Navigate to={ROUTES.PROFILE} />;
	}
	return (
		<>
			<h1 className={commonS.title}>It-incubator</h1>
			<p className={commonS.subtitle}>Create new password</p>
			<form onSubmit={formik.handleSubmit} className={commonS.form}>
				<div className={s.formLine}>
					<SuperInputText
						id={'password'}
						type={'password'}
						{...formik.getFieldProps('password')}
						placeholder={' '}
					/>
					<label className={commonS.formLabel}>Password</label>
					{formik.touched.password && formik.errors.password ? (
						<div className={commonS.error}>{formik.errors.password}</div>
					) : null}
				</div>
				<p className={commonS.baselineText}>Create new password and we will send you further instructions to email</p>
				<SuperButton type={'submit'}>Create new password</SuperButton>
			</form>
		</>
	);
});

