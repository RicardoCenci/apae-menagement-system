import axios from 'axios';

type HelloWorldResponse = {
	message: string;
};

export async function getHelloWorldRequest(): Promise<HelloWorldResponse> {
	return axios.get('/api/v1/hello').then((res) => res.data);
}
