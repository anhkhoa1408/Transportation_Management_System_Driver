import * as types from './../constants/types';

export const saveInfo = () => {
  return {
    type: types.SAVE_USER_INFO,
  };
};

export const saveInfoSuccess = (payload) => {
  return {
    type: types.SAVE_USER_INFO_SUCCESS,
    action: payload,
  };
};

export const saveInfoError = (payload) => {
  return {
    type: types.SAVE_USER_INFO_ERROR,
    action: payload,
  };
};
