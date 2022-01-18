import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../views/HomeScreen/HomeScreen';
import Account from '../../views/AuthScreen/Account';
import OrderDetailScreen from '../../views/OrderScreen/OrderDetailScreen';
import SendMessageScreen from '../../views/ChatScreen/MessageScreen';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={routes => ({
        headerShown: false,
      })}
      initialRouteName="HomeScreen">
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="Account" component={Account} />
      <HomeStack.Screen name="SendMessage" component={SendMessageScreen} />
      <HomeStack.Screen name="OrderDetail" component={OrderDetailScreen} />
      {/* <HomeStack.Screen name="SendMessageScreen" component={Account} /> */}
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
