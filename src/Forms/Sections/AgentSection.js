import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AgentStructure from '../Structure/AgentStructure';
import { FormHeading } from '../Structure/FormScaffold';
import { isNotary } from '../CarSaleRules';

const agentName = (agent) =>
  [agent.nombres, agent.apellidos].filter(Boolean).join(' ');

const AgentSection = ({
  agentProps = {
    data: [],
    loading: false,
    error: '',
    selected: '',
    preparer: '',
    save: () => {},
    savePreparer: () => {},
    create: () => {},
    update: () => {},
    remove: () => {},
  },
  click = () => {},
  title = '',
}) => {
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);
  const notaries = agentProps.data.filter(isNotary);

  const selectAgent = (agent) => {
    agentProps.save(agent);
    click();
  };

  const saveAgent = async (values) => {
    const saved = editing
      ? await agentProps.update({ ...values, id: editing.id })
      : await agentProps.create(values);
    if (saved) {
      setAdding(false);
      setEditing(null);
    }
  };

  if (adding) {
    return (
      <>
        {agentProps.error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {agentProps.error}
          </Alert>
        )}
        <AgentStructure
          allowedRoles={['Notario']}
          agent={editing}
          submitAction={saveAgent}
          buttons={[
            {
              color: 'primary',
              variant: 'outlined',
              type: 'button',
              text: 'Cancelar',
              action: () => {
                setAdding(false);
                setEditing(null);
              },
            },
            {
              color: 'primary',
              variant: 'contained',
              type: 'submit',
              text: editing ? 'Guardar cambios' : 'Guardar persona',
            },
          ]}
        />
      </>
    );
  }

  return (
    <>
      <FormHeading
        title={title}
        description="Identifique quién prepara el documento y seleccione al notario que lo revisará, aprobará y autorizará."
        eyebrow="Responsabilidad del documento"
        summary={[{ label: 'Notarios disponibles', value: notaries.length }]}
      />
      <Box
        sx={{
          bgcolor: '#f4f8f5',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          mb: 3,
          p: 2,
        }}
      >
        <Typography component="h2" fontWeight={700} sx={{ mb: 0.5 }}>
          Preparado por
        </Typography>
        <Typography color="text.secondary" variant="body2" sx={{ mb: 1.5 }}>
          Dato opcional para control interno. Esta persona no autoriza la
          auténtica ni aparece en su texto legal.
        </Typography>
        <TextField
          fullWidth
          label="Responsable de preparación"
          onChange={(event) =>
            agentProps.savePreparer(
              agentProps.data.find((agent) => agent.id === event.target.value)
            )
          }
          select
          size="small"
          value={agentProps.preparer?.id || ''}
        >
          <MenuItem value="">Sin especificar</MenuItem>
          {agentProps.data.map((agent) => (
            <MenuItem key={agent.id} value={agent.id}>
              {agentName(agent)} — {agent.rol}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Stack
        alignItems={{ xs: 'stretch', sm: 'center' }}
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        spacing={1.5}
        sx={{ mb: 2 }}
      >
        <Typography color="text.secondary" fontWeight={650} variant="body2">
          Notario responsable
        </Typography>
        <Button variant="outlined" onClick={() => setAdding(true)}>
          Agregar notario
        </Button>
      </Stack>
      {agentProps.error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {agentProps.error}
        </Alert>
      )}
      {agentProps.loading && (
        <Stack direction="row" spacing={1.5} alignItems="center">
          <CircularProgress size={20} />
          <Typography color="text.secondary">
            Cargando responsables...
          </Typography>
        </Stack>
      )}
      {!agentProps.loading && notaries.length === 0 && (
        <Alert severity="info">
          No hay notarios registrados. Agregue un notario para continuar.
        </Alert>
      )}
      <Stack spacing={1.5}>
        {notaries.map((agent, index) => (
          <Box
            key={agent.id}
            sx={{
              bgcolor:
                agentProps.selected?.id === agent.id
                  ? '#e7f3ed'
                  : index % 2
                    ? '#f8faf7'
                    : 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              display: 'flex',
              alignItems: { xs: 'stretch', sm: 'center' },
              flexDirection: { xs: 'column', sm: 'row' },
              overflow: 'hidden',
            }}
          >
            <ButtonBase
              onClick={() => selectAgent(agent)}
              sx={{
                display: 'block',
                flex: 1,
                px: 2,
                py: 2,
                textAlign: 'left',
                '&:hover': { bgcolor: '#e7f3ed' },
              }}
            >
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} sm="auto">
                  <Box
                    sx={{
                      alignItems: 'center',
                      bgcolor: '#17695d',
                      borderRadius: 1,
                      color: 'white',
                      display: 'flex',
                      fontWeight: 800,
                      height: 36,
                      justifyContent: 'center',
                      width: 36,
                    }}
                  >
                    {index + 1}
                  </Box>
                </Grid>
                <Grid item xs={12} sm>
                  <Stack
                    direction="row"
                    flexWrap="wrap"
                    gap={1}
                    sx={{ mb: 0.5 }}
                  >
                    <Chip label={agent.rol || 'Notario'} size="small" />
                    {agent.carnet && (
                      <Chip label={`Carnet ${agent.carnet}`} size="small" />
                    )}
                  </Stack>
                  <Typography fontWeight={700}>{agentName(agent)}</Typography>
                  <Typography color="text.secondary" variant="body2">
                    Distrito de {agent.distrito || 'No especificado'},{' '}
                    {agent.municipio || 'No especificado'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm="auto">
                  <Typography color="primary.main" fontWeight={650}>
                    Seleccionar
                  </Typography>
                </Grid>
              </Grid>
            </ButtonBase>
            <Button
              onClick={() => {
                setEditing(agent);
                setAdding(true);
              }}
              sx={{ ml: { sm: 1 } }}
            >
              Editar
            </Button>
            <Button
              color="error"
              onClick={() => agentProps.remove(agent)}
              sx={{ mx: 1 }}
            >
              Eliminar
            </Button>
          </Box>
        ))}
      </Stack>
    </>
  );
};

export default AgentSection;
