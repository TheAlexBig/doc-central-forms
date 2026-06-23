import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const labels = {
  apellido: 'Apellido',
  apellidos: 'Apellidos',
  carnet: 'Carnet',
  calidad_de: 'Calidad de',
  capacidad: 'Capacidad',
  clase: 'Clase',
  color: 'Color',
  departamento: 'Departamento',
  documento: 'DUI',
  domicilio: 'Distrito',
  edad: 'Edad',
  fecha_firma: 'Fecha de firma',
  fecha_nacimiento: 'Fecha de nacimiento',
  genero: 'Género',
  hora_firma: 'Hora de firma',
  identifica_a: 'Identifica a',
  institucion: 'Institución',
  marca: 'Marca',
  modelo: 'Modelo',
  municipio: 'Municipio',
  nombre: 'Nombre',
  nombres: 'Nombres',
  num_chasis: 'Número de chasis',
  num_motor: 'Número de motor',
  num_vin: 'Número VIN',
  oficio: 'Oficio o profesión',
  placa: 'Placa',
  precio: 'Precio',
  tipo: 'Tipo',
};

const PropertyViewItem = ({ label, value }) => (
  <Grid item xs={12} sm={6}>
    <Typography color="text.secondary" variant="caption">
      {labels[label] || label}
    </Typography>
    <Typography fontWeight={500} variant="body1">
      {value || 'No especificado'}
    </Typography>
  </Grid>
);

export default PropertyViewItem;
