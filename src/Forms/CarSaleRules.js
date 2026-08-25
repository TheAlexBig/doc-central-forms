import { normalizeDui } from './PersonMemory';

export const isNotary = (agent) =>
  (agent?.rol || '').trim().toLocaleLowerCase() === 'notario';

export const hasSamePartyDui = (buyer, seller) => {
  const buyerDui = normalizeDui(buyer?.documento);
  const sellerDui = normalizeDui(seller?.documento);
  return Boolean(buyerDui && sellerDui && buyerDui === sellerDui);
};

export function validateCarSaleState(state) {
  if (!isNotary(state.agentStates)) {
    return 'Seleccione un notario para autenticar la compraventa.';
  }
  if (hasSamePartyDui(state.personStates, state.vendorStates)) {
    return 'El comprador y el vendedor deben tener DUI diferentes.';
  }
  return '';
}
