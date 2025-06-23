import { api } from '../index';

export function logout() {
	return api.post('v1/auth/logout');
}
