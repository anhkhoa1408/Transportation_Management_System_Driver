import { ADD_MESSAGE, ADD_ROOM } from '../constants/types';

const initialState = {
  room: [],
  messages: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      let newState = state;
      if (newState.messages[action.room] === undefined) {
        newState.messages[action.room] = [action.payload];
      } else {
        newState.messages[action.room] = [
          action.payload,
          ...newState.messages[action.room],
        ];
      }
      return newState;
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
