import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { DataTerritorialDivision } from '../../Data/DataTerritorialDivision';
import GetAge from '../../Functions/GetAge';
import { emptyMarriageWitness } from '../MarriageState';
import { FieldGroup, FormActions, FormHeading } from './FormScaffold';

const actions = (back) => [
  { type: 'button', text: 'Atrás', variant: 'outlined', action: back },
  { type: 'submit', text: 'Guardar y continuar', variant: 'contained' },
];

const update = (setValues, name) => (event) => {
  const value =
    event.target.type === 'checkbox'
      ? event.target.checked
      : event.target.value;
  setValues((current) => ({ ...current, [name]: value }));
};

const PersonFields = ({
  values,
  setValues,
  people = [],
  identityFlexible = false,
}) => {
  const load = (event) => {
    const person = people.find((item) => item.id === event.target.value);
    if (person)
      setValues((current) => ({
        ...current,
        ...person,
        edad: GetAge(person.fecha_nacimiento),
      }));
  };
  const municipalities = Object.keys(
    DataTerritorialDivision[values.departamento] || {}
  );
  const districts =
    DataTerritorialDivision[values.departamento]?.[values.municipio] || [];
  return (
    <>
      {people.length > 0 && (
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Cargar persona guardada"
            onChange={load}
            select
            size="small"
            value=""
          >
            {people.map((person) => (
              <MenuItem key={person.id || person.documento} value={person.id}>
                {person.nombre} {person.apellido} — {person.documento}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      )}
      {[
        ['nombre', 'Nombres'],
        ['apellido', 'Apellidos'],
        ['oficio', 'Profesión u oficio'],
      ].map(([name, label]) => (
        <Grid item xs={12} sm={name === 'oficio' ? 12 : 6} key={name}>
          <TextField
            fullWidth
            required
            label={label}
            value={values[name]}
            onChange={update(setValues, name)}
          />
        </Grid>
      ))}
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          required
          type="date"
          label="Fecha de nacimiento"
          InputLabelProps={{ shrink: true }}
          value={values.fecha_nacimiento}
          onChange={(event) =>
            setValues((current) => ({
              ...current,
              fecha_nacimiento: event.target.value,
              edad: GetAge(event.target.value),
            }))
          }
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          required
          select
          label="Género"
          value={values.genero}
          onChange={update(setValues, 'genero')}
        >
          <MenuItem value="Femenino">Femenino</MenuItem>
          <MenuItem value="Masculino">Masculino</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          required
          label="Documento de identidad"
          helperText={
            identityFlexible
              ? 'DUI, pasaporte u otro documento'
              : 'Formato DUI: 00000000-0'
          }
          value={values.documento}
          onChange={update(setValues, 'documento')}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          required
          select
          label="Departamento"
          value={values.departamento}
          onChange={(event) =>
            setValues((current) => ({
              ...current,
              departamento: event.target.value,
              municipio: '',
              domicilio: '',
            }))
          }
        >
          {Object.keys(DataTerritorialDivision).map((option) => (
            <MenuItem value={option} key={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          required
          select
          disabled={!values.departamento}
          label="Municipio"
          value={values.municipio}
          onChange={(event) =>
            setValues((current) => ({
              ...current,
              municipio: event.target.value,
              domicilio: '',
            }))
          }
        >
          {municipalities.map((option) => (
            <MenuItem value={option} key={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          required
          select
          disabled={!values.municipio}
          label="Distrito"
          value={values.domicilio}
          onChange={update(setValues, 'domicilio')}
        >
          {districts.map((option) => (
            <MenuItem value={option} key={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </>
  );
};

export function MarriagePartyStructure({
  title,
  values,
  setValues,
  people,
  savePerson,
  premaritalDate,
  onBack,
  onNext,
}) {
  const submit = async (event) => {
    event.preventDefault();
    const saved = await savePerson(values);
    if (saved !== false) onNext();
  };
  return (
    <form onSubmit={submit}>
      <FormHeading
        title={title}
        eyebrow="Contrayente"
        description="Datos personales, filiación y documentos del expediente."
      />
      <FieldGroup title="Datos personales">
        <Grid container spacing={2}>
          <PersonFields
            values={values}
            setValues={setValues}
            people={people}
            identityFlexible
          />
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              required
              select
              label="Estado familiar"
              value={values.familyStatus}
              onChange={update(setValues, 'familyStatus')}
            >
              <MenuItem value="SINGLE">Soltero</MenuItem>
              <MenuItem value="DIVORCED">Divorciado</MenuItem>
              <MenuItem value="WIDOWED">Viudo</MenuItem>
              <MenuItem value="MARRIED">Casado con vínculo vigente</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              required
              label="Nacionalidad"
              value={values.nationality}
              onChange={update(setValues, 'nationality')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              required
              label="Lugar de nacimiento"
              value={values.birthPlace}
              onChange={update(setValues, 'birthPlace')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              required
              label="Tipo de identificación"
              value={values.identityType}
              onChange={update(setValues, 'identityType')}
            />
          </Grid>
          {['DIVORCED', 'WIDOWED'].includes(values.familyStatus) && (
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                required
                label={
                  values.familyStatus === 'DIVORCED'
                    ? 'Certificación de divorcio o sentencia de nulidad'
                    : 'Certificación de defunción del cónyuge anterior'
                }
                value={values.familyStatusDocument}
                onChange={update(setValues, 'familyStatusDocument')}
              />
            </Grid>
          )}
        </Grid>
      </FieldGroup>
      <FieldGroup title="Padres">
        <Grid container spacing={2}>
          {[
            ['motherName', 'Nombre de la madre'],
            ['motherJob', 'Oficio de la madre'],
            ['motherSettlement', 'Domicilio de la madre'],
            ['fatherName', 'Nombre del padre'],
            ['fatherJob', 'Oficio del padre'],
            ['fatherSettlement', 'Domicilio del padre'],
          ].map(([name, label]) => (
            <Grid item xs={12} sm={6} key={name}>
              <TextField
                fullWidth
                required
                label={label}
                value={values[name]}
                onChange={update(setValues, name)}
              />
            </Grid>
          ))}
        </Grid>
      </FieldGroup>
      <FieldGroup
        title="Partida de nacimiento"
        description="Debe haberse expedido dentro de los dos meses anteriores al acta prematrimonial."
      >
        <Grid container spacing={2}>
          {[
            ['birthCertificateNumber', 'Número', true],
            ['birthCertificateFolio', 'Folio', false],
            ['birthCertificateBook', 'Libro', false],
            ['birthCertificateRegistry', 'Registro del Estado Familiar', true],
            ['birthCertificateIssuedBy', 'Expedida por', true],
          ].map(([name, label, required]) => (
            <Grid
              item
              xs={12}
              sm={name.includes('Registry') || name.includes('Issued') ? 6 : 4}
              key={name}
            >
              <TextField
                fullWidth
                required={required}
                label={label}
                value={values[name]}
                onChange={update(setValues, name)}
              />
            </Grid>
          ))}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              type="date"
              label="Fecha de expedición"
              inputProps={{ max: premaritalDate }}
              InputLabelProps={{ shrink: true }}
              value={values.birthCertificateIssueDate}
              onChange={update(setValues, 'birthCertificateIssueDate')}
            />
          </Grid>
        </Grid>
      </FieldGroup>
      <FieldGroup
        title="Validación legal"
        description="Marque únicamente situaciones que existan. Revisión final corresponde al notario."
      >
        <Stack>
          <FormControlLabel
            control={
              <Checkbox
                checked={values.canConsent}
                onChange={update(setValues, 'canConsent')}
              />
            }
            label="Puede expresar consentimiento inequívoco"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.speaksSpanish}
                onChange={update(setValues, 'speaksSpanish')}
              />
            }
            label="Se expresa en castellano"
          />
          {[
            ['currentMarriage', 'Existe vínculo matrimonial vigente'],
            ['prohibitedKinship', 'Existe parentesco impediente'],
            [
              'prohibitedAdoptionRelationship',
              'Existe relación de adopción impediente',
            ],
            [
              'spouseHomicideRestriction',
              'Existe restricción por homicidio del cónyuge anterior',
            ],
            [
              'tutorRestriction',
              'Existe relación tutor o pupilo pendiente de revisión',
            ],
          ].map(([name, label]) => (
            <FormControlLabel
              key={name}
              control={
                <Checkbox
                  checked={values[name]}
                  onChange={update(setValues, name)}
                />
              }
              label={label}
            />
          ))}
        </Stack>
      </FieldGroup>
      <FormActions buttons={actions(onBack)} />
    </form>
  );
}

export function MarriageDecisionsStructure({
  values,
  setValues,
  recognizedChildren,
  setRecognizedChildren,
  interpreterRequired,
  people,
  onBack,
  onNext,
}) {
  const addChild = () =>
    setRecognizedChildren((current) => [
      ...current,
      { name: '', birthCertificate: '' },
    ]);
  const updateChild = (index, field, value) =>
    setRecognizedChildren((current) =>
      current.map((child, position) =>
        position === index ? { ...child, [field]: value } : child
      )
    );
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onNext();
      }}
    >
      <FormHeading
        title="Régimen y decisiones"
        eyebrow="Expediente"
        description="Opciones patrimoniales y declaraciones que afectan el instrumento."
      />
      <FieldGroup title="Régimen patrimonial">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              select
              label="Régimen patrimonial"
              value={values.propertyRegime}
              onChange={update(setValues, 'propertyRegime')}
            >
              <MenuItem value="COMMUNITY_DEFERRED">Comunidad diferida</MenuItem>
              <MenuItem value="SEPARATION_OF_PROPERTY">
                Separación de bienes
              </MenuItem>
              <MenuItem value="PARTICIPATION_IN_GAINS">
                Participación en las ganancias
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nombre que usará después del matrimonio"
              helperText="Opcional. Vacío significa conservar apellidos actuales."
              value={values.marriedName}
              onChange={update(setValues, 'marriedName')}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.capitulations}
                  onChange={update(setValues, 'capitulations')}
                />
              }
              label="Existen capitulaciones matrimoniales"
            />
          </Grid>
          {values.capitulations && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Instrumento de capitulaciones"
                value={values.capitulationsDetails}
                onChange={update(setValues, 'capitulationsDetails')}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.marriageByProxy}
                  onChange={update(setValues, 'marriageByProxy')}
                />
              }
              label="Matrimonio por poder especial"
            />
          </Grid>
          {values.marriageByProxy && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Poder especial"
                value={values.proxyDetails}
                onChange={update(setValues, 'proxyDetails')}
              />
            </Grid>
          )}
        </Grid>
      </FieldGroup>
      <FieldGroup
        title="Hijos que serán reconocidos"
        description="Agregue solamente hijos comunes reconocidos dentro del acto."
      >
        <Stack spacing={1.5}>
          {recognizedChildren.map((child, index) => (
            <Grid container spacing={1.5} key={index}>
              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  required
                  label={'Nombre del hijo ' + (index + 1)}
                  value={child.name}
                  onChange={(event) =>
                    updateChild(index, 'name', event.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  required
                  label="Partida de nacimiento"
                  value={child.birthCertificate}
                  onChange={(event) =>
                    updateChild(index, 'birthCertificate', event.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  color="error"
                  onClick={() =>
                    setRecognizedChildren((current) =>
                      current.filter((_item, position) => position !== index)
                    )
                  }
                >
                  Eliminar
                </Button>
              </Grid>
            </Grid>
          ))}
          <Button
            onClick={addChild}
            variant="outlined"
            sx={{ alignSelf: 'flex-start' }}
          >
            Agregar hijo
          </Button>
        </Stack>
      </FieldGroup>
      {interpreterRequired && (
        <FieldGroup
          title="Intérprete requerido"
          description="Caso especial sujeto a revisión notarial y diligencias adicionales."
        >
          <Alert severity="warning" sx={{ mb: 2 }}>
            Verifique nombramiento, juramentación e idoneidad del intérprete.
          </Alert>
          <Grid container spacing={2}>
            <PersonFields
              values={values.interpreter}
              setValues={(change) =>
                setValues((current) => ({
                  ...current,
                  interpreter:
                    typeof change === 'function'
                      ? change(current.interpreter)
                      : change,
                }))
              }
              people={people}
              identityFlexible
            />
          </Grid>
        </FieldGroup>
      )}
      <FormActions buttons={actions(onBack)} />
    </form>
  );
}

export function MarriageWitnessesStructure({
  witnesses,
  setWitnesses,
  people,
  savePerson,
  onBack,
  onNext,
}) {
  const setWitness = (index) => (change) =>
    setWitnesses((current) =>
      current.map((witness, position) =>
        position === index
          ? typeof change === 'function'
            ? change(witness)
            : change
          : witness
      )
    );
  const submit = async (event) => {
    event.preventDefault();
    for (const witness of witnesses) {
      if ((await savePerson(witness)) === false) return;
    }
    onNext();
  };
  return (
    <form onSubmit={submit}>
      <FormHeading
        title="Testigos"
        eyebrow="Celebración"
        description="Se requieren por lo menos dos. Puede agregar más cuando corresponda."
      />
      {witnesses.map((witness, index) => (
        <FieldGroup key={index} title={'Testigo ' + (index + 1)}>
          <Grid container spacing={2}>
            <PersonFields
              values={witness}
              setValues={setWitness(index)}
              people={people}
            />
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={witness.readsWritesSpanish}
                    onChange={update(setWitness(index), 'readsWritesSpanish')}
                  />
                }
                label="Sabe leer y escribir castellano"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={witness.knowsParties}
                    onChange={update(setWitness(index), 'knowsParties')}
                  />
                }
                label="Conoce a ambos contrayentes"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={witness.prohibitedRelationship}
                    onChange={update(
                      setWitness(index),
                      'prohibitedRelationship'
                    )}
                  />
                }
                label="Está comprendido en una prohibición legal"
              />
            </Grid>
            {witnesses.length > 2 && (
              <Grid item xs={12}>
                <Button
                  color="error"
                  onClick={() =>
                    setWitnesses((current) =>
                      current.filter((_item, position) => position !== index)
                    )
                  }
                >
                  Eliminar testigo
                </Button>
              </Grid>
            )}
          </Grid>
        </FieldGroup>
      ))}
      <Button
        onClick={() =>
          setWitnesses((current) => [...current, emptyMarriageWitness()])
        }
        variant="outlined"
        sx={{ mb: 3 }}
      >
        Agregar otro testigo
      </Button>
      <FormActions buttons={actions(onBack)} />
    </form>
  );
}

const Territory = ({ prefix, values, setValues }) => {
  const state = values[prefix + 'State'];
  const municipality = values[prefix + 'Municipality'];
  return (
    <>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          required
          select
          label="Departamento"
          value={state}
          onChange={(event) =>
            setValues((current) => ({
              ...current,
              [prefix + 'State']: event.target.value,
              [prefix + 'Municipality']: '',
              [prefix + 'District']: '',
            }))
          }
        >
          {Object.keys(DataTerritorialDivision).map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          required
          select
          disabled={!state}
          label="Municipio"
          value={municipality}
          onChange={(event) =>
            setValues((current) => ({
              ...current,
              [prefix + 'Municipality']: event.target.value,
              [prefix + 'District']: '',
            }))
          }
        >
          {Object.keys(DataTerritorialDivision[state] || {}).map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          required
          select
          disabled={!municipality}
          label="Distrito"
          value={values[prefix + 'District']}
          onChange={update(setValues, prefix + 'District')}
        >
          {(DataTerritorialDivision[state]?.[municipality] || []).map(
            (option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            )
          )}
        </TextField>
      </Grid>
    </>
  );
};

export function MarriageCelebrationStructure({
  values,
  setValues,
  onBack,
  onNext,
}) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onNext();
      }}
    >
      <FormHeading
        title="Acta y celebración"
        eyebrow="Lugar y momento"
        description="Acta prematrimonial, número de escritura y ceremonia."
      />
      <FieldGroup title="Acta prematrimonial">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              required
              type="date"
              label="Fecha del acta"
              InputLabelProps={{ shrink: true }}
              value={values.premaritalDate}
              onChange={update(setValues, 'premaritalDate')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              required
              type="time"
              label="Hora del acta"
              InputLabelProps={{ shrink: true }}
              value={values.premaritalTime}
              onChange={update(setValues, 'premaritalTime')}
            />
          </Grid>
          <Territory
            prefix="premarital"
            values={values}
            setValues={setValues}
          />
        </Grid>
      </FieldGroup>
      <FieldGroup title="Celebración">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              required
              type="number"
              inputProps={{ min: 1 }}
              label="Número de escritura"
              value={values.deedNumber}
              onChange={update(setValues, 'deedNumber')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              required
              type="date"
              label="Fecha de celebración"
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: values.premaritalDate }}
              value={values.celebrationDate}
              onChange={update(setValues, 'celebrationDate')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              required
              type="time"
              label="Hora de celebración"
              InputLabelProps={{ shrink: true }}
              value={values.celebrationTime}
              onChange={update(setValues, 'celebrationTime')}
            />
          </Grid>
          <Territory
            prefix="celebration"
            values={values}
            setValues={setValues}
          />
        </Grid>
      </FieldGroup>
      <FormActions buttons={actions(onBack)} />
    </form>
  );
}
