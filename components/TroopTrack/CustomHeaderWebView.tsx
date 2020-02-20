import { observer } from 'mobx-react';
import React from 'react';
import { WebView } from 'react-native-webview';
import Loader from '../Loader';
import { styles } from '../Styles';
import { appStore } from '../../AppStore';
import * as FileSystem from 'expo-file-system';
import * as WebBrowser from 'expo-web-browser';
import FileViewer from 'react-native-file-viewer';
import { Linking } from 'expo';

interface Props {
  token: string;
}

interface TTHeaders {
  Authorization?: string;
  PushNotificationToken: string;
}

@observer
class CustomHeaderWebView extends React.Component<Props> {
  webview = null;

  handleWebViewNavigationStateChange = newNavState => {
    const { url } = newNavState;
    appStore.setUrl(url);
    if (!url) return;

    // handle certain doctypes & external urls
    if (!url.includes('trooptrack.com')) {
      WebBrowser.openBrowserAsync(url);
    } else if (
      url.includes('.pdf') ||
      url.includes('.ics') ||
      url.includes('.csv')
    ) {
      this.webview.stopLoading();
      alert(
        "The mobile app doesn't support these file types yet. We're working on it!"
      );
      // FileSystem.downloadAsync(url, FileSystem.documentDirectory + 'small.pdf')
      //   .then(({ uri }) => {
      //     console.log('Finished downloading ', uri);
      //     Linking.openURL(uri);
      //   })
      //   .catch(error => {
      //     console.error(error);
      //   });
    }
  };

  render() {
    return (
      <WebView
        ref={ref => (this.webview = ref)}
        sharedCookiesEnabled={true}
        source={{
          uri: 'https://trooptrack.com/troop_selector',
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
        onShouldStartLoadWithRequest={request => {
          // If we're loading the current URI, allow it to load
          if (request.url === appStore.url) return true;
          // We're loading a new URL -- change state first
          appStore.setUrl(request.url);
          return true;
        }}
      />
    );
  }
}

export default CustomHeaderWebView;
