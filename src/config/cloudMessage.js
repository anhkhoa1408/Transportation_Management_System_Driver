import messaging from '@react-native-firebase/messaging';
import authApi from '../api/authApi';
import { Alert } from 'react-native';

const messageApp = messaging();

export function initTokenSync() {
  messageApp.onTokenRefresh(newToken => {
    authApi
      .updateDeviceToken(newToken)
      .then(() => console.log('Device Token Updated By Refresh'));
  });

  messageApp.getToken().then(async token => {
    authApi
      .updateDeviceToken(token)
      .then(() => console.log('Device Token Updated By getToken'))
      .catch(err => console.log(err));
  });
}

export function initForegroundMessage() {
  return messageApp.onMessage(async remoteMessage => {
    Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  });
}

export function initBackgroudMessage() {
  return messageApp.setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
}

export default messageApp;
