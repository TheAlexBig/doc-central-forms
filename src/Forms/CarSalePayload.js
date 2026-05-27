import {
  replaceNumericSequences,
  toLegalDate,
  toLegalIdentifier,
  toLegalNumber,
  toLegalTime,
  toLegalYear,
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
  nit: toLegalIdentifier(person.nit),
  genero: person.genero,
  edad: toLegalNumber(person.edad),
  oficio: replaceNumericSequences(person.oficio),
});

const agentPayload = (agent) => ({
  nombre: replaceNumericSequences(agent.nombre || agent.nombres),
  apellido: replaceNumericSequences(agent.apellido || agent.apellidos),
  departamento: replaceNumericSequences(agent.departamento),
  domicilio: replaceNumericSequences(
    legalSettlement(agent.domicilio || agent.distrito, agent.municipio)
  ),
  genero: agent.genero,
});

export function createCarSalePayload(state) {
  return {
    vendedor: personPayload(state.vendorStates),
    comprador: personPayload(state.personStates),
    vehiculo: {
      placa: toLegalIdentifier(state.carStates.placa),
      marca: replaceNumericSequences(state.carStates.marca),
      modelo: replaceNumericSequences(state.carStates.modelo),
      color: replaceNumericSequences(state.carStates.color),
      fabricado: toLegalYear(state.carStates.fabricado),
      capacidad: toLegalNumber(state.carStates.capacidad),
      dominio: replaceNumericSequences(state.carStates.dominio),
      clase: replaceNumericSequences(state.carStates.clase),
      num_motor: toLegalIdentifier(state.carStates.num_motor),
      num_chasis: toLegalIdentifier(state.carStates.num_chasis),
      num_vin: toLegalIdentifier(state.carStates.num_vin),
    },
    documento: {
      calidad_de: replaceNumericSequences(state.detailStates.calidad_de),
      institucion: replaceNumericSequences(
        state.detailStates.institucion || ''
      ),
      precio: toLegalNumber(state.detailStates.precio),
      domicilio: replaceNumericSequences(
        legalSettlement(
          state.detailStates.domicilio,
          state.detailStates.municipio
        )
      ),
      departamento: replaceNumericSequences(state.detailStates.departamento),
      fecha_firma: toLegalDate(state.detailStates.fecha_firma),
      hora_firma: toLegalTime(state.detailStates.hora_firma),
      identifica_vendedor: state.detailStates.identifica_vendedor,
      identifica_comprador: state.detailStates.identifica_comprador,
    },
    agente_juridico: agentPayload(state.agentStates),
  };
}
