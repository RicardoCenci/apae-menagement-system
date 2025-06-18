import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getHelloWorldRequest } from '../../services/api/getHelloWorld';

export function QueryExamplePage() {
	const { data, isLoading, error } = useQuery({
		queryKey: ['hello'],
		queryFn: getHelloWorldRequest,
	});

	return (
		<div>
			<h1>Example Page</h1>
			<p>Server Said: {data?.message}</p>
		</div>
	);
}
