import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export function MainLayout() {
	return (
		<div>
			<div>
				<h1>Menu</h1>
				<ul>
					<li>
						<Link to="/">Home</Link>	
					</li>
					<li>
						<Link to="/logout">Logout</Link>
					</li>
				</ul>
			</div>
			<main>
				<Outlet />
			</main>
		</div>
	);
} 