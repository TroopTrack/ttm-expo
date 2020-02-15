import { observer } from 'mobx-react';
import React from 'react';
import { WebView } from 'react-native-webview';
import Loader from '../Loader';
import { styles } from '../Styles';
import { appStore } from '../../AppStore';
import { Maybe } from 'maybeasy';

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
    // newNavState looks something like this:
    // {
    //   url?: string;
    //   title?: string;
    //   loading?: boolean;
    //   canGoBack?: boolean;
    //   canGoForward?: boolean;
    // }
    const { url } = newNavState;
    console.log(url);
    appStore.setUrl(url);
    if (!url) return;

    // handle certain doctypes
    if (url.includes('.pdf')) {
      this.webview.stopLoading();
      console.log("Stopped loading cuz it's a PDF");
    }

    // redirect somewhere else
    // if (url.includes('google.com')) {
    //   const newURL = 'https://facebook.github.io/react-native/';
    //   const redirectTo = 'window.location = "' + newURL + '"';
    //   this.webview.injectJavaScript(redirectTo);
    // }
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
