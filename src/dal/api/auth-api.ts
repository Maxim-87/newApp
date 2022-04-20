import { ILoginData } from '../../ui/features/Auth/Login/LoginForm';
import { AxiosResponse } from 'axios';
import { instance } from './instance';




const messageForRecoverPW = `\n<div style='max-width: 500px; width: 100%; color:#000;'>
\t\t\t<h3 style='color: black; font-weight: bold;'>Reset Password Notification</h3>
\t\t\t<p style='color: black;'>
\t\t\t\tHello, You are receiving this email because we received a password reset request for your account.
\t\t\t</p>
\t\t\t<a href='' style='text-decoration: none; background-color: #FDD325; color: #222222; padding: 10px 15px;
 border-radius: 12px; font-weight: bold;'>
ResetPassword</a>
\t\t\t<p style='color: black;'>If you did not request a password reset, no further action is required.
\t\t\t\tIf you’re having trouble clicking the "Reset Password" button,
\t\t\t\tcopy and paste the URL below into your web browser:
\t\t\t</p>
\t\t\t<a href='' style='text-decoration: none; color: #FDD325; margin-bottom: 15px;'>
\t\t\t\thttps://itsidorkin28.github.io/react-project/#/new-pass/$token$
\t\t\t</a>
<p  style='color: black; opacity: 0.8;'>Automated message. Please do not reply</p>
\t\t</div>\n`;

export const authApi = {
	async login(data: ILoginData) {
		return instance.post<ILoginResponse>(`auth/login`, data);
	},
	async logout() {
		return instance.delete<ILogoutData>(`/auth/me`);
	},
	async authMe() {
		return instance.post<IAuthMeData>(`auth/me`);
	},
	async recoverPW(email: string) {
		return instance.post('/auth/forgot', {
			email: email,
			message: messageForRecoverPW,
		});
	},
	async newPassword(password: string, token: string | undefined) {
		return instance.post('/auth/set-new-password', {
			password: password,
			resetPasswordToken: token,
		});
	},
	async register(payload: IRegisterData) {
		return instance.post<IRegisterData, AxiosResponse<{ error?: string }>>('/auth/register', payload);
	},
};

export interface IAuthMeData {
	_id: string;
	name: string;
	email: string;
	rememberMe?: boolean;
	isAdmin?: boolean;
	verified?: boolean;
	publicCardPacksCount?: number;
	created?: Date;
	updated?: Date;
	__v?: number;
	token?: string;
	tokenDeathTime?: number;
	avatar?: string;
	error?: string;
}

interface ILogoutData {
	info: string;
	error: string;
}

interface ILoginResponse {
	_id: string;
	email: string;
	name: string;
	avatar?: string;
	publicCardPacksCount: number;
}

export interface IRegisterData {
	email: string;
	password: string;
}