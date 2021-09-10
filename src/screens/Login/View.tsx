import React, { LegacyRef, useEffect, useRef } from "react";
import {
  TouchableOpacity,
  Text,
  ImageBackground,
  View,
  Image,
  TextInput as RNTexInput,
} from "react-native";
import Styles from "./Styles";
import { styles } from "../../components/Styles";
import TextInput from "../../components/textInput/TextInput";
import ErrorPopUp from "../../components/errorPopUp/ErrorPopUp";
import ForgotuButton from "./ForgotButton";
import LoginStore from "./store";

export interface Props {
  onChangeUserName: (value: string) => void;
  userName: string;
  onChangePassword: (value: string) => void;
  password: string;
  onLoginPressed: () => void;
  loginStore: LoginStore;
  onTryAgainPressed: () => void;
  handleForgotPassWordUsername: (value: string) => void;
}

const LoginView: React.FC<Props> = (props: Props) => {
  const {
    onChangeUserName,
    userName,
    onChangePassword,
    password,
    onLoginPressed,
    loginStore,
    onTryAgainPressed,
    handleForgotPassWordUsername,
  } = props;
  const passwordRef = useRef<RNTexInput>(null);

  return (
    <>
      {
        <ImageBackground
          source={{
            uri: "https://trooptrack.com/assets/login/login_bg_0.jpg",
          }}
          style={styles.container}
          imageStyle={Styles.backgroundImageStyle}
        >
          <View style={styles.logoContainer}>
            <Image
              source={{
                uri:
                  "https://trooptrack.com/assets/marketing/core-img/logo.png",
              }}
              style={styles.logoStyle}
            />
          </View>
          <View style={[styles.container, styles.loginFormContainer]}>
            <TextInput
              placeholder="User Name"
              onChangeText={onChangeUserName}
              value={userName}
              textInputProps={{
                onSubmitEditing: () => passwordRef.current?.focus(),
              }}
            />
            <TextInput
              placeholder="Password"
              onChangeText={onChangePassword}
              value={password}
              textInputProps={{
                secureTextEntry: true,
                ref: passwordRef,
                onSubmitEditing: onLoginPressed,
              }}
            />
            <TouchableOpacity
              onPress={onLoginPressed}
              disabled={loginStore.state.kind === "submitted"}
              style={[
                styles.loginButtonStyle,
                loginStore.state.kind === "submitted" && {
                  opacity: 0.2,
                },
              ]}
            >
              <Text style={styles.loginTextStyle}>Log In</Text>
            </TouchableOpacity>
            <View style={Styles.forgotPassUsernameContainer}>
              <ForgotuButton
                title="I forgot my password"
                onPress={() => handleForgotPassWordUsername("password")}
              />
              <Text style={Styles.separatorStyle}>|</Text>
              <ForgotuButton
                title="I forgot my user name"
                onPress={() => handleForgotPassWordUsername("username")}
              />
            </View>
          </View>
          {loginStore.state.kind === "error" && (
            <ErrorPopUp
              visible={true}
              onPressOk={onTryAgainPressed}
              message={loginStore.state.message}
              buttonTitle="Try again"
            />
          )}
        </ImageBackground>
      }
    </>
  );
};

export default LoginView;
