import { observable, action, computed } from 'mobx';
import { UserState, loggedOut, loggedIn } from './types';
import { Maybe, nothing, just } from 'maybeasy';
import { SuccessfulLogin, successfulLoginDecoder } from '../Appy';
import Task from 'taskarian';
import { AsyncStorage } from 'react-native';

type ViewableAs = 'webview' | 'pdfReader';

class AppStore {
  @observable
  userState: UserState = loggedOut();

  @observable
  pushNotificationToken: string = '';

  @observable
  viewableAs: ViewableAs = 'webview';

  @observable
  url: string = 'https://trooptrack.com/troop_selector';

  previousUrl: string = 'https://trooptrack.com/troop_selector';

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

  @action
  setUrl = (url: string) => {
    if (this.url != url) {
      this.previousUrl = this.url;
      this.url = url;
    }
  };

  @action
  goBack = () => {
    this.url = this.previousUrl;
  };

  @action
  setViewableAs = (viewableAs: ViewableAs) => {
    this.viewableAs = viewableAs;
  };

  @computed
  get token(): Maybe<string> {
    switch (this.userState.kind) {
      case 'logged-in':
        return just(this.userState.login.token);
      case 'logged-out':
        return nothing();
    }
  }
}

const appStore = new AppStore();

export { appStore, AppStore };
export default AppStore;
