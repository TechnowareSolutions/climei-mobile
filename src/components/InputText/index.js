import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

const InputText = ({ variant = 'primary', label, customStyle, ...props }) => {
  const inputStyles = {
    primary: {
      backgroundColor: '#BFBFBF'
    },
    secondary: {
      backgroundColor: '#FFF'
    }
  }

  const classVariant = inputStyles[variant]

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={[styles.input, classVariant]} {...props} />
    </View>
  )
}

export default InputText

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    marginBottom: 8
  },
  input: {
    backgroundColor: '#BFBFBF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 50,
    borderRadius: 20,
    marginBottom: 16,
    justifyContent: 'center'
  }
})
