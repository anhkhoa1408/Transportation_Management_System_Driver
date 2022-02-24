import { SAVE_MESSAGE, ADD_ROOM } from '../constants/types';

const initialState = {
  room: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_MESSAGE:
      return {
        ...state,
        ...action.payload,
      };
    case ADD_ROOM:
      if (state.room.indexOf(action.payload) >= 0) return state;
      return {
        ...state,
        room: [...state.room, action.payload],
      };
    default:
      return state;
  }
};
export default reducer;
