import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SendMessageScreen from '../../views/ChatScreen/MessageScreen';
import ChatScreen from '../../views/ChatScreen/ChatScreen';

const ChatStack = createStackNavigator();

const ChatStackScreen = () => {
  return (
    <ChatStack.Navigator
      screenOptions={routes => ({
        headerShown: false,
      })}
      initialRouteName="SendMessageScreen">
      <ChatStack.Screen name="ChatScreen" component={ChatScreen} />
      <ChatStack.Screen
        name="SendMessageScreen"
        component={SendMessageScreen}
      />
    </ChatStack.Navigator>
  );
};

export default ChatStackScreen;
