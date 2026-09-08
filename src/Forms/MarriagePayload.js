import {
  replaceNumericSequences,
  toLegalDate,
  toLegalIdentifier,
  toLegalNumber,
  toLegalTime,
} from '../Functions/LegalDocumentText';
import {
  createAgentPayload,
  createPersonPayload,
  legalSettlement,
} from './LegalPayload';

const parentPayload = (party, prefix) => ({
  nombre: replaceNumericSequences(party[prefix + 'Name']),
  oficio: replaceNumericSequences(party[prefix + 'Job']),
  domicilio: replaceNumericSequences(party[prefix + 'Settlement']),
});

const partyPayload = (party) => ({
  persona: createPersonPayload(party),
  fecha_nacimiento: party.fecha_nacimiento,
  estado_familiar: party.familyStatus,
  nacionalidad: replaceNumericSequences(party.nationality),
  lugar_nacimiento: replaceNumericSequences(party.birthPlace),
  tipo_identificacion: replaceNumericSequences(party.identityType),
  madre: parentPayload(party, 'mother'),
  padre: parentPayload(party, 'father'),
  partida_nacimiento: {
    numero: toLegalIdentifier(party.birthCertificateNumber),
    folio: toLegalIdentifier(party.birthCertificateFolio),
    libro: toLegalIdentifier(party.birthCertificateBook),
    registro: replaceNumericSequences(party.birthCertificateRegistry),
    fecha_expedicion: party.birthCertificateIssueDate,
    expedida_por: replaceNumericSequences(party.birthCertificateIssuedBy),
  },
  documento_estado_familiar: replaceNumericSequences(
    party.familyStatusDocument
  ),
  vinculo_matrimonial_vigente: party.currentMarriage,
  puede_consentir: party.canConsent,
  parentesco_impediente: party.prohibitedKinship,
  relacion_adopcion_impediente: party.prohibitedAdoptionRelationship,
  restriccion_homicidio: party.spouseHomicideRestriction,
  restriccion_tutela: party.tutorRestriction,
  se_expresa_castellano: party.speaksSpanish,
});

export const createMarriagePayload = ({
  partyOne,
  partyTwo,
  witnesses,
  recognizedChildren,
  details,
  agent,
}) => ({
  contrayente_uno: partyPayload(partyOne),
  contrayente_dos: partyPayload(partyTwo),
  testigos: witnesses.map((witness) => ({
    persona: createPersonPayload(witness),
    fecha_nacimiento: witness.fecha_nacimiento,
    lee_escribe_castellano: witness.readsWritesSpanish,
    conoce_contrayentes: witness.knowsParties,
    relacion_prohibida: witness.prohibitedRelationship,
  })),
  hijos_reconocidos: recognizedChildren.map((child) => ({
    nombre: replaceNumericSequences(child.name),
    partida_nacimiento: replaceNumericSequences(child.birthCertificate),
  })),
  datos: {
    fecha_acta: details.premaritalDate,
    hora_acta: toLegalTime(details.premaritalTime),
    lugar_acta: replaceNumericSequences(
      legalSettlement(
        details.premaritalDistrict,
        details.premaritalMunicipality
      )
    ),
    departamento_acta: replaceNumericSequences(details.premaritalState),
    fecha_celebracion: details.celebrationDate,
    hora_celebracion: toLegalTime(details.celebrationTime),
    lugar_celebracion: replaceNumericSequences(
      legalSettlement(
        details.celebrationDistrict,
        details.celebrationMunicipality
      )
    ),
    departamento_celebracion: replaceNumericSequences(details.celebrationState),
    numero_escritura: Number(details.deedNumber),
    regimen_patrimonial: details.propertyRegime,
    capitulaciones: details.capitulations,
    detalle_capitulaciones: replaceNumericSequences(
      details.capitulationsDetails
    ),
    nombre_posterior: replaceNumericSequences(details.marriedName),
    matrimonio_por_poder: details.marriageByProxy,
    detalle_poder: replaceNumericSequences(details.proxyDetails),
    interprete:
      !partyOne.speaksSpanish || !partyTwo.speaksSpanish
        ? createPersonPayload(details.interpreter)
        : null,
  },
  agente_juridico: createAgentPayload(agent),
});

export const marriageLegalPreview = (details) => ({
  deedNumber: toLegalNumber(details.deedNumber),
  premaritalDate: toLegalDate(details.premaritalDate),
  celebrationDate: toLegalDate(details.celebrationDate),
});
