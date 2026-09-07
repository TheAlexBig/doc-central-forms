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
  rol: agent.rol || 'Notario',
});

export const createVehiclePayload = (vehicle) => {
  const heavyTruck = vehicle.clase?.toLocaleLowerCase() === 'camión pesado';
  return {
    placa: toLegalIdentifier(vehicle.placa),
    marca: replaceNumericSequences(vehicle.marca),
    modelo: replaceNumericSequences(vehicle.modelo),
    color: replaceNumericSequences(vehicle.color),
    fabricado: toLegalYear(vehicle.fabricado),
    capacidad: heavyTruck
      ? replaceNumericSequences(vehicle.tipo_capacidad)
      : `${toLegalNumber(vehicle.capacidad)} ${vehicle.unidad_capacidad || 'ASS'}`,
    dominio: replaceNumericSequences(vehicle.dominio),
    clase: replaceNumericSequences(vehicle.clase),
    tipo: replaceNumericSequences(vehicle.tipo),
    ejes: toLegalNumber(vehicle.ejes),
    tara: toLegalNumber(vehicle.tara),
    tipo_capacidad: replaceNumericSequences(vehicle.tipo_capacidad),
    cap_carga: toLegalNumber(vehicle.cap_carga),
    cap_maxima: toLegalNumber(vehicle.cap_maxima),
    traccion: replaceNumericSequences(vehicle.traccion),
    num_motor: toLegalIdentifier(vehicle.num_motor),
    num_chasis: toLegalIdentifier(vehicle.num_chasis),
    num_vin: toLegalIdentifier(vehicle.num_vin),
  };
};

export function createCarSalePayload(state) {
  return {
    vendedor: personPayload(state.vendorStates),
    comprador: personPayload(state.personStates),
    vehiculo: createVehiclePayload(state.carStates),
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
