import { ThunkType } from './store';
import { authApi } from '../dal/api/auth-api';



const initialState: ForgotPassStateType = {
	email: ''
};

export const forgotPasswordReducer = (state: ForgotPassStateType = initialState,
									action: ForgotPassActionsType): ForgotPassStateType => {
	switch (action.type) {
		case FORGOT_PASS_ACTIONS.GET_USER_EMAIL: {
			return {
				...state,
				email: action.payload.email
			};
		}
		default:
			return state;
	}
};

// Actions
export const getUserEmail = (email: string) => {
	return { type: FORGOT_PASS_ACTIONS.GET_USER_EMAIL, payload: { email } } as const;
};
// Thunk
export const sendUserEmail = (email: string): ThunkType => async dispatch => {
	const response = await authApi.recoverPW(email);
	try {
		if (response.status === 200) {
			dispatch(getUserEmail(email));
		}
	} catch (error) {
		console.log((error as Error).message);
	}
};

// Types
export enum FORGOT_PASS_ACTIONS {
	GET_USER_EMAIL = 'FORGOT_PASS/GET_USER_EMAIL'
}

export type ForgotPassActionsType = ReturnType<typeof getUserEmail>;
export type ForgotPassStateType = {
	email: string
};
