import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const emptyValue = 'No especificado';
const fullName = (person = {}) =>
  [person.nombre || person.nombres, person.apellido || person.apellidos]
    .filter(Boolean)
    .join(' ') || emptyValue;
const place = (values = {}) =>
  [values.domicilio || values.distrito, values.municipio, values.departamento]
    .filter(Boolean)
    .join(', ') || emptyValue;
const partyValues = (person) => [
  ['Nombre', fullName(person)],
  ['DUI', person.documento],
  ['Domicilio', place(person), true],
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
      sx={{ m: 0, overflowWrap: 'anywhere' }}
      variant="body2"
    >
      {value || emptyValue}
    </Typography>
  </Grid>
);

export default function MutualReview({ data, onEdit }) {
  const signingPlace = [
    data.terms.signingDistrict,
    data.terms.signingMunicipality,
    data.terms.signingState,
  ]
    .filter(Boolean)
    .join(', ');
  const sections = [
    {
      title: 'Responsables',
      accent: '#17695d',
      summary: fullName(data.agent),
      step: 0,
      values: [
        ['Preparado por', fullName(data.preparer)],
        ['Notario responsable', fullName(data.agent)],
        ['Domicilio del notario', place(data.agent), true],
      ],
    },
    {
      title: 'Deudor',
      accent: '#2f7c70',
      summary: `${fullName(data.debtor)} / ${data.debtor.documento || emptyValue}`,
      step: 1,
      values: partyValues(data.debtor),
    },
    {
      title: 'Acreedor',
      accent: '#8a6540',
      summary: `${fullName(data.creditor)} / ${data.creditor.documento || emptyValue}`,
      step: 2,
      values: partyValues(data.creditor),
    },
    {
      title: 'Condiciones del mutuo',
      accent: '#52766e',
      summary: `$${data.terms.amount || emptyValue} / ${data.terms.term || emptyValue}`,
      step: 3,
      values: [
        ['Monto mutuado', data.terms.amount && `$${data.terms.amount}`],
        ['Plazo', data.terms.term],
        ['Fecha de vencimiento', data.terms.dueDate],
        ['Número de cuotas', data.terms.installmentCount],
        [
          'Monto por cuota',
          data.terms.installmentAmount && `$${data.terms.installmentAmount}`,
        ],
        ['Banco para el pago', data.terms.paymentBank],
        ['Número de cuenta', data.terms.paymentAccount],
        [
          'Interés mensual',
          data.terms.monthlyInterest && `${data.terms.monthlyInterest}%`,
        ],
        [
          'Interés por mora',
          data.terms.defaultInterest && `${data.terms.defaultInterest}%`,
        ],
        ['Destino de los fondos', data.terms.fundsPurpose, true],
        [
          'Garantía con letra de cambio',
          data.terms.billOfExchangeGuarantee ? 'Sí' : 'No',
        ],
        ...(data.terms.billOfExchangeGuarantee
          ? [['Vencimiento de la garantía', data.terms.guaranteeDueDate]]
          : []),
        [
          'Gastos administrativos',
          data.terms.administrativeExpenses &&
            `${data.terms.administrativeExpenses}%`,
        ],
        ['Domicilio especial', data.terms.specialDomicile, true],
        ['Lugar de firma', signingPlace, true],
        ['Fecha y hora', `${data.terms.signingDate} ${data.terms.signingTime}`],
        ['Conoce al deudor', data.terms.identifiesDebtor],
        ['Conoce al acreedor', data.terms.identifiesCreditor],
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
          <Box>
            <Typography color="text.secondary" fontWeight={650} variant="body2">
              Resumen del documento
            </Typography>
            <Typography component="h3" fontWeight={750} variant="h5">
              {fullName(data.creditor)} presta a {fullName(data.debtor)}
            </Typography>
          </Box>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            <Chip
              label={`Monto: $${data.terms.amount || emptyValue}`}
              size="small"
              sx={{ bgcolor: 'background.paper' }}
            />
            <Chip
              label={`Vencimiento: ${data.terms.dueDate || emptyValue}`}
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
              <Box>
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
              variant="outlined"
            >
              Editar
            </Button>
          </Stack>
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
}
