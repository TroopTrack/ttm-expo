import React from 'react';
import TroopTrack from './components/TroopTrack';
import registerForPushNotificationsAsync from './AppStore/pushNotifications';

export default function App() {
  registerForPushNotificationsAsync();
  return <TroopTrack />;
}
