import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AgentStructure from '../Structure/AgentStructure';

const AgentSection = ({
  agentProps = {
    data: [],
    loading: false,
    error: '',
    save: () => {},
    create: () => {},
    update: () => {},
    remove: () => {},
  },
  click = () => {},
  title = '',
}) => {
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);

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
              text: editing ? 'Guardar cambios' : 'Guardar agente',
            },
          ]}
        />
      </>
    );
  }

  return (
    <>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 1 }}
      >
        <Typography variant="h5">{title}</Typography>
        <Button variant="outlined" onClick={() => setAdding(true)}>
          Agregar agente
        </Button>
      </Stack>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Seleccione al profesional que autenticará el documento. Los agentes
        registrados se guardan solamente en este equipo.
      </Typography>
      {agentProps.error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {agentProps.error}
        </Alert>
      )}
      {agentProps.loading && (
        <Stack direction="row" spacing={1.5} alignItems="center">
          <CircularProgress size={20} />
          <Typography color="text.secondary">Cargando agentes...</Typography>
        </Stack>
      )}
      {!agentProps.loading && agentProps.data.length === 0 && (
        <Alert severity="info">
          No hay agentes registrados. Agregue el primer agente para continuar.
        </Alert>
      )}
      <Stack sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
        {agentProps.data?.map((agent, index) => (
          <Box
            key={agent.id}
            sx={{
              borderBottom: '1px solid',
              borderColor: 'divider',
              bgcolor: index % 2 ? '#f6f8fb' : 'background.paper',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ButtonBase
              onClick={() => selectAgent(agent)}
              sx={{
                display: 'block',
                flex: 1,
                px: 2,
                py: 2.5,
                textAlign: 'left',
                '&:hover': { bgcolor: '#edf2ff' },
              }}
            >
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} sm={3}>
                  <Typography
                    color="primary.main"
                    fontWeight={700}
                    variant="overline"
                  >
                    {agent.rol || 'Notario'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography fontWeight={650}>
                    {agent.nombres} {agent.apellidos}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Carnet: {agent.carnet} | Distrito de {agent.distrito},{' '}
                    {agent.municipio}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
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
              sx={{ ml: 1 }}
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
