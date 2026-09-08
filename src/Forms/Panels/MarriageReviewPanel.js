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
import MarriageReview from '../../View/MarriageReview';

const formats = [
  { format: 'docx', label: 'Word' },
  { format: 'pdf', label: 'PDF' },
];

export default function MarriageReviewPanel({
  data,
  generating,
  generatingFormat,
  message,
  onBack,
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
          Confirme expediente matrimonial
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 0.75 }} variant="body2">
          Revise acta, escritura, requisitos y datos registrales antes de
          descargar.
        </Typography>
      </Box>
      <MarriageReview data={data} onEdit={onEdit} />
      {generating && (
        <Box
          sx={{
            borderLeft: '3px solid',
            borderColor: 'primary.main',
            bgcolor: '#f4f8f5',
            mt: 3,
            p: 2,
          }}
        >
          <Typography fontWeight={650} sx={{ mb: 1 }}>
            Generando {generatingFormat === 'pdf' ? 'PDF' : 'Word'}...
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
          Archivo también se guarda en carpeta local de documentos.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
          <Button disabled={generating} onClick={onBack}>
            Volver
          </Button>
          <ButtonGroup variant="contained" disabled={generating}>
            <Button onClick={() => onGenerate(selected.format)}>
              {generating && (
                <CircularProgress color="inherit" size={18} sx={{ mr: 1 }} />
              )}
              Descargar {selected.label}
            </Button>
            <Button
              aria-label="Cambiar formato"
              onClick={(event) => setAnchor(event.currentTarget)}
            >
              ▾
            </Button>
          </ButtonGroup>
        </Stack>
      </Stack>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
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
