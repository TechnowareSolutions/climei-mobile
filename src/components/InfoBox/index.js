import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'

const InfoBox = ({ title, measurement, unit, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ marginRight: 1 }}>{measurement}</Text>
        <Text>{unit}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '100%',
    maxHeight: 120,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  title: {
    fontSize: 16,
    fontWeight: 'semibold',
    color: '#0E0E0E',
    marginBottom: 4
  }
})

export default InfoBox
