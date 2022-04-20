import { IAuthMeData } from '../dal/api/auth-api';
import { ThunkType } from './store';
import { profileApi } from '../dal/api/profile-api';
import { setAppIsLoading } from './app-reducer';

const initialState: ProfileStateType = {
	name: 'Max',
	email: 'maksboks87@mail.ru',
	_id: '1',
};

export const profileReducer = (state: ProfileStateType = initialState,
                               action: ProfileActionsType): ProfileStateType => {
	switch (action.type) {
		case PROFILE_ACTIONS.SET_USER_PROFILE:
			return { ...state, _id: action.payload._id, name: action.payload.name, email: action.payload.email };
		case PROFILE_ACTIONS.UPDATE_USER_NAME:
			return { ...state, name: action.payload.name};
		default:
			return state;
	}
};

// Actions
export const setUserProfile = (_id: string, name: string, email: string) => {
	return { type: PROFILE_ACTIONS.SET_USER_PROFILE, payload: { _id, name, email } } as const;
};
export const updateUserName = (name: string) => {
	return {type: PROFILE_ACTIONS.UPDATE_USER_NAME, payload: {name}} as const;
};

export const putUserName = (name: string): ThunkType => async dispatch => {
	dispatch(setAppIsLoading(true));
	try {
		const res = await profileApi.updateName({ name });
		dispatch(updateUserName(res.data.updatedUser.name));
	} catch (e) {
		console.log((e as Error).message);
	} finally {
		dispatch(setAppIsLoading(false));
	}
};

// Types
export enum PROFILE_ACTIONS {
	SET_USER_PROFILE = 'PROFILE/SET-USER-PROFILE',
	UPDATE_USER_NAME = 'PROFILE/UPDATE-USER-NAME',
}

export type SetUserProfileActionsType = ReturnType<typeof setUserProfile> | ReturnType<typeof updateUserName>;
export type ProfileActionsType = SetUserProfileActionsType;
export type ProfileStateType = IAuthMeData;
