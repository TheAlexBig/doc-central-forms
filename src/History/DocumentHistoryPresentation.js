const draftSection = (historyItem, section) =>
  historyItem.draft?.[section] || {};

const carSalePresentation = (item) => {
  const buyer = draftSection(item, 'personStates');
  const seller = draftSection(item, 'vendorStates');
  const vehicle = draftSection(item, 'carStates');
  const agent = draftSection(item, 'agentStates');
  const preparer = draftSection(item, 'preparedByStates');
  const vehicleDescription = [vehicle.marca, vehicle.modelo, vehicle.placa]
    .filter(Boolean)
    .join(' ');
  return {
    title: vehicleDescription
      ? `Compra venta - ${vehicleDescription}`
      : item.title,
    parties: `${[buyer.nombre, buyer.apellido].filter(Boolean).join(' ') || item.buyerName} / ${[seller.nombre, seller.apellido].filter(Boolean).join(' ') || item.sellerName}`,
    responsible: {
      notary: [agent.nombres, agent.apellidos].filter(Boolean).join(' '),
      preparer: [preparer.nombres, preparer.apellidos]
        .filter(Boolean)
        .join(' '),
    },
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
      agent.nombres,
      agent.apellidos,
      agent.tipo,
      agent.role,
      agent.rol,
      preparer.nombres,
      preparer.apellidos,
      preparer.rol,
    ],
  };
};

const mutualPresentation = (item) => {
  const debtor = draftSection(item, 'debtor');
  const creditor = draftSection(item, 'creditor');
  const terms = draftSection(item, 'terms');
  const agent = draftSection(item, 'agent');
  const preparer = draftSection(item, 'preparer');
  const debtorName =
    [debtor.nombre, debtor.apellido].filter(Boolean).join(' ') ||
    item.buyerName;
  const creditorName =
    [creditor.nombre, creditor.apellido].filter(Boolean).join(' ') ||
    item.sellerName;
  return {
    title: item.title || `Mutuo - ${creditorName} / ${debtorName}`,
    parties: `${debtorName} / ${creditorName}`,
    responsible: {
      notary: [agent.nombres || agent.nombre, agent.apellidos || agent.apellido]
        .filter(Boolean)
        .join(' '),
      preparer: [
        preparer.nombres || preparer.nombre,
        preparer.apellidos || preparer.apellido,
      ]
        .filter(Boolean)
        .join(' '),
    },
    searchable: [
      item.title,
      debtorName,
      creditorName,
      debtor.documento,
      creditor.documento,
      terms.amount,
      terms.paymentBank,
      terms.paymentAccount,
      agent.nombres,
      agent.apellidos,
      preparer.nombres,
      preparer.apellidos,
    ],
  };
};

const presenters = {
  'car-sale': carSalePresentation,
  mutual: mutualPresentation,
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
  { value: 'mutual', label: 'Mutuo' },
];
