import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App } from './pages/App';
import { AuthProvider } from './context/AuthContext';

const root = document.getElementById('root');

if (!root) {
	throw new Error('Root element not found');
}

const queryClient = new QueryClient();

createRoot(root).render(
	<QueryClientProvider client={queryClient}>
		<App />
	</QueryClientProvider>
);
