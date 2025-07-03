
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!email || !password) return;
    await login(email, password);
    navigate('/sync', { replace: true });
  };

  const emailError = submitted && !email;
  const passwordError = submitted && !password;

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 5,
          width: 420,
          borderRadius: 3,
          textAlign: 'center',
          backdropFilter: 'blur(4px)',
        }}
      >
        <LocalHospitalIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Centro&nbsp;Clínico
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Acesse o portal de relatórios
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Email"
            type="email"
            value={email}
            error={emailError}
            helperText={emailError ? 'Informe o e‑mail' : ''}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            sx={{ mb: 3 }}
          />
          <TextField
            label="Senha"
            type="password"
            value={password}
            error={passwordError}
            helperText={passwordError ? 'Informe a senha' : ''}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{ mb: 4 }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ py: 1.2 }}
          >
            Entrar
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage;
