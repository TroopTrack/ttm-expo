import React from 'react';
import AppStore from './AppStore';
import TroopTrack from './components/TroopTrack';

export default function App() {
  return <TroopTrack appStore={new AppStore()} />;
}
