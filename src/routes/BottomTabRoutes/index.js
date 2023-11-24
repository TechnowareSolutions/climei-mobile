import React, { useEffect } from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Ionicons } from '@expo/vector-icons'
import { ProfileStackRoutes } from '../ProfileStackRoutes'
import { HomeStackRoutes } from '../HomeStackRoutes'
import { useAuth } from '../../context/AuthProvider/useAuth'

import { useNavigation, useIsFocused } from '@react-navigation/native'

const Tab = createBottomTabNavigator()

const BottomTabRoutes = () => {
  const auth = useAuth()

  useEffect(() => {
    async function fetch() {
      try {
        await auth.loadHeightAndWeight()
      } catch (error) {}
    }
    fetch()
  }, [])

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#F3F9FF',
        tabBarStyle: {
          backgroundColor: '#2BD410',
          borderTopWidth: 0
        }
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackRoutes}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return <Ionicons name="home" color={color} size={size} />
            }
            return <Ionicons name="home-outline" color="#CCCCCC" size={size} />
          }
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackRoutes}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return <Ionicons name="person-circle" color={color} size={size} />
            }
            return (
              <Ionicons
                name="person-circle-outline"
                color="#CCCCCC"
                size={size}
              />
            )
          }
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabRoutes
