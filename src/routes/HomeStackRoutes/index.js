import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from '../../pages/Home'
import Advices from '../../pages/Advices'
import InformWaterQuantity from '../../pages/InformWaterQuantity'

const Stack = createNativeStackNavigator()

export function HomeStackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Advices"
        component={Advices}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="InformWater"
        component={InformWaterQuantity}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}
