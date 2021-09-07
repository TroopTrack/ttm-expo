import React from "react";
import { observer } from "mobx-react";
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { styles } from "../Styles";
import LoginStore from "./store";
import CustomHeaderWebView from "../TroopTrack/CustomHeaderWebView";
import TextInput from "../textInput/TextInput";

interface Props {
  loginStore: LoginStore;
}

@observer
class Login extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = { userName: "", password: "" };
  }

  onTryAgainPressed = () => {
    this.props.loginStore.ready();
  };

  onChangeUserName = (userName: string) => {
    this.props.loginStore.setUserName(userName);
  };

  onChangePassword = (password: string) => {
    this.props.loginStore.setPassword(password);
  };

  onLoginPressed = () => {
    const { loginStore } = this.props;
    if (loginStore.loginErrors.length === 0) {
      this.props.loginStore.submit();
    } else {
      alert(loginStore.loginErrors.toString());
    }
  };

  render() {
    switch (this.props.loginStore.state.kind) {
      case "ready":
      case "submitted":
        return (
          <ImageBackground
            source={{
              uri: "https://trooptrack.com/assets/login/login_bg_0.jpg",
            }}
            style={styles.container}
            imageStyle={{ opacity: 0.2 }}
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
                onChangeText={this.onChangeUserName}
                value={this.props.loginStore.state.userName}
              />
              <TextInput
                placeholder="Password"
                onChangeText={this.onChangePassword}
                value={this.props.loginStore.state.password}
                textInputProps={{
                  secureTextEntry: true,
                }}
              />
              <TouchableOpacity
                onPress={this.onLoginPressed}
                disabled={this.props.loginStore.state.kind === "submitted"}
                style={[
                  styles.loginButtonStyle,
                  this.props.loginStore.state.kind === "submitted" && {
                    opacity: 0.2,
                  },
                ]}
              >
                <Text style={styles.loginTextStyle}>Log In</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        );
      case "error":
        return <CustomHeaderWebView token={""} />;
    }
  }
}

export default Login;
