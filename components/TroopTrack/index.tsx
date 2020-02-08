import React from 'react';
import AppStore from '../../AppStore';
import { observer } from 'mobx-react';
import { WebView } from 'react-native-webview';
import Loader from '../Loader';
import { offline } from '../../AppStore/types';
import { StyleSheet, View, Text } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Login from '../Login';
import { styles } from '../Styles';
import LoginStore from '../Login/store';
import LoginReactions from '../Login/LoginReactions';

interface Props {
  appStore: AppStore;
}

@observer
class TroopTrack extends React.Component<Props> {
  render() {
    switch (this.props.appStore.networkState.kind) {
      case 'offline':
        return (
          <View>
            <Text>Offline</Text>
          </View>
        );
      case 'online':
        switch (this.props.appStore.userState.kind) {
          case 'logged-in':
            return (
              <WebView
                source={{
                  uri: 'https://trooptrack.com/user_account_session/new',
                }}
                userAgent="TroopTrackMobile"
                style={styles.container}
                onError={syntheticEvent => {
                  this.props.appStore.offline();
                }}
                renderLoading={() => <Loader />}
              />
            );
          case 'logged-out':
            const loginStore = new LoginStore();
            return (
              <>
                <Login loginStore={loginStore} />
                <LoginReactions store={loginStore} />
              </>
            );
        }
    }
  }
}

export default TroopTrack;
