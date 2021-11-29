import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigatior from './src/navigation/TabNavigatior';
import MessageScreen from './src/views/ChatScreen/MessageScreen';
import CustomerInfo from './src/views/CustomerInfo/CustomerInfo';

export default function App() {
    const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeTabs"
         screenOptions={(routes) => ({
            headerShown: false
          })}
      >
        <Stack.Screen name="HomeTabs" component={TabNavigatior}/>
        <Stack.Screen name="SendMessage" component={MessageScreen} />
        <Stack.Screen name="CustomerInfo" component={CustomerInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


