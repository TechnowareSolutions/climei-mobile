import React, { useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  View,
  TouchableOpacity
} from 'react-native'

import { useAuth } from '../../context/AuthProvider/useAuth'
import { Ionicons } from '@expo/vector-icons'

import GoBackButton from '../../components/GoBackButton'
import CustomButton from '../../components/CustomButton'
import InputText from '../../components/InputText'

import { RadioButton } from 'react-native-paper'

const SignUp = ({ navigation }) => {
  const auth = useAuth()

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [idade, setIdade] = useState('')
  const [sexo, setSexo] = React.useState('')

  async function handleSignUp() {
    const obj = {
      nome,
      email,
      senha,
      idade,
      sexo
    }
    console.log(obj)
    await auth.signup(obj)
  }

  return (
    <SafeAreaView style={styles.container}>
      <GoBackButton navigation={navigation} />

      <Text style={styles.title}>Cadastrar Usuário</Text>

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
          label="E-mail"
          keyboardType={'email-address'}
          autoCapitalize="none"
          value={email}
          onChangeText={txt => setEmail(txt)}
        />

        <InputText
          label="Senha"
          secureTextEntry={true}
          value={senha}
          onChangeText={txt => setSenha(txt)}
        />

        <InputText
          label="Idade"
          keyboardType="numeric"
          value={idade}
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

        <CustomButton onPress={handleSignUp}>
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
  label: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    marginBottom: 8
  },
  buttonTitleWhite: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#F3F9FF',
    textAlign: 'center'
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

export default SignUp
