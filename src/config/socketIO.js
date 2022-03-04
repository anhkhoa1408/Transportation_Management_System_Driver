import io from 'socket.io-client';
import { MAIN_URL } from '../api/config';
import { addMessage, addCustomer } from '../actions/actions';

// Initialize Socket IO:
export const socket = io(MAIN_URL);

// export the function to connect and use socket IO:
export const startSocketIO = store => {
  socket.connect();

  socket.on('connect', () => {
    console.log('Connect socket ', socket.id);
    socket.emit('join', Object.keys(store.getState().customerInfo));
  });

  socket.on('disconnect', () => {
    console.log('Disconnect socket');
  });

  socket.on('room', (room, customer) => {
    store.dispatch(addCustomer(customer, room));
    socket.emit('join', room);
  });

  socket.on('chat', (message, room) => {
    store.dispatch(addMessage(message, room));
  });
};
