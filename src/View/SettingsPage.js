import SettingsPanel from '../Settings/SettingsPanel';
import GlobalPageLayout from './GlobalPageLayout';

export default function SettingsPage({ settingsProps }) {
  return (
    <GlobalPageLayout>
      <SettingsPanel settingsProps={settingsProps} />
    </GlobalPageLayout>
  );
}
