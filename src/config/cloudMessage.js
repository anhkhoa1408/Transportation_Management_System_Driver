import messaging from '@react-native-firebase/messaging';
import authApi from '../api/authApi';
import { addCustomer } from '../actions/actions';
import { socket } from './socketIO';

const messageApp = messaging();

export function initDeviceTokenSync() {
  messageApp.onTokenRefresh(newToken => {
    authApi
      .updateDeviceToken(newToken)
      .then(() => console.log('Device Token Updated By Refresh'))
      .catch(err => {});
  });

  messageApp.getToken().then(async token => {
    authApi
      .updateDeviceToken(token)
      .then(() => console.log('Device Token Updated By getToken'))
      .catch(err => {});
  });
}

export function syncToken() {
  messageApp.getToken().then(async token => {
    authApi
      .updateDeviceToken(token)
      .then(() => console.log('Device Token Updated By getToken'))
      .catch(err => {});
  });
}

export function removeToken() {
  authApi
    .updateDeviceToken('')
    .then(() => console.log('Device Token Removed'))
    .catch(err => console.log(err));
}

export function initForegroundMessage(store) {
  return messageApp.onMessage(async remoteMessage => {
    const { room, type, ...data } = remoteMessage.data;
    switch (type) {
      case 'ROOM':
        console.log(data);
        store.dispatch(addCustomer(data, room));
        socket.emit('join', room);
        break;
      case 'CHAT':
        // Notifee
        console.log(data);
        break;
      default:
        break;
    }
  });
}

export function initBackgroudMessage(store) {
  return messageApp.setBackgroundMessageHandler(async remoteMessage => {
    const { room, type, ...data } = remoteMessage.data;
    switch (type) {
      case 'ROOM':
        store.dispatch(addCustomer(data, room));
        break;
      case 'CHAT':
        // Notifee
        console.log(data);
        break;
      default:
        break;
    }
  });
}

export default messageApp;
