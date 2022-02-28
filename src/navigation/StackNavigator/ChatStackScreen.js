import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MessageScreen from '../../views/ChatScreen/MessageScreen';
import ChatScreen from '../../views/ChatScreen/ChatScreen';

const ChatStack = createStackNavigator();

const ChatStackScreen = () => {
  return (
    <ChatStack.Navigator
      screenOptions={routes => ({
        headerShown: false,
      })}
      initialRouteName="ChatScreen">
      <ChatStack.Screen name="ChatScreen" component={ChatScreen} />
      <ChatStack.Screen name="MessageScreen" component={MessageScreen} />
    </ChatStack.Navigator>
  );
};

export default ChatStackScreen;
