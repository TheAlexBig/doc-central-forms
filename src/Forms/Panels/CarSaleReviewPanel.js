import { useState } from 'react';
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
import Alert from '@mui/material/Alert';
import CarSaleReview from '../../View/CarSaleReview';

const downloadOptions = [
  { format: 'docx', label: 'Word' },
  { format: 'pdf', label: 'PDF' },
];

const CarSaleReviewPanel = (props) => {
  const {
    documentData,
    generating,
    generatingFormat,
    generationError,
    generated,
    onBack,
    onEdit,
    onGenerate,
  } = props;
  const [downloadFormat, setDownloadFormat] = useState(downloadOptions[0]);
  const [downloadMenuAnchor, setDownloadMenuAnchor] = useState(null);

  return (
    <>
      <Box
        sx={{
          alignItems: { xs: 'flex-start', md: 'center' },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          mb: 2.5,
          gap: 1.5,
        }}
      >
        <Box>
          <Typography
            color="primary.main"
            fontWeight={700}
            sx={{ mb: 0.5 }}
            variant="overline"
          >
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
      </Box>
      <CarSaleReview data={documentData} onEdit={onEdit} />
      {generating && (
        <Box
          sx={{
            borderLeft: '3px solid',
            borderColor: 'primary.main',
            bgcolor: '#f8fafc',
            mt: 3,
            px: 2,
            py: 2,
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
      {generationError && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {generationError}
        </Alert>
      )}
      {generated && (
        <Alert severity="success" sx={{ mt: 3 }}>
          El documento fue generado y descargado correctamente.
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
          Al descargar, Central Docs guardará este documento en el historial.
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="flex-end"
          spacing={1}
        >
          <Button disabled={generating} onClick={onBack}>
            Volver
          </Button>
          <ButtonGroup variant="contained" disabled={generating}>
            <Button onClick={() => onGenerate(downloadFormat.format)}>
              {generating && generatingFormat === downloadFormat.format && (
                <CircularProgress color="inherit" size={18} sx={{ mr: 1 }} />
              )}
              Descargar {downloadFormat.label}
            </Button>
            <Button
              aria-controls={
                downloadMenuAnchor ? 'download-format-menu' : undefined
              }
              aria-expanded={downloadMenuAnchor ? 'true' : undefined}
              aria-haspopup="menu"
              aria-label="Cambiar formato de descarga"
              onClick={(event) => setDownloadMenuAnchor(event.currentTarget)}
              size="small"
            >
              <Box aria-hidden="true" component="span" sx={{ fontSize: 16 }}>
                ▾
              </Box>
            </Button>
          </ButtonGroup>
          <Menu
            anchorEl={downloadMenuAnchor}
            id="download-format-menu"
            onClose={() => setDownloadMenuAnchor(null)}
            open={Boolean(downloadMenuAnchor)}
          >
            {downloadOptions.map((option) => (
              <MenuItem
                key={option.format}
                onClick={() => {
                  setDownloadFormat(option);
                  setDownloadMenuAnchor(null);
                }}
                selected={downloadFormat.format === option.format}
              >
                Descargar {option.label}
              </MenuItem>
            ))}
          </Menu>
          {generated && (
            <Button href="/compra-venta" variant="outlined">
              Crear otro
            </Button>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default CarSaleReviewPanel;
