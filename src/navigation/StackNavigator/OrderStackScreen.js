import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Account from '../../views/AuthScreen/Account';
import OrderDetailScreen from '../../views/OrderScreen/OrderDetailScreen';
import OrderScreen from '../../views/OrderScreen/OrderScreen';

const OrderStack = createStackNavigator();

const OrderStackScreen = () => {
  return (
    <OrderStack.Navigator
      screenOptions={routes => ({
        headerShown: false,
      })}
      initialRouteName="OrderHome">
      <OrderStack.Screen name="OrderDetail" component={OrderDetailScreen} />
      <OrderStack.Screen name="OrderHome" component={OrderScreen} />
    </OrderStack.Navigator>
  );
};

export default OrderStackScreen;
