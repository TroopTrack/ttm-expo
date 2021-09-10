import { observable, action, computed } from "mobx";
import { nothing, Maybe } from "maybeasy";
import { FlashAlert } from "../../Notifications/Types";

interface Ready {
  kind: "ready";
  userName: string;
  password: string;
}

interface Error {
  kind: "error";
  message: string;
  userName: string;
  password: string;
}

interface Submitted {
  kind: "submitted";
  userName: string;
  password: string;
}

export type LoginState = Ready | Submitted | Error;

const ready = (userName: string, password: string): Ready => ({
  kind: "ready",
  userName,
  password,
});

const submitted = (userName: string, password: string): Submitted => ({
  kind: "submitted",
  userName,
  password,
});

const error = (error: string, userName: string, password: string): Error => ({
  kind: "error",
  message: error,
  userName,
  password,
});

class LoginStore {
  @observable
  state: LoginState = ready("", "");

  @action
  setUserName = (userName: string) => {
    switch (this.state.kind) {
      case "ready":
        this.state = ready(userName, this.state.password);
        break;
      case "error":
      case "submitted":
        break;
    }
  };

  @action
  setPassword = (password: string) => {
    switch (this.state.kind) {
      case "ready":
        this.state = ready(this.state.userName, password);
        break;
      case "error":
      case "submitted":
        break;
    }
  };

  @action
  error = (errorMessage: string) => {
    this.state = error(errorMessage, this.state.userName, this.state.password);
  };

  @action
  ready = (userName: string, password: string) => {
    this.state = ready(userName, password);
  };

  @action
  submit = () => {
    switch (this.state.kind) {
      case "ready":
        this.state = submitted(this.state.userName, this.state.password);
        break;
      case "error":
      case "submitted":
        break;
    }
  };

  @computed
  get loginErrors(): string[] {
    const errors = [];
    switch (this.state.kind) {
      case "ready":
      case "submitted":
        if (this.state.userName == "" && this.state.password == "") {
          errors.push("User name and password is required");
        } else if (this.state.userName == "") {
          errors.push("User name is required");
        } else if (this.state.password == "") {
          errors.push("Password is required");
        }
        return errors;
      case "error":
        errors.push(this.state.message);
        return errors;
    }
  }

  @computed
  get notification(): Maybe<FlashAlert> {
    switch (this.state.kind) {
      case "ready":
      case "submitted":
        return nothing();
      case "error":
        // TODO
        nothing();
    }
  }
}

export default LoginStore;
