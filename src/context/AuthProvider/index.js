import React, { createContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  getUserDataByToken,
  getHeightAndWeight,
  LoginRequest,
  SignUpRequest,
  DeleteUser,
  EditUser,
  setHeightAndWeight,
  getLogTemperatura,
  getLogUmidade,
  getLogBatimento,
  getLogAgua,
  setLogAgua
} from './utils'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('')
  const [user, setUser] = useState({})
  const [logs, setLogs] = useState({})
  const navigation = useNavigation()

  useEffect(() => {
    if (token.length > 0) {
      navigateTo()
    }
  }, [token, setToken, user, setUser])

  function navigateTo() {
    if (token !== null && token !== '') {
      // console.log('Token: ' + token)
      navigation.navigate('LoggedRoute')
    }
  }

  async function loadDataByToken(token) {
    const response = await getUserDataByToken(token)
    // console.log(response)
    const payload = {
      id: response.id,
      nome: response.nome,
      email: response.email,
      senha: response.senha,
      idade: response.idade,
      sexo: response.sexo
    }
    setUser(payload)

    // console.log(user)
    return user
  }

  async function loadHeightAndWeight() {
    try {
      const response = await getHeightAndWeight(user.id, token)
      // console.log(response)
      if (response === null) navigation.navigate('Inform')

      const payload = {
        dadosId: response[0].id,
        altura: response[0].altura,
        peso: response[0].peso
      }
      // console.log(payload)
      setUser({ ...user, ...payload })
      // console.log(user)

      return user
    } catch (error) {}
  }

  async function loadAllLogs() {
    const umidade = await loadLogUmidade()
    const temperatura = await loadLogTemperatura()
    const batimento = await loadLogBatimento()
    const agua = await loadLogAgua()
    setLogs({
      ...logs,
      umidade,
      temperatura,
      batimento,
      agua
    })
    return logs
  }

  async function loadLogTemperatura() {
    const response = await getLogTemperatura(user.id, token)
    // console.log('Temperatura: ' + response.temperatura)
    return response.temperatura
  }

  async function loadLogUmidade() {
    const response = await getLogUmidade(user.id, token)
    // console.log('Umidade: ' + response.umidade)
    return response.umidade
  }

  async function loadLogBatimento() {
    const response = await getLogBatimento(user.id, token)
    // console.log('Batimento: ' + response.quantidade)
    return response.quantidade
  }

  async function loadLogAgua() {
    const response = await getLogAgua(user.id, token)
    // console.log(response.quantidade)
    if (response === null) return null

    // console.log('Agua: ' + response.quantidade)
    return response.quantidade
  }

  async function informAgua(waterQuantity) {
    const date = new Date(new Date()).toLocaleDateString('en-CA')
    // console.log(date)
    // console.log(waterQuantity)

    await setLogAgua(user.id, token, waterQuantity, date)
    // console.log(response)
    // loadAllLogs()
  }

  async function authenticate(email, senha) {
    const response = await LoginRequest(email, senha)
    // if (response === null) return null
    // console.log(response)

    setToken(response.token)
    loadDataByToken(response.token)
    loadHeightAndWeight()
  }

  async function logout() {
    // setToken(null)
    setUser(null)
    setUserAsyncStorage(null)
  }

  async function signup(obj) {
    try {
      await SignUpRequest(obj)
      navigation.navigate('Login')
    } catch (error) {}
  }

  async function destroy() {
    // console.log(token)
    const response = await DeleteUser(user.id, token)
    // console.log(response)
    setToken('')
    setUser(null)
  }

  async function edit(obj, height, weight) {
    // console.log('Senha: ' + user.senha)
    // console.log('Id: ' + user.id)
    const response = await EditUser(
      token,
      user.id,
      user.senha,
      user.dadosId,
      obj,
      height,
      weight
    )
    // console.log(response)

    loadDataByToken(token)
    loadHeightAndWeight()
    return
  }

  async function inform(height, weight) {
    // console.log(user)
    // console.log('Token: ' + token)
    const response = await setHeightAndWeight(token, user.id, height, weight)
    // console.log(response)
    loadHeightAndWeight()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        authenticate,
        signup,
        logout,
        destroy,
        edit,
        inform,
        loadDataByToken,
        loadHeightAndWeight,
        loadAllLogs,
        informAgua
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
