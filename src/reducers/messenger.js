import { ADD_MESSAGE } from '../constants/types';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      const room = state[action.room] === undefined ? [] : state[action.room];
      return {
        ...state,
        [action.room]: [action.payload, ...room],
      };
    default:
      return state;
  }
};
export default reducer;
