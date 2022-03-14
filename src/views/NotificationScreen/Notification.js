import React from 'react';
import { View } from 'react-native';
import NotiItem from './components/NotiItem';

export default function Notification(props) {
  const items = [
    {
      id: 1,
      title: 'Shober of Justice',
      subTitle: 'Bạn có tin nhắn mới từ khách hàng',
      type: 'chat',
      time: '09:45 sáng',
      content: 'Hãy giao cho tôi vào lúc 11h sáng',
      // icon: 'package',
    },
    {
      id: 2,
      title: 'Hệ thống',
      subTitle: 'Bạn có đơn vận chuyển mới',
      type: 'delivery',
      time: '09:46 sáng',
      icon: 'package',
    },
  ];

  return (
    <View>
      <NotiItem item={items[0]} navigation={props.navigation} />
      <NotiItem item={items[1]} navigation={props.navigation} />
    </View>
  );
}
