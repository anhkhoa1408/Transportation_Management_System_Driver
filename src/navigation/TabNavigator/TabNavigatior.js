import React, { useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { COLORS } from '../../styles';

import HomeStackScreen from '../StackNavigator/HomeStackScreen';
import ChatStackScreen from '../StackNavigator/ChatStackScreen';
import OrderStackScreen from '../StackNavigator/OrderStackScreen';
import SettingStackScreen from '../StackNavigator/SettingStackScreen';
import VehicleScreen from '../../views/VehicleScreen/VehicleScreen';

const Tab = createBottomTabNavigator();

const TabNavigatior = () => {
  const CustomTabBarButton = props => {
    let { iconName, name, color, accessibilityState } = props;
    let focused = accessibilityState.selected;
    let duration = 600;
    const viewRef = useRef(null);
    const textViewRef = useRef(null);
    useEffect(() => {
      if (focused) {
        viewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
        textViewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
      } else {
        viewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
        textViewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
      }
    }, [focused]);
    return (
      <TouchableOpacity
        {...props}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: focused ? 1.5 : 0.5,
        }}>
        <View>
          <Animatable.View
            duration={duration}
            ref={viewRef}
            style={[
              StyleSheet.absoluteFillObject,
              { backgroundColor: color, borderRadius: 16 },
            ]}
          />
          <View
            style={[
              style.btn,
              {
                backgroundColor: focused ? null : '#FFF',
              },
            ]}>
            <Icon name={iconName} color={focused ? COLORS.white : '#CCC'} />
            <Animatable.View duration={duration} ref={textViewRef}>
              {focused && (
                <Text
                  style={{
                    color: COLORS.white,
                    paddingHorizontal: 8,
                    fontSize: 15,
                  }}>
                  {name}
                </Text>
              )}
            </Animatable.View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      initialRouteName="HomeStack"
      activeColor={COLORS.primary}
      barStyle={style.container}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          ...style.container,
          display: getTabBarVisibility(route),
        },
        tabBarButton: props => {
          let iconName, name, color;
          switch (route.name) {
            case 'Vehicle':
              iconName = 'local-shipping';
              name = 'Phương tiện';
              color = COLORS.primary;
              break;
            case 'Chat':
              iconName = 'forum';
              name = 'Tin nhắn';
              color = COLORS.header;
              break;
            case 'HomeStack':
              iconName = 'dashboard';
              name = 'Trang chủ';
              color = COLORS.success;
              break;
            case 'Shipping':
              iconName = 'assignment';
              name = 'Đơn hàng';
              color = COLORS.danger;
              break;
            case 'Setting':
              iconName = 'settings';
              color = COLORS.warning;
              name = 'Cài đặt';
          }
          return (
            <CustomTabBarButton
              color={color}
              iconName={iconName}
              name={name}
              {...props}
            />
          );
        },
      })}>
      <Tab.Screen name="Vehicle" component={VehicleScreen} />
      <Tab.Screen name="Chat" component={ChatStackScreen} />
      <Tab.Screen name="HomeStack" component={HomeStackScreen} />
      <Tab.Screen name="Shipping" component={OrderStackScreen} />
      <Tab.Screen name="Setting" component={SettingStackScreen} />
    </Tab.Navigator>
  );
};

const visibleTabBarScreen = [
  'Vehicle',
  'ChatScreen',
  'HomeScreen',
  'OrderHome',
  'Account',
];

const getTabBarVisibility = route => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeScreen';
  return visibleTabBarScreen.includes(routeName) ? 'flex' : 'none';
};

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    backgroundColor: COLORS.white,
    height: 90,
    marginHorizontal: 20,
    bottom: 15,
    shadowColor: COLORS.primary,
    elevation: 20,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingVertical: 15,
    borderRadius: 16,
  },
});

export default TabNavigatior;
