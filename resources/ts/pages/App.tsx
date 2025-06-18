import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { HomePage } from './home';
import { NotFoundPage } from './404';

export function App() {
	return (
		<BrowserRouter>
			<div>
				<div>
					<h1>Menu</h1>
					<ul>
						<li>
							<Link to="/">Home</Link>	
						</li>
					</ul>
				</div>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
			</div>
		</BrowserRouter>
	);
}
