const ageAt = (birthDate, eventDate) => {
  const birth = new Date(`${birthDate}T00:00:00`);
  const event = new Date(`${eventDate}T00:00:00`);
  if (Number.isNaN(birth.getTime()) || Number.isNaN(event.getTime()))
    return null;
  let age = event.getFullYear() - birth.getFullYear();
  if (
    event.getMonth() < birth.getMonth() ||
    (event.getMonth() === birth.getMonth() && event.getDate() < birth.getDate())
  )
    age -= 1;
  return age;
};

const requiredPartyFields = {
  nombre: 'Ingrese los nombres.',
  apellido: 'Ingrese los apellidos.',
  fecha_nacimiento: 'Seleccione la fecha de nacimiento.',
  documento: 'Ingrese el documento de identidad.',
  genero: 'Seleccione el género.',
  oficio: 'Ingrese la profesión u oficio.',
  departamento: 'Seleccione el departamento.',
  municipio: 'Seleccione el municipio.',
  domicilio: 'Seleccione el distrito.',
  familyStatus: 'Seleccione el estado familiar.',
  nationality: 'Ingrese la nacionalidad.',
  birthPlace: 'Ingrese el lugar de nacimiento.',
  identityType: 'Ingrese el tipo de identificación.',
  motherName: 'Ingrese el nombre de la madre.',
  motherJob: 'Ingrese el oficio de la madre.',
  motherSettlement: 'Ingrese el domicilio de la madre.',
  fatherName: 'Ingrese el nombre del padre.',
  fatherJob: 'Ingrese el oficio del padre.',
  fatherSettlement: 'Ingrese el domicilio del padre.',
  birthCertificateNumber: 'Ingrese el número de partida.',
  birthCertificateRegistry: 'Ingrese el registro que expidió la partida.',
  birthCertificateIssueDate: 'Seleccione la fecha de expedición.',
  birthCertificateIssuedBy: 'Ingrese quién expidió la partida.',
};

const requiredWitnessFields = {
  nombre: 'Ingrese los nombres del testigo.',
  apellido: 'Ingrese los apellidos del testigo.',
  fecha_nacimiento: 'Seleccione la fecha de nacimiento del testigo.',
  documento: 'Ingrese el DUI del testigo.',
  genero: 'Seleccione el género del testigo.',
  oficio: 'Ingrese la profesión u oficio del testigo.',
  departamento: 'Seleccione el departamento del testigo.',
  municipio: 'Seleccione el municipio del testigo.',
  domicilio: 'Seleccione el distrito del testigo.',
};

const setRequired = (errors, prefix, values, fields) => {
  Object.entries(fields).forEach(([field, message]) => {
    if (!errors[`${prefix}.${field}`] && !String(values[field] ?? '').trim())
      errors[`${prefix}.${field}`] = message;
  });
};

const normalizeDocument = (value) =>
  String(value || '')
    .toLocaleUpperCase()
    .replace(/[^A-ZÁÉÍÓÚÜÑ0-9]/g, '');

