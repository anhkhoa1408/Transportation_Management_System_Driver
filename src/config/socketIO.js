import io from 'socket.io-client';
import { MAIN_URL } from '../api/config';

// Initialize Socket IO:
export const socket = io(MAIN_URL);

// export the function to connect and use socket IO:
export const startSocketIO = store => {
  socket.connect();

  socket.on('connect', () => {
    socket.on('disconnect', () => {
      console.log('Disconnect socket');
    });

    socket.on('newMessage', message => {
      store.dispatch(storePublicMessages([message]));
    });
  });
};
