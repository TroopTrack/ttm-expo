import React from "react";
import AppStore, { appStore } from "../../AppStore";
import CustomHeaderWebView from "./CustomHeaderWebView";
import Task from "taskarian";
import { successfulLoginDecoder, SuccessfulLogin } from "../../Appy";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeData } from "../../utility/RemoveAuthData";
import { useEffect } from "react";
import { Observer } from "mobx-react";
import LoginScreen from "../Login";
import Loader from "../../components/Loader";

interface Props {}

const TroopTrack: React.FC<Props> = (props: Props) => {
  useEffect(() => {
    getLoginFromLocal(appStore);
  }, []);

  const getLoginFromLocal = (appStore: AppStore) => {
    Task.fromPromise<any, string>(() => AsyncStorage.getItem("@tt_token")).fork(
      () => console.log("No stored login"),
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
        } else {
          appStore.loggedOut();
        }
      }
    );
  };

  const renderComponent = () => {
    switch (appStore.userState.kind) {
      case "ready":
        return <Loader />;
      case "logged-in":
        return <CustomHeaderWebView token={appStore.userState.login.token} />;
      case "forgot-password-username":
      case "sign-up":
        return <CustomHeaderWebView token={""} />;
      case "logged-out":
        return <LoginScreen />;
    }
  };

  return (
    <>
      <Observer>{() => <>{renderComponent()}</>}</Observer>
    </>
  );
};

export default TroopTrack;
