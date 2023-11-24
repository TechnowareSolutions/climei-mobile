import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'

import { Logo } from '../../components/Logo'
import CustomButton from '../../components/CustomButton'
import InputText from '../../components/InputText'
import { useAuth } from '../../context/AuthProvider/useAuth'

const Login = () => {
  const auth = useAuth()

  const navigation = useNavigation()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  async function handleLogin() {
    await auth.authenticate(email, senha)
  }

  function handleNavigateToSignUp() {
    navigation.navigate('SignUp')
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.gradient}
        locations={[0.0, 0.5, 0.9]}
        colors={['#ACFF8F', '#81E671', '#2BD410']}
      />

      <View style={styles.logo}>
        <Logo />
      </View>

      <View style={styles.form}>
        <InputText
          variant="secondary"
          label="E-mail"
          keyboardType={'email-address'}
          autoCapitalize="none"
          value={email}
          onChangeText={txt => setEmail(txt)}
        />

        <InputText
          variant="secondary"
          label="Senha"
          secureTextEntry={true}
          value={senha}
          onChangeText={txt => setSenha(txt)}
        />

        <CustomButton onPress={handleLogin}>
          <Text style={[styles.buttonTitle, styles.buttonTitleWhite]}>
            Conectar
          </Text>
        </CustomButton>

        <CustomButton variant="blank2" onPress={handleNavigateToSignUp}>
          <Text style={[styles.buttonTitle, styles.buttonTitleBlack]}>
            Criar Conta
          </Text>
        </CustomButton>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingStart: 48,
    paddingEnd: 48,
    justifyContent: 'center'
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    backgroundColor: 'transparent'
  },
  logo: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  form: {
    flex: 2,
    marginBottom: 80
  },
  buttonTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16
  },
  buttonTitleWhite: {
    color: '#FFF'
  },
  buttonTitleWhite: {
    color: '#FFF'
  },
  buttonTitleBlack: {
    color: '#000'
  }
})
