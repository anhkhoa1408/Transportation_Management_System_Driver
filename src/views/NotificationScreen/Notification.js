import React from 'react';
import { View, Button } from 'react-native';
import notifee from '@notifee/react-native';
import { showIncomingMessage } from './UnreadMessage';

export default function Notification(props) {
  async function onDisplayNotification() {
    const channelId = await notifee.createChannel({
      id: 'message',
      name: 'Unread Message',
    });

    const message = {
      text: 'R',
      user: {
        _id: '61a98d4c8358540016fbb60f',
        name: 'Yoga Khoa',
        avatar: 'http://10.0.2.2:1337/uploads/Rabbit_hole_nd_c0a12355b7.jpg',
      },
      createdAt: '2022-03-04T08:56:14.608Z',
      _id: '1b3e0250-bdce-432e-a941-03b0f221caa0',
    };

    // Required for iOS
    await notifee.requestPermission();

    showIncomingMessage(message, channelId);

    // notifee.displayNotification({
    //   title: 'Emails',
    //   subtitle: '3 Unread Emails',
    //   android: {
    //     channelId,
    //     groupSummary: true,
    //     groupId: '123',
    //     groupAlertBehavior: AndroidGroupAlertBehavior.CHILDREN,
    //   },
    // });

    // // Children
    // notifee.displayNotification({
    //   title: 'New Email',
    //   body: 'Tap to open your email.',
    //   subtitle: 'Unread',
    //   android: {
    //     channelId,
    //     groupId: '123',
    //     groupAlertBehavior: AndroidGroupAlertBehavior.CHILDREN,
    //   },
    // });

    // // Sometime later...
    // await notifee.displayNotification({
    //   id: '123',
    //   title: 'Updated Notification Title',
    //   body: 'Updated main body content of the notification',
    //   android: {
    //     channelId,
    //   },
    // });
  }

  return (
    <View>
      <Button title="Display Notification" onPress={onDisplayNotification} />
    </View>
  );
}
