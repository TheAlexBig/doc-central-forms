import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
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
              text: editing ? 'Guardar cambios' : 'Guardar agente',
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
        description="Seleccione al notario que autenticará el documento. Los abogados permanecen disponibles en el directorio global, pero no pueden autorizar una auténtica."
        eyebrow="Profesional responsable"
        summary={[{ label: 'Notarios disponibles', value: notaries.length }]}
      />
      <Stack
        alignItems={{ xs: 'stretch', sm: 'center' }}
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        spacing={1.5}
        sx={{ mb: 2 }}
      >
        <Typography color="text.secondary" fontWeight={650} variant="body2">
          Directorio de agentes
        </Typography>
        <Button variant="outlined" onClick={() => setAdding(true)}>
          Agregar agente
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
          <Typography color="text.secondary">Cargando agentes...</Typography>
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
              bgcolor: index % 2 ? '#fbfdff' : 'background.paper',
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
                '&:hover': { bgcolor: '#f1f5ff' },
              }}
            >
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} sm="auto">
                  <Box
                    sx={{
                      alignItems: 'center',
                      bgcolor: '#1f6f5f',
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
