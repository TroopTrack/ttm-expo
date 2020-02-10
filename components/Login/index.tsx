import React from 'react';
import { observer } from 'mobx-react';
import {
  View,
  TextInput,
  Button,
  Text,
  ImageBackground,
  Image,
} from 'react-native';
import { styles } from '../Styles';
import LoginStore from './store';
import CustomHeaderWebView from '../TroopTrack/CustomHeaderWebView';
import { nothing } from 'maybeasy';

interface Props {
  loginStore: LoginStore;
}

@observer
class Login extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = { userName: '', password: '' };
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
      case 'ready':
      case 'submitted':
        return (
          <View style={styles.container}>
            <ImageBackground
              source={{
                uri: 'https://trooptrack.com/assets/login/login_bg_0.jpg',
              }}
              style={styles.container}
              imageStyle={{ opacity: 0.1 }}
            >
              <Image
                source={{
                  uri:
                    'https://trooptrack.com/assets/marketing/core-img/logo.png',
                }}
                style={{
                  width: 300,
                  height: 60,
                  marginBottom: 30,
                  marginTop: 50,
                }}
              />
              <TextInput
                placeholder="User Name"
                style={styles.root}
                onChangeText={this.onChangeUserName}
                value={this.props.loginStore.state.userName}
              />
              <TextInput
                placeholder="Password"
                style={styles.root}
                onChangeText={this.onChangePassword}
                value={this.props.loginStore.state.password}
                secureTextEntry
              />
              <Button
                title="Log In"
                onPress={this.onLoginPressed}
                disabled={this.props.loginStore.state.kind === 'submitted'}
              />
            </ImageBackground>
          </View>
        );
      case 'error':
        return <CustomHeaderWebView token={nothing()} />;
    }
  }
}

export default Login;
