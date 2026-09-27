import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const formats = [
  { format: 'docx', label: 'Word' },
  { format: 'pdf', label: 'PDF' },
];

export default function DocumentReviewPanel({
  title = 'Confirme el contenido antes de descargar',
  description = 'Revise los datos clave y corrija cualquier sección antes de generar Word o PDF.',
  storageMessage = 'El archivo generado también se guarda en la carpeta local de documentos.',
  generating,
  generatingFormat,
  message,
  onBack,
  onGenerate,
  createAnotherHref,
  children,
}) {
  const [selected, setSelected] = useState(formats[0]);
  const [anchor, setAnchor] = useState(null);
  return (
    <>
      <Box sx={{ mb: 2.5 }}>
        <Typography color="primary.main" fontWeight={700} variant="overline">
          Revisión final
        </Typography>
        <Typography component="h2" variant="h5">
          {title}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 0.75 }} variant="body2">
          {description}
        </Typography>
      </Box>
      {children}
      {generating && (
        <Box
          sx={{
            borderLeft: '3px solid',
            borderColor: 'primary.main',
            bgcolor: 'primary.surface',
            mt: 3,
            p: 2,
          }}
        >
          <Typography fontWeight={650} sx={{ mb: 1 }}>
            Generando documento {generatingFormat === 'pdf' ? 'PDF' : 'Word'}...
          </Typography>
          <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>
            La primera generación puede tardar unos segundos. Mantenga esta
            ventana abierta.
          </Typography>
          <LinearProgress />
        </Box>
      )}
      {message?.text && (
        <Alert severity={message.type || 'info'} sx={{ mt: 3 }}>
          {message.text}
        </Alert>
      )}
      <Divider sx={{ mt: 3, mb: 2 }} />
      <Stack
        alignItems={{ xs: 'stretch', md: 'center' }}
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        spacing={1.5}
      >
        <Typography color="text.secondary" variant="body2">
          {storageMessage}
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
          <Button disabled={generating} onClick={onBack}>
            Volver
          </Button>
          <ButtonGroup variant="contained" disabled={generating}>
            <Button onClick={() => onGenerate(selected.format)}>
              {generating && generatingFormat === selected.format && (
                <CircularProgress color="inherit" size={18} sx={{ mr: 1 }} />
              )}
              Descargar {selected.label}
            </Button>
            <Button
              aria-controls={anchor ? 'download-format-menu' : undefined}
              aria-expanded={anchor ? 'true' : undefined}
              aria-haspopup="menu"
              aria-label="Cambiar formato de descarga"
              onClick={(event) => setAnchor(event.currentTarget)}
              size="small"
            >
              ▾
            </Button>
          </ButtonGroup>
          {message?.type === 'success' && createAnotherHref && (
            <Button href={createAnotherHref} variant="outlined">
              Crear otro
            </Button>
          )}
        </Stack>
      </Stack>
      <Menu
        anchorEl={anchor}
        id="download-format-menu"
        onClose={() => setAnchor(null)}
        open={Boolean(anchor)}
      >
        {formats.map((format) => (
          <MenuItem
            key={format.format}
            selected={selected.format === format.format}
            onClick={() => {
              setSelected(format);
              setAnchor(null);
            }}
          >
            Descargar {format.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
