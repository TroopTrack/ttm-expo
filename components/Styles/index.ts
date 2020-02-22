import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: getStatusBarHeight(false),
    width: '100%',
  },
  root: {
    height: 40,
    padding: 10,
    marginBottom: 10,
    width: '80%',
    backgroundColor: '#fff',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginTop: getStatusBarHeight(false),
  },
});
