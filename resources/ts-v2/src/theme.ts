
import { createTheme } from '@mui/material/styles';
import { ptBR } from '@mui/material/locale';

const baseTheme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
      secondary: { main: '#f50057' },
      background: { default: '#fafafa' },
    },
    shape: { borderRadius: 12 },
    typography: {
      fontFamily: `'Inter', 'Roboto', sans-serif`,
      h5: { fontWeight: 600 },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 8, textTransform: 'none', fontWeight: 500 },
        },
      },
      MuiPaper: {
        defaultProps: { elevation: 2 },
        styleOverrides: { root: { borderRadius: 12 } },
      },
    },
  },
  ptBR
);

export default baseTheme;
