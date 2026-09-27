import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { ReviewSection } from './DocumentReviewScaffold';

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
