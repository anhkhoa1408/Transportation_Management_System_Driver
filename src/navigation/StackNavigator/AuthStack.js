import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../../views/AuthScreen/Signin';

const authStack = createStackNavigator();

const AuthStack = () => {
  return (
    <authStack.Navigator
      screenOptions={(routes) => ({
        headerShown: false,
      })}
    >
      <authStack.Screen name="Signin" component={SignIn} />
    </authStack.Navigator>
  );
};

export default AuthStack;
