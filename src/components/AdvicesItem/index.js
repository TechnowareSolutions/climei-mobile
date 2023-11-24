import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const AdvicesItem = ({ data }) => {
  return (
    <View style={styles.container} key={data.id}>
      <Text>Dica {data.id}</Text>
      <Text style={styles.title}>{data.dica}</Text>
    </View>
  )
}

export default AdvicesItem

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(172, 255, 143, 0.49)',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 12
  },
  title: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16
  }
})
