import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const emptyValue = 'No especificado';

const fullName = (person = {}) =>
  [person.nombre, person.apellido].filter(Boolean).join(' ') || emptyValue;

const place = (values = {}) =>
  [values.domicilio, values.municipio, values.departamento]
    .filter(Boolean)
    .join(', ') || emptyValue;

const personValues = (person) => [
  ['Nombre', fullName(person)],
  ['DUI', person.documento],
  ['Domicilio', place(person)],
  ['Oficio', person.oficio],
];

const ReviewField = ({ label, value, wide = false }) => (
  <Grid item xs={12} sm={wide ? 12 : 6}>
    <Typography
      color="text.secondary"
      component="dt"
      fontWeight={650}
      sx={{ mb: 0.4 }}
      variant="caption"
    >
      {label}
    </Typography>
    <Typography
      component="dd"
      sx={{
        m: 0,
        overflowWrap: 'anywhere',
      }}
      variant="body2"
    >
      {value || emptyValue}
    </Typography>
  </Grid>
);

const SectionHeader = ({ index, section, onEdit }) => (
  <Stack
    alignItems={{ xs: 'flex-start', sm: 'center' }}
    direction={{ xs: 'column', sm: 'row' }}
    justifyContent="space-between"
    spacing={1.5}
    sx={{ mb: 2 }}
  >
    <Stack alignItems="center" direction="row" spacing={1.5}>
      <Box
        sx={{
          alignItems: 'center',
          bgcolor: section.accent,
          borderRadius: 1,
          color: 'white',
          display: 'flex',
          flexShrink: 0,
          fontSize: 13,
          fontWeight: 800,
          height: 34,
          justifyContent: 'center',
          width: 34,
        }}
      >
        {index + 1}
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography component="h3" fontWeight={750} variant="h6">
          {section.title}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {section.summary}
        </Typography>
      </Box>
    </Stack>
    <Button
      onClick={() => onEdit(section.step)}
      size="small"
      sx={{ flexShrink: 0 }}
      variant="outlined"
    >
      Editar
    </Button>
  </Stack>
);

const CarSaleReview = ({ data, onEdit }) => {
  const vehicleTitle =
    [data.vehiculo.marca, data.vehiculo.modelo].filter(Boolean).join(' ') ||
    emptyValue;

  const heavyTruckValues =
    data.vehiculo.clase?.toLocaleLowerCase() === 'camión pesado'
      ? [
          ['Ejes', data.vehiculo.ejes],
          ['Tara', data.vehiculo.tara],
          ['Tipo de capacidad', data.vehiculo.tipo_capacidad],
          ['Capacidad de carga', data.vehiculo.cap_carga],
          ['Capacidad máxima', data.vehiculo.cap_maxima],
        ]
      : [];
  const sections = [
    {
      title: 'Responsables',
      accent: '#17695d',
      summary: fullName(data.agente_juridico),
      step: 0,
      values: [
        ['Preparado por', fullName(data.preparado_por) || 'No especificado'],
        ['Notario responsable', fullName(data.agente_juridico)],
        ['Domicilio del notario', place(data.agente_juridico), true],
      ],
    },
    {
      title: 'Comprador',
      accent: '#2f7c70',
      summary: `${fullName(data.comprador)} / ${data.comprador.documento || emptyValue}`,
      step: 1,
      values: personValues(data.comprador),
    },
    {
      title: 'Vehículo',
      accent: '#b37d24',
      summary: `${data.vehiculo.placa || emptyValue} / ${vehicleTitle}`,
      step: 2,
      values: [
        ['Placa', data.vehiculo.placa],
        ['Marca y modelo', vehicleTitle],
        ['Color', data.vehiculo.color],
        ['Año de fabricación', data.vehiculo.fabricado],
        ['Clase / tipo', `${data.vehiculo.clase} / ${data.vehiculo.tipo}`],
        ...(heavyTruckValues.length
          ? []
          : [['Capacidad', data.vehiculo.capacidad]]),
        ...heavyTruckValues,
        ...(data.vehiculo.traccion
          ? [['Tracción', data.vehiculo.traccion]]
          : []),
        ['Motor', data.vehiculo.num_motor],
        ['Chasis', data.vehiculo.num_chasis],
        ['VIN', data.vehiculo.num_vin],
      ],
    },
    {
      title: 'Vendedor',
      accent: '#8a6540',
      summary: `${fullName(data.vendedor)} / ${data.vendedor.documento || emptyValue}`,
      step: 3,
      values: personValues(data.vendedor),
    },
    {
      title: 'Firma y venta',
      accent: '#52766e',
      summary: `${data.documento.precio || emptyValue} DÓLARES`,
      step: 4,
      values: [
        ['Precio en el documento', `${data.documento.precio} DÓLARES`],
        ['Firma', `${data.documento.fecha_firma} ${data.documento.hora_firma}`],
        ['Lugar', place(data.documento), true],
        ['Conoce al vendedor', data.documento.identifica_vendedor],
        ['Conoce al comprador', data.documento.identifica_comprador],
      ],
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          bgcolor: '#f4f8f5',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          mb: 2.5,
          px: { xs: 2, md: 2.5 },
          py: 2,
        }}
      >
        <Stack
          alignItems={{ xs: 'flex-start', md: 'center' }}
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          spacing={2}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography color="text.secondary" fontWeight={650} variant="body2">
              Resumen del documento
            </Typography>
            <Typography component="h3" fontWeight={750} variant="h5">
              {data.vehiculo.placa || emptyValue} / {fullName(data.vendedor)} a{' '}
              {fullName(data.comprador)}
            </Typography>
          </Box>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            <Chip
              label={`Precio: ${data.documento.precio || emptyValue}`}
              size="small"
              sx={{ bgcolor: 'background.paper' }}
            />
            <Chip
              label={`Firma: ${data.documento.fecha_firma || emptyValue}`}
              size="small"
              sx={{ bgcolor: 'background.paper' }}
            />
          </Stack>
        </Stack>
      </Box>
      {sections.map((section, index) => (
        <Box
          key={section.title}
          sx={{
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            mb: 2,
            px: { xs: 2, md: 2.5 },
            py: 2.5,
          }}
        >
          <SectionHeader index={index} section={section} onEdit={onEdit} />
          <Divider sx={{ mb: 2 }} />
          <Grid
            columnSpacing={{ xs: 2, md: 3 }}
            component="dl"
            container
            rowSpacing={1.75}
            sx={{ m: 0 }}
          >
            {section.values.map(([label, value, wide]) => (
              <ReviewField
                key={label}
                label={label}
                value={value}
                wide={wide}
              />
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default CarSaleReview;
