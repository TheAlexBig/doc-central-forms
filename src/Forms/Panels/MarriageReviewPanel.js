import MarriageReview from '../../View/MarriageReview';
import DocumentReviewPanel from './DocumentReviewPanel';

export default function MarriageReviewPanel({ data, onEdit, ...panelProps }) {
  return (
    <DocumentReviewPanel
      title="Confirme expediente matrimonial"
      description="Revise acta, escritura, requisitos y datos registrales antes de descargar."
      {...panelProps}
    >
      <MarriageReview data={data} onEdit={onEdit} />
    </DocumentReviewPanel>
  );
}
