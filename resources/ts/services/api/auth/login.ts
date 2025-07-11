import { api } from '@/services/api/index';
import type { AuthTypes } from '@/context/AuthContext/types';

type LoginRequest = {
	email: string;
	password: string;	
}

type LoginResponse = {
	access_token: string;
	token_type: string;
	expires_in: number;
	user: AuthTypes.User;
}

export function login(request: LoginRequest) {
	return api.post<LoginResponse>('v1/auth/login', request);
}
