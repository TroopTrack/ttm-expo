import React from 'react';
import { observer } from 'mobx-react';
import { View, Text, ImageBackground, Image } from 'react-native';
import Login from '../Login';
import { styles } from '../Styles';
import LoginStore from '../Login/store';
import LoginReactions from '../Login/LoginReactions';
import { appStore } from '../../AppStore';
import registerForPushNotificationsAsync from '../../AppStore/pushNotifications';
import CustomHeaderWebView from './CustomHeaderWebView';

@observer
class TroopTrack extends React.Component {
  componentDidMount() {
    registerForPushNotificationsAsync();
  }

  render() {
    switch (appStore.networkState.kind) {
      case 'offline':
        return (
          <View style={styles.container}>
            <Text>
              You are currently offline. Please try again when you are online.
            </Text>
          </View>
        );
      case 'online':
        switch (appStore.userState.kind) {
          case 'logged-in':
            return appStore.token
              .map(token => <CustomHeaderWebView token={token} />)
              .getOrElseValue(<></>);
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
