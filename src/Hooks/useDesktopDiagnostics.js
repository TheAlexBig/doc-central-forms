import { useEffect, useState } from 'react';
import {
  downloadSupportPackage,
  getDesktopDiagnostics,
  openLogsFolder,
} from '../Api/DesktopApi';

export function useDesktopDiagnostics() {
  const [diagnostics, setDiagnostics] = useState(null);
  const [diagnosticsError, setDiagnosticsError] = useState('');
  const [supportPackageLoading, setSupportPackageLoading] = useState(false);

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

  const downloadDiagnosticsPackage = async () => {
    setDiagnosticsError('');
    setSupportPackageLoading(true);
    try {
      await downloadSupportPackage();
    } catch (error) {
      setDiagnosticsError(error.message);
    } finally {
      setSupportPackageLoading(false);
    }
  };

  return {
    diagnostics,
    diagnosticsError,
    openDiagnosticsLogs,
    downloadDiagnosticsPackage,
    supportPackageLoading,
  };
}
