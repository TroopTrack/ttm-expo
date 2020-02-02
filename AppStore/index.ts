import { observable, action, computed } from 'mobx';
import {
  UserState,
  loggedOut,
  NetworkState,
  online,
  offline,
  loggedIn,
} from './types';
import { Maybe, nothing } from 'maybeasy';

class AppStore {
  @observable
  userState: UserState = loggedIn('asdf');
  networkState: NetworkState = online();

  @action
  offline = () => {
    this.networkState = offline();
  };

  @action
  loggedOut = () => {
    this.userState = loggedOut();
  };

  @action
  loggedIn = (token: string) => {
    this.userState = loggedIn(token);
  };

  @computed
  get token(): Maybe<string> {
    return nothing();
  }
}

const appStore = new AppStore();

export { appStore, AppStore };
export default AppStore;
