import { observable, action, computed } from 'mobx';
import {
  UserState,
  loggedOut,
  NetworkState,
  online,
  offline,
  loggedIn,
} from './types';
import { Maybe, nothing, just } from 'maybeasy';
import { SuccessfulLogin } from '../Appy';

class AppStore {
  @observable
  userState: UserState = loggedOut();
  // userState: UserState = loggedIn({
  //   accessToken: 'x',
  //   id: 5,
  //   username: 'string',
  // });

  @observable
  networkState: NetworkState = online();

  @observable
  pushNotificationToken: string = '';

  @action
  offline = () => {
    this.networkState = offline();
  };

  @action
  loggedOut = () => {
    this.userState = loggedOut();
  };

  @action
  loggedIn = (login: SuccessfulLogin) => {
    this.userState = loggedIn(login);
  };

  @action
  setPushNotificationToken = (token: string) => {
    this.pushNotificationToken = token;
  };

  @computed
  get token(): Maybe<string> {
    switch (this.userState.kind) {
      case 'logged-in':
        return just(this.userState.login.accessToken);
      case 'logged-out':
        return nothing();
    }
  }
}

const appStore = new AppStore();

export { appStore, AppStore };
export default AppStore;
