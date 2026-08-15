import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import {
  EmptyState,
  SectionHeader,
  SurfaceRow,
} from '../Structure/FormScaffold';

const formatDateTime = (value) =>
  new Intl.DateTimeFormat('es-SV', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));

const draftSection = (historyItem, section) =>
  historyItem.draft?.[section] || {};

const historyTitle = (historyItem) => {
  const vehicle = draftSection(historyItem, 'carStates');
  const description = [vehicle.marca, vehicle.modelo, vehicle.placa]
    .filter(Boolean)
    .join(' ');
  return description ? `Compra venta - ${description}` : historyItem.title;
};

const historyPersonName = (historyItem, section, fallback) => {
  const person = draftSection(historyItem, section);
  return [person.nombre, person.apellido].filter(Boolean).join(' ') || fallback;
};

const CarSaleHistoryPanel = ({ historyProps, onLoad }) => (
  <Box>
    <SectionHeader
      title="Historial"
      description="Documentos generados y borradores disponibles."
    />
    {historyProps.error && (
      <Alert severity="error" sx={{ mb: 2 }}>
        {historyProps.error}
      </Alert>
    )}
    {historyProps.data.length === 0 ? (
      <EmptyState>Aún no hay documentos generados.</EmptyState>
    ) : (
      <Stack spacing={1.25}>
        {historyProps.data.map((historyItem) => (
          <SurfaceRow key={historyItem.id}>
            <Stack
              alignItems={{ xs: 'stretch', sm: 'center' }}
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
            >
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography fontWeight={650} sx={{ overflowWrap: 'anywhere' }}>
                  {historyTitle(historyItem)}
                </Typography>
                <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  spacing={{ xs: 0.25, md: 1.5 }}
                  sx={{ mt: 0.5 }}
                >
                  <Typography color="text.secondary" variant="body2">
                    {formatDateTime(historyItem.createdAt)}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {historyPersonName(
                      historyItem,
                      'personStates',
                      historyItem.buyerName
                    )}{' '}
                    /{' '}
                    {historyPersonName(
                      historyItem,
                      'vendorStates',
                      historyItem.sellerName
                    )}
                  </Typography>
                </Stack>
              </Box>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1}
                sx={{ flexShrink: 0 }}
              >
                <Button
                  disabled={!Object.keys(historyItem.draft || {}).length}
                  onClick={() => onLoad(historyItem)}
                  variant="outlined"
                  size="small"
                >
                  Abrir borrador
                </Button>
                <Button
                  onClick={() => historyProps.download(historyItem, 'docx')}
                  size="small"
                >
                  Word
                </Button>
                <Button
                  onClick={() => historyProps.download(historyItem, 'pdf')}
                  size="small"
                >
                  PDF
                </Button>
              </Stack>
            </Stack>
          </SurfaceRow>
        ))}
      </Stack>
    )}
  </Box>
);

export default CarSaleHistoryPanel;
