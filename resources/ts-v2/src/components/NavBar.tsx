
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  color: '#fff',
  opacity: isActive ? 1 : 0.7,
  textDecoration: 'none',
  borderBottom: isActive ? '2px solid #fff' : '2px solid transparent',
});

const NavBar: React.FC = () => (
  <AppBar position="static" color="primary" elevation={1}>
    <Toolbar sx={{ gap: 3 }}>
      <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
        Centro Clínico
      </Typography>

      <Button component={NavLink} to="/sync" sx={linkStyle}>
        Sincronizar
      </Button>
      <Button component={NavLink} to="/reports" sx={linkStyle}>
        Relatórios
      </Button>
    </Toolbar>
  </AppBar>
);

export default NavBar;
