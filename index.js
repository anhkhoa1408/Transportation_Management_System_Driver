/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { initBackgroudMessage } from './src/config/cloudMessage';
import { startSocketIO } from './src/config/socketIO';

startSocketIO();
initBackgroudMessage();

AppRegistry.registerComponent(appName, () => App);
