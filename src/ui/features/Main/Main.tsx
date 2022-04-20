import { Navigate, Route, Routes } from 'react-router-dom';
import { Profile } from '../Profile/Profile';
import { Login } from '../Auth/Login/Login';
import { Page404 } from '../Page404/Page404';
import s from './Main.module.scss';
import CheckEmail from '../Auth/CheckEmail/CheckEmail';
import { ROUTES } from '../../../router/routes';
import { ForgotPassword } from '../Auth/ForgotPassword/ForgotPassword';
import { NewPassword } from '../Auth/NewPassword/NewPassword';
import { Cards } from '../Cards/Cards';
import { Decks } from '../Decks/Decks';
import { Registration } from '../Auth/Registration/Registration';


export const Main = () => {
	return (
		<div className={s.main}>
			<Routes>
				<Route path='/' element={<Profile />} />
				<Route path={ROUTES.PROFILE} element={<Profile />} />
				<Route path={ROUTES.PROFILE} element={<Profile />} />
				<Route path={`${ROUTES.CARDS}/:cardsPackId`} element={<Cards />} />
				<Route path={ROUTES.DECKS} element={<Decks />} />
				<Route path={ROUTES.LOGIN} element={<Login />} />
				<Route path={ROUTES.REG} element={<Registration />} />
				<Route path={ROUTES.FORGOT} element={<ForgotPassword />} />
				<Route path={ROUTES.NEW_PASS} element={<NewPassword />} />
				<Route path={`${ROUTES.NEW_PASS}/:token`} element={<NewPassword />} />
				<Route path={ROUTES.CHECK_EMAIL} element={<CheckEmail />} />
				<Route path={ROUTES.ERROR} element={<Page404 />} />
				<Route path='*' element={<Navigate to='/404' replace />} />
			</Routes></div>
	);
};

