import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import commonS from '../../Auth/CommonAuthStyles.module.scss';
import { RootStateType } from '../../../../bll/store';
import SuperInputText from '../../../components/SuperInputText/SuperInputText';
import SuperButton from '../../../components/SuperButton/SuperButton';
import { createCard } from '../../../../bll/cards-reducer';

interface IAddCardForm {
	tabToggle?: () => void;
	packId: string | undefined;
}

export const AddCardForm = React.memo(({ tabToggle, packId }: IAddCardForm) => {
	const dispatch = useDispatch();
	const isLoading = useSelector<RootStateType, boolean>(state => state.app.isLoading);
	const formik = useFormik({
		initialValues: {
			question: '',
			answer: '',
		},
		validationSchema: Yup.object({
			question: Yup.string()
				.min(2, 'Too Short!')
				.max(25, 'Too Long!')
				.required('Required'),
			answer: Yup.string()
				.min(2, 'Too Short!')
				.max(25, 'Too Long!')
				.required('Required'),
		}),
		onSubmit: (values) => {
			dispatch(createCard(packId, values.question, values.answer));
			formik.resetForm();
			tabToggle && tabToggle();
		},
	});
	return (
		<>
			<form onSubmit={formik.handleSubmit} className={commonS.form}>
				<div className={commonS.formLine}>
					<SuperInputText
						id={'question'}
						type={'question'}
						{...formik.getFieldProps('question')}
						placeholder={' '}
					/>
					<label className={commonS.formLabel}>Question</label>
					{formik.touched.question && formik.errors.question ? (
						<div className={commonS.error}>{formik.errors.question}</div>
					) : null}
				</div>
				<div className={commonS.formLine}>
					<SuperInputText
						id={'answer'}
						type={'answer'}
						{...formik.getFieldProps('answer')}
						placeholder={' '}
					/>
					<label className={commonS.formLabel}>Answer</label>
					{formik.touched.answer && formik.errors.answer ? (
						<div className={commonS.error}>{formik.errors.answer}</div>
					) : null}
				</div>
				<SuperButton type={'submit'} disabled={isLoading}>Create</SuperButton>
			</form>
		</>
	);
});


