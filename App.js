import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigatior from './src/navigation/TabNavigatior';

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigatior />
    </NavigationContainer>
  );
}


