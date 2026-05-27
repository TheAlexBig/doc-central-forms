import ButtonBase from '@mui/material/ButtonBase';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const AgentSection = ({
  agentProps = {
    data: [],
    save: () => {},
  },
  click = () => {},
  title = '',
}) => {
  const selectAgent = (index) => {
    agentProps.save(index);
    click();
  };

  return (
    <>
      <Typography variant="h5" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Seleccione al profesional que autenticará el documento.
      </Typography>
      <Stack sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
        {agentProps.data?.map((agent, index) => (
          <ButtonBase
            key={`agentId-${agent.id}`}
            onClick={() => selectAgent(index)}
            sx={{
              borderBottom: '1px solid',
              borderColor: 'divider',
              bgcolor: index % 2 ? '#f6f8fb' : 'background.paper',
              display: 'block',
              px: 2,
              py: 2.5,
              textAlign: 'left',
              width: '100%',
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
                  Notario
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
                <Typography
                  color="primary.main"
                  fontWeight={650}
                  textAlign={{ sm: 'right' }}
                >
                  Seleccionar
                </Typography>
              </Grid>
            </Grid>
          </ButtonBase>
        ))}
      </Stack>
    </>
  );
};

export default AgentSection;
