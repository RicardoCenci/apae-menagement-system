
import React, { useState, useMemo } from 'react';
import { Box, Button, Typography, Paper, CircularProgress } from '@mui/material';
import * as XLSX from 'xlsx';
import { DataGrid } from '@mui/x-data-grid';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { persistIncomingReports } from '../api/reports';
import { localePT } from '../utils/localePT';


const parseWorksheet = (ws: XLSX.WorkSheet): Record<string, any>[] => {
  // Usa sheet_to_json com raw:false para aplicar formatação do Excel
  const rows: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1, defval: null, raw: false });
  let header: string[] | null = null;
  let startIdx = 0;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i].map((c: any) => (c ?? '').toString().trim());
    if (row.some((c: string) => c)) {
      header = row;
      startIdx = i + 1;
      break;
    }
  }
  if (!header) return [];

  const headers = header.map((h) => h.trim()).filter(Boolean);
  const data: Record<string, any>[] = [];

  for (let i = startIdx; i < rows.length; i++) {
    const rowArr = rows[i];
    if (!rowArr || rowArr.every((c) => c === null || c === '')) break; // primeira linha totalmente vazia encerra
    const record: Record<string, any> = {};

    headers.forEach((h, idx) => {
      let val = rowArr[idx];
      // Se for número e o cabeçalho parece data, tenta converter Excel date
      if (typeof val === 'number') {
        const dateStr = XLSX.SSF.format('yyyy-mm-dd', val);
        if (!isNaN(Date.parse(dateStr))) {
          val = dateStr;
        }
      }
      record[h] = val ?? null;
    });

    if (Object.values(record).some((v) => v !== null && v !== '')) {
      data.push(record);
    }
  }
  return data;
};

const SyncReports: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [preview, setPreview] = useState<Record<string, any>[] | null>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: persistIncomingReports,
    onSuccess: (data) => {
      queryClient.setQueryData(['reports'], data);
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      alert('Relatórios enviados com sucesso!');
      setPreview(null);
      setFileName(null);
    },
    onError: (e: Error) => alert(`Erro ao enviar: ${e.message}`),
  });


  const handleFile = async (file: File) => {
    setFileName(file.name);
    let wb: XLSX.WorkBook;

    if (file.name.toLowerCase().endsWith('.csv')) {
      const text = await file.text(); // UTF‑8 por padrão
      wb = XLSX.read(text, { type: 'string', raw: false });
    } else {
      const buffer = await file.arrayBuffer();
      wb = XLSX.read(buffer, { type: 'array' });
    }

    const firstSheet = wb.Sheets[wb.SheetNames[0]];
    const data = parseWorksheet(firstSheet);
    setPreview(data);
  };


  const columns = useMemo(() => {
    if (!preview?.length) return [];
    return Object.keys(preview[0]).map((k) => ({
      field: k,
      headerName: k,
      flex: 1,
      minWidth: 120,
    }));
  }, [preview]);

  const rows = useMemo(() => {
    if (!preview) return [];
    return preview.map((row, idx) => ({ id: idx, ...row }));
  }, [preview]);

  return (
    <Box p={2}>
      <Paper elevation={2} sx={{ p: 3, mb: 2 }}>
        <Typography variant="h5" mb={2}>
          Sincronizar Relatórios
        </Typography>

        <Button variant="contained" component="label">
          Selecionar arquivo (.xlsx / .csv)
          <input
            type="file"
            hidden
            accept=".csv,.xlsx"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </Button>

        {fileName && (
          <Typography variant="body2" mt={1}>
            Arquivo selecionado: {fileName}
          </Typography>
        )}
      </Paper>

      {preview && (
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="subtitle1" mb={1}>
            Pré‑visualização ({preview.length} registros)
          </Typography>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              density="compact"
              hideFooter
              localeText={localePT}
            />
          </div>

          <Box display="flex" gap={2} mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => preview && mutation.mutate(preview)}
              disabled={mutation.isPending}
              size="large"
            >
              {mutation.isPending ? <CircularProgress size={22} /> : 'Confirmar envio'}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                setPreview(null);
                setFileName(null);
              }}
              disabled={mutation.isPending}
            >
              Cancelar
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default SyncReports;
