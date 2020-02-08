import { observer } from 'mobx-react';
import React from 'react';
import { WebView } from 'react-native-webview';
import Loader from '../Loader';
import { styles } from '../Styles';
import { appStore } from '../../AppStore';

interface Props {
  token: string;
}

@observer
class CustomHeaderWebView extends React.Component<Props> {
  render() {
    return (
      <WebView
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
          appStore.offline();
        }}
        renderLoading={() => <Loader />}
      />
    );
  }
}

export default CustomHeaderWebView;
