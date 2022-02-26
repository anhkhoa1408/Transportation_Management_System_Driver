import React from 'react';
import { View, Button } from 'react-native';
import notifee from '@notifee/react-native';
import { socket } from '../../config/socketIO';
import { connect } from 'react-redux';

function Notification(props) {
  const { messenger, state } = props;

  React.useEffect(() => {}, []);

  async function chatt() {}

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
  messages: state.messenger,
  state: state,
});

export default connect(mapStateToProps)(Notification);
