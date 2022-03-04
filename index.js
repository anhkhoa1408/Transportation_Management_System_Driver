/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { store } from './src/config/configureStore';
import { initBackgroudMessage } from './src/config/cloudMessage';
import { startSocketIO } from './src/config/socketIO';

startSocketIO(store);
initBackgroudMessage(store);

AppRegistry.registerComponent(appName, () => App);
