import { api } from '@/services/api/index';

export function getCurrentUser() {
	return api.get('v1/auth/me');
}
