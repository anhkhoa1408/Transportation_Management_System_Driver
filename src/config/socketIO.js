import io from 'socket.io-client';
import { MAIN_URL } from '../api/config';
import { addMessage, addRoom } from '../actions/actions';

// Initialize Socket IO:
export const socket = io(MAIN_URL);

// export the function to connect and use socket IO:
export const startSocketIO = store => {
  socket.connect();

  socket.on('connect', () => {
    console.log('Connect socket');
  });

  socket.on('disconnect', () => {
    console.log('Disconnect socket');
  });

  socket.on('join', data => {
    store.dispatch(addRoom(data));
  });

  socket.on('chat', (message, room) => {
    store.dispatch(addMessage(message, room));
  });
};
