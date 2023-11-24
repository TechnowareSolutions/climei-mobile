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

import GoBackButton from '../../components/GoBackButton'
import InputText from '../../components/InputText'
import CustomButton from '../../components/CustomButton'

import { RadioButton } from 'react-native-paper'

const EditUser = ({ navigation }) => {
  const auth = useAuth()
  const isFocused = useIsFocused()

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [idade, setIdade] = useState(0)
  const [sexo, setSexo] = React.useState('')
  const [altura, setAltura] = useState(0.0)
  const [peso, setPeso] = useState(0.0)

  const options = ['Masculino', 'Feminino']

  useLayoutEffect(() => {
    navigation.getParent().setOptions({
      tabBarStyle: { display: 'none', backgroundColor: 'transparent' }
    })
  }, [isFocused])

  useEffect(() => {
    async function fetch() {
      await auth.loadDataByToken(auth.token)
      await auth.loadHeightAndWeight()
      setNome(auth.user.nome)
      setEmail(auth.user.email)
      setIdade(auth.user.idade)
      setSexo(auth.user.sexo)
      setAltura(auth.user.altura)
      setPeso(auth.user.peso)
      console.log({
        nome,
        email,
        idade,
        sexo,
        altura,
        peso
      })
    }
    fetch()
  }, [isFocused])

  async function handleEditUser() {
    const obj = {
      nome,
      email,
      idade: parseInt(idade),
      sexo
    }
    console.log(obj)
    await auth.edit(obj, Number(altura), Number(peso))

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

      <Text style={styles.title}>Editar Informações</Text>

      <ScrollView
        style={styles.formContainer}
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <InputText
          label="Nome"
          value={nome}
          onChangeText={txt => setNome(txt)}
        />

        <InputText
          label="Idade"
          keyboardType="numeric"
          value={idade.toString()}
          onChangeText={txt => setIdade(txt)}
        />

        <Text style={styles.label}>Sexo:</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setSexo('M')}
          >
            <RadioButton
              value="basic"
              color="#000"
              status={sexo === 'M' ? 'checked' : 'unchecked'}
              onPress={() => setSexo('M')}
            />
            <Text style={styles.radioLabel}>Masculino</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setSexo('F')}
          >
            <RadioButton
              value="intermediary"
              color="#000"
              status={sexo === 'F' ? 'checked' : 'unchecked'}
              onPress={() => setSexo('F')}
            />
            <Text style={styles.radioLabel}>Feminino</Text>
          </TouchableOpacity>
        </View>

        <InputText
          label="Altura (em metros)"
          keyboardType="numeric"
          value={altura.toString()}
          onChangeText={txt => setAltura(txt)}
        />

        <InputText
          label="Peso (em Kg)"
          keyboardType="numeric"
          value={peso.toString()}
          onChangeText={txt => setPeso(txt)}
        />

        <CustomButton onPress={handleEditUser}>
          <Text style={styles.buttonTitleWhite}>Editar Informações</Text>
        </CustomButton>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EditUser

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
    paddingStart: 24,
    paddingEnd: 24
  },
  label: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    marginBottom: 8
  },
  buttonTitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#F3F9FF',
    textAlign: 'center'
  },
  buttonTitleWhite: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#F3F9FF',
    textAlign: 'center'
  },
  label: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    marginBottom: 8
  },
  datePicker: {
    backgroundColor: '#BFBFBF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 50,
    borderRadius: 20,
    marginBottom: 16,
    justifyContent: 'center'
  },
  radioGroup: {
    marginBottom: 26
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  radioLabel: {
    marginLeft: 10
  }
})
