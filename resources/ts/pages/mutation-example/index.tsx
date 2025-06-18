import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { postHelloWorldRequest } from '../../services/api/postHelloWorld';

export function MutationExamplePage() {
	const { mutate, data } = useMutation({
		mutationKey: ['hello'],
		mutationFn: postHelloWorldRequest,
	});

	return (
		<div>
			<h1>Mutation Example Page</h1>
			<p>Server Said: {data?.message}</p>
			<button onClick={() => mutate({ message: 'Hello World From React' })}>Post Hello World</button>
		</div>
	);
}
