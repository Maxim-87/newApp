import { useSelector } from 'react-redux';
import { RootStateType } from '../../../../bll/store';
import { IRegisterData } from '../../../../dal/api/auth-api';
import { RegistrationForm } from './RegistrationForm';

export type RegistrationValuesType = IRegisterData & { confirmPassword: string };

export const Registration = () => {
	const infoMsg = useSelector<RootStateType, string>(state => state.app.appInfo);
	const isLoading = useSelector<RootStateType, boolean>(state => state.app.isLoading);
	const registrationSuccess = useSelector<RootStateType, boolean>(state => state.registration.registrationSuccess);

	return <RegistrationForm isLoading={isLoading}
							 errorMsg={infoMsg}
							 registrationSuccess={registrationSuccess}
	/>;
};

