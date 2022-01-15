import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../../views/AuthScreen/Signin';
import SignUp from '../../views/AuthScreen/Signup';

const authStack = createStackNavigator();

const AuthStack = () => {
  return (
    <authStack.Navigator
      screenOptions={routes => ({
        headerShown: false,
      })}>
      <authStack.Screen name="Signin" component={SignIn} />
      <authStack.Screen name="Signup" component={SignUp} />
    </authStack.Navigator>
  );
};

export default AuthStack;
