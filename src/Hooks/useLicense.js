import { useEffect, useState } from 'react';
import { activateLicense, getLicenseStatus } from '../Api/LicenseApi';

export function useLicense() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getLicenseStatus()
      .then(setStatus)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  const activate = async (license) => {
    setError('');
    setLoading(true);
    try {
      const activated = await activateLicense(license);
      setStatus(activated);
      return true;
    } catch (requestError) {
      setError(requestError.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { activate, error, loading, status };
}
