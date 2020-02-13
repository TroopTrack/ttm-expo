import React from 'react';
import { observer } from 'mobx-react';
import { AsyncStorage } from 'react-native';
import Login from '../Login';
import LoginStore from '../Login/store';
import LoginReactions from '../Login/LoginReactions';
import AppStore, { appStore } from '../../AppStore';
import registerForPushNotificationsAsync from '../../AppStore/pushNotifications';
import CustomHeaderWebView from './CustomHeaderWebView';
import Task from 'taskarian';
import { successfulLoginDecoder, SuccessfulLogin } from '../../Appy';

const removeData = async () => {
  try {
    await AsyncStorage.removeItem('@tt_token');
  } catch (e) {
    // saving error
  }
};

@observer
class TroopTrack extends React.Component {
  getLoginFromLocal = (appStore: AppStore) => {
    Task.fromPromise<any, string>(() => AsyncStorage.getItem('@tt_token')).fork(
      () => console.log('No stored login'),
      loginS => {
        console.log(loginS);
        if (loginS) {
          successfulLoginDecoder.decodeJson(loginS).cata({
            Err: err => {
              console.log(err);
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
  }

  render() {
    switch (appStore.userState.kind) {
      case 'logged-in':
        return (
          <CustomHeaderWebView token={appStore.userState.login.accessToken} />
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

export default TroopTrack;
