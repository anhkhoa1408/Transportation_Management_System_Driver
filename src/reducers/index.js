import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CLEAN_STORE } from '../constants/types';
// Import reducer
import userInfo from './userInfo';
import shipmentState from './shipmentState';
import messenger from './messenger';
import customerInfo from './customerInfo';

const appReducer = combineReducers({
  userInfo,
  shipmentState,
  messenger,
  customerInfo,
});

const rootReducer = (state, action) => {
  if (action.type === CLEAN_STORE) {
    state = undefined;
    AsyncStorage.removeItem('persist:root');
  }
  return appReducer(state, action);
};

export default rootReducer;
