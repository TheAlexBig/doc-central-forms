import {
  replaceNumericSequences,
  toLegalDate,
  toLegalIdentifier,
  toLegalNumber,
  toLegalPercentage,
  toLegalTime,
} from '../Functions/LegalDocumentText';
import { calculateMutualPreview } from './MutualFinancialPreview';
import { createVehiclePayload } from './CarSalePayload';

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

export const createMutualPayload = ({
  debtor,
  creditor,
  guarantor,
  pledgedVehicle,
  terms,
  agent,
}) => {
  const preview = calculateMutualPreview(terms);
  const signingPlace = legalSettlement(
    terms.signingDistrict,
    terms.signingMunicipality
  );
  return {
    deudor: personPayload(debtor),
    acreedor: personPayload(creditor),
    fiador:
      terms.guaranteeType === 'PERSONAL_GUARANTOR'
        ? personPayload(guarantor)
        : null,
    garantia_prendaria:
      terms.guaranteeType === 'VEHICLE_PLEDGE'
        ? {
            vehiculo: createVehiclePayload(pledgedVehicle),
            valor: toLegalNumber(terms.pledgeValue),
          }
        : null,
    condiciones: {
      monto: toLegalNumber(terms.amount),
      plazo: replaceNumericSequences(terms.term),
      fecha_vencimiento: toLegalDate(preview?.dueDate || terms.dueDate),
      numero_cuotas: toLegalNumber(terms.installmentCount),
      monto_cuota: toLegalNumber(
        preview?.installmentAmount || terms.installmentAmount
      ),
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
      domicilio_especial: replaceNumericSequences(signingPlace),
      lugar_firma: replaceNumericSequences(signingPlace),
      departamento_firma: replaceNumericSequences(terms.signingState),
      fecha_firma: toLegalDate(terms.signingDate),
      hora_firma: toLegalTime(terms.signingTime),
      identifica_deudor: terms.identifiesDebtor,
      identifica_acreedor: terms.identifiesCreditor,
      monto_numerico: terms.amount,
      modalidad_plazo: terms.termMode,
      cantidad_plazo:
        terms.termMode === 'DURATION' ? Number(terms.termQuantity) : null,
      unidad_plazo: terms.termMode === 'DURATION' ? terms.termUnit : null,
      fecha_inicio: terms.signingDate,
      fecha_vencimiento_iso: preview?.dueDate || terms.dueDate,
      numero_cuotas_numerico: Number(terms.installmentCount),
      tasa_interes_mensual: terms.monthlyInterest || 0,
      tipo_instrumento: terms.instrumentType,
      tipo_garantia: terms.guaranteeType,
      numero_escritura:
        terms.instrumentType === 'PUBLIC_DEED'
          ? Number(terms.deedNumber)
          : null,
      numero_escritura_texto:
        terms.instrumentType === 'PUBLIC_DEED'
          ? toLegalNumber(terms.deedNumber)
          : '',
      detalles_garantia: replaceNumericSequences(terms.guaranteeDetails),
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
  };
};
