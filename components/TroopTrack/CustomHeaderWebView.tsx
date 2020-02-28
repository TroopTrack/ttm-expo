import { observer } from 'mobx-react';
import React from 'react';
import { WebView } from 'react-native-webview';
import Loader from '../Loader';
import { styles } from '../Styles';
import { appStore } from '../../AppStore';
import * as FileSystem from 'expo-file-system';
import * as WebBrowser from 'expo-web-browser';
import { View, Text, TouchableHighlight } from 'react-native';

interface Props {
  token: string;
}

@observer
class CustomHeaderWebView extends React.Component<Props> {
  webview = null;

  touchableHighlight = () => {
    switch (appStore.viewableAs) {
      case 'webview':
        return <></>;
      case 'pdfReader':
        return (
          <TouchableHighlight
            onPress={() => this.handleDonePress()}
            style={styles.button}
            underlayColor="green"
          >
            <Text>Done</Text>
          </TouchableHighlight>
        );
    }
  };

  handleDonePress = () => {
    appStore.goBack();
    appStore.setViewableAs('webview');
  };

  handleWebViewNavigationStateChange = newNavState => {
    const { url } = newNavState;
    if (!url) {
      return;
    }

    // handle certain doctypes & external urls
    if (!url.includes('trooptrack.com')) {
      this.webview.stopLoading();
      WebBrowser.openBrowserAsync(url);
    } else if (
      url.includes('.pdf') ||
      url.includes('.csv') ||
      url.includes('.png') ||
      url.includes('.gif') ||
      url.includes('.jpeg') ||
      url.includes('.jpg')
    ) {
      appStore.setUrl(url);
      appStore.setViewableAs('pdfReader');
    } else if (url.includes('.ics') | url.includes('.vcf')) {
      this.webview.stopLoading();
      alert(
        "The mobile app doesn't support these file types yet. We're working on it!"
      );
    } else {
      appStore.setUrl(url);
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.touchableHighlight()}
        <WebView
          ref={ref => (this.webview = ref)}
          sharedCookiesEnabled={true}
          source={{
            uri: appStore.url,
            headers: {
              Authorization: 'Bearer ' + this.props.token,
              PushNotificationToken: appStore.pushNotificationToken,
            },
          }}
          userAgent="TroopTrackMobile"
          style={styles.container}
          onError={syntheticEvent => {
            console.log(syntheticEvent);
          }}
          renderLoading={() => <Loader />}
          onNavigationStateChange={this.handleWebViewNavigationStateChange}
        />
      </View>
    );
  }
}

export default CustomHeaderWebView;
