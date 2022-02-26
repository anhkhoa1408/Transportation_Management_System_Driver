import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../views/HomeScreen/HomeScreen';
import EditProfile from '../../views/SettingScreen/EditProfile';
import NotificationScreen from '../../views/NotificationScreen/NotificationScreen';
import Notification from '../../views/NotificationScreen/Notification';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={routes => ({
        headerShown: false,
      })}
      initialRouteName="Noti">
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="EditProfile" component={EditProfile} />
      <HomeStack.Screen name="Notification" component={NotificationScreen} />
      <HomeStack.Screen name="Noti" component={Notification} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
