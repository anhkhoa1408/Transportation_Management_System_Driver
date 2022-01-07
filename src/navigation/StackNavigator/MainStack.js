import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MessageScreen from '../../views/ChatScreen/MessageScreen';
import CustomerInfo from '../../views/CustomerInfo/CustomerInfo';
import OrderDetailScreen from '../../views/OrderScreen/OrderDetailScreen';
import TabNavigatior from '../TabNavigator/TabNavigatior';

const mainStack = createStackNavigator();

const MainStack = () => {
  return (
    <mainStack.Navigator
      screenOptions={(routes) => ({
        headerShown: false,
      })}
      initialRouteName="HomeTabs"
    >
      <mainStack.Screen name="HomeTabs" component={TabNavigatior} />
      <mainStack.Screen name="SendMessage" component={MessageScreen} />
      <mainStack.Screen name="CustomerInfo" component={CustomerInfo} />
      <mainStack.Screen name="OrderDetail" component={OrderDetailScreen} />
    </mainStack.Navigator>
  );
};

export default MainStack;
