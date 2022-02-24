import * as types from './../constants/types';

export const saveInfo = payload => {
  return {
    type: types.SAVE_USER_INFO,
    payload: payload,
  };
};

export const saveInfoSuccess = payload => {
  return {
    type: types.SAVE_USER_INFO_SUCCESS,
    payload: payload,
  };
};

export const saveInfoError = payload => {
  return {
    type: types.SAVE_USER_INFO_ERROR,
    payload: payload,
  };
};

export const saveShipmentState = payload => {
  return {
    type: types.SAVE_SHIPMENT_STATE,
    payload: payload,
  };
};

export const storeMessages = payload => {
  return {
    type: types.SAVE_MESSAGE,
    payload: payload,
  };
};

export const addRoom = payload => {
  return {
    type: types.ADD_ROOM,
    payload: payload,
  };
};
