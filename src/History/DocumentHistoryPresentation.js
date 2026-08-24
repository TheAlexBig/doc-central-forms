const draftSection = (historyItem, section) =>
  historyItem.draft?.[section] || {};

const carSalePresentation = (item) => {
  const buyer = draftSection(item, 'personStates');
  const seller = draftSection(item, 'vendorStates');
  const vehicle = draftSection(item, 'carStates');
  const agent = draftSection(item, 'agentStates');
  const vehicleDescription = [vehicle.marca, vehicle.modelo, vehicle.placa]
    .filter(Boolean)
    .join(' ');
  return {
    title: vehicleDescription
      ? `Compra venta - ${vehicleDescription}`
      : item.title,
    parties: `${[buyer.nombre, buyer.apellido].filter(Boolean).join(' ') || item.buyerName} / ${[seller.nombre, seller.apellido].filter(Boolean).join(' ') || item.sellerName}`,
    searchable: [
      item.title,
      item.buyerName,
      item.sellerName,
      item.vehicle,
      buyer.nombre,
      buyer.apellido,
      buyer.documento,
      seller.nombre,
      seller.apellido,
      seller.documento,
      vehicle.marca,
      vehicle.modelo,
      vehicle.placa,
      agent.nombre,
      agent.apellido,
      agent.tipo,
      agent.role,
    ],
  };
};

const presenters = {
  'car-sale': carSalePresentation,
};

export function presentDocumentHistory(item) {
  const presentation = presenters[item.type]?.(item) || {
    title: item.title || 'Documento',
    parties: [item.buyerName, item.sellerName].filter(Boolean).join(' / '),
    searchable: Object.values(item).filter(
      (value) => typeof value === 'string'
    ),
  };
  return {
    ...presentation,
    searchableText: presentation.searchable
      .filter(Boolean)
      .join(' ')
      .toLocaleLowerCase(),
  };
}

export const DOCUMENT_TYPE_OPTIONS = [
  { value: 'car-sale', label: 'Compraventa' },
];
