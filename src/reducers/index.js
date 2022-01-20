import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CLEAN_STORE } from '../constants/types';
// Import reducer
import userInfo from './userInfo';
import shipmentState from './shipmentState';

const appReducer = combineReducers({
  userInfo,
  shipmentState,
});

const rootReducer = (state, action) => {
  if (action.type === CLEAN_STORE) {
    state = undefined;
    AsyncStorage.removeItem('persist:root');
  }
  return appReducer(state, action);
};

export default rootReducer;
