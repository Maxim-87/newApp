import { authApi, IRegisterData } from '../dal/api/auth-api';
import { setAppError, setAppInfo, setAppIsLoading, SetAppStatusActionType } from './app-reducer';
import { ThunkType } from './store';

const initialState = {
	registrationSuccess: false,
};

export const registrationReducer = (state: RegistrationStateType = initialState,
									action: RegistrationActionsType): RegistrationStateType => {
	switch (action.type) {
		case REGISTRATION_ACTIONS.SET_REGISTRATION_SUCCESS:
			return { ...state, registrationSuccess: action.payload.status };
		default:
			return state;
	}
};

// Actions  
export const setRegistrationSuccess = (status: boolean) => {
	return { type: REGISTRATION_ACTIONS.SET_REGISTRATION_SUCCESS, payload: { status } } as const;
};

// Thunk 
export const register = (registrationData: IRegisterData): ThunkType => async dispatch => {
	try {
		dispatch(setAppIsLoading(true));
		const res = await authApi.register(registrationData);
		console.log(res.data);
		dispatch(setRegistrationSuccess(true));
		dispatch(setAppInfo('Congratulations! Your registration is confirmed.'));
	} catch (e:any) {
		console.log((e as Error).message);
		dispatch(setAppError(e.response ? e.response.data.error : e)); //1234567gT
	} finally {
		dispatch(setAppIsLoading(false));
		dispatch(setRegistrationSuccess(false));
	}
};

// Types
export enum REGISTRATION_ACTIONS {
	SET_REGISTRATION_SUCCESS = 'REGISTRATION/SET-REGISTRATION-SUCCESS'
}

export type SetRegistrationSuccessActionType = ReturnType<typeof setRegistrationSuccess>;
export type RegistrationActionsType = | SetRegistrationSuccessActionType | SetAppStatusActionType;
export type RegistrationStateType = typeof initialState;

