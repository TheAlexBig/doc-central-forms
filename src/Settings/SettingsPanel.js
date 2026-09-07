import { useMemo, useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import DocumentTemplateSettings from './DocumentTemplateSettings';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {
  EmptyState,
  SectionHeader,
  SurfaceRow,
} from '../Forms/Structure/FormScaffold';
import AgentStructure from '../Forms/Structure/AgentStructure';

const SettingsCard = ({ children, sx = {} }) => (
  <Box
    sx={{
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 2,
      height: '100%',
      p: { xs: 2, md: 2.5 },
      ...sx,
    }}
  >
    {children}
  </Box>
);

const DataCollectionHeader = ({ title, description, count, action }) => (
  <Stack
    alignItems={{ xs: 'stretch', sm: 'flex-start' }}
    direction={{ xs: 'column', sm: 'row' }}
    justifyContent="space-between"
    spacing={1.5}
  >
    <SectionHeader title={title} description={description} />
    <Stack alignItems="center" direction="row" spacing={1}>
      <Chip label={`${count} guardados`} size="small" />
      {action}
    </Stack>
  </Stack>
);

const SavedDataRow = ({ title, subtitle, badges = [], onEdit, onRemove }) => (
  <SurfaceRow>
    <Stack
      alignItems={{ xs: 'stretch', sm: 'center' }}
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent="space-between"
      spacing={1.5}
    >
      <Box sx={{ minWidth: 0 }}>
        {badges.length > 0 && (
          <Stack direction="row" flexWrap="wrap" gap={0.75} sx={{ mb: 0.5 }}>
            {badges.map((badge) => (
              <Chip key={badge} label={badge} size="small" />
            ))}
          </Stack>
        )}
        <Typography fontWeight={650} variant="body2">
          {title}
        </Typography>
        <Typography color="text.secondary" variant="caption">
          {subtitle}
        </Typography>
      </Box>
      <Stack direction="row" spacing={1}>
        <Button onClick={onEdit} size="small">
          Editar
        </Button>
        <Button color="error" onClick={onRemove} size="small">
          Eliminar
        </Button>
      </Stack>
    </Stack>
  </SurfaceRow>
);

const VehicleOptionList = ({ title, kind, options, onRemove }) => (
  <Box>
    <Stack alignItems="center" direction="row" spacing={1} sx={{ mb: 1.25 }}>
      <Typography fontWeight={650}>{title}</Typography>
      <Chip label={options.length} size="small" />
    </Stack>
    {options.length === 0 ? (
      <EmptyState>No hay opciones guardadas.</EmptyState>
    ) : (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {options.map((option) => (
          <Chip
            key={`${kind}-${option}`}
            label={option}
            onDelete={() => onRemove(kind, option)}
            size="small"
            variant="outlined"
          />
        ))}
      </Box>
    )}
  </Box>
);

const PERSON_FIELDS = [
  ['nombre', 'Nombres'],
  ['apellido', 'Apellidos'],
  ['documento', 'DUI'],
  ['fecha_nacimiento', 'Fecha de nacimiento'],
  ['genero', 'Género'],
  ['oficio', 'Oficio'],
  ['departamento', 'Departamento'],
  ['municipio', 'Municipio'],
  ['domicilio', 'Domicilio'],
];

const PeopleManager = ({ people, onRemove, onUpdate }) => {
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState(null);
  const [values, setValues] = useState(null);
  const filtered = useMemo(() => {
    const value = query.trim().toLocaleLowerCase();
    return value
      ? people.filter((person) =>
          [person.nombre, person.apellido, person.documento, person.oficio]
            .join(' ')
            .toLocaleLowerCase()
            .includes(value)
        )
      : people;
  }, [people, query]);
  const save = async () => {
    if (PERSON_FIELDS.some(([field]) => !String(values[field] || '').trim()))
      return;
    if (await onUpdate(editing, values)) setEditing(null);
  };
  return (
    <Box>
      <DataCollectionHeader
        title="Personas"
        description="Clientes reutilizables identificados por DUI."
        count={people.length}
      />
      <TextField
        fullWidth
        label="Buscar por nombre, DUI u oficio"
        onChange={(event) => setQuery(event.target.value)}
        size="small"
        sx={{ mb: 1.5 }}
        value={query}
      />
      {filtered.length === 0 ? (
        <EmptyState>No se encontraron personas.</EmptyState>
      ) : (
        <Stack spacing={1} sx={{ maxHeight: 520, overflowY: 'auto', pr: 0.5 }}>
          {filtered.map((person) => (
            <SavedDataRow
              key={person.documento}
              title={`${person.nombre} ${person.apellido}`}
              subtitle={`${person.documento} · ${person.oficio}`}
              onEdit={() => {
                setEditing(person);
                setValues({ ...person });
              }}
              onRemove={() => onRemove(person)}
            />
          ))}
        </Stack>
      )}
      <Dialog
        fullWidth
        maxWidth="md"
        onClose={() => setEditing(null)}
        open={Boolean(editing)}
      >
        <DialogTitle>Editar persona</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0 }}>
            {values &&
              PERSON_FIELDS.map(([field, label]) => (
                <Grid
                  item
                  xs={12}
                  sm={field === 'domicilio' ? 12 : 6}
                  key={field}
                >
                  <TextField
                    fullWidth
                    label={label}
                    onChange={(event) =>
                      setValues({ ...values, [field]: event.target.value })
                    }
                    required
                    size="small"
                    value={values[field] || ''}
                  />
                </Grid>
              ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditing(null)}>Cancelar</Button>
          <Button onClick={save} variant="contained">
            Guardar cambios
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const BackupManager = ({ busy, createBackup, restoreBackup }) => {
  const choose = (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (
      file &&
      window.confirm(
        'Se reemplazarán los datos incluidos en el respaldo. ¿Deseas continuar?'
      )
    )
      restoreBackup(file);
  };
  return (
    <Box>
      <SectionHeader
        title="Respaldo y restauración"
        description="Guarda personas, vehículos, profesionales, colaboradores, historial, documentos y plantillas. La licencia no se exporta."
      />
      <SurfaceRow>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <Button
            disabled={Boolean(busy)}
            onClick={createBackup}
            variant="contained"
          >
            Descargar respaldo
          </Button>
          <Button component="label" disabled={Boolean(busy)} variant="outlined">
            Restaurar respaldo
            <input
              accept=".zip,application/zip"
              hidden
              onChange={choose}
              type="file"
            />
          </Button>
        </Stack>
      </SurfaceRow>
    </Box>
  );
};

const UpdateManager = ({ info, status, busy, check }) => (
  <Box>
    <SectionHeader
      title="Versión y actualizaciones"
      description="La comprobación requiere Internet; la instalación sigue siendo manual."
    />
    <SurfaceRow>
      <Stack
        alignItems={{ xs: 'stretch', sm: 'center' }}
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        spacing={1.5}
      >
        <Box>
          <Typography fontWeight={650} variant="body2">
            Versión instalada: {info?.version || '—'}
          </Typography>
          {status && (
            <Typography
              color={status.updateAvailable ? 'warning.main' : 'success.main'}
              variant="caption"
            >
              {status.updateAvailable
                ? `Nueva versión disponible: ${status.latestVersion}`
                : 'Central Docs está actualizado.'}
            </Typography>
          )}
        </Box>
        <Stack direction="row" spacing={1}>
          {status?.updateAvailable && (
            <Button href={status.releaseUrl} target="_blank">
              Descargar
            </Button>
          )}
          <Button
            disabled={busy === 'updates'}
            onClick={check}
            variant="outlined"
          >
            Buscar actualización
          </Button>
        </Stack>
      </Stack>
    </SurfaceRow>
  </Box>
);

const DiagnosticsManager = ({ settingsProps }) => (
  <Box>
    <SectionHeader
      title="Diagnóstico y soporte"
      description="Genera información técnica sanitizada, sin licencias, documentos ni datos de clientes."
    />
    <Stack
      alignItems={{ xs: 'stretch', md: 'center' }}
      direction={{ xs: 'column', md: 'row' }}
      justifyContent="space-between"
      spacing={2}
    >
      <Box sx={{ minWidth: 0 }}>
        <Typography color="text.secondary" variant="caption">
          Archivo de registro
        </Typography>
        <Typography sx={{ overflowWrap: 'anywhere' }} variant="body2">
          {settingsProps.diagnostics?.applicationLog ||
            'Ubicación no disponible'}
        </Typography>
      </Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
        <Button
          disabled={settingsProps.supportPackageLoading}
          onClick={settingsProps.downloadSupportPackage}
          size="small"
          variant="contained"
        >
          Descargar soporte
        </Button>
        <Button
          onClick={settingsProps.openLogsFolder}
          size="small"
          variant="outlined"
        >
          Abrir carpeta de logs
        </Button>
      </Stack>
    </Stack>
  </Box>
);

const AgentManager = ({ agents, loading, onCreate, onUpdate, onRemove }) => {
  const [editing, setEditing] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const value = query.trim().toLocaleLowerCase();
    return value
      ? agents.filter((agent) =>
          [agent.nombres, agent.apellidos, agent.carnet, agent.rol]
            .join(' ')
            .toLocaleLowerCase()
            .includes(value)
        )
      : agents;
  }, [agents, query]);
  const close = () => {
    setDialogOpen(false);
    setEditing(null);
  };
  const save = async (values) => {
    const saved = editing
      ? await onUpdate({ ...values, id: editing.id })
      : await onCreate(values);
    if (saved) close();
  };
  return (
    <Box>
      <DataCollectionHeader
        title="Profesionales y colaboradores"
        description="Directorio global de quienes preparan documentos y de los notarios que los autorizan."
        count={agents.length}
        action={
          <Button
            onClick={() => setDialogOpen(true)}
            size="small"
            variant="outlined"
          >
            Agregar
          </Button>
        }
      />
      <TextField
        fullWidth
        label="Buscar por nombre, carnet o rol"
        onChange={(event) => setQuery(event.target.value)}
        size="small"
        sx={{ mb: 1.5 }}
        value={query}
      />
      {loading ? (
        <Typography color="text.secondary" variant="body2">
          Cargando personas...
        </Typography>
      ) : filtered.length === 0 ? (
        <EmptyState>
          No se encontraron profesionales ni colaboradores.
        </EmptyState>
      ) : (
        <Stack spacing={1} sx={{ maxHeight: 520, overflowY: 'auto', pr: 0.5 }}>
          {filtered.map((agent) => (
            <SavedDataRow
              key={agent.id}
              title={[agent.nombres, agent.apellidos].filter(Boolean).join(' ')}
              subtitle={`${agent.distrito}, ${agent.municipio}`}
              badges={[
                agent.rol || 'Notario',
                ...(agent.carnet ? [`Carnet ${agent.carnet}`] : []),
              ]}
              onEdit={() => {
                setEditing(agent);
                setDialogOpen(true);
              }}
              onRemove={() => onRemove(agent)}
            />
          ))}
        </Stack>
      )}
      <Dialog fullWidth maxWidth="md" onClose={close} open={dialogOpen}>
        <DialogTitle>
          {editing ? 'Editar persona' : 'Nueva persona'}
        </DialogTitle>
        <DialogContent>
          <AgentStructure
            agent={editing}
            submitAction={save}
            buttons={[
              {
                color: 'primary',
                variant: 'outlined',
                type: 'button',
                text: 'Cancelar',
                action: close,
              },
              {
                color: 'primary',
                variant: 'contained',
                type: 'submit',
                text: editing ? 'Guardar cambios' : 'Guardar persona',
              },
            ]}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

const VehicleCatalogManager = ({ options, onRemove }) => (
  <Box>
    <SectionHeader
      title="Catálogo de vehículos"
      description="Valores sugeridos aprendidos al guardar vehículos."
    />
    <Stack spacing={3}>
      <VehicleOptionList
        title="Marcas"
        kind="brands"
        options={options.brands}
        onRemove={onRemove}
      />
      <VehicleOptionList
        title="Modelos"
        kind="models"
        options={options.models}
        onRemove={onRemove}
      />
      <VehicleOptionList
        title="Colores"
        kind="colors"
        options={options.colors}
        onRemove={onRemove}
      />
    </Stack>
  </Box>
);

const VIEW_DESCRIPTION = {
  general: 'Actualizaciones, respaldos y herramientas de soporte.',
  data: 'Personas y valores reutilizables guardados en este equipo.',
  templates:
    'Selecciona un documento para administrar sus bloques de texto legal.',
};

const SettingsPanel = ({ settingsProps }) => {
  const [view, setView] = useState('general');
  return (
    <Box>
      <SectionHeader
        title="Configuración"
        description="Elige una categoría para administrar Central Docs."
      />
      {settingsProps.error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {settingsProps.error}
        </Alert>
      )}
      <Box
        sx={{
          bgcolor: 'action.hover',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          mb: 3,
          px: 1,
          pt: 0.5,
        }}
      >
        <Tabs
          allowScrollButtonsMobile
          onChange={(_event, nextView) => setView(nextView)}
          value={view}
          variant="scrollable"
        >
          <Tab label="General" value="general" />
          <Tab label="Datos guardados" value="data" />
          <Tab label="Plantillas" value="templates" />
        </Tabs>
      </Box>
      <Typography color="text.secondary" sx={{ mb: 2 }} variant="body2">
        {VIEW_DESCRIPTION[view]}
      </Typography>

      {view === 'general' && (
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <SettingsCard>
              <UpdateManager
                info={settingsProps.applicationInfo}
                status={settingsProps.updateStatus}
                busy={settingsProps.busy}
                check={settingsProps.checkUpdates}
              />
            </SettingsCard>
          </Grid>
          <Grid item xs={12} lg={6}>
            <SettingsCard>
              <BackupManager
                busy={settingsProps.busy}
                createBackup={settingsProps.createBackup}
                restoreBackup={settingsProps.restoreBackup}
              />
            </SettingsCard>
          </Grid>
          <Grid item xs={12}>
            <SettingsCard>
              <DiagnosticsManager settingsProps={settingsProps} />
            </SettingsCard>
          </Grid>
        </Grid>
      )}

      {view === 'data' && (
        <Grid container spacing={2}>
          <Grid item xs={12} lg={7}>
            <SettingsCard>
              <PeopleManager
                people={settingsProps.people}
                onRemove={settingsProps.removePerson}
                onUpdate={settingsProps.updatePerson}
              />
            </SettingsCard>
          </Grid>
          <Grid item xs={12} lg={5}>
            <SettingsCard>
              <AgentManager
                agents={settingsProps.agents}
                loading={settingsProps.agentsLoading}
                onCreate={settingsProps.createAgent}
                onUpdate={settingsProps.updateAgent}
                onRemove={settingsProps.removeAgent}
              />
            </SettingsCard>
          </Grid>
          <Grid item xs={12}>
            <SettingsCard>
              <VehicleCatalogManager
                options={settingsProps.vehicleOptions}
                onRemove={settingsProps.removeVehicleOption}
              />
            </SettingsCard>
          </Grid>
        </Grid>
      )}

      {view === 'templates' && (
        <SettingsCard sx={{ maxWidth: 1000 }}>
          <DocumentTemplateSettings />
        </SettingsCard>
      )}
    </Box>
  );
};

export default SettingsPanel;
