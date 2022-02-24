import io from 'socket.io-client';
import { MAIN_URL } from '../api/config';
import { storeMessages, addRoom } from '../actions/actions';

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
    console.log('Join: ' + data);
    store.dispatch(addRoom(data));
  });

  socket.on('chat', message => {
    console.log('HI' + message);
    store.dispatch(storeMessages([message]));
  });
};
