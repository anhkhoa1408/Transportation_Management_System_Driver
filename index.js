/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Socket
// import io from 'socket.io-client';
// import { MAIN_URL } from './src/api/config';
// const socket = io(MAIN_URL);
// socket.emit('chat', { username: 'Hi', room: 1 }, error => {
//   if (error) {
//     alert(error);
//   } else {
//     socket.on('welcome', data => {
//       // props.onJoinSuccess(data);
//       console.log(data);
//     });
//     socket.on('message', message => {
//       console.log(message);
//     });
//   }
// });

AppRegistry.registerComponent(appName, () => App);
