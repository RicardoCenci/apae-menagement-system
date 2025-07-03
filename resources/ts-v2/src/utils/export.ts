
import * as XLSX from 'xlsx';

export const exportAsXlsx = (rows: any[], columns: { field: string; headerName: string }[], fileName = 'relatorios.xlsx') => {
  const data = rows.map((row) => {
    const obj: Record<string, any> = {};
    columns.forEach((col) => {
      obj[col.headerName || col.field] = row[col.field];
    });
    return obj;
  });

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Relatórios');
  XLSX.writeFile(wb, fileName);
};
