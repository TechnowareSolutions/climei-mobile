import React, { useState, useEffect, useLayoutEffect } from 'react'
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

import InputText from '../../components/InputText'
import CustomButton from '../../components/CustomButton'
import GoBackButton from '../../components/GoBackButton'

const InformWaterQuantity = ({ navigation }) => {
  const auth = useAuth()
  const isFocused = useIsFocused()

  const [agua, setAgua] = useState('')

  useLayoutEffect(() => {
    navigation.getParent().setOptions({
      tabBarStyle: { display: 'none', backgroundColor: 'transparent' }
    })
  }, [isFocused])

  function formatInfo(info) {
    info = info.replace(',', '.')
    console.log(info)
    return info
  }

  async function handleInformWaterQuantity() {
    await auth.informAgua(Number(formatInfo(agua)))

    navigation.getParent().setOptions({
      tabBarStyle: {
        display: 'flex',
        backgroundColor: '#2BD410',
        borderTopWidth: 0
      }
    })
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <GoBackButton navigation={navigation} variant="secondary" />

      <Text style={styles.title}>Informar quantidade de água ingerida</Text>

      <ScrollView
        style={styles.formContainer}
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <InputText
          label="Quantidade de Água (em litros)"
          keyboardType="numeric"
          value={agua}
          onChangeText={txt => setAgua(txt)}
        />

        <CustomButton onPress={handleInformWaterQuantity}>
          <Text style={styles.buttonTitleWhite}>Cadastrar</Text>
        </CustomButton>
      </ScrollView>
    </SafeAreaView>
  )
}

export default InformWaterQuantity

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
