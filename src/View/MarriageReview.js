import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const name = (person) =>
  [person?.nombre || person?.nombres, person?.apellido || person?.apellidos]
    .filter(Boolean)
    .join(' ');
const regime = {
  COMMUNITY_DEFERRED: 'Comunidad diferida',
  SEPARATION_OF_PROPERTY: 'Separación de bienes',
  PARTICIPATION_IN_GAINS: 'Participación en las ganancias',
};
const status = {
  SINGLE: 'Soltero',
  DIVORCED: 'Divorciado',
  WIDOWED: 'Viudo',
  MARRIED: 'Casado',
};
const date = (value) =>
  value
    ? new Intl.DateTimeFormat('es-SV', { dateStyle: 'long' }).format(
        new Date(value + 'T00:00:00')
      )
    : 'Pendiente';

const ReviewSection = ({ number, title, summary, rows, onEdit }) => (
  <Box
    sx={{
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 2,
      mb: 2,
      overflow: 'hidden',
    }}
  >
    <Stack
      alignItems="center"
      direction="row"
      justifyContent="space-between"
      sx={{
        bgcolor: 'action.hover',
        borderBottom: '1px solid',
        borderColor: 'divider',
        px: 2,
        py: 1.5,
      }}
    >
      <Stack alignItems="center" direction="row" spacing={1.5}>
        <Box
          sx={{
            bgcolor: 'primary.main',
            borderRadius: 1,
            color: 'white',
            fontWeight: 750,
            px: 1.25,
            py: 0.5,
          }}
        >
          {number}
        </Box>
        <Box>
          <Typography fontWeight={700}>{title}</Typography>
          <Typography color="text.secondary" variant="caption">
            {summary}
          </Typography>
        </Box>
      </Stack>
      <Button onClick={onEdit} size="small">
        Editar
      </Button>
    </Stack>
    <Grid container spacing={0} sx={{ p: 2 }}>
      {rows.map(([label, value]) => (
        <Grid item xs={12} sm={6} md={4} key={label} sx={{ mb: 1.25 }}>
          <Typography color="text.secondary" variant="caption">
            {label}
          </Typography>
          <Typography variant="body2">{value || 'Pendiente'}</Typography>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default function MarriageReview({ data, onEdit }) {
  const sections = [
    [
      'Responsables',
      name(data.agent),
      [
        ['Notario', name(data.agent)],
        ['Preparado por', name(data.preparer) || 'No especificado'],
      ],
    ],
    [
      'Contrayente 1',
      name(data.partyOne),
      [
        ['Persona', name(data.partyOne)],
        ['DUI o pasaporte', data.partyOne.documento],
        ['Estado familiar', status[data.partyOne.familyStatus]],
        ['Nacionalidad', data.partyOne.nationality],
        ['Partida expedida', date(data.partyOne.birthCertificateIssueDate)],
        ['Padres', data.partyOne.motherName + ' / ' + data.partyOne.fatherName],
      ],
    ],
    [
      'Contrayente 2',
      name(data.partyTwo),
      [
        ['Persona', name(data.partyTwo)],
        ['DUI o pasaporte', data.partyTwo.documento],
        ['Estado familiar', status[data.partyTwo.familyStatus]],
        ['Nacionalidad', data.partyTwo.nationality],
        ['Partida expedida', date(data.partyTwo.birthCertificateIssueDate)],
        ['Padres', data.partyTwo.motherName + ' / ' + data.partyTwo.fatherName],
      ],
    ],
    [
      'Régimen y decisiones',
      regime[data.details.propertyRegime],
      [
        ['Régimen', regime[data.details.propertyRegime]],
        ['Capitulaciones', data.details.capitulations ? 'Sí' : 'No'],
        ['Nombre posterior', data.details.marriedName || 'Conserva apellidos'],
        ['Hijos reconocidos', String(data.recognizedChildren.length)],
        ['Por poder', data.details.marriageByProxy ? 'Sí' : 'No'],
        [
          'Intérprete',
          !data.partyOne.speaksSpanish || !data.partyTwo.speaksSpanish
            ? name(data.details.interpreter)
            : 'No requerido',
        ],
      ],
    ],
    [
      'Testigos',
      data.witnesses.length + ' registrados',
      data.witnesses.map((witness, index) => [
        'Testigo ' + (index + 1),
        name(witness) + ' · ' + witness.documento,
      ]),
    ],
    [
      'Acta y celebración',
      date(data.details.celebrationDate),
      [
        [
          'Acta prematrimonial',
          date(data.details.premaritalDate) +
            ' · ' +
            data.details.premaritalTime,
        ],
        ['Lugar del acta', data.details.premaritalDistrict],
        ['Escritura', data.details.deedNumber],
        [
          'Celebración',
          date(data.details.celebrationDate) +
            ' · ' +
            data.details.celebrationTime,
        ],
        ['Lugar', data.details.celebrationDistrict],
        ['Salida', 'Acta, escritura y control registral'],
      ],
    ],
  ];
  return (
    <Box>
      <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 2 }}>
        <Chip label="Acta prematrimonial" size="small" />
        <Chip label="Escritura matriz" size="small" />
        <Chip label="Control registral" size="small" />
      </Stack>
      {sections.map(([title, summary, rows], index) => (
        <ReviewSection
          key={title}
          number={index + 1}
          title={title}
          summary={summary}
          rows={rows}
          onEdit={() => onEdit(index)}
        />
      ))}
    </Box>
  );
}
