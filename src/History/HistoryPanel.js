import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { EmptyState, SectionHeader } from '../Forms/Structure/FormScaffold';
import {
  DOCUMENT_TYPE_OPTIONS,
  presentDocumentHistory,
} from './DocumentHistoryPresentation';

const formatDateTime = (value) =>
  new Intl.DateTimeFormat('es-SV', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));

const localDateKey = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const part = (number) => String(number).padStart(2, '0');
  return `${date.getFullYear()}-${part(date.getMonth() + 1)}-${part(date.getDate())}`;
};

const HistoryPanel = ({ historyProps, onLoad }) => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const filtered = useMemo(() => {
    const search = query.trim().toLocaleLowerCase();
    return historyProps.data.filter((item) => {
      const date = localDateKey(item.createdAt);
      return (
        (!search ||
          presentDocumentHistory(item).searchableText.includes(search)) &&
        (!type || item.type === type) &&
        (!fromDate || date >= fromDate) &&
        (!toDate || date <= toDate)
      );
    });
  }, [historyProps.data, query, type, fromDate, toDate]);
  const visibleRows = filtered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const updateFilter = (setter) => (event) => {
    setter(event.target.value);
    setPage(0);
  };
  const clearFilters = () => {
    setQuery('');
    setType('');
    setFromDate('');
    setToDate('');
    setPage(0);
  };

  return (
    <Box>
      <SectionHeader
        title="Historial"
        description="Consulta todos los documentos generados y abre sus datos como borrador."
      />
      {historyProps.error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {historyProps.error}
        </Alert>
      )}
      <Grid container spacing={1.5} sx={{ mb: 2 }}>
        <Grid item xs={12} md={5}>
          <TextField
            fullWidth
            label="Buscar documento, persona, DUI, responsable o referencia"
            onChange={updateFilter(setQuery)}
            size="small"
            value={query}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <TextField
            fullWidth
            label="Tipo"
            onChange={updateFilter(setType)}
            select
            size="small"
            value={type}
          >
            <MenuItem value="">Todos</MenuItem>
            {DOCUMENT_TYPE_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <TextField
            fullWidth
            InputLabelProps={{ shrink: true }}
            label="Desde"
            onChange={updateFilter(setFromDate)}
            size="small"
            type="date"
            value={fromDate}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <TextField
            fullWidth
            InputLabelProps={{ shrink: true }}
            label="Hasta"
            onChange={updateFilter(setToDate)}
            size="small"
            type="date"
            value={toDate}
          />
        </Grid>
        <Grid item xs={12} md={1}>
          <Button
            fullWidth
            onClick={clearFilters}
            size="small"
            sx={{ height: 40 }}
          >
            Limpiar
          </Button>
        </Grid>
      </Grid>
      {historyProps.data.length === 0 ? (
        <EmptyState>Aún no hay documentos generados.</EmptyState>
      ) : filtered.length === 0 ? (
        <EmptyState>
          No hay documentos que coincidan con los filtros.
        </EmptyState>
      ) : (
        <Paper variant="outlined">
          <TableContainer>
            <Table aria-label="Historial de documentos" size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: 'action.hover' }}>
                  <TableCell>Documento</TableCell>
                  <TableCell>Personas</TableCell>
                  <TableCell>Responsables</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Generado</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleRows.map((historyItem) => {
                  const presentation = presentDocumentHistory(historyItem);
                  const typeLabel =
                    DOCUMENT_TYPE_OPTIONS.find(
                      (option) => option.value === historyItem.type
                    )?.label || historyItem.type;
                  return (
                    <TableRow hover key={historyItem.id}>
                      <TableCell sx={{ minWidth: 220 }}>
                        <Typography fontWeight={650} variant="body2">
                          {presentation.title}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: 210 }}>
                        <Typography color="text.secondary" variant="body2">
                          {presentation.parties || 'Sin información'}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: 210 }}>
                        <Typography variant="body2">
                          {presentation.responsible?.notary || 'Sin notario'}
                        </Typography>
                        <Typography color="text.secondary" variant="caption">
                          Preparado por:{' '}
                          {presentation.responsible?.preparer ||
                            'No especificado'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={typeLabel}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell sx={{ minWidth: 155 }}>
                        <Typography color="text.secondary" variant="body2">
                          {formatDateTime(historyItem.createdAt)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right" sx={{ minWidth: 265 }}>
                        <Stack
                          direction="row"
                          justifyContent="flex-end"
                          spacing={0.5}
                        >
                          <Button
                            disabled={
                              !Object.keys(historyItem.draft || {}).length
                            }
                            onClick={() => onLoad(historyItem)}
                            size="small"
                            variant="outlined"
                          >
                            Abrir
                          </Button>
                          <Button
                            onClick={() =>
                              historyProps.download(historyItem, 'docx')
                            }
                            size="small"
                          >
                            Word
                          </Button>
                          <Button
                            onClick={() =>
                              historyProps.download(historyItem, 'pdf')
                            }
                            size="small"
                          >
                            PDF
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={filtered.length}
            labelDisplayedRows={({ from, to, count }) =>
              `${from}–${to} de ${count}`
            }
            labelRowsPerPage="Filas por página"
            onPageChange={(_event, nextPage) => setPage(nextPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(Number.parseInt(event.target.value, 10));
              setPage(0);
            }}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Paper>
      )}
    </Box>
  );
};

export default HistoryPanel;
