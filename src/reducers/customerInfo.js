import { ADD_CUSTOMER } from '../constants/types';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CUSTOMER:
      return {
        ...state,
        [action.room]: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;
