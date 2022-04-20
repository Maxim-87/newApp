import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import commonS from '../../Auth/CommonAuthStyles.module.scss';
import { RootStateType } from '../../../../bll/store';
import { postDeck } from '../../../../bll/decks-reducer';
import SuperInputText from '../../../components/SuperInputText/SuperInputText';
import SuperButton from '../../../components/SuperButton/SuperButton';

interface IAddDeckForm {
	tabToggle: () => void;
}

export const AddDeckForm = React.memo(({tabToggle}: IAddDeckForm) => {
	const dispatch = useDispatch();
	const isLoading = useSelector<RootStateType, boolean>(state => state.app.isLoading);
	const formik = useFormik({
		initialValues: {
			name: '',
		},
		validationSchema: Yup.object({
			name: Yup.string()
				.min(2, 'Too Short!')
				.max(25, 'Too Long!')
				.required('Required')
		}),
		onSubmit: (values) => {
			dispatch(postDeck({ cardsPack: values }));
			formik.resetForm();
			tabToggle();
		},
	});
	return (
		<>
			<form onSubmit={formik.handleSubmit} className={commonS.form}>
				<div className={commonS.formLine}>
					<SuperInputText
						id={'name'}
						type={'name'}
						{...formik.getFieldProps('name')}
						placeholder={' '}
					/>
					<label className={commonS.formLabel}>Name</label>
					{formik.touched.name && formik.errors.name ? (
						<div className={commonS.error}>{formik.errors.name}</div>
					) : null}
				</div>
				<SuperButton type={'submit'} disabled={isLoading}>Create</SuperButton>
			</form>
		</>
	);
});