const validateParty = (errors, party, prefix, premaritalDate) => {
  setRequired(errors, prefix, party, requiredPartyFields);
  const age = ageAt(party.fecha_nacimiento, premaritalDate);
  if (age !== null && age < 18)
    errors[`${prefix}.fecha_nacimiento`] =
      'Debe tener al menos 18 años en la fecha del acta.';
  if (
    party.identityType?.toLocaleLowerCase().includes('documento único') &&
    party.documento &&
    !/^\d{8}-\d$/.test(party.documento)
  )
    errors[`${prefix}.documento`] = 'Use el formato DUI 00000000-0.';
  if (party.currentMarriage || party.familyStatus === 'MARRIED')
    errors[`${prefix}.familyStatus`] =
      'No puede existir un vínculo matrimonial vigente.';
  if (!party.canConsent)
    errors[`${prefix}.canConsent`] =
      'Debe poder expresar consentimiento inequívoco.';
  if (party.prohibitedKinship)
    errors[`${prefix}.prohibitedKinship`] =
      'Existe parentesco que impide el matrimonio.';
  if (party.prohibitedAdoptionRelationship)
    errors[`${prefix}.prohibitedAdoptionRelationship`] =
      'Existe una relación de adopción que impide el matrimonio.';
  if (party.spouseHomicideRestriction)
    errors[`${prefix}.spouseHomicideRestriction`] =
      'Existe una restricción legal por homicidio del cónyuge anterior.';
  if (
    ['DIVORCED', 'WIDOWED'].includes(party.familyStatus) &&
    !party.familyStatusDocument?.trim()
  )
    errors[`${prefix}.familyStatusDocument`] =
      party.familyStatus === 'DIVORCED'
        ? 'Agregue el documento del matrimonio anterior: certificación de divorcio o sentencia correspondiente.'
        : 'Agregue el documento del matrimonio anterior: certificación de defunción del cónyuge anterior.';
  const issueDate = new Date(`${party.birthCertificateIssueDate}T00:00:00`);
  const actDate = new Date(`${premaritalDate}T00:00:00`);
  if (!Number.isNaN(issueDate.getTime()) && !Number.isNaN(actDate.getTime())) {
    const earliest = new Date(actDate);
    earliest.setMonth(earliest.getMonth() - 2);
    if (issueDate > actDate || issueDate < earliest)
      errors[`${prefix}.birthCertificateIssueDate`] =
        'La partida debe haberse expedido dentro de los dos meses anteriores al acta.';
  }
};

