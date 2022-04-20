import checkEmailImg from './../../../../assets/images/check-email.png';
import s from '../CommonAuthStyles.module.scss';
import checkS from './CheckEmail.module.scss';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../../bll/store';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../../../router/routes';


const CheckEmail = () => {
	const isLoggedIn = useSelector<RootStateType, boolean>(state => state.auth.isLoggedIn);

	if (isLoggedIn) {
		return <Navigate to={ROUTES.PROFILE} />;
	}
	return (
		<>
			<h1 className={s.title}>It-incubator</h1>
			<div className={checkS.img}>
				<img src={checkEmailImg} alt='check-email-img' />
			</div>
			<p className={s.subtitle}>Check Email</p>
			<p className={s.centeredText}>We’ve sent an Email with instructions to your email address</p>
		</>
	);
};

export default CheckEmail;