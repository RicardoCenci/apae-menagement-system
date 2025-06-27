import axios from 'axios';

type PostHelloWorldRequest = {
	message: string;
};

type PostHelloWorldResponse = {
	message: string;
};

export async function postHelloWorldRequest(request: PostHelloWorldRequest): Promise<PostHelloWorldResponse> {
	return axios.post('/api/v1/hello', request).then((res) => res.data);
}
