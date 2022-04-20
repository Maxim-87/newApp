import { ThunkType } from './store';
import { authApi } from '../dal/api/auth-api';

const initialState: NewPassStateType = {
	password: ''
};

export const newPassReducer = (state: NewPassStateType = initialState,
								action: NewPassActionsType): NewPassStateType => {
	switch (action.type) {
		case NEW_PASS_ACTIONS.GET_NEW_PASSWORD:{
			return {
				...state,
				password: action.payload.password
			};
		}
		default:
			return state;
	}
};


// Actions
export const getUserPassword = (password: string) => {
	return { type: NEW_PASS_ACTIONS.GET_NEW_PASSWORD, payload: { password } } as const;
};

// Thunk
export const sendNewUserPassword = (password: string, token: string | undefined): ThunkType => async dispatch => {
	console.log('start');
	try {
		console.log('try');
		const response = await authApi.newPassword(password, token);
		if (response.status === 200) {
			dispatch(getUserPassword(password));
			alert('Password changed successfully');
		}
	} catch (error) {
		console.log((error as Error).message);
	}
};


// Types
export enum NEW_PASS_ACTIONS {
	GET_NEW_PASSWORD = 'NEW_PASS/GET_NEW_PASSWORD'
}


export type NewPassActionsType = ReturnType<typeof getUserPassword>;
export type NewPassStateType = {
	password: string
};
