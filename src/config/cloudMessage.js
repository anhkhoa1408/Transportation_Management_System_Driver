import messaging from '@react-native-firebase/messaging';
import authApi from '../api/authApi';
import { addCustomer } from '../actions/actions';
import { socket } from './socketIO';
import notifee from '@notifee/react-native';
import { showIncomingMessage } from '../views/NotificationScreen/UnreadMessage';

const messageApp = messaging();

export function initDeviceTokenSync() {
  messageApp.onTokenRefresh(newToken => {
    authApi
      .updateDeviceToken(newToken)
      .then(() => console.log('Device Token Updated By Refresh'))
      .catch(err => console.log(err));
  });

  messageApp.getToken().then(async token => {
    authApi
      .updateDeviceToken(token)
      .then(() => console.log('Device Token Updated By getToken'))
      .catch(err => console.log(err));
  });
}

export function syncToken() {
  messageApp.getToken().then(async token => {
    authApi
      .updateDeviceToken(token)
      .then(() => console.log('Device Token Updated By getToken'))
      .catch(err => console.log(err));
  });
}

export function removeToken() {
  messageApp
    .deleteToken()
    .then(() => console.log('Device Token deleted'))
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
        notifee
          .createChannel({
            id: 'message',
            name: 'Unread Message',
          })
          .then(messageChanel =>
            showIncomingMessage(JSON.parse(data.data), messageChanel),
          )
          .catch(err => console.log(err));
        break;
      default:
        break;
    }
  });
}

export async function initBackgroudMessage(store) {
  return messageApp.setBackgroundMessageHandler(async remoteMessage => {
    const { room, type, ...data } = remoteMessage.data;
    switch (type) {
      case 'ROOM':
        store.dispatch(addCustomer(data, room));
        break;
      case 'CHAT':
        notifee
          .createChannel({
            id: 'message',
            name: 'Unread Message',
          })
          .then(messageChanel =>
            showIncomingMessage(JSON.parse(data.data), messageChanel),
          )
          .catch(err => console.log(err));
        break;
      default:
        break;
    }
  });
}

export default messageApp;
