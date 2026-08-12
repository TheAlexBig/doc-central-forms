import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import {
  EmptyState,
  SectionHeader,
  SurfaceRow,
} from '../Structure/FormScaffold';

const VehicleOptionList = ({ title, kind, options, onRemove }) => (
  <Box sx={{ mb: 3 }}>
    <Typography fontWeight={650} sx={{ mb: 1.25 }}>
      {title}
    </Typography>
    {options.length === 0 ? (
      <EmptyState>No hay opciones guardadas.</EmptyState>
    ) : (
      <Grid container spacing={1}>
        {options.map((option) => (
          <Grid item xs={12} sm={6} md={4} key={`${kind}-${option}`}>
            <SurfaceRow>
              <Stack
                alignItems="center"
                direction="row"
                justifyContent="space-between"
                spacing={1}
              >
                <Typography
                  sx={{ overflowWrap: 'anywhere', minWidth: 0 }}
                  variant="body2"
                >
                  {option}
                </Typography>
                <Button
                  color="error"
                  onClick={() => onRemove(kind, option)}
                  size="small"
                  sx={{ flexShrink: 0 }}
                >
                  Remover
                </Button>
              </Stack>
            </SurfaceRow>
          </Grid>
        ))}
      </Grid>
    )}
  </Box>
);

const SavedPeopleSettings = ({ people, onRemove }) => (
  <Box sx={{ mb: 3 }}>
    <Typography fontWeight={650} sx={{ mb: 1 }}>
      Personas guardadas
    </Typography>
    {people.length === 0 ? (
      <EmptyState>No hay personas guardadas.</EmptyState>
    ) : (
      <Grid container spacing={1}>
        {people.map((person) => (
          <Grid item xs={12} sm={6} key={person.documento}>
            <SurfaceRow>
              <Stack
                alignItems="center"
                direction="row"
                justifyContent="space-between"
                spacing={1.5}
              >
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    fontWeight={650}
                    sx={{ overflowWrap: 'anywhere' }}
                    variant="body2"
                  >
                    {[person.nombre, person.apellido].filter(Boolean).join(' ')}
                  </Typography>
                  <Typography color="text.secondary" variant="caption">
                    {person.documento} / {person.oficio}
                  </Typography>
                </Box>
                <Button
                  color="error"
                  onClick={() => onRemove(person)}
                  size="small"
                  sx={{ flexShrink: 0 }}
                >
                  Remover
                </Button>
              </Stack>
            </SurfaceRow>
          </Grid>
        ))}
      </Grid>
    )}
  </Box>
);

const CarSaleSettingsPanel = ({ settingsProps }) => (
  <Box>
    <SectionHeader
      title="Configuración"
      description="Limpieza de valores guardados para personas, marcas, modelos y colores."
    />
    {settingsProps.error && (
      <Alert severity="error" sx={{ mb: 2 }}>
        {settingsProps.error}
      </Alert>
    )}
    <Box sx={{ mb: 3 }}>
      <Typography fontWeight={650} sx={{ mb: 1 }}>
        Diagnóstico
      </Typography>
      <SurfaceRow>
        <Stack spacing={1.25}>
          <Stack
            alignItems={{ xs: 'stretch', sm: 'center' }}
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            spacing={1.5}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography fontWeight={650} variant="body2">
                Logs de instalación y arranque
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ overflowWrap: 'anywhere' }}
                variant="caption"
              >
                {settingsProps.diagnostics?.logsDirectory ||
                  'Ubicación de logs no disponible.'}
              </Typography>
            </Box>
            <Button
              onClick={settingsProps.openLogsFolder}
              size="small"
              variant="outlined"
            >
              Abrir logs
            </Button>
          </Stack>
          {settingsProps.diagnostics && (
            <Typography
              color="text.secondary"
              sx={{ overflowWrap: 'anywhere' }}
              variant="caption"
            >
              Archivo principal: {settingsProps.diagnostics.applicationLog}
            </Typography>
          )}
        </Stack>
      </SurfaceRow>
    </Box>
    <SavedPeopleSettings
      people={settingsProps.people}
      onRemove={settingsProps.removePerson}
    />
    <VehicleOptionList
      title="Marcas"
      kind="brands"
      options={settingsProps.vehicleOptions.brands}
      onRemove={settingsProps.removeVehicleOption}
    />
    <VehicleOptionList
      title="Modelos"
      kind="models"
      options={settingsProps.vehicleOptions.models}
      onRemove={settingsProps.removeVehicleOption}
    />
    <VehicleOptionList
      title="Colores"
      kind="colors"
      options={settingsProps.vehicleOptions.colors}
      onRemove={settingsProps.removeVehicleOption}
    />
  </Box>
);

export default CarSaleSettingsPanel;
