import axios from 'axios';
import { authStorage } from '../../context/AuthContext';

export const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});


api.interceptors.request.use((config) => {
    const token = authStorage.get()?.token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
});