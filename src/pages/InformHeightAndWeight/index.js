import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native'

import { useAuth } from '../../context/AuthProvider/useAuth'
import { useIsFocused } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

import { useNavigation } from '@react-navigation/native'

import InputText from '../../components/InputText'
import CustomButton from '../../components/CustomButton'

const InformHeightAndWeight = () => {
  const auth = useAuth()

  const [altura, setAltura] = useState('')
  const [peso, setPeso] = useState('')

  useEffect(() => {
    async function fetch() {
      try {
        await auth.loadHeightAndWeight()
      } catch (error) {}
    }
    fetch()
  }, [])

  function formatInfo(info) {
    info = info.replace(',', '.')
    console.log(info)
    return info
  }

  async function handleHeightAndWeight() {
    await auth.inform(Number(formatInfo(altura)), Number(formatInfo(peso)))
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Informar Altura e Peso</Text>

      <ScrollView
        style={styles.formContainer}
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <InputText
          label="Altura (em metros)"
          keyboardType="numeric"
          value={altura}
          onChangeText={txt => setAltura(txt)}
        />

        <InputText
          label="Peso (em Kg)"
          keyboardType="numeric"
          value={peso}
          onChangeText={txt => setPeso(txt)}
        />

        <CustomButton onPress={handleHeightAndWeight}>
          <Text style={styles.buttonTitleWhite}>Cadastrar</Text>
        </CustomButton>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#F3F9FF',
    paddingStart: 12,
    paddingEnd: 12
  },
  title: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 24
  },
  formContainer: {
    flex: 1,
    paddingStart: 24,
    paddingEnd: 24
  },
  buttonTitleWhite: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#F3F9FF',
    textAlign: 'center'
  }
})

export default InformHeightAndWeight
