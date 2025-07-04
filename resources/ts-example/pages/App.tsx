import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './home';
import { NotFoundPage } from './404';
import { LoginPage } from './login';
import { MainLayout } from '../components/layouts/MainLayout';
import { LogoutPage } from './logout';
import { AuthProvider } from '../context/AuthContext';

export function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<MainLayout />}>
						<Route index element={<HomePage />} />
						<Route path="profile" element={<div><h1>Profile Page</h1></div>} />
					</Route>
					
					<Route path="login" element={<LoginPage />} />
					<Route path="logout" element={<LogoutPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}
