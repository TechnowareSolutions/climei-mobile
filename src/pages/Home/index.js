import React, { useEffect, useState } from 'react'
import { SafeAreaView, StatusBar, Text, View, StyleSheet } from 'react-native'

import { useNavigation, useIsFocused } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

import CustomButton from '../../components/CustomButton'
import InfoBox from '../../components/InfoBox'
import { useAuth } from '../../context/AuthProvider/useAuth'

const Home = () => {
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const auth = useAuth()

  const [logs, setLogs] = useState({})

  useEffect(() => {
    async function fetch() {
      setLogs(await auth.loadAllLogs())
      console.log(logs)
    }
    fetch()
  }, [isFocused])

  function handleNavigateToAdvices() {
    navigation.navigate('Advices')
  }

  function handleNavigateToInformWaterQuantity() {
    navigation.navigate('InformWater')
  }

  return (
    <SafeAreaView
      contentContainerStyle={{ paddingBottom: 64 }}
      style={styles.container}
    >
      <StatusBar />

      <View style={styles.header}>
        <Text style={styles.title}>Aplicativo Climei</Text>
        <CustomButton style={{ flexDirection: 'row' }}>
          <Ionicons
            name="refresh-outline"
            color="#FFF"
            size={18}
            style={{ marginRight: 4 }}
          />
          <Text style={styles.refreshButtonTitle}>Recarregar</Text>
        </CustomButton>
      </View>

      <View
        style={{
          flex: 1,
          maxWidth: '100%',
          maxHeight: 120,
          flexDirection: 'row',
          marginBottom: 24
        }}
      >
        <InfoBox title="Temperatura" measurement={logs.temperatura} unit="°C" />
        <View style={{ flex: 0.1 }} />
        <InfoBox title="Umidade" measurement={logs.umidade} unit="%" />
      </View>

      <View
        style={{
          flex: 1,
          maxWidth: '100%',
          maxHeight: 120,
          flexDirection: 'row',
          marginBottom: 24
        }}
      >
        <InfoBox
          title="Batimento Cardíaco"
          measurement={logs.batimento}
          unit="bpm"
        />
        <View style={{ flex: 0.1 }} />
        <InfoBox title="Saturação" measurement={logs.oxigenacao} unit="%" />
      </View>

      <View
        style={{
          flex: 1,
          maxWidth: '100%',
          maxHeight: 120,
          marginBottom: 24
        }}
      >
        <InfoBox
          title="Água"
          measurement={logs.agua}
          unit="ml"
          onPress={handleNavigateToInformWaterQuantity}
        />
      </View>

      <CustomButton
        title="Ver Dicas"
        variant="blank1"
        onPress={handleNavigateToAdvices}
      >
        <Text style={styles.buttonTitleGreen}>Ver Dicas de Sobrevivência</Text>
      </CustomButton>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#F3F9FF',
    paddingStart: 12,
    paddingEnd: 12,
    paddingBottom: 48
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#0E0E0E'
  },
  refreshButtonTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#F3F9FF'
  },
  buttonTitleWhite: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#F3F9FF',
    textAlign: 'center'
  },
  buttonTitleGreen: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    textAlign: 'center',
    color: '#177D06'
  }
})
