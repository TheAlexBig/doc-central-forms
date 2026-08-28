import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function LicenseActivation({
  activate,
  error,
  loading,
  status,
}) {
  const [fileError, setFileError] = useState('');

  const importLicense = async (event) => {
    const [file] = event.target.files;
    if (!file) return;
    setFileError('');
    try {
      await activate(JSON.parse(await file.text()));
    } catch (_error) {
      setFileError('El archivo seleccionado no contiene una licencia válida.');
    } finally {
      event.target.value = '';
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="sm">
        <Paper variant="outlined" sx={{ p: { xs: 3, sm: 5 } }}>
          <Stack spacing={3}>
            <Box>
              <Typography
                color="primary.main"
                fontWeight={700}
                variant="overline"
              >
                Activación requerida
              </Typography>
              <Typography component="h1" variant="h4">
                Active Central Docs
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Envíe el código de este equipo al proveedor e importe el archivo
                de licencia recibido.
              </Typography>
            </Box>
            <Box
              sx={{
                bgcolor: '#f4f8f5',
                border: '1px solid',
                borderColor: 'divider',
                p: 2,
              }}
            >
              <Typography color="text.secondary" variant="caption">
                Código del equipo
              </Typography>
              <Typography
                fontFamily="monospace"
                fontWeight={700}
                sx={{ overflowWrap: 'anywhere' }}
              >
                {status?.machineCode || 'Calculando...'}
              </Typography>
            </Box>
            {(error || fileError) && (
              <Alert severity="error">{fileError || error}</Alert>
            )}
            <Button
              component="label"
              disabled={loading}
              size="large"
              variant="contained"
            >
              {loading && (
                <CircularProgress color="inherit" size={18} sx={{ mr: 1 }} />
              )}
              Importar archivo de licencia
              <input
                accept=".license,.json,application/json"
                hidden
                onChange={importLicense}
                type="file"
              />
            </Button>
            <Typography color="text.secondary" variant="body2">
              La licencia es permanente para este equipo y se conservará al
              actualizar Central Docs.
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
