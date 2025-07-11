import { api } from '@/services/api/index';

export function logout() {
	return api.post('v1/auth/logout');
}
