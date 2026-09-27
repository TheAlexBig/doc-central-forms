import CarSaleReview from '../../View/CarSaleReview';
import DocumentReviewPanel from './DocumentReviewPanel';

export default function CarSaleReviewPanel({
  documentData,
  generationError,
  generated,
  onEdit,
  ...panelProps
}) {
  const message = generationError
    ? { type: 'error', text: generationError }
    : generated
      ? {
          type: 'success',
          text: 'El documento fue generado y descargado correctamente.',
        }
      : { type: '', text: '' };
  return (
    <DocumentReviewPanel
      {...panelProps}
      message={message}
      createAnotherHref="/compra-venta"
      storageMessage="Al descargar, Central Docs guardará este documento en el historial."
    >
      <CarSaleReview data={documentData} onEdit={onEdit} />
    </DocumentReviewPanel>
  );
}
