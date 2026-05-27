import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const personValues = (person) => [
  ['Nombre', `${person.nombre} ${person.apellido}`],
  ['DUI', person.documento],
  ['NIT', person.nit],
  ['Domicilio', `${person.domicilio}, ${person.departamento}`],
  ['Oficio', person.oficio],
];

const CarSaleReview = ({ data, onEdit }) => {
  const sections = [
    {
      title: 'Notario',
      step: 0,
      values: [
        [
          'Nombre',
          `${data.agente_juridico.nombre} ${data.agente_juridico.apellido}`,
        ],
        [
          'Domicilio',
          `${data.agente_juridico.domicilio}, ${data.agente_juridico.departamento}`,
        ],
      ],
    },
    { title: 'Comprador', step: 1, values: personValues(data.comprador) },
    {
      title: 'Vehículo',
      step: 2,
      values: [
        ['Placa', data.vehiculo.placa],
        ['Descripción', `${data.vehiculo.marca} ${data.vehiculo.modelo}`],
        ['Color', data.vehiculo.color],
        ['Fabricación', data.vehiculo.fabricado],
        [
          'Clase / capacidad',
          `${data.vehiculo.clase} / ${data.vehiculo.capacidad}`,
        ],
        ['Motor', data.vehiculo.num_motor],
        ['Chasis', data.vehiculo.num_chasis],
        ['VIN', data.vehiculo.num_vin],
      ],
    },
    { title: 'Vendedor', step: 3, values: personValues(data.vendedor) },
    {
      title: 'Firma y venta',
      step: 4,
      values: [
        ['Precio en el documento', `${data.documento.precio} DÓLARES`],
        ['Firma', `${data.documento.fecha_firma} ${data.documento.hora_firma}`],
        [
          'Lugar',
          `${data.documento.domicilio}, ${data.documento.departamento}`,
        ],
        ['Conoce al vendedor', data.documento.identifica_vendedor],
        ['Conoce al comprador', data.documento.identifica_comprador],
      ],
    },
  ];

  return (
    <Box sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
      {sections.map((section, index) => (
        <Grid
          container
          key={section.title}
          sx={{
            bgcolor: index % 2 ? '#f6f8fb' : 'background.paper',
            borderBottom: '1px solid',
            borderColor: 'divider',
            px: { xs: 2, md: 2.5 },
            py: 3,
          }}
          spacing={{ xs: 2, md: 4 }}
        >
          <Grid item xs={12} md={3}>
            <Typography component="h3" variant="h6" sx={{ mb: 1 }}>
              {section.title}
            </Typography>
            <Button
              size="small"
              onClick={() => onEdit(section.step)}
              sx={{ px: 0 }}
            >
              Editar sección
            </Button>
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container columnSpacing={4} rowSpacing={2}>
              {section.values.map(([label, value]) => (
                <Grid item xs={12} sm={6} key={label}>
                  <Typography color="text.secondary" variant="caption">
                    {label}
                  </Typography>
                  <Typography fontWeight={500} variant="body1">
                    {value || 'No especificado'}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default CarSaleReview;
