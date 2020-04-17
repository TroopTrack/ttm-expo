import React from 'react';
import { observer } from 'mobx-react';
import { AsyncStorage, EventSubscription } from 'react-native';
import Login from '../Login';
import LoginStore from '../Login/store';
import LoginReactions from '../Login/LoginReactions';
import AppStore, { appStore } from '../../AppStore';
import registerForPushNotificationsAsync from '../../AppStore/pushNotifications';
import CustomHeaderWebView from './CustomHeaderWebView';
import Task from 'taskarian';
import { successfulLoginDecoder, SuccessfulLogin } from '../../Appy';
import { Notifications } from 'expo';

const removeData = async () => {
  try {
    await AsyncStorage.removeItem('@tt_token');
  } catch (e) {
    // saving error
  }
};

@observer
class TroopTrack extends React.Component {
  _notificationSubscription: any = null;

  getLoginFromLocal = (appStore: AppStore) => {
    Task.fromPromise<any, string>(() => AsyncStorage.getItem('@tt_token')).fork(
      () => console.log('No stored login'),
      (loginS) => {
        if (loginS !== null) {
          successfulLoginDecoder.decodeJson(loginS).cata({
            Err: (err) => {
              removeData();
              return;
            },
            Ok: (login: SuccessfulLogin) => {
              appStore.loggedIn(login);
            },
          });
        }
      }
    );
  };

  componentDidMount() {
    registerForPushNotificationsAsync();
    this.getLoginFromLocal(appStore);
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = (notification) => {
    if (notification.data && notification.data.targetUrl) {
      if (notification.origin == 'selected') {
        appStore.setUrl(notification.data.targetUrl);
      }
    }
  };

  render() {
    switch (appStore.userState.kind) {
      case 'logged-in':
        return <CustomHeaderWebView token={appStore.userState.login.token} />;
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

export default TroopTrack;
