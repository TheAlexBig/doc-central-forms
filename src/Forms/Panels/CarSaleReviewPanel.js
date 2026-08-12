import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CarSaleReview from '../../View/CarSaleReview';

const CarSaleReviewPanel = ({
  documentData,
  generating,
  generatingFormat,
  generationError,
  generated,
  onBack,
  onEdit,
  onGenerate,
}) => (
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
        <Button
          variant="contained"
          onClick={() => onGenerate('docx')}
          disabled={generating}
        >
          {generating && generatingFormat === 'docx' && (
            <CircularProgress size={18} sx={{ mr: 1 }} />
          )}
          Descargar Word
        </Button>
        <Button
          variant="outlined"
          onClick={() => onGenerate('pdf')}
          disabled={generating}
        >
          {generating && generatingFormat === 'pdf' && (
            <CircularProgress size={18} sx={{ mr: 1 }} />
          )}
          Descargar PDF
        </Button>
        {generated && (
          <Button href="/compra-venta" variant="outlined">
            Crear otro
          </Button>
        )}
      </Stack>
    </Stack>
  </>
);

export default CarSaleReviewPanel;
