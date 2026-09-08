import { DataPerson } from '../Data/DataPerson';

const today = () => new Date().toISOString().slice(0, 10);
const tomorrow = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().slice(0, 10);
};
const time = () => {
  const date = new Date();
  return (
    String(date.getHours()).padStart(2, '0') +
    ':' +
    String(date.getMinutes()).padStart(2, '0')
  );
};

export const emptyMarriageParty = () => ({
  ...DataPerson,
  familyStatus: 'SINGLE',
  nationality: 'Salvadoreña',
  birthPlace: '',
  identityType: 'Documento Único de Identidad',
  motherName: '',
  motherJob: '',
  motherSettlement: '',
  fatherName: '',
  fatherJob: '',
  fatherSettlement: '',
  birthCertificateNumber: '',
  birthCertificateFolio: '',
  birthCertificateBook: '',
  birthCertificateRegistry: '',
  birthCertificateIssueDate: '',
  birthCertificateIssuedBy: '',
  familyStatusDocument: '',
  currentMarriage: false,
  canConsent: true,
  prohibitedKinship: false,
  prohibitedAdoptionRelationship: false,
  spouseHomicideRestriction: false,
  tutorRestriction: false,
  speaksSpanish: true,
});

export const emptyMarriageWitness = () => ({
  ...DataPerson,
  readsWritesSpanish: true,
  knowsParties: true,
  prohibitedRelationship: false,
});

export const initialMarriageDetails = () => ({
  premaritalDate: today(),
  premaritalTime: time(),
  premaritalState: '',
  premaritalMunicipality: '',
  premaritalDistrict: '',
  celebrationDate: tomorrow(),
  celebrationTime: time(),
  celebrationState: '',
  celebrationMunicipality: '',
  celebrationDistrict: '',
  deedNumber: '',
  propertyRegime: 'COMMUNITY_DEFERRED',
  capitulations: false,
  capitulationsDetails: '',
  marriedName: '',
  marriageByProxy: false,
  proxyDetails: '',
  interpreter: { ...DataPerson },
});
