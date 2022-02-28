import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './src/config/configureStore';
import Routes from './src/navigation/Routes';
import { StatusBar } from 'react-native';
import { startSocketIO } from './src/config/socketIO';

export default function App(props) {
  React.useEffect(() => {
    startSocketIO(store);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          <Routes />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
