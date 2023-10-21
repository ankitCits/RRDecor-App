import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Public/Login';
import Signup from '../Public/Signup';
import Otp from '../Public/Otp';
import ForgotPassword from '../Public/ForgotPassword';

function PublicStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}
export default PublicStack;
