import { observer } from "mobx-react";
import React from "react";
import { WebView } from "react-native-webview";
import Loader from "../../components/Loader";
import { styles } from "../../components/Styles";
import { appStore } from "../../AppStore";
import * as WebBrowser from "expo-web-browser";
import { Text, TouchableHighlight, SafeAreaView } from "react-native";
import { removeData } from "../../utility/RemoveAuthData";
import Urls from "../../utility/Urls";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Ionicons } from "@expo/vector-icons";
import ColorConstants from "../../utility/ColorConstants";

interface Props {
  token: string;
}

@observer
class CustomHeaderWebView extends React.Component<Props> {
  webview = null;

  touchableHighlight = () => {
    switch (appStore.viewableAs) {
      case "webview":
        return;
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
      case "printableHtml":
        return (
          <SafeAreaView style={styles.printableHtmlHeader}>
            <TouchableHighlight
              onPress={() => this.handleGoBack()}
              underlayColor="#DDDDDD"
              style={{ padding: 10 }}
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color={ColorConstants.BLACk}
              />
            </TouchableHighlight>
          </SafeAreaView>
        );
    }
  };

  handleGoBack = () => {
    appStore.setViewableAs("webview");
    appStore.setUrl(appStore.previousUrl);
  };

  handleDonePress = () => {
    appStore.goBack();
    appStore.setViewableAs("webview");
  };

  handleWebViewNavigationStateChange = (newNavState) => {
    const { url } = newNavState;
    console.log(url)
    if (!url) {
      return;
    }
    const lowerCaseUrl = url.toLowerCase();
    // handle certain doctypes & external urls
    if (!lowerCaseUrl.includes(Urls.DOMAIN) && !url.includes("paypal.com")) {
      console.log("Leaving");
      this.webview.stopLoading();
      WebBrowser.openBrowserAsync(url);
    } else if (lowerCaseUrl.includes(Urls.ACCOUNT_SESSION)) {
      removeData();
      appStore.setUrl(Urls.TROOPTRACK_SELECTOR_URL);
      appStore.setPreviousUrl(Urls.TROOPTRACK_SELECTOR_URL);
      appStore.loggedOut();
    } else if (
      lowerCaseUrl.includes(".pdf") ||
      lowerCaseUrl.includes(".csv") ||
      lowerCaseUrl.includes(".png") ||
      lowerCaseUrl.includes(".gif") ||
      lowerCaseUrl.includes(".jpeg") ||
      lowerCaseUrl.includes(".jpg")
    ) {
      appStore.setUrl(url);
    } else if (lowerCaseUrl.includes(".ics") | lowerCaseUrl.includes(".vcf")) {
      this.webview.stopLoading();
      alert("The mobile app doesn't currently support these file types");
    } else if (lowerCaseUrl.includes("printable_html=true")) {
      appStore.setUrl(url);
      appStore.setViewableAs("printableHtml");
    } else {
      appStore.setUrl(url);
    }
  };

  saveFile = async (fileUri: string) => {
    await Sharing.shareAsync(fileUri);
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {this.touchableHighlight()}
        <WebView
          ref={(ref) => (this.webview = ref)}
          originWhitelist={["*"]}
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
          startInLoadingState={true}
          onFileDownload={({ nativeEvent: { downloadUrl } }) => {
            var nameArray = downloadUrl.split("/");
            var name = nameArray[nameArray.length - 1];
            const filename = name.split("?");
            let fileUri = FileSystem.documentDirectory + filename[0];
            this.saveFile(fileUri);
          }}
        />
      </SafeAreaView>
    );
  }
}

export default CustomHeaderWebView;
