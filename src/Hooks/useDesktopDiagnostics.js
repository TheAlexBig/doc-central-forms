import { useEffect, useState } from 'react';
import { getDesktopDiagnostics, openLogsFolder } from '../Api/DesktopApi';

export function useDesktopDiagnostics() {
  const [diagnostics, setDiagnostics] = useState(null);
  const [diagnosticsError, setDiagnosticsError] = useState('');

  useEffect(() => {
    getDesktopDiagnostics()
      .then(setDiagnostics)
      .catch((error) => setDiagnosticsError(error.message));
  }, []);

  const openDiagnosticsLogs = async () => {
    setDiagnosticsError('');
    try {
      await openLogsFolder();
    } catch (error) {
      setDiagnosticsError(error.message);
    }
  };

  return {
    diagnostics,
    diagnosticsError,
    openDiagnosticsLogs,
  };
}
