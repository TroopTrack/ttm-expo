import React from "react";
import LoginStore from "./store";
import { appStore } from "../../AppStore";
import LoginView from "./View";
import { Observer } from "mobx-react";
import LoginReactions from "./LoginReactions";
import Urls from "../../utility/Urls";

interface Props {}

type ForGotValue = "password" | "username";

const loginStore = new LoginStore();

const Login: React.FC<Props> = () => {
  const onTryAgainPressed = () => {
    loginStore.ready(loginStore.state.userName, loginStore.state.password);
  };

  const onChangeUserName = (userName: string) => {
    loginStore.setUserName(userName);
  };

  const onChangePassword = (password: string) => {
    loginStore.setPassword(password);
  };

  const onLoginPressed = () => {
    if (loginStore.loginErrors.length === 0) {
      loginStore.submit();
    } else {
      loginStore.error(loginStore.loginErrors.toString());
    }
  };

  const handleForgotPassWordUsername = (value: ForGotValue) => {
    switch (value) {
      case "password":
        appStore.setUrl(Urls.RESET_PASSWORD_URL);
        break;
      case "username":
        appStore.setUrl(Urls.RESET_USERNAME_URL);
        break;
    }
    appStore.forgotPasswordUsername();
  };

  return (
    <>
      <Observer>
        {() => (
          <>
            <LoginView
              onChangeUserName={onChangeUserName}
              onChangePassword={onChangePassword}
              userName={loginStore.state.userName}
              password={loginStore.state.password}
              onLoginPressed={onLoginPressed}
              onTryAgainPressed={onTryAgainPressed}
              loginStore={loginStore}
              handleForgotPassWordUsername={handleForgotPassWordUsername}
            />
            <LoginReactions store={loginStore} />
          </>
        )}
      </Observer>
    </>
  );
};

export default Login;
