import React, { useState, useEffect } from 'react'
import {
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList
} from 'react-native'

import { useIsFocused } from '@react-navigation/native'
import GoBackButton from '../../components/GoBackButton'
import AdvicesItem from '../../components/AdvicesItem'

const Advices = ({ navigation }) => {
  const isFocused = useIsFocused()

  const [advices, setAdvices] = useState([])

  useEffect(() => {
    navigation.getParent().setOptions({
      tabBarStyle: { display: 'none', backgroundColor: 'transparent' }
    })
  }, [isFocused])

  return (
    <SafeAreaView style={styles.container}>
      <GoBackButton navigation={navigation} variant="secondary" />

      <Text style={styles.title}>Dicas de Sobrevivência</Text>

      {advices.length === 0 && (
        <Text style={styles.infoMessage}>Nenhuma dica nesta página.</Text>
      )}

      <FlatList
        style={styles.listContainer}
        data={advices}
        renderItem={({ item }) => <AdvicesItem data={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

export default Advices

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#F3F9FF',
    paddingStart: 12,
    paddingEnd: 12,
    paddingBottom: 48
  },
  title: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 24
  },
  listContainer: {
    marginTop: 24
  },
  infoMessage: {
    fontFamily: 'Inter_400Regular',
    marginTop: 24
  }
})
