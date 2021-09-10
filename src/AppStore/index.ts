import { observable, action, computed } from "mobx";
import {
  UserState,
  loggedOut,
  loggedIn,
  forgotPasswordUsername,
  ready,
} from "./types";
import { Maybe, nothing, just } from "maybeasy";
import { SuccessfulLogin } from "../Appy";
import Urls from "../utility/Urls";

type ViewableAs = "webview" | "pdfReader";

class AppStore {
  @observable
  userState: UserState = ready();

  @observable
  pushNotificationToken: string = "";

  @observable
  viewableAs: ViewableAs = "webview";

  @observable
  url: string = Urls.TROOPTRACK_SELECTOR_URL;
  previousUrl: string = Urls.TROOPTRACK_SELECTOR_URL;

  @action
  ready = () => {
    this.userState = ready();
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
  forgotPasswordUsername = () => {
    this.userState = forgotPasswordUsername();
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

  setPreviousUrl = (url: string) => {
    console.log(url);
    this.previousUrl = url;
  };

  @action
  goBack = () => {
    console.log(this.previousUrl);
    this.url = this.previousUrl;
  };

  @action
  setViewableAs = (viewableAs: ViewableAs) => {
    this.viewableAs = viewableAs;
  };

  @computed
  get token(): Maybe<string> {
    switch (this.userState.kind) {
      case "logged-in":
        return just(this.userState.login.token);
      case "forgot-password-username":
      case "logged-out":
        return nothing();
    }
  }
}

const appStore = new AppStore();

export { appStore, AppStore };
export default AppStore;
