import React from 'react';
import { View, Button } from 'react-native';
import notifee from '@notifee/react-native';
import { socket } from '../../config/socketIO';
import { connect } from 'react-redux';

function Notification(props) {
  const { messages, state } = props;

  React.useEffect(() => {
    socket.on('chat', message => {
      // console.log(message);
      // console.log('Store: ' + JSON.stringify(messages));
      // console.log('state: ' + JSON.stringify(state));
      // store.dispatch(storeMessages([message]));
    });
  }, []);

  async function chatt() {
    // socket.emit(
    //   'chat',
    //   { username: 'Hi', room: '1', message: [{ text: 2 }] },
    //   error => {
    //     if (error) {
    //       alert(error);
    //     } else {
    //     }
    //   },
    // );
    socket.emit('join', {
      userId: '61a98d4c8358540016fbb60f',
      anotherId: '61a89d4905989200dc6ee647',
    });
    console.log(JSON.stringify(messages));
  }

  async function onDisplayNotification() {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Required for iOS
    await notifee.requestPermission();

    const notificationId = await notifee.displayNotification({
      id: '123',
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
      },
    });

    // Sometime later...
    await notifee.displayNotification({
      id: '123',
      title: 'Updated Notification Title',
      body: 'Updated main body content of the notification',
      android: {
        channelId,
      },
    });
  }

  return (
    <View>
      <Button title="Display Notification" onPress={() => chatt()} />
    </View>
  );
}

const mapStateToProps = state => ({
  messages: state.message,
  state: state,
});

export default connect(mapStateToProps)(Notification);
