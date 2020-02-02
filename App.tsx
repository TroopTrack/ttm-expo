import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default function App() {
  return (
    <WebView
      source={{ uri: 'https://trooptracktest.com/user_account_session/new' }}
      userAgent="TroopTrackMobile"
      style={styles.container}
    />
  );
}

const height = StatusBar.currentHeight + 5;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: getStatusBarHeight(true),
  },
});
