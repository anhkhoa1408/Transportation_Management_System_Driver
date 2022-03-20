import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OrderDetailScreen from '../../views/OrderScreen/OrderDetailScreen';
import OrderScreen from '../../views/OrderScreen/OrderScreen';
import ConfirmOrder from '../../views/OrderScreen/ConfirmOrder';
import PackageDetailScreen from '../../views/OrderScreen/PackageDetailScreen';
import MessageScreen from '../../views/ChatScreen/MessageScreen';
import MapScreen from '../../views/OrderScreen/MapScreen';

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
      <OrderStack.Screen name="PackageDetail" component={PackageDetailScreen} />
      <OrderStack.Screen name="MessageScreen" component={MessageScreen} />
      <OrderStack.Screen name="MapScreen" component={MapScreen} />
    </OrderStack.Navigator>
  );
};

export default OrderStackScreen;
