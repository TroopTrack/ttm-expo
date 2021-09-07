import { observer } from "mobx-react";
import React from "react";
import { WebView } from "react-native-webview";
import Loader from "../Loader";
import { styles } from "../Styles";
import { appStore } from "../../AppStore";
import * as WebBrowser from "expo-web-browser";
import { Text, TouchableHighlight, SafeAreaView } from "react-native";
import { removeData } from "../../utility/RemoveAuthData";

interface Props {
  token: string;
}

@observer
class CustomHeaderWebView extends React.Component<Props> {
  webview = null;
  
  touchableHighlight = () => {
    switch (appStore.viewableAs) {
      case "webview":
        return <SafeAreaView></SafeAreaView>;
      case "pdfReader":
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
    appStore.setViewableAs("webview");
  };

  handleWebViewNavigationStateChange = (newNavState) => {
    const { url } = newNavState;
    if (!url) {
      return;
    }
    const lowerCaseUrl = url.toLowerCase();
    // handle certain doctypes & external urls
    if (
      !lowerCaseUrl.includes("trooptrack.com") &&
      !url.includes("paypal.com")
    ) {
      console.log("Leaving");
      this.webview.stopLoading();
      WebBrowser.openBrowserAsync(url);
    } else if (lowerCaseUrl.includes("trooptrack.com/user_account_session")) {
      removeData();
    } else if (
      lowerCaseUrl.includes(".pdf") ||
      lowerCaseUrl.includes(".csv") ||
      lowerCaseUrl.includes(".png") ||
      lowerCaseUrl.includes(".gif") ||
      lowerCaseUrl.includes(".jpeg") ||
      lowerCaseUrl.includes(".jpg")
    ) {
      appStore.setUrl(url);
      appStore.setViewableAs("pdfReader");
    } else if (lowerCaseUrl.includes(".ics") | lowerCaseUrl.includes(".vcf")) {
      this.webview.stopLoading();
      alert("The mobile app doesn't currently support these file types");
    } else {
      appStore.setPreviousUrl(url);
    }
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {this.touchableHighlight()}
        <WebView
          ref={(ref) => (this.webview = ref)}
          sharedCookiesEnabled={true}
          source={{
            uri: appStore.url,
            headers: {
              Authorization: "Bearer " + this.props.token,
              PushNotificationToken: appStore.pushNotificationToken,
            },
          }}
          userAgent="TroopTrackMobile"
          style={styles.container}
          onError={(syntheticEvent) => {
            console.log(syntheticEvent);
          }}
          renderLoading={() => <Loader />}
          onNavigationStateChange={this.handleWebViewNavigationStateChange}
          incognito={true}
        />
      </SafeAreaView>
    );
  }
}

export default CustomHeaderWebView;
