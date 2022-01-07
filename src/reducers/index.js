// import localForage from 'localforage';
import { combineReducers } from 'redux';
import userInfo from './userInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const appReducer = combineReducers({
  userInfo,
});

const rootReducer = (state, action) => {
  if (action.type === "CLEAN_STORE") {
    state = undefined;
    AsyncStorage.removeItem("persist:root");
  }
  return appReducer(state, action);
};

export default rootReducer;