import { api } from '../index';

export function getCurrentUser() {
	return api.get('v1/auth/me');
}
