import { useNavigate } from 'react-router-dom';
import HistoryPanel from '../History/HistoryPanel';
import GlobalPageLayout from './GlobalPageLayout';

export default function HistoryPage({ historyProps, loadDraft }) {
  const navigate = useNavigate();
  const handleLoad = (historyItem) => {
    loadDraft(historyItem);
    navigate('/compra-venta');
  };
  return (
    <GlobalPageLayout>
      <HistoryPanel historyProps={historyProps} onLoad={handleLoad} />
    </GlobalPageLayout>
  );
}
