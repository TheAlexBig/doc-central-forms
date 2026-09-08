import {
  replaceNumericSequences,
  toLegalIdentifier,
  toLegalNumber,
} from '../Functions/LegalDocumentText';

export const legalSettlement = (district, municipality) =>
  municipality ? district + ', Municipio de ' + municipality : district;

export const createPersonPayload = (person) => ({
  nombre: replaceNumericSequences(person.nombre),
  apellido: replaceNumericSequences(person.apellido),
  departamento: replaceNumericSequences(person.departamento),
  domicilio: replaceNumericSequences(
    legalSettlement(person.domicilio, person.municipio)
  ),
  documento: toLegalIdentifier(person.documento),
  genero: person.genero,
  edad: toLegalNumber(person.edad),
  oficio: replaceNumericSequences(person.oficio),
});

export const createAgentPayload = (agent) => ({
  nombre: replaceNumericSequences(agent.nombre || agent.nombres),
  apellido: replaceNumericSequences(agent.apellido || agent.apellidos),
  departamento: replaceNumericSequences(agent.departamento),
  domicilio: replaceNumericSequences(
    legalSettlement(agent.domicilio || agent.distrito, agent.municipio)
  ),
  genero: agent.genero,
  rol: agent.rol || 'Notario',
});
