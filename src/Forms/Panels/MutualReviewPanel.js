import MutualReview from '../../View/MutualReview';
import DocumentReviewPanel from './DocumentReviewPanel';

export default function MutualReviewPanel({ data, onEdit, ...panelProps }) {
  return (
    <DocumentReviewPanel {...panelProps}>
      <MutualReview data={data} onEdit={onEdit} />
    </DocumentReviewPanel>
  );
}
