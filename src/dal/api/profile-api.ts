import { instance } from './instance';
import { IAuthMeData } from './auth-api';

export const profileApi = {
	async updateName(data: IUpdateData) {
		return instance.put<IUpdateUser<IAuthMeData>>(`auth/me`, {name: data.name});
	}
};

interface IUpdateData {
	name: string;
	avatar?: string;
}

interface IUpdateUser<T> {
	updatedUser: T;
	error?: string;
}
