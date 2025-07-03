
import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { QueryClientProviderComponent } from './QueryClientProvider';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProviderComponent>
        <App />
      </QueryClientProviderComponent>
    </ThemeProvider>
  </React.StrictMode>
);
