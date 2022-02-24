import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OrderDetailScreen from '../../views/OrderScreen/OrderDetailScreen';
import OrderScreen from '../../views/OrderScreen/OrderScreen';
import ConfirmOrder from '../../views/OrderScreen/ConfirmOrder';

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
      <OrderStack.Screen name="ConfirmOrder" component={ConfirmOrder} />
    </OrderStack.Navigator>
  );
};

export default OrderStackScreen;
