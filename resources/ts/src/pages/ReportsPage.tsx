
import React from 'react';
import { Box, CircularProgress, Typography, Paper, Button } from '@mui/material';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { fetchReports } from '../api/reports';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { localePT } from '../utils/localePT';
import { exportAsXlsx } from '../utils/export';

const ReportsPage: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['reports'],
    queryFn: fetchReports,
  });

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  if (isPending) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box mt={4} textAlign="center">
        <Typography color="error">
          Erro ao carregar relatórios: {(error as Error).message}
        </Typography>
      </Box>
    );
  }

  if (!data || !data.length) {
    return (
      <Box mt={4} textAlign="center">
        <Typography>Nenhum relatório encontrado.</Typography>
      </Box>
    );
  }

  const columns = Object.keys(data[0]).map((key) => ({
    field: key,
    headerName: key,
    flex: 1,
    minWidth: 150,
  }));

  const rows = data.map((row: any, index: number) => ({ id: index, ...row }));

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <Button
        onClick={() => exportAsXlsx(rows, columns)}
        variant="text"
        sx={{ ml: 'auto', fontWeight: 500 }}
      >
        Exportar XLSX
      </Button>
    </GridToolbarContainer>
  );

  return (
    <Box p={2}>
      <Paper elevation={2} sx={{ p: 3, mb: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5">Relatórios</Typography>
          <Button onClick={handleLogout} variant="outlined" color="secondary">
            Sair
          </Button>
        </Box>
        <div style={{ height: 620, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            localeText={localePT}
            pageSizeOptions={[25, 50, 100]}
            initialState={{
              pagination: { paginationModel: { pageSize: 25 } },
            }}
            density="compact"
            slots={{ toolbar: CustomToolbar }}
          />
        </div>
      </Paper>
    </Box>
  );
};

export default ReportsPage;
