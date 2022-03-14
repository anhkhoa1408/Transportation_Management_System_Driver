import {
  SAVE_USER_INFO,
  SAVE_USER_INFO_SUCCESS,
  SAVE_USER_INFO_ERROR,
} from '../constants/types';
import { MAIN_URL } from './../api/config';

const initialState = {
  isLoading: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER_INFO:
      if (action.payload.user.avatar && action.payload.user.avatar.url) {
        return {
          ...state,
          ...action.payload,
          user: {
            ...action.payload.user,
            avatar: {
              ...action.payload.user.avatar,
              url: MAIN_URL + action.payload.user.avatar.url,
            },
          },
        };
      }
      return {
        ...state,
        ...action.payload,
      };
    case SAVE_USER_INFO_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case SAVE_USER_INFO_ERROR:
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default reducer;
