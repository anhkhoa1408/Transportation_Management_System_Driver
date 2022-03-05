import io from 'socket.io-client';
import { MAIN_URL } from '../api/config';
import {
  addMessage,
  addCustomer,
  saveMessages,
  saveCustomers,
} from '../actions/actions';
import chatAPI from '../api/chatAPI';

// Initialize Socket IO:
export const socket = io(MAIN_URL);

// export the function to connect and use socket IO:
export const startSocketIO = store => {
  socket.connect();

  socket.on('connect', () => {
    console.log('Connect socket ', socket.id);
    socket.emit('join', Object.keys(store.getState().customerInfo));
    chatAPI
      .getRooms()
      .then(rooms => {
        store.dispatch(saveCustomers(rooms));
        rooms.forEach(room => {
          chatAPI
            .getMessageByRoom(room.room)
            .then(messages => store.dispatch(saveMessages(messages, room.room)))
            .catch(err => console.log(err, 'Chat update fail'));
        });
      })
      .catch(err => console.log(err, 'Room update fail'));
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
