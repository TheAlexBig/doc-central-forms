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
import MutualReview from '../../View/MutualReview';

const formats = [
  { format: 'docx', label: 'Word' },
  { format: 'pdf', label: 'PDF' },
];

export default function MutualReviewPanel({
  data,
  generating,
  generatingFormat,
  message,
  onEdit,
  onGenerate,
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
          Confirme el contenido antes de descargar
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 0.75 }} variant="body2">
          Revise los datos clave y corrija cualquier sección antes de generar
          Word o PDF.
        </Typography>
      </Box>
      <MutualReview data={data} onEdit={onEdit} />
      {generating && (
        <Box
          sx={{
            borderLeft: '3px solid',
            borderColor: 'primary.main',
            bgcolor: '#f4f8f5',
            mt: 3,
            px: 2,
            py: 2,
          }}
        >
          <Typography fontWeight={650} sx={{ mb: 1 }}>
            Generando documento {generatingFormat === 'pdf' ? 'PDF' : 'Word'}...
          </Typography>
          <LinearProgress />
        </Box>
      )}
      {message.text && (
        <Alert severity={message.type} sx={{ mt: 3 }}>
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
          El archivo generado también se guarda en la carpeta local de
          documentos.
        </Typography>
        <ButtonGroup variant="contained" disabled={generating}>
          <Button onClick={() => onGenerate(selected.format)}>
            {generating && (
              <CircularProgress color="inherit" size={18} sx={{ mr: 1 }} />
            )}
            Descargar {selected.label}
          </Button>
          <Button
            aria-label="Cambiar formato de descarga"
            onClick={(event) => setAnchor(event.currentTarget)}
            size="small"
          >
            ▾
          </Button>
        </ButtonGroup>
      </Stack>
      <Menu
        anchorEl={anchor}
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
