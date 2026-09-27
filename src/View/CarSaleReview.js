import Box from '@mui/material/Box';
import { ReviewSection, ReviewSummary } from './DocumentReviewScaffold';

const emptyValue = 'Pendiente';

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
      <ReviewSummary
        title={`${data.vehiculo.placa || emptyValue} / ${fullName(data.vendedor)} a ${fullName(data.comprador)}`}
        chips={[
          `Precio: ${data.documento.precio || emptyValue}`,
          `Firma: ${data.documento.fecha_firma || emptyValue}`,
        ]}
      />
      {sections.map((section, index) => (
        <ReviewSection
          key={section.title}
          number={index + 1}
          title={section.title}
          summary={section.summary}
          rows={section.values}
          onEdit={() => onEdit(section.step)}
        />
      ))}
    </Box>
  );
};

export default CarSaleReview;
