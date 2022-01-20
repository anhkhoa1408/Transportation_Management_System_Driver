import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../views/HomeScreen/HomeScreen';
import Account from '../../views/AuthScreen/Account';
import OrderDetailScreen from '../../views/OrderScreen/OrderDetailScreen';
import SendMessageScreen from '../../views/ChatScreen/MessageScreen';
import EditProfile from '../../views/SettingScreen/EditProfile';
import CustomerInfo from '../../views/CustomerInfo/CustomerInfo';
import ChangePass from '../../views/SettingScreen/ChangePass';
import NotificationScreen from '../../views/NotificationScreen/NotificationScreen';

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
      <HomeStack.Screen name="EditProfile" component={EditProfile} />
      <HomeStack.Screen name="CustomerInfo" component={CustomerInfo} />
      <HomeStack.Screen name="ChangePass" component={ChangePass} />
      <HomeStack.Screen name="Notification" component={NotificationScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
