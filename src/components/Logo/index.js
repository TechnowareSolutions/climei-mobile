import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export function Logo({ variant = 'primary' }) {
  const logoStyles = {
    primary: {
      color: '#FFF'
    },
    secondary: {
      color: '#0E0E0E'
    }
  }

  const classVariant = logoStyles[variant]

  return (
    <View style={styles.container}>
      <Text style={[styles.title, classVariant]}>Climei</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  title: {
    fontSize: 48,
    fontFamily: 'Pacifico_400Regular'
  }
})
