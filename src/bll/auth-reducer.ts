import { authApi } from '../dal/api/auth-api';
import { setAppError, setAppInfo, setAppIsLoading } from './app-reducer';
import { ILoginData } from '../ui/features/Auth/Login/LoginForm';
import { ThunkType } from './store';
import { setUserProfile } from './profile-reducer';

const initialState: AuthStateType = {
	isLoggedIn: false,
};

export const authReducer = (state: AuthStateType = initialState,
                            action: AuthActionsType): AuthStateType => {
	switch (action.type) {
		case AUTH_ACTIONS.IS_LOGGED_IN:
			return { ...state, isLoggedIn: action.payload.value };
		default:
			return state;
	}
};

// Actions
export const setLoggedIn = (value: boolean) => {
	return { type: AUTH_ACTIONS.IS_LOGGED_IN, payload: { value } } as const;
};

// Thunk
export const login = (data: ILoginData): ThunkType => async dispatch => {
	dispatch(setAppIsLoading(true));
	try {
		const res = await authApi.login(data);
		dispatch(setUserProfile(res.data._id, res.data.name, res.data.email));
		dispatch(setLoggedIn(true));
		dispatch(setAppInfo('You are logged in!'));
	} catch (e) {
		console.log((e as Error).message);
		setAppError(true);
		dispatch(setAppInfo(e as Error ? (e as Error).message : 'Some error'));
	} finally {
		dispatch(setAppIsLoading(false));
	}
};

export const logoutTC = (): ThunkType => async dispatch => {
	dispatch(setAppIsLoading(true));
	try {
		await authApi.logout();
		dispatch(setLoggedIn(false));
		dispatch(setAppInfo('See you again!'));
		dispatch(setUserProfile('0', 'null', 'null'));
	} catch (e) {
		setAppError(true);
		dispatch(setAppInfo(e as Error ? (e as Error).message : 'Some error'));
	} finally {
		dispatch(setAppIsLoading(false));
	}

};


// Types
export enum AUTH_ACTIONS {
	IS_LOGGED_IN = 'LOGIN/IS_LOGGED_IN'
}

export type AuthActionsType = ReturnType<typeof setLoggedIn>;
export type AuthStateType = {
	isLoggedIn: boolean
};
