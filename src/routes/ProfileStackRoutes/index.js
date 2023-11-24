import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Profile from '../../pages/Profile'
import EditUser from '../../pages/EditUser'

const Stack = createNativeStackNavigator()

export function ProfileStackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="EditUser"
        component={EditUser}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}
