const ageAt = (birthDate, eventDate) => {
  const birth = new Date(birthDate + 'T00:00:00');
  const event = new Date(eventDate + 'T00:00:00');
  let age = event.getFullYear() - birth.getFullYear();
  if (
    event.getMonth() < birth.getMonth() ||
    (event.getMonth() === birth.getMonth() && event.getDate() < birth.getDate())
  )
    age -= 1;
  return age;
};

const requiredPartyFields = [
  'nombre',
  'apellido',
  'fecha_nacimiento',
  'documento',
  'genero',
  'oficio',
  'departamento',
  'municipio',
  'domicilio',
  'familyStatus',
  'nationality',
  'birthPlace',
  'identityType',
  'motherName',
  'motherJob',
  'motherSettlement',
  'fatherName',
  'fatherJob',
  'fatherSettlement',
  'birthCertificateNumber',
  'birthCertificateRegistry',
  'birthCertificateIssueDate',
  'birthCertificateIssuedBy',
];

export function validateMarriageState(state) {
  const errors = [];
  if (!state.agent?.id) errors.push('Seleccione notario responsable.');
  else if ((state.agent.rol || state.agent.role)?.toLowerCase() !== 'notario')
    errors.push('El matrimonio debe ser autorizado por un notario.');
  [state.partyOne, state.partyTwo].forEach((party, index) => {
    const label = 'Contrayente ' + (index + 1);
    if (requiredPartyFields.some((field) => !party[field]))
      errors.push(label + ': complete datos personales, padres y partida.');
    if (ageAt(party.fecha_nacimiento, state.details.premaritalDate) < 18)
      errors.push(label + ': debe tener al menos 18 años.');
    if (party.currentMarriage || party.familyStatus === 'MARRIED')
      errors.push(label + ': no puede existir vínculo matrimonial vigente.');
    if (!party.canConsent)
      errors.push(label + ': debe poder expresar consentimiento inequívoco.');
    if (
      ['DIVORCED', 'WIDOWED'].includes(party.familyStatus) &&
      !party.familyStatusDocument
    )
      errors.push(label + ': agregue documento del matrimonio anterior.');
  });
  if (state.witnesses.length < 2)
    errors.push('Agregue por lo menos dos testigos.');
  state.witnesses.forEach((witness, index) => {
    if (
      !witness.nombre ||
      !witness.apellido ||
      !witness.documento ||
      !witness.fecha_nacimiento
    )
      errors.push('Testigo ' + (index + 1) + ': complete datos requeridos.');
    if (ageAt(witness.fecha_nacimiento, state.details.celebrationDate) < 18)
      errors.push('Testigo ' + (index + 1) + ': debe ser mayor de edad.');
    if (
      !witness.readsWritesSpanish ||
      !witness.knowsParties ||
      witness.prohibitedRelationship
    )
      errors.push('Testigo ' + (index + 1) + ': no cumple requisitos legales.');
  });
  const details = state.details;
  if (
    !details.premaritalDate ||
    !details.premaritalTime ||
    !details.premaritalState ||
    !details.premaritalMunicipality ||
    !details.premaritalDistrict ||
    !details.celebrationDate ||
    !details.celebrationTime ||
    !details.celebrationState ||
    !details.celebrationMunicipality ||
    !details.celebrationDistrict ||
    !details.deedNumber
  )
    errors.push('Complete acta prematrimonial y celebración.');
  if (details.capitulations && !details.capitulationsDetails)
    errors.push('Indique instrumento de capitulaciones.');
  if (details.marriageByProxy && !details.proxyDetails)
    errors.push('Indique poder especial.');
  if (
    (!state.partyOne.speaksSpanish || !state.partyTwo.speaksSpanish) &&
    !details.interpreter?.documento
  )
    errors.push('Seleccione intérprete.');
  return [...new Set(errors)];
}
