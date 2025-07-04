
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { Box } from '@mui/material';

const PrivateLayout: React.FC = () => (
  <>
    <NavBar />
    <Box sx={{ mt: 2 }}>
      <Outlet />
    </Box>
  </>
);

export default PrivateLayout;
