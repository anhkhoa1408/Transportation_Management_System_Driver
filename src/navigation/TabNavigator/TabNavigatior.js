import React from 'react';
import { StyleSheet } from 'react-native';
import HomeScreen from '../../views/HomeScreen/HomeScreen';
import ChatScreen from '../../views/ChatScreen/ChatScreen';
import { Icon } from 'react-native-elements';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import VehicleScreen from '../../views/VehicleScreen/VehicleScreen';
import OrderScreen from '../../views/OrderScreen/OrderScreen';
import Account from '../../views/AuthScreen/Account';
import HomeStackScreen from '../StackNavigator/HomeStackScreen';
import { COLORS } from '../../styles';
import OrderStackScreen from '../StackNavigator/OrderStackScreen';

const Tab = createMaterialBottomTabNavigator();

const TabNavigatior = () => {
  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      initialRouteName="Home"
      activeColor={COLORS.primary}
      barStyle={style.container}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          switch (route.name) {
            case 'Vehicle':
              iconName = 'local-shipping';
              break;
            case 'Chat':
              iconName = 'forum';
              break;
            case 'Home':
              iconName = 'dashboard';
              break;
            case 'Shipping':
              iconName = 'assignment';
              break;
            case 'Setting':
              iconName = 'settings';
          }
          return (
            <Icon name={iconName} size={24} color={color} type="material" />
          );
        },
        tabBarActiveTintColor: '#7FC3DC',
        tabBarInactiveTintColor: '#BBB',
      })}>
      <Tab.Screen
        name="Vehicle"
        component={VehicleScreen}
        options={{
          tabBarLabel: 'Phương tiện',
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarLabel: 'Nhắn tin',
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Trang chủ',
        }}
      />
      <Tab.Screen
        name="Shipping"
        component={OrderStackScreen}
        options={{
          tabBarLabel: 'Vận chuyển',
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Account}
        options={{
          tabBarLabel: 'Cài đặt',
        }}
      />
    </Tab.Navigator>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#FFF',
    // position: 'relative',
    // display: 'flex',
    // alignItems: 'center',
    // bottom: 0,
    zIndex: 1,
    height: '10%',
  },
});

export default TabNavigatior;
