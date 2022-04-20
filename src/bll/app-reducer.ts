import { ThunkType } from './store';
import { authApi } from '../dal/api/auth-api';
import { setLoggedIn } from './auth-reducer';
import { setUserProfile } from './profile-reducer';

const initialState = {
	isLoading: false,
	error: false,
	appInfo: '',
	isInitialized: false,
};

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
	switch (action.type) {
		case APP_ACTIONS.SET_STATUS_ACTION:
			return { ...state, isLoading: action.payload.isLoading };
		case APP_ACTIONS.SET_ERROR_ACTION:
			return { ...state, error: action.payload.error };
		case APP_ACTIONS.SET_APP_INITIALIZED:
			return { ...state, isInitialized: action.payload.value };
		case APP_ACTIONS.SET_APP_INFO:
			return { ...state, appInfo: action.payload.message };
		default:
			return { ...state };
	}
};

// Actions
export const setAppError = (error: boolean) => {
	return { type: APP_ACTIONS.SET_ERROR_ACTION, payload: { error } } as const;
};
export const setAppIsLoading = (isLoading: boolean) => {
	return { type: APP_ACTIONS.SET_STATUS_ACTION, payload: { isLoading } } as const;
};

export const setAppInitialized = (value: boolean) => {
	return { type: APP_ACTIONS.SET_APP_INITIALIZED, payload: { value } } as const;
};
export const setAppInfo = (message: string) => {
	return { type: APP_ACTIONS.SET_APP_INFO, payload: { message } } as const;
};


// Thunk
export const initializeApp = (): ThunkType => async dispatch => {
	try {
		const res = await authApi.authMe();
		dispatch(setUserProfile(res.data._id, res.data.name, res.data.email));
		dispatch(setLoggedIn(true));
	} catch (e:any) {
		dispatch(setAppError(true));
		// dispatch(setAppInfo(e.response ? e.response.data.error : e));
	} finally {
		dispatch(setAppInitialized(true));
	}
};


//Types
export enum APP_ACTIONS {
	SET_STATUS_ACTION = 'APP/SET-STATUS',
	SET_ERROR_ACTION = 'APP/SET-ERROR',
	SET_APP_INITIALIZED = 'APP/SET-IS-INITIALIZED',
	SET_APP_INFO = 'APP/SET-APP-INFO'
}


export type InitialStateType = typeof initialState;

export type SetAppErrorActionType = ReturnType<typeof setAppError>;
export type SetAppStatusActionType = ReturnType<typeof setAppIsLoading>;
export type SetAppInitializedActionType = ReturnType<typeof setAppInitialized>;
export type SetAppInfo = ReturnType<typeof setAppInfo>;

export type AppActionsType =
	| SetAppErrorActionType
	| SetAppStatusActionType
	| SetAppInitializedActionType
	| SetAppInfo;


