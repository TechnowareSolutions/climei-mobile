import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import InformHeightAndWeight from '../pages/InformHeightAndWeight'
import BottomTabRoutes from './BottomTabRoutes'
import { useAuth } from '../context/AuthProvider/useAuth'

const Stack = createNativeStackNavigator()

export function Routes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Inform" component={InformHeightAndWeight} />
      <Stack.Screen name="LoggedRoute" component={BottomTabRoutes} />
    </Stack.Navigator>
  )
}
