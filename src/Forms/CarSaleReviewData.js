const personReviewData = (person) => ({
  nombre: person.nombre,
  apellido: person.apellido,
  documento: person.documento,
  domicilio: person.domicilio,
  municipio: person.municipio,
  departamento: person.departamento,
  oficio: person.oficio,
});

const agentReviewData = (agent = {}) => ({
  nombre: agent.nombre || agent.nombres,
  apellido: agent.apellido || agent.apellidos,
  domicilio: agent.domicilio || agent.distrito,
  municipio: agent.municipio,
  departamento: agent.departamento,
});

export function createCarSaleReviewData(state) {
  return {
    agente_juridico: agentReviewData(state.agentStates),
    preparado_por: agentReviewData(state.preparedByStates),
    comprador: personReviewData(state.personStates),
    vendedor: personReviewData(state.vendorStates),
    vehiculo: {
      ...state.carStates,
      capacidad: `${state.carStates.capacidad || ''} ${
        state.carStates.unidad_capacidad || ''
      }`.trim(),
    },
    documento: {
      ...state.detailStates,
    },
  };
}
