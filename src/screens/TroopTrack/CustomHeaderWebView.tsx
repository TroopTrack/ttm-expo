import React, { useRef, useState } from "react";
import { WebView } from "react-native-webview";
import Loader from "../../components/Loader";
import { styles } from "../../components/Styles";
import { appStore } from "../../AppStore";
import * as WebBrowser from "expo-web-browser";
import {
  Text,
  TouchableHighlight,
  SafeAreaView,
  Platform,
  Linking,
} from "react-native";
import { removeData } from "../../utility/RemoveAuthData";
import Urls from "../../utility/Urls";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Ionicons } from "@expo/vector-icons";
import ColorConstants from "../../utility/ColorConstants";
import { WebViewMessageEvent } from "react-native-webview/lib/WebViewTypes";
import ErrorPopUp from "../../components/errorPopUp/ErrorPopUp";
import { Observer } from "mobx-react";

interface Props {
  token: string;
}

const CustomHeaderWebView: React.FC<Props> = (props: Props) => {
  const webview = useRef(null);
  const [showInAppPurchaseAlert, setShowInAppPurchaseAlert] = useState(false);

  const touchableHighlight = () => {
    switch (appStore.viewableAs) {
      case "webview":
        return;
      case "pdfReader":
        return (
          <TouchableHighlight
            onPress={() => handleDonePress()}
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
              onPress={() => handleGoBack()}
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

  const handleGoBack = () => {
    appStore.setViewableAs("webview");
    appStore.setUrl(appStore.previousUrl);
  };

  const handleDonePress = () => {
    appStore.goBack();
    appStore.setViewableAs("webview");
  };

  const dialCall = (number: number) => {
    let phoneNumber = number.toString();

    if (Platform.OS === "android") {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  const handleWebViewNavigationStateChange = (newNavState) => {
    const { url } = newNavState;
    if (!url) {
      return;
    }
    const lowerCaseUrl = url.toLowerCase();
    // handle certain doctypes & external urls
    if (!lowerCaseUrl.includes(Urls.DOMAIN) && !url.includes("paypal.com")) {
      console.log("Leaving");
      webview.current?.stopLoading();
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
      webview.current?.stopLoading();
      alert("The mobile app doesn't currently support these file types");
    } else if (lowerCaseUrl.includes("printable_html=true")) {
      appStore.setUrl(url);
      appStore.setViewableAs("printableHtml");
    } else {
      appStore.setUrl(url);
    }
  };

  const saveFile = async (fileUri: string) => {
    await Sharing.shareAsync(fileUri);
  };

  const handleOnMessage = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.hasOwnProperty("mobile_payment")) {
      if (!data.mobile_payment) {
        setShowInAppPurchaseAlert(true);
      }
    } else if (data.hasOwnProperty("number")) {
      dialCall(data.number);
    } else if (data.hasOwnProperty("email")) {
      Linking.openURL(`mailto:${data.email}`);
    }
  };

  return (
    <>
      <Observer>
        {() => (
          <>
            <SafeAreaView style={{ flex: 1 }}>
              <ErrorPopUp
                onPressOk={() => {
                  setShowInAppPurchaseAlert(false);
                }}
                visible={showInAppPurchaseAlert}
                message={"In app purchases are not available on the mobile app"}
                useIcon={true}
              />
              {touchableHighlight()}
              <WebView
                ref={webview}
                originWhitelist={["*"]}
                source={{
                  uri: appStore.url,
                  headers: {
                    Authorization: "Bearer " + props.token,
                    PushNotificationToken: appStore.pushNotificationToken,
                  },
                }}
                userAgent={
                  Platform.OS === "ios" ? "TroopTrackIOS" : "TroopTrackAndroid"
                }
                style={styles.container}
                onError={(syntheticEvent) => {
                  console.log(syntheticEvent);
                }}
                renderLoading={() => <Loader />}
                onNavigationStateChange={handleWebViewNavigationStateChange}
                incognito={true}
                startInLoadingState={true}
                onFileDownload={({ nativeEvent: { downloadUrl } }) => {
                  var nameArray = downloadUrl.split("/");
                  var name = nameArray[nameArray.length - 1];
                  const filename = name.split("?");
                  let fileUri = FileSystem.documentDirectory + filename[0];
                  saveFile(fileUri);
                }}
                onMessage={(event) => {
                  handleOnMessage(event);
                }}
              />
            </SafeAreaView>
          </>
        )}
      </Observer>
    </>
  );
};

export default CustomHeaderWebView;
