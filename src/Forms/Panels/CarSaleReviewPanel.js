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
    <Typography
      color="primary.main"
      fontWeight={700}
      sx={{
        mb: 2,
      }}
      variant="overline"
    >
      Revisión final
    </Typography>
    <Typography variant="h5" gutterBottom>
      Confirme el contenido del documento
    </Typography>
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
    <Divider sx={{ my: 3 }} />
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent="flex-end"
      spacing={1.5}
    >
      <Button disabled={generating} onClick={onBack}>
        Volver a firma y venta
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
  </>
);

export default CarSaleReviewPanel;
