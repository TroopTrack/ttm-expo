import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { appStore } from '.';

const PUSH_ENDPOINT = 'https://your-server.com/users/push-token';

export default async function registerForPushNotificationsAsync() {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  // only asks if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  // On Android, permissions are granted on app installation, so
  // `askAsync` will never prompt the user

  // Stop here if the user did not grant permissions
  if (status !== 'granted') {
    console.log('No push notifications!');
    return;
  }

  console.log('Push notifications!');

  // Get the token that identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  appStore.setPushNotificationToken(token);
  return token;
}
