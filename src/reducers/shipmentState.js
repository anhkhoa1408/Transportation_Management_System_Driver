import { SAVE_SHIPMENT_STATE } from '../constants/types';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_SHIPMENT_STATE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
export default reducer;
