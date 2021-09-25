import Task from "taskarian";
import LoginStore, { LoginState } from "./store";
import ErrorActionableReaction, {
  EAProps,
} from "../../ErrorActionableReaction";
import { login, AppyError, SuccessfulLogin } from "../../Appy";
import { toHttpTask } from "ajaxian";
import { appStore } from "../../AppStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Props extends EAProps<LoginStore> {
  store: LoginStore;
}

type LoginError = AppyError;

const handleLoginError = (store: LoginStore) => (error: LoginError) => {
  switch (error.kind) {
    case "bad-payload":
    case "network-error":
    case "timeout":
    case "bad-url":
      store.error("Login failed");
      break;
    case "bad-status":
      const errorBody = JSON.parse(error?.response?.body);
      const errorMsg = errorBody?.errors[0]?.code;
      store.error(errorMsg ? errorMsg : "Login failed");
      break;
  }
};

const handleLoginSuccess = (_store: LoginStore) => (login: SuccessfulLogin) => {
  appStore.loggedIn(login);
  storeData(login);
  _store.ready("", "");
};

const storeData = async (login: SuccessfulLogin) => {
  try {
    await AsyncStorage.setItem("@tt_token", JSON.stringify(login));
  } catch (e) {}
};

class LoginReactions extends ErrorActionableReaction<
  LoginStore,
  LoginState,
  Props
> {
  scrollHeight: number;
  tester = () => this.props.store.state;

  effect = (state: LoginState) => {
    const { store } = this.props;
    switch (state.kind) {
      case "ready":
        break;
      case "submitted":
        toHttpTask(
          login({
            username: state.userName,
            password: state.password,
          })
        ).fork(handleLoginError(store), (login) => {
          handleLoginSuccess(store)(login.payload);
        });
        break;
      case "error":
        break;
    }
  };
}

export default LoginReactions;
