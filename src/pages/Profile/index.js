import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, StatusBar, View, Text } from 'react-native'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import CustomButton from '../../components/CustomButton'
import { useAuth } from '../../context/AuthProvider/useAuth'

const Profile = () => {
  const auth = useAuth()
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const [user, setUser] = useState({})
  const [userData, setUserData] = useState({})

  useEffect(() => {
    // console.log(isFocused)
    async function fetch() {
      setUser(await auth.loadDataByToken(auth.token))
      setUserData(await auth.loadHeightAndWeight())
      // console.log(user)
      // console.log(userData)
      // console.log('Altura: ' + userData.altura)
    }
    fetch()
  }, [isFocused])

  function handleNavigate() {
    navigation.navigate('EditUser')
  }

  function handleDeleteUser() {
    auth.destroy()
    navigation.navigate('Login')
  }

  const sexoOptions = {
    M: 'Masculino',
    F: 'Feminino'
  }

  return (
    <SafeAreaView
      contentContainerStyle={{ paddingBottom: 64 }}
      style={styles.container}
    >
      <Text style={styles.title}>Perfil</Text>

      <View style={styles.mainInfo}>
        <Text style={styles.infoTitle}>{user.nome}</Text>
      </View>

      <View style={styles.sideInfo}>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>E-mail: </Text>
          <Text style={styles.infoText}>{user.email}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Idade: </Text>
          <Text style={styles.infoText}>{user.idade}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Sexo: </Text>
          <Text style={styles.infoText}>{sexoOptions[user.sexo]}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Altura: </Text>
          <Text style={styles.infoText}>{userData.altura} metros</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Peso: </Text>
          <Text style={styles.infoText}>{userData.peso} quilogramas</Text>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <CustomButton onPress={handleNavigate}>
          <Text style={styles.buttonTitleWhite}>Editar informações</Text>
        </CustomButton>

        <CustomButton
          variant="secondary"
          onPress={handleDeleteUser}
          navigation={navigation}
        >
          <Text style={styles.buttonTitleWhite}>Excluir conta</Text>
        </CustomButton>
      </View>
    </SafeAreaView>
  )
}

export default Profile

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
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#0E0E0E'
  },
  mainInfo: {
    borderColor: '#ACACAC',
    borderBottomWidth: 1,
    marginBottom: 24
  },
  infoTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    marginBottom: 4
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  label: {
    flex: 1,
    fontFamily: 'Inter_400Regular'
  },
  infoText: {
    flex: 2,
    fontFamily: 'Inter_400Regular'
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center'
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
