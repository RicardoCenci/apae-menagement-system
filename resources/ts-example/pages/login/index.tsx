import React, { useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/api/auth/login';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../../context/AuthContext/index';
import { getCurrentUser } from '../../services/api/auth/getCurrentUser';

export function LoginPage() {
	const [state, dispatch] = useAuthContext();
	const formControl = useForm({
		defaultValues: {
			email: 'test@example.com',
			password: 'password'
		}
	})

	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const loginMutation = useMutation({
		mutationFn: login,
	})

	const userQuery = useQuery({
		queryKey: ['user'],
		queryFn: getCurrentUser,
		enabled: !!state.token
	})

	useLayoutEffect(() => {
		if(userQuery.data && state.token){
			navigate('/');
		}
	}, [userQuery.data]);

	const handleSubmit = formControl.handleSubmit(async (data) => {
		const response = await loginMutation.mutateAsync(data);

		dispatch({
			type: 'SET_USER',
			payload: {
				user: response.data.user,
				token: response.data.access_token
			}
		})

		queryClient.invalidateQueries({ queryKey: ['user'] });

		navigate('/');
	});

	return (
		<div style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem' }}>
			<h1>Login</h1>
			{loginMutation.isError && (
				<div style={{ color: 'red', marginBottom: '1rem' }}>
					{loginMutation.error.message}
				</div>
			)}
			<form onSubmit={handleSubmit}>
				<div style={{ marginBottom: '1rem' }}>
					<label htmlFor="email">Email:</label>
					<input
						{...formControl.register('email')}
						required
						style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
					/>
				</div>
				<div style={{ marginBottom: '1rem' }}>
					<label htmlFor="password">Password:</label>
					<input
						{...formControl.register('password')}
						required
						style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
					/>
				</div>
				<button 
					type="submit" 
					disabled={loginMutation.isPending}
					style={{ 
						width: '100%', 
						padding: '0.75rem', 
						backgroundColor: loginMutation.isPending ? '#ccc' : '#007bff', 
						color: 'white', 
						border: 'none', 
						borderRadius: '4px',
						cursor: loginMutation.isPending ? 'not-allowed' : 'pointer'
					}}
				>
					{loginMutation.isPending ? 'Logging in...' : 'Login'}
				</button>
			</form>
			<p style={{ marginTop: '1rem', textAlign: 'center' }}>
				Don't have an account? <Link to="/register">Sign up</Link>
			</p>
			<p style={{ textAlign: 'center' }}>
				<Link to="/">Back to Home</Link>
			</p>
		</div>
	);
} 