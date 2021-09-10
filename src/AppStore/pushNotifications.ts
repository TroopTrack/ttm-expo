import * as Notifications from "expo-notifications";
import { appStore } from ".";
import Constants from "expo-constants";

export default async function registerForPushNotificationsAsync() {
  if (Constants.isDevice) {
    const { status } = await Notifications.getPermissionsAsync();
    // only asks if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    // On Android, permissions are granted on app installation, so
    // `askAsync` will never prompt the user

    // Stop here if the user did not grant permissions
    if (status !== "granted") {
      return;
    }

    // Get the token that identifies this device
    let token = (await Notifications.getExpoPushTokenAsync()).data;

    appStore.setPushNotificationToken(token);
    return token;
  }
}
