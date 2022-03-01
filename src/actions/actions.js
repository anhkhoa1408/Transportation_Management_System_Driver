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

export const addMessage = (payload, room) => {
  return {
    type: types.ADD_MESSAGE,
    payload: payload,
    room: room,
  };
};

export const addCustomer = (payload, room) => {
  return {
    type: types.ADD_CUSTOMER,
    payload: payload,
    room: room,
  };
};
