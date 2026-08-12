import { useEffect, useState } from 'react';
import {
  downloadHistoryDocument,
  listDocumentHistory,
} from '../Api/DocumentsApi';

export function useDocumentHistory() {
  const [documentHistory, setDocumentHistory] = useState([]);
  const [historyError, setHistoryError] = useState('');

  const refreshDocumentHistory = async () => {
    try {
      setDocumentHistory(await listDocumentHistory());
      setHistoryError('');
    } catch (error) {
      setHistoryError(error.message);
    }
  };

  useEffect(() => {
    refreshDocumentHistory();
  }, []);

  const downloadHistoricalDocument = async (historyItem, format) => {
    try {
      setHistoryError('');
      await downloadHistoryDocument(historyItem.id, format);
    } catch (error) {
      setHistoryError(error.message);
    }
  };

  return {
    documentHistory,
    historyError,
    refreshDocumentHistory,
    downloadHistoricalDocument,
  };
}
