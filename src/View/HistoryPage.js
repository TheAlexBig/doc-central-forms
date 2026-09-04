import { useNavigate } from 'react-router-dom';
import HistoryPanel from '../History/HistoryPanel';
import GlobalPageLayout from './GlobalPageLayout';
import { writeMutualDraft } from '../Forms/MutualDraftStorage';

export default function HistoryPage({ historyProps, loadDraft }) {
  const navigate = useNavigate();
  const handleLoad = (historyItem) => {
    if (historyItem.type === 'mutual') {
      writeMutualDraft(
        window.localStorage,
        historyItem.draft,
        new Date().toISOString()
      );
      navigate('/mutuo');
      return;
    }
    loadDraft(historyItem);
    navigate('/compra-venta');
  };
  return (
    <GlobalPageLayout>
      <HistoryPanel historyProps={historyProps} onLoad={handleLoad} />
    </GlobalPageLayout>
  );
}
