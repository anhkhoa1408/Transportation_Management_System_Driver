import React from 'react';
import { StyleSheet } from 'react-native';
import HomeScreen from '../../views/HomeScreen/HomeScreen';
import ChatScreen from '../../views/ChatScreen/ChatScreen';
import { Icon } from 'react-native-elements';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { primaryColor } from '../../styles/color';
import VehicleScreen from '../../views/VehicleScreen/VehicleScreen';
import OrderScreen from '../../views/OrderScreen/OrderScreen';
import Account from '../../views/AuthScreen/Account';

const Tab = createMaterialBottomTabNavigator();

const TabNavigatior = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={primaryColor}
      barStyle={style.container}
      screenOptions={({ route }) => ({
        headerShown: false,
        // tabBarStyle: style.container,
        tabBarLabelStyle: style.label,
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
            case 'Order':
              iconName = 'assignment';
              break;
            case 'Setting':
              iconName = 'settings';
          }

          return (
            <Icon name={iconName} size={23} color={color} type="material" />
          );
        },
        tabBarActiveTintColor: '#7FC3DC',
        tabBarInactiveTintColor: '#BBB',
      })}
    >
      <Tab.Screen name="Vehicle" component={VehicleScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Order" component={OrderScreen} />
      <Tab.Screen name="Setting" component={Account} />
    </Tab.Navigator>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#FFF',
    // height: '15%'
    // position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    // borderRadius: 30,
    // marginHorizontal: 15,
    // zIndex: -1,
    // marginTop: 20,
    // ...shadowCard
  },
  label: {
    fontSize: 20,
    fontFamily: 'Roboto',
    height: '100%',
    // padding: 20
  },
});

export default TabNavigatior;
