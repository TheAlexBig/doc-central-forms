import {
  replaceNumericSequences,
  toLegalDate,
  toLegalIdentifier,
  toLegalNumber,
  toLegalPercentage,
  toLegalTime,
} from '../Functions/LegalDocumentText';

const legalSettlement = (district, municipality) =>
  municipality ? `${district}, Municipio de ${municipality}` : district;

const personPayload = (person) => ({
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

export const createMutualPayload = ({ debtor, creditor, terms, agent }) => ({
  deudor: personPayload(debtor),
  acreedor: personPayload(creditor),
  condiciones: {
    monto: toLegalNumber(terms.amount),
    plazo: replaceNumericSequences(terms.term),
    fecha_vencimiento: toLegalDate(terms.dueDate),
    numero_cuotas: toLegalNumber(terms.installmentCount),
    monto_cuota: toLegalNumber(terms.installmentAmount),
    banco_pago: replaceNumericSequences(terms.paymentBank),
    cuenta_pago: toLegalIdentifier(terms.paymentAccount),
    interes_mensual: toLegalPercentage(terms.monthlyInterest),
    interes_mora: toLegalPercentage(terms.defaultInterest),
    destino_fondos: replaceNumericSequences(terms.fundsPurpose),
    garantia_letra_cambio: terms.billOfExchangeGuarantee,
    fecha_vencimiento_garantia: terms.billOfExchangeGuarantee
      ? toLegalDate(terms.guaranteeDueDate)
      : '',
    gastos_administrativos: toLegalPercentage(terms.administrativeExpenses),
    domicilio_especial: replaceNumericSequences(terms.specialDomicile),
    lugar_firma: replaceNumericSequences(
      legalSettlement(terms.signingDistrict, terms.signingMunicipality)
    ),
    departamento_firma: replaceNumericSequences(terms.signingState),
    fecha_firma: toLegalDate(terms.signingDate),
    hora_firma: toLegalTime(terms.signingTime),
    identifica_deudor: terms.identifiesDebtor,
    identifica_acreedor: terms.identifiesCreditor,
  },
  agente_juridico: {
    nombre: replaceNumericSequences(agent.nombre || agent.nombres),
    apellido: replaceNumericSequences(agent.apellido || agent.apellidos),
    departamento: replaceNumericSequences(agent.departamento),
    domicilio: replaceNumericSequences(
      legalSettlement(agent.domicilio || agent.distrito, agent.municipio)
    ),
    genero: agent.genero,
    rol: agent.rol || 'Notario',
  },
});