export function validateMarriageFields(state) {
  const errors = {};
  if (!state.agent?.id) errors['agent.id'] = 'Seleccione notario responsable.';
  else if ((state.agent.rol || state.agent.role)?.toLowerCase() !== 'notario')
    errors['agent.rol'] = 'El matrimonio debe ser autorizado por un notario.';

  validateParty(
    errors,
    state.partyOne,
    'partyOne',
    state.details.premaritalDate
  );
  validateParty(
    errors,
    state.partyTwo,
    'partyTwo',
    state.details.premaritalDate
  );
  if (
    normalizeDocument(state.partyOne.documento) &&
    normalizeDocument(state.partyOne.documento) ===
      normalizeDocument(state.partyTwo.documento)
  )
    errors['partyTwo.documento'] =
      'Los contrayentes deben tener documentos diferentes.';

  if (state.witnesses.length < 2)
    errors.witnesses = 'Agregue por lo menos dos testigos.';
  const usedDocuments = new Set([
    normalizeDocument(state.partyOne.documento),
    normalizeDocument(state.partyTwo.documento),
  ]);
  state.witnesses.forEach((witness, index) => {
    const prefix = `witnesses.${index}`;
    setRequired(errors, prefix, witness, requiredWitnessFields);
    const age = ageAt(witness.fecha_nacimiento, state.details.celebrationDate);
    if (age !== null && age < 18)
      errors[`${prefix}.fecha_nacimiento`] =
        'El testigo debe tener al menos 18 años.';
    if (witness.documento && !/^\d{8}-\d$/.test(witness.documento))
      errors[`${prefix}.documento`] = 'Use el formato DUI 00000000-0.';
    if (!witness.readsWritesSpanish)
      errors[`${prefix}.readsWritesSpanish`] =
        'El testigo debe saber leer y escribir castellano.';
    if (!witness.knowsParties)
      errors[`${prefix}.knowsParties`] =
        'El testigo debe conocer a ambos contrayentes.';
    if (witness.prohibitedRelationship)
      errors[`${prefix}.prohibitedRelationship`] =
        'El testigo está comprendido en una prohibición legal.';
    const document = normalizeDocument(witness.documento);
    if (document && usedDocuments.has(document))
      errors[`${prefix}.documento`] =
        'El testigo debe ser distinto de contrayentes y demás testigos.';
    usedDocuments.add(document);
  });

  const details = state.details;
  setRequired(errors, 'details', details, {
    premaritalDate: 'Seleccione la fecha del acta.',
    premaritalTime: 'Seleccione la hora del acta.',
    premaritalState: 'Seleccione el departamento del acta.',
    premaritalMunicipality: 'Seleccione el municipio del acta.',
    premaritalDistrict: 'Seleccione el distrito del acta.',
    celebrationDate: 'Seleccione la fecha de celebración.',
    celebrationTime: 'Seleccione la hora de celebración.',
    celebrationState: 'Seleccione el departamento de celebración.',
    celebrationMunicipality: 'Seleccione el municipio de celebración.',
    celebrationDistrict: 'Seleccione el distrito de celebración.',
    deedNumber: 'Ingrese el número de escritura.',
    propertyRegime: 'Seleccione el régimen patrimonial.',
  });
  if (
    details.premaritalDate &&
    details.celebrationDate &&
    details.celebrationDate < details.premaritalDate
  )
    errors['details.celebrationDate'] =
      'La celebración no puede ser anterior al acta prematrimonial.';
  if (details.capitulations && !details.capitulationsDetails?.trim())
    errors['details.capitulationsDetails'] =
      'Ingrese el instrumento de capitulaciones.';
  if (details.marriageByProxy && !details.proxyDetails?.trim())
    errors['details.proxyDetails'] = 'Ingrese el poder especial.';
  if (
    (!state.partyOne.speaksSpanish || !state.partyTwo.speaksSpanish) &&
    !details.interpreter?.documento
  )
    errors['details.interpreter.documento'] = 'Seleccione intérprete.';
  if (!state.partyOne.speaksSpanish || !state.partyTwo.speaksSpanish)
    setRequired(errors, 'details.interpreter', details.interpreter || {}, {
      nombre: 'Ingrese los nombres del intérprete.',
      apellido: 'Ingrese los apellidos del intérprete.',
      fecha_nacimiento: 'Seleccione la fecha de nacimiento del intérprete.',
      documento: 'Ingrese el documento del intérprete.',
      genero: 'Seleccione el género del intérprete.',
      oficio: 'Ingrese la profesión u oficio del intérprete.',
      departamento: 'Seleccione el departamento del intérprete.',
      municipio: 'Seleccione el municipio del intérprete.',
      domicilio: 'Seleccione el distrito del intérprete.',
    });
  state.recognizedChildren.forEach((child, index) => {
    if (!child.name?.trim())
      errors[`recognizedChildren.${index}.name`] =
        'Ingrese el nombre del hijo.';
    if (!child.birthCertificate?.trim())
      errors[`recognizedChildren.${index}.birthCertificate`] =
        'Ingrese la partida de nacimiento.';
  });
  return errors;
}

const decisionPaths = [
  'details.propertyRegime',
  'details.capitulationsDetails',
  'details.proxyDetails',
  'details.interpreter.',
  'recognizedChildren.',
];

export function marriageErrorsForStep(state, step) {
  const errors = validateMarriageFields(state);
  return Object.fromEntries(
    Object.entries(errors).filter(([path]) => {
      if (step === 0) return path.startsWith('agent.');
      if (step === 1) return path.startsWith('partyOne.');
      if (step === 2) return path.startsWith('partyTwo.');
      if (step === 3)
        return decisionPaths.some((prefix) => path.startsWith(prefix));
      if (step === 4)
        return path === 'witnesses' || path.startsWith('witnesses.');
      if (step === 5)
        return (
          path.startsWith('details.') &&
          !decisionPaths.some((prefix) => path.startsWith(prefix))
        );
      return false;
    })
  );
}

export function validateMarriageState(state) {
  return [...new Set(Object.values(validateMarriageFields(state)))];
}
