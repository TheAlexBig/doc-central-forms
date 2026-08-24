import { useEffect, useState } from 'react';
import {
  checkUpdates,
  downloadBackup,
  getApplicationInfo,
  restoreBackup,
} from '../Api/MaintenanceApi';

export function useMaintenanceTools() {
  const [applicationInfo, setApplicationInfo] = useState(null);
  const [updateStatus, setUpdateStatus] = useState(null);
  const [maintenanceError, setMaintenanceError] = useState('');
  const [busy, setBusy] = useState('');

  useEffect(() => {
    getApplicationInfo()
      .then(setApplicationInfo)
      .catch((error) => setMaintenanceError(error.message));
  }, []);

  const run = async (name, operation) => {
    setBusy(name);
    setMaintenanceError('');
    try {
      return await operation();
    } catch (error) {
      setMaintenanceError(error.message);
      return null;
    } finally {
      setBusy('');
    }
  };

  return {
    applicationInfo,
    updateStatus,
    maintenanceError,
    busy,
    createBackup: () => run('backup', downloadBackup),
    restoreBackup: (file) =>
      run('restore', async () => {
        await restoreBackup(file);
        window.location.reload();
      }),
    checkUpdates: () =>
      run('updates', async () => {
        const status = await checkUpdates();
        setUpdateStatus(status);
        return status;
      }),
  };
}
