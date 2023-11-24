import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

const CustomButton = ({ variant = 'primary', onPress, children, style }) => {
  const buttonStyles = {
    primary: {
      backgroundColor: '#177D06'
    },
    secondary: {
      backgroundColor: '#dc2626'
    },
    blank1: {
      backgroundColor: 'none',
      borderWidth: 2,
      borderColor: '#177D06'
    },
    blank2: {
      backgroundColor: 'none',
      borderWidth: 2,
      borderColor: '#000'
    }
  }

  const classVariant = buttonStyles[variant]

  return (
    <TouchableOpacity
      style={[styles.container, classVariant, style]}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 20
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 3 },
    // elevation: 3,
    // shadowOpacity: 0.25,
    // shadowRadius: 2
  }
})

export default CustomButton
