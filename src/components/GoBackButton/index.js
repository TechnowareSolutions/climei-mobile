import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const GoBackButton = ({ variant = 'primary', navigation }) => {
  const variantFunction = {
    primary: {
      function() {
        navigation.goBack()
      }
    },
    secondary: {
      function() {
        navigation.getParent().setOptions({
          tabBarStyle: {
            display: 'flex',
            backgroundColor: '#2BD410',
            borderTopWidth: 0
          }
        })
        navigation.goBack()
      }
    }
  }

  const classVariant = variantFunction[variant]

  function handleGoBack() {
    return classVariant.function()
  }

  return (
    <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
      <Ionicons name="chevron-back" size={24} color="#000" />
      <Text>Voltar</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  goBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
})

export default GoBackButton
